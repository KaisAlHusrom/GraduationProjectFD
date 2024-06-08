//React
import {
    
} from 'react'

import { useDispatch, useSelector } from 'react-redux'

//Components


//MUI
import {
    Box,
    Button,
    Divider,
    MenuItem,
} from '@mui/material'

//propTypes 
import propTypes from 'prop-types'
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode';
import { changeMode } from '../../Redux/Slices/modeSlice';
import { useNavigate } from 'react-router-dom';
import { LandPageMenuItems } from '../MainAppBar/MainAppBar';

//Styled Components


const MainAppBarDrawerNavList = ({auth}) => {
    const mode = useSelector(state => state.modeSlice.mode)
    const dispatch = useDispatch()

    const toggleColorMode = () => {
        if(mode === 'dark' ) {
            dispatch(changeMode({mode : 'light'}))
        } 
        if(mode === 'light' ) {
            dispatch(changeMode({mode : 'dark'}))
        } 
    };

    const Navigate = useNavigate();
    
    const handleEcommerceClick = () => {
        Navigate('/cliser-digital-market');
    };

    const handleLoginClick = () => {
        Navigate('/auth/login');
    };

    const handleSignUpClick = () => {
        Navigate('/auth/sign-up');
    };

    return (
        <Box
            sx={{
                width: '100%',
                p: 2,
                backgroundColor: 'background.paper',
                flexGrow: 1,
            }}
        >
            <Box
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                flexGrow: 1,
                }}
            >
                <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            </Box>
            <MenuItem
                onClick={handleEcommerceClick}
                sx={{ py: '6px', px: '12px', color: theme => theme.palette.secondary.light }}
            >
                    Digital Market
            </MenuItem>
            {
                !auth &&
                <LandPageMenuItems />
            }
            <Divider />
            <MenuItem>
                <Button
                color="primary"
                variant="contained"
                component="a"
                onClick={handleLoginClick}
                sx={{ width: '100%' }}
                >
                    Sign up
                </Button>
            </MenuItem>
            <MenuItem>
                <Button
                color="primary"
                variant="outlined"
                component="a"
                onClick={handleSignUpClick}
                sx={{ width: '100%' }}
                >
                Sign in
                </Button>
            </MenuItem>
        </Box>
    );
};

MainAppBarDrawerNavList.propTypes = {
    auth: propTypes.bool
}

export default MainAppBarDrawerNavList;