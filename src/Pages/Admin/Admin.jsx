
//MUI
import {
    Grid
} from "@mui/material"

//sections
import AdminNavbar from "./Sections/AdminNavbar"
import AdminHeader from "./Sections/AdminHeader"
import AdminPageSection from "./Sections/AdminPageSection"

const Admin = () => {
    return (
        <Grid container>
            <Grid item xs={12} >
                <AdminHeader />
            </Grid>
            <Grid item>
                <AdminNavbar />
            </Grid>
            <Grid item sx={{
                width: "100%"
            }}>
                <AdminPageSection />
            </Grid>
        </Grid>
    )
}

export default Admin