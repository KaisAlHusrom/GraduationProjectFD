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

//Components
import SearchButton from '../../../Components/SearchButton'
import AdminMainButton from '../../../Components/AdminMainButton'
import SettingsListContent from '../../../Components/SettingsListContent';
import NotificationsList from "../../../Components/NotificationsList"

//redux
import { useSelector } from 'react-redux';

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


    return (
        <StyledAdminHeaderMenu>
            <SearchButton />

            {/* Notification Button  */}
            <AdminMainButton
            appearance='iconButton'
            type='popover'
            icon={<NotificationsOutlinedIcon />}
            willShow={<NotificationsList />}
            title="Notifications"
            badgeContent={3} // to add number above the button
            />

            {/* Settings Button  */}
            <AdminMainButton
            appearance='iconButton'
            type='drawer'
            icon={<SettingsOutlinedIcon />}
            willShow={<SettingsListContent />}
            title="Settings"
            drawerAnchor={dir === "rtl" ? "left" : "right"}
            putDrawerCloseButton
            />
            
        </StyledAdminHeaderMenu>
    );
};



export default AdminHeaderMenu;