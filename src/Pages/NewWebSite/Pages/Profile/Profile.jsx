//React
import {
    
} from 'react'

import { useDispatch, useSelector } from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import AppAppBar from '../../Components/AppAppBar'
import { changeMode } from '../../../../Redux/Slices/modeSlice'
import { Outlet } from 'react-router-dom'

//Styled Components
const StyledProfile = styled(Box)(
    () => ({
    
    })
)


const Profile = () => {
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

    return (
        <StyledProfile>
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode}></AppAppBar>
            <Outlet />


        </StyledProfile>
    );
};

export default Profile;