//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Typography
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledStaticsTitle = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: theme.spacing(4)
    })
)


const StaticsTitle = () => {
    return (
        <StyledStaticsTitle>
            <Typography variant='h6'>
                Statics
            </Typography>
            <Typography variant='subtitle2' color="text.secondary">
                updates one month ago
            </Typography>
        </StyledStaticsTitle>
    );
};

export default StaticsTitle;