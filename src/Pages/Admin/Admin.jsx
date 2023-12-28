
//MUI
import {
    Grid
} from "@mui/material"

//sections
import AdminNavbar from "./Sections/AdminNavbar"
import AdminHeader from "./Sections/AdminHeader"

const Admin = () => {
    return (
        <Grid container>
            <Grid item xs={12} >
                <AdminHeader />
            </Grid>
            <Grid item>
                <AdminNavbar />
            </Grid>
        </Grid>
    )
}

export default Admin