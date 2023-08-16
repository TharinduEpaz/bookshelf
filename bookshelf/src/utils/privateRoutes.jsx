import { Outlet,Navigate } from "react-router-dom"
import { useContext } from "react"
import { userContext } from "../context/userContext"

export function PrivateRoutes() {

    const {user} = useContext(userContext)
    
  return (
    user ? <Outlet/> : <Navigate to="/login" replace/>
  )
}

export default PrivateRoutes