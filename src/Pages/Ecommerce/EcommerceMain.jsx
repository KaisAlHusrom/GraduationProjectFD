//React
import 
{

}from 'react'

import {
    
} from 'react-redux'

//Components
import NavBar from './Components/NavBar'
import MainSlider from './Components/MainSlider'
import ProductCard from './Components/ProductCard'
import Footer from './Components/Footer'
import {productList} from './data/CradsData'

//MUI
import {
    Box, Grid,Container
    
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

import { Outlet, useNavigate} from 'react-router-dom';


//Styled Components
const StyledEcommerceMain = styled(Box)(
    () => ({
    
    })
)


const EcommerceMain = () => {
    
    return (
        <StyledEcommerceMain>
            <NavBar />
            

            <Outlet />

            <Footer /> 
        </StyledEcommerceMain>
    );
};

EcommerceMain.propTypes = {
    children: propTypes.array
}

export default EcommerceMain;