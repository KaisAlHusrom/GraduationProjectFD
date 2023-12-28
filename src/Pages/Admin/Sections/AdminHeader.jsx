//React
import {
    
} from 'react'

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//imported components
import AdminHeaderTitle from '../Components/AdminHeaderTitle'
import AdminHeaderMenu from '../Components/AdminHeaderMenu'
import AdminNavbarMenuButton from '../Components/AdminNavbarMenuButton'

//Styled Components
const StyledHeader = styled(Box)(
    ({ theme }) => ({
        width: "100%",
        height: "65px",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid",
        borderColor: theme.palette.divider,
        padding: `0 ${theme.spacing(2)}`,
        justifyContent: "space-between"
    })
)

const StyledTitle = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        alignItems: "center",
    })
)


const AdminHeader = () => {
    return (
        <StyledHeader>
            <StyledTitle>
                <AdminNavbarMenuButton />
                <AdminHeaderTitle />
            </StyledTitle>
            <AdminHeaderMenu />
        </StyledHeader>
    );
};


export default AdminHeader;