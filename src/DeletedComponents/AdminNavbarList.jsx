//React
import {
    
} from 'react'

//Redux
import {
    
} from 'react-redux'

//Components
import AdminHeaderTitle from "../Pages/Admin/Sections/AdminHeader/AdminHeaderComponents/AdminHeaderTitle"
import AdminNavbarListContent from "../Pages/Admin/Sections/AdminNavbar/AdminNavbarComponents/AdminNavbarListContent"

//MUI
import {
    Box,
    Divider
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledAdminNavbarList = styled(Box)(
    ({ theme }) => ({
        width: "300px",
        height: "100%",
        backgroundColor: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        "& .adminHeaderTitle" : {
            [theme.breakpoints.up("lg")]: {
                display: "none",
            }
        }
    })
)


const AdminNavbarList = () => {
    return (
        <StyledAdminNavbarList>
            <AdminHeaderTitle />
            <Divider />
            <AdminNavbarListContent />
        </StyledAdminNavbarList>
    );
};

export default AdminNavbarList;