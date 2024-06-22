//React
import {
    
} from 'react'

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//icons

//imported components
import AdminHeaderTitle from './AdminHeaderComponents/AdminHeaderTitle'
import AdminHeaderMenu from './AdminHeaderComponents/AdminHeaderMenu'


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
    () => ({
        display: "flex",
        alignItems: "center",
    })
)


const AdminHeader = () => {

    

    return (
        <StyledHeader>
            <StyledTitle>
            <AdminHeaderTitle />
                
            </StyledTitle>
            <AdminHeaderMenu />
        </StyledHeader>
    );
};


export default AdminHeader;