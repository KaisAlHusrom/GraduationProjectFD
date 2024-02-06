//React
import { useState  } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import NavBar from './sections/NavBar/NavBar'
import Header from './sections/Header/Header'
import AboutUs from './sections/AboutUs/AboutUs'
// import Gallery from './sections/Gallery/Gallery'
import Gallery2 from './sections/Gallery/Gallery2'

//Styled Components
const StyledTemplateMain = styled(Box)(
    ({ theme }) => ({
    marginTop:'100px',
    paddingLeft:"200px",
    paddingRight:"200px",
    }
    )
)


const TemplateMain = () => {


    return (
        <StyledTemplateMain>
            <NavBar></NavBar>
            <Header></Header>
            <AboutUs></AboutUs>
            <Gallery2></Gallery2>
        </StyledTemplateMain>
    );
};

export default TemplateMain;