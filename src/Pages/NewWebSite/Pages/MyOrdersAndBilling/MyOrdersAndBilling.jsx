//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Grid,
    Divider
} from '@mui/material'
import { styled } from '@mui/system'
import MyOrders from './Components/MyOrders/MyOrders'
import MyBills from './Components/MyBills/MyBills'

//Styled Components
const StyledMyOrdersAndBilling = styled(Grid)(
    ({ theme }) => ({
        width: '100%',
        padding: `${theme.spacing(4)} ${theme.spacing(2)}`,
    })
)


const MyOrdersAndBilling = () => {
    return (
        <StyledMyOrdersAndBilling container spacing={2} >
            <Grid item xxs={12}>
                <MyOrders />
            </Grid>
        </StyledMyOrdersAndBilling>
    );
};

export default MyOrdersAndBilling;