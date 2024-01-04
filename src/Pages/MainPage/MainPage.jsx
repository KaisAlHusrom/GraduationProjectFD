//React
import {
    
} from 'react'

import { useSelector } from 'react-redux'


//router
import { Outlet } from 'react-router-dom';

//Components
import { CustomCircularProgress, CustomLinearProgress } from '../../Components';



import {
    Box
} from '@mui/material'
import {  styled } from '@mui/system'



//Styles
const StyledMainPage = styled(Box)(
    () => ({
    
    })
)


const MainPage = () => {

    //download progresses
    const openLinearProgress = useSelector(state => state.downloadPageSlice.openLinearProgress)
    const openCircularProgress = useSelector(state => state.downloadPageSlice.openCircularProgress)
    return (
        <StyledMainPage>
                {
                    openLinearProgress && <CustomLinearProgress />
                }
                {
                    openCircularProgress && <CustomCircularProgress />
                }
                <Outlet />
        </StyledMainPage>
    );
};

export default MainPage;