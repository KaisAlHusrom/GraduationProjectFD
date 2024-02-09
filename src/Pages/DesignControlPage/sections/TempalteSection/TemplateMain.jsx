//React
import {   } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import NavBar from './sections/NavBar/New/NavBar'
import Header from './sections/Header/New/Header'
import About from './sections/AboutUs/New/About'
import Gallery from './sections/Gallery/Gallery'

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
            {/* <AboutUs></AboutUs> */}
            <About></About>
            <Gallery></Gallery>
        </StyledTemplateMain>
    );
};

export default TemplateMain;