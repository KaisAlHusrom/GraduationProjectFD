//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box, Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledNotFoundPage = styled(Box)(
    ({ theme }) => ({
        textAlign: 'center',
        padding: theme.spacing(2),
        margin: '20px auto', // Add margin
    })
)


const NotFoundPage = () => {
    return (
    <StyledNotFoundPage>
        <Typography variant='h3'>{`404 - Not Found`}</Typography>
        <Typography variant='body1'>Sorry, the page you are looking for does not exist.</Typography>
    </StyledNotFoundPage>
    );
};

export default NotFoundPage;