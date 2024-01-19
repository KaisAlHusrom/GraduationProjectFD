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
import NavBar from './sections/NavBar/NavBar'
import Header from './sections/Header/Header'

//Styled Components
const StyledTemplateMain = styled(Box)(
    ({ theme }) => ({
    marginTop:'100px'
    })
)


const TemplateMain = () => {
    return (
        <StyledTemplateMain>
            <NavBar></NavBar>
            <Header></Header>
        </StyledTemplateMain>
    );
};

export default TemplateMain;