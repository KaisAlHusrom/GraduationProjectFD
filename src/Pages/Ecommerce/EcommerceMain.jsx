//React
import 
{

}from 'react'

import {
    
} from 'react-redux'

//Components
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'

//MUI
import {
    Box
    
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

import { Outlet, useLocation} from 'react-router-dom';


//Styled Components
const StyledEcommerceMain = styled(Box)(
    () => ({
    })
)


const EcommerceMain = () => {
    const location = useLocation();
    const isCheckoutPage = location.pathname.includes('/checkout');
    
    return (
        <StyledEcommerceMain>
            {!isCheckoutPage && <NavBar />}
            <Outlet />
            <Footer />
        </StyledEcommerceMain>
    );
};

EcommerceMain.propTypes = {
    children: propTypes.array
}

export default EcommerceMain;