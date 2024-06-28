//React
import { useEffect } from 'react'

import { useSelector } from 'react-redux'


//router
import { Outlet, useNavigate } from 'react-router-dom';

//Components
import { CustomCircularProgress, CustomLinearProgress } from '../../Components';



import {
    Box
} from '@mui/material'
import {  styled } from '@mui/system'
import RouteChangeHandler from '../../Router/Requires/RouteChangeHandler';
import { setNavigateFunction } from '../../Helpers/navigations';




//Styles
const StyledMainPage = styled(Box)(
    () => ({
    
    })
)


const MainPage = () => {
    
    const navigate = useNavigate();
    useEffect(() => {
        setNavigateFunction(navigate);
    }, [navigate])

    //download progresses
    const openLinearProgress = useSelector(state => state.downloadPageSlice.openLinearProgress)
    const openCircularProgress = useSelector(state => state.downloadPageSlice.openCircularProgress)
    return (
        <StyledMainPage>
                {/* Actions happens when user navigate routes */}
                <RouteChangeHandler />

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