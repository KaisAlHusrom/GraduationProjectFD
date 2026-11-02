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
const StyledDesignSettings = styled(Box)(
    ({ theme }) => ({
        width: "100%",
        
    })
)


const DesignSettings = ({design}) => {
    return (
        <StyledDesignSettings>
            DesignSettings
        </StyledDesignSettings>
    );
};

DesignSettings.propTypes = {
    design: propTypes.object
}

export default DesignSettings;