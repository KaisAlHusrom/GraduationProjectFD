//React
import {
    
} from 'react'

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import MenuIcon from '@mui/icons-material/Menu';

//imported components
import AdminHeaderTitle from './AdminHeaderComponents/AdminHeaderTitle'
import AdminHeaderMenu from './AdminHeaderComponents/AdminHeaderMenu'
import AdminMainButton from '../../Components/AdminMainButton'

import AdminNavbarListContent from '../AdminNavbar/AdminNavbarComponents/AdminNavbarListContent'
import { useSelector } from 'react-redux'
import { useTheme } from '@emotion/react';

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

    //redux
    // --- dir ---
    const dir = useSelector(state => state.langSlice.dir);

    //theme
    const theme = useTheme()


    //styles
    const styleOfMenuButton = {
        [theme.breakpoints.up('lg')]: {
            display: "none"
        },
    }

    return (
        <StyledHeader>
            <StyledTitle>
                <AdminMainButton 
                sx={styleOfMenuButton}
                appearance='iconButton'
                type='drawer'
                drawerAnchor={dir === "ltr" ? "left" : "right"}
                willShow={<AdminNavbarListContent />}
                title='AdminHeaderTitle2'
                icon={<MenuIcon />}
                // drawerVariant="temporary" | don't need to write it if temporary
                />
                <AdminHeaderTitle />
            </StyledTitle>
            <AdminHeaderMenu />
        </StyledHeader>
    );
};


export default AdminHeader;