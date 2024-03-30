//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import './style.css'
import Navbar from './Sections/NavBar/NavBar'
import Hero from './Sections/Hero/Hero'
import Features from './Sections/Features/Features'
//Styled Components
const StyledLandPage = styled(Box)(
    ({ theme }) => ({
        color: 'black', 
        backgroundColor : 'white', 
        height : '150vh'
    })
)


const LandPage = () => {
    return (
        <StyledLandPage>
            <Navbar></Navbar>
            <Hero></Hero>
            <Features></Features>
        </StyledLandPage>
    );
};

export default LandPage;