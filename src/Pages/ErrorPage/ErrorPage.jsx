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
    Box, Typography,
} from '@mui/material'
import { styled } from '@mui/system'


//Styled Components
const StyledErrorPage = styled(Box)(
    ({theme}) => ({
        textAlign: 'center',
        padding: '20px',
        color: theme.palette.error.main,
        border: '1px solid #f5c6cb',
        borderRadius: '5px',
    })
)


const ErrorPage = () => {
    const error = useRouteError()

    return (
        <StyledErrorPage>
        {error && error.message ? (
            <>
                <Typography variant='h3'>Error Occurred</Typography>
                <Typography variant='body1'>{error.message}</Typography>
            </>
        ) : (
            <h2>Unknown Error</h2>
        )}
    </StyledErrorPage>
    );
};

export default ErrorPage;