//React
import {
    
} from 'react'

import {
    
} from 'react-redux'


//Routers
import { useRouteError } from 'react-router-dom'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'


//Styled Components
const StyledErrorPage = styled(Box)(
    () => ({
    
    })
)


const ErrorPage = () => {
    const error = useRouteError()

    return (
        <StyledErrorPage>
            {error.message}
        </StyledErrorPage>
    );
};

export default ErrorPage;