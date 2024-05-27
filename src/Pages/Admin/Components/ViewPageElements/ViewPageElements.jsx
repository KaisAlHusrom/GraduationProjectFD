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

//Styled Components
const StyledViewPageElements = styled(Box)(
    ({ theme }) => ({
    
    })
)


const ViewPageElements = () => {
    return (
        <StyledViewPageElements>
            ViewPageElements
        </StyledViewPageElements>
    );
};

ViewPageElements.propTypes = {
    children: propTypes.array
}

export default ViewPageElements;