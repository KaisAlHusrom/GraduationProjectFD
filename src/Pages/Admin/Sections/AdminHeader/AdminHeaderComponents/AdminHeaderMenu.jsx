//React
import {
    
} from 'react'

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
//Components
import SearchButton from '../../../Components/SearchButton'
import AdminMainButton from '../../../../../Components/AdminMainButton/AdminMainButton'
import SettingsListContent from '../../../Components/SettingsListContent';
import NotificationsList from "../../../Components/NotificationsList"

//redux
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import AdminNavbarListContent from '../../AdminNavbar/AdminNavbarComponents/AdminNavbarListContent';
import { useNavigate } from 'react-router-dom';

//Styled Components
const StyledAdminHeaderMenu = styled(Box)(
    ({ theme }) => ({
        // width: 'calc(100% - 300px)',
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'flex-end',
        // padding: `${theme.spacing()} ${theme.spacing()}`,
        gap: theme.spacing(1)
    })
)


const AdminHeaderMenu = () => {

    //redux
    // --- dir ---
    const dir = useSelector(state => state.langSlice.dir);


    //theme
    const theme = useTheme()


    //styles
    const styleOfMenuButton = {
        [theme.breakpoints.up('md')]: {
            display: "none"
        },
    }

    const navigate = useNavigate()
    const handleNavigateHome = () => {
        navigate("/")
    }

    return (
        <StyledAdminHeaderMenu>
            <SearchButton />

            {/* Notification Button  */}
            <AdminMainButton
            appearance='iconButton'
            putTooltip
            type='popover'
            icon={<NotificationsOutlinedIcon />}
            willShow={<NotificationsList />}
            title="Notifications"
            badgeContent={3} // to add number above the button
            />

            {/* Settings Button  */}
            <AdminMainButton
            appearance='iconButton'
            putTooltip
            type='drawer'
            icon={<SettingsOutlinedIcon />}
            willShow={<SettingsListContent />}
            title="Settings"
            drawerAnchor={dir === "rtl" ? "left" : "right"}
            putDrawerCloseButton
            />

            {/* main page  */}
            <AdminMainButton
            appearance='iconButton'
            type='custom'
            icon={<HomeOutlinedIcon />}
            title="Home Page"
            onClick={handleNavigateHome}
            sx={{
                color: theme => theme.palette.info.main
            }}
            />
            
            <AdminMainButton 
                sx={styleOfMenuButton}
                appearance='iconButton'
                type='drawer'
                drawerAnchor={dir === "ltr" ? "left" : "right"}
                willShow={<AdminNavbarListContent />}
                title='Cliser'
                withoutDrawerHeader
                icon={<MenuIcon />}
                // drawerVariant="temporary" | don't need to write it if temporary
                />
        </StyledAdminHeaderMenu>
    );
};



export default AdminHeaderMenu;