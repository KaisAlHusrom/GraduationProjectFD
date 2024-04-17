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

//propTypes 
import propTypes from 'prop-types'
import NavBar from './Components/NavBar'
import MainSlider from './Components/MainSlider'

//Styled Components
const StyledEcommerceMain = styled(Box)(
    ({ theme }) => ({
    
    })
)


const EcommerceMain = () => {
    return (
        <StyledEcommerceMain>
            <NavBar />
            <MainSlider />
        </StyledEcommerceMain>
    );
};

EcommerceMain.propTypes = {
    children: propTypes.array
}

export default EcommerceMain;