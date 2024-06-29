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
const StyledCustomDialog = styled(Box)(
    ({ theme }) => ({
    
    })
)


const CustomDialog = () => {
    return (
        <StyledCustomDialog>
            CustomDialog
        </StyledCustomDialog>
    );
};

CustomDialog.propTypes = {
    children: propTypes.array
}

export default CustomDialog;