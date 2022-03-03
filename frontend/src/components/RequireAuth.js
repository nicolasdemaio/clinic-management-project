import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth()
    const location = useLocation()
    let userLogged = localStorage.getItem("roles");

    if (typeof(userLogged) != 'object'){
        userLogged = [userLogged]
    }

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))          //.username
            ? <Outlet />
            : auth?.username
            ? <Navigate to="/unauthorized" state={{ from: location}} replace />
            : userLogged.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location}} replace />
    )
}

export default RequireAuth