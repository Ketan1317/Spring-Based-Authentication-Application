import axios from "axios"
import { refreshToken } from "@/services/AuthService"
import useAuth from "@/services/store"

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // send cookies (refresh token)
  timeout: 10000,
})

// Attach access token to every request
apiClient.interceptors.request.use((config) => {
  const accessToken = useAuth.getState().accessToken

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

let isRefreshing = false
let pendingRequests: ((token: string | null) => void)[] = []

// Retry all queued requests with new token
const processQueue = (token: string | null) => {
  pendingRequests.forEach((cb) => cb(token))
  pendingRequests = []
}

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config
    const status = error.response?.status

    // Prevent infinite refresh loop
    if (originalRequest?.url?.includes("/auth/refresh")) {
      return Promise.reject(error)
    }

    // Only handle expired access tokens
    if (status !== 401) {
      return Promise.reject(error)
    }

    // Already retried once
    if (originalRequest._retry) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    // If refresh is already running, wait for it
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push((token) => {
          if (!token) {
            reject(error)
            return
          }

          originalRequest.headers.Authorization = `Bearer ${token}`

          resolve(apiClient(originalRequest))
        })
      })
    }

    isRefreshing = true

    try {
      console.log("Refreshing token...")

      // Get new access token using refresh token
      const refreshResponse = await refreshToken()

      const newAccessToken = refreshResponse.token

      if (!newAccessToken) {
        throw new Error("No access token received")
      }

      // Update Zustand auth state
      useAuth.getState().changeLocalLoginData(
        refreshResponse.token,
        refreshResponse.user,
        true,
      )

      // Wake up waiting requests
      processQueue(newAccessToken)

      // Retry failed request
      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`

      return apiClient(originalRequest)

    } catch (err) {
      // Refresh token invalid/expired
      processQueue(null)

      await useAuth.getState().logout()

      return Promise.reject(err)

    } finally {
      isRefreshing = false
    }
  }
)

export default apiClient