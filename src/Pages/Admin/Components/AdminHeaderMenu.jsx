//React
import {
    
} from 'react'

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//Components
import SearchButton from './SearchButton'
import NotificationButton from './NotificationButton'
import SettingsButton from './SettingsButton'

//Styled Components
const StyledAdminHeaderMenu = styled(Box)(
    ({ theme }) => ({
        // width: 'calc(100% - 300px)',
        display: 'flex ',
        alignItems: 'center',
        // justifyContent: 'flex-end',
        // padding: `0 ${theme.spacing(2)}`,
        gap: theme.spacing(1)
    })
)


const AdminHeaderMenu = () => {
    return (
        <StyledAdminHeaderMenu>
            <SearchButton />
            <NotificationButton />
            <SettingsButton />
        </StyledAdminHeaderMenu>
    );
};



export default AdminHeaderMenu;