//React
import {
    
} from 'react'

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { openAdminNavbar, closeAdminNavbar } from '../Redux/Slices/componentsOpenSlice'

//Components


//MUI
import {
    IconButton,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import MenuIcon from '@mui/icons-material/Menu';

//Styled Components
const StyledAdminNavbarMenuButton = styled(IconButton)(
    ({ theme }) => ({
        display: "none",
        border: '1px solid',
        borderColor: theme.palette.divider,
        borderRadius: "10px",
        [theme.breakpoints.down('lg')]: {
            display: "block"
        },
    })
)


const AdminNavbarMenuButton = () => {
    //redux
    const openDrawer = useSelector(state => state.componentsOpenSlice.adminNavbarOpen)
    const dispatch = useDispatch()

    // handles
    const toggleNavBarOpen = () => {
        openDrawer ? dispatch(closeAdminNavbar()) : dispatch(openAdminNavbar())
    }

    return (
        <StyledAdminNavbarMenuButton
        size='small'
        color='primary'
        onClick={toggleNavBarOpen}
        >
            <MenuIcon />
        </StyledAdminNavbarMenuButton>
    );
};

export default AdminNavbarMenuButton;