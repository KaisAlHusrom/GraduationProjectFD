//React
import {
    
} from 'react'

//Redux
import {
    
} from 'react-redux'

//Components
import AdminHeaderTitle from "./AdminHeaderTitle"
import AdminNavbarListContent from "./AdminNavbarListContent"

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