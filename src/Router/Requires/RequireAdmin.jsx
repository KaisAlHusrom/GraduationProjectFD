import {Navigate, Outlet} from "react-router-dom"
import { useSelector } from "react-redux"

const RequireAdmin = () => {
    const user = useSelector(state => state.authSlice.user)
    return user?.is_admin ? <Outlet /> : <Navigate to="/" />
}

export default RequireAdmin