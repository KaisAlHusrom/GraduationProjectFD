//React
import { useEffect } from 'react'

import { useSelector } from 'react-redux'


//router
import { Outlet } from 'react-router-dom';

//Components
import { CustomCircularProgress, CustomLinearProgress } from '../../Components';



import {
    Box
} from '@mui/material'
import {  styled } from '@mui/system'
import UserProvider from '../../Contexts/UserProvider';
import { isTokenValid } from '../../Helpers/utils/auth';




//Styles
const StyledMainPage = styled(Box)(
    () => ({
    
    })
)


const MainPage = () => {
    
    useEffect(() => {
        isTokenValid()
    }, [])

    //download progresses
    const openLinearProgress = useSelector(state => state.downloadPageSlice.openLinearProgress)
    const openCircularProgress = useSelector(state => state.downloadPageSlice.openCircularProgress)
    return (
        <StyledMainPage>
                {/* <UserProvider> */}
                        {
                            openLinearProgress && <CustomLinearProgress />
                        }
                        {
                            openCircularProgress && <CustomCircularProgress />
                        }
                        <Outlet />
                {/* </UserProvider> */}
        </StyledMainPage>
    );
};

export default MainPage;