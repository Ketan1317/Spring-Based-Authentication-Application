import Navbar from "@/components/Navbar"
import useAuth from "@/services/store"
import { Navigate, Outlet } from "react-router-dom"

const RootLayout = () => {
  const authStatus = useAuth((state) => state.authStatus)

  if (authStatus) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default RootLayout
