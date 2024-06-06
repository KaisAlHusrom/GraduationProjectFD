
import {Navigate, Outlet} from "react-router-dom"
import { useSelector } from "react-redux"

const RequireAuth = () => {
    const user = useSelector(state => state.authSlice.user)
    return user ? <Outlet /> : <Navigate to="/" />
}

export default RequireAuth