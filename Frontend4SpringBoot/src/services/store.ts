import type LoginData from "@/Models/Login"
import type User from "@/Models/User"
import { create, type StateCreator } from "zustand"
import { loginUser, logoutUser } from "./AuthService"
import type LoginResponseData from "@/Models/LoginResponse"
import { toast } from "react-hot-toast"
import { persist } from "zustand/middleware"

const LOCAL_KEY = "auth-storage"

type AuthState = {
  accessToken: string | null
  user: User | null
  authStatus: boolean
  authLoading: boolean

  login: (loginData: LoginData) => Promise<LoginResponseData>

  logout: (
    options?: { silent?: boolean }
  ) => Promise<void>

  checkLogin: () => boolean

  changeLocalLoginData: (
    accessToken: string,
    user: User,
    authStatus: boolean,
  ) => void
}

const stateCreator: StateCreator<AuthState,[],[["zustand/persist", AuthState]]> = (set, get) => ({
  // Initial auth state
  accessToken: null,
  user: null,
  authStatus: false,
  authLoading: false,

  // Update auth state manually (used after token refresh)
  changeLocalLoginData: (
    accessToken,
    user,
    authStatus,
  ) => {
    set({
      accessToken,
      user,
      authStatus,
    })
  },

  // Login user and store auth data
  login: async (loginData: LoginData) => {
    console.log("Started Logging in...")

    try {
      set({ authLoading: true })

      const res = await loginUser(loginData)

      set({
        accessToken: res.token,
        user: res.user,
        authStatus: true,
      })

      return res

    } catch (error) {
      return Promise.reject(error)

    } finally {
      set({
        authLoading: false,
      })
    }
  },

  // Logout user and clear local state
  logout: async () => {
    try {
      await logoutUser()

      set({
        accessToken: null,
        user: null,
        authLoading: false,
        authStatus: false,
      })

    } catch (e) {
      toast.error("Error during logout " + e)
    }
  },

  // Check if user is currently authenticated
  checkLogin: () => {
    return !!(
      get().authStatus &&
      get().accessToken
    )
  },
})

// Persist auth state in localStorage
const useAuth = create<AuthState>()(
  persist(stateCreator, {
    name: LOCAL_KEY,
  })
)

export default useAuth