import {Navigate, Outlet} from "react-router-dom"
import { useSelector } from "react-redux"

const RequireSignOut = () => {
    const user = useSelector(state => state.authSlice.user)

    return !user ? <Outlet /> : <Navigate to="/profile" />
}

export default RequireSignOut