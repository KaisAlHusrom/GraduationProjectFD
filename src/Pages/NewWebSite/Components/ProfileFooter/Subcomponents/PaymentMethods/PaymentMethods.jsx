//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//images
import visa from "../../../../../../Assets/Images/visa.png"
import masterCard from "../../../../../../Assets/Images/card.png"

//Components


//MUI
import {
    Box,
    Typography
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledPaymentMethods = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(2)
    })
)

const StyledImageBox = styled(Box)(
    () => ({
        width: 60,
        height: 60,
    })
);

const PaymentMethods = () => {
    return (
        <Box>
            <Typography variant='h5' mb={2}>
                Payment Methods
            </Typography>
            <StyledPaymentMethods>
                <StyledImageBox>
                    <img src={visa} width="100%" height="100%"  />    
                </StyledImageBox>
                <StyledImageBox>
                    <img src={masterCard} width="100%" height="100%"  />    
                </StyledImageBox>
            </StyledPaymentMethods>
                
        </Box>
    );
};

PaymentMethods.propTypes = {
    children: propTypes.array
}

export default PaymentMethods;