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
import NavBar from './NavBar/NavBar'

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
        </StyledTemplateMain>
    );
};

export default TemplateMain;