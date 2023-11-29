import { Navigate, Outlet } from "react-router"
import { UserContext } from "../../providers/UserContext"
import { useContext } from "react"

export const PrivateRoutes = () => {
   const { user } = useContext(UserContext)

   return (user.cargo !== 0) ? <Outlet /> : <Navigate to="/" />
}
