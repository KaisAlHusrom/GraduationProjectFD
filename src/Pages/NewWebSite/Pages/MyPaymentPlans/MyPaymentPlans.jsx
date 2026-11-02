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
import PaymentPlansComponent from '../../../../Components/PaymentPlansComponent/PaymentPlansComponent'
import CurrentPaymentPlan from './Components/CurrentPaymentPlan/CurrentPaymentPlan'

//Styled Components
const StyledMyPaymentPlans = styled(Box)(
    ({theme}) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(),
        padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
        width: '100%',
    })
)


const MyPaymentPlans = () => {
    return (
        <StyledMyPaymentPlans>
            <CurrentPaymentPlan />
            <PaymentPlansComponent paymentPlanPage />
        </StyledMyPaymentPlans>
    );
};

export default MyPaymentPlans;