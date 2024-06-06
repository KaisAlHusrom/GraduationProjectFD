//React
import {  } from 'react'

import {
    
} from 'react-redux'

//Components



//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'



//Styled Components
const StyledAnimationsDrawer = styled(Box)(
    ({ theme }) => ({
        padding:theme.spacing(),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    })
)



const AnimationsDrawer = () => {

    return (
        <StyledAnimationsDrawer >
            Animations
            <span className="material-icons-outlined">
                </span>
        </StyledAnimationsDrawer>
    )

};

export default AnimationsDrawer;

