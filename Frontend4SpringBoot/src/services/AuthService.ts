import apiClient from "@/config/ApiClient"
import type LoginData from "@/Models/Login"
import type LoginResponseData from "@/Models/LoginResponse"
import type RegisterData from "@/Models/Register"

export const registerUser = async (signUpData: RegisterData) => {
  const res = await apiClient.post("/auth/register", signUpData)
  return res.data
}

export const loginUser = async (loginData: LoginData) => {
  const res = await apiClient.post<LoginResponseData>("/auth/login", loginData)
  return res.data
}

export const logoutUser = async () => {
  const res = await apiClient.post<LoginResponseData>("/auth/logout")
  return res.data
}

export const getCurrentUser = async (email: string | undefined) => {
  const res = await apiClient.get(`/users/email`, {
    params: {
      email,
    },
  })
  return res.data
}

export const refreshToken = async () => {
  const res = await apiClient.post<LoginResponseData>("/auth/refresh")
  return res.data
}
