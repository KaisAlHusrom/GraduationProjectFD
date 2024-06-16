//React
import {
    
} from 'react'

import { useSelector } from 'react-redux'

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
const StyledBalanceBox = styled(Box)(
    ({ theme }) => ({
        width: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: theme.spacing(),
        padding: `${theme.spacing()} ${theme.spacing()}`,
    })
)


const BalanceBox = ({title, total, colored}) => {
    const currency = useSelector(state => state.currencySlice.currency)
    return (
        <StyledBalanceBox>
            <Typography variant='h5' letterSpacing={2} color={colored && "success.light"}>
                {title}
            </Typography>
            <Typography variant='h4' letterSpacing={2} color={colored && "success.light"}>
                {total}{currency}
            </Typography>
        </StyledBalanceBox>
    );
};

BalanceBox.propTypes = {
    title: propTypes.string,
    total: propTypes.string,
    colored: propTypes.bool,
}

export default BalanceBox;