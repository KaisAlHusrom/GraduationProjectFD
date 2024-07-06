//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Grid
} from '@mui/material'
import { styled } from '@mui/system'
import MyBills from '../MyOrdersAndBilling/Components/MyBills/MyBills'

//Styled Components
const StyledMyBilling = styled(Box)(
    ({ theme }) => ({
        width: '100%',
        padding: `${theme.spacing(4)} ${theme.spacing(2)}`,
    })
)


const MyBilling = () => {
    return (
        <StyledMyBilling container spacing={2}>
            <Grid item xxs={12}>
                <MyBills />
            </Grid>
        </StyledMyBilling>
    );
};

export default MyBilling;