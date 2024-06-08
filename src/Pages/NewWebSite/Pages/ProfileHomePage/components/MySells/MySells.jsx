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
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
//propTypes 
import propTypes from 'prop-types'
import CustomCard from '../CustomCard/CustomCard'
import { AdminMainButton } from '../../../../../../Components'

//Styled Components
const StyledMySells = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: theme.spacing(2),
        cursor: "pointer",
        padding: theme.spacing(2)
    })
)

const StyledMySalesTail = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(3)
    })
);

const MySells = () => {
    return (
        <CustomCard 
        cardTail={
            <StyledMySalesTail>
                <AdminMainButton
                    type='custom'
                    title='Payments'
                    appearance='primary'
                    putBorder
                    icon={<PaymentOutlinedIcon />}
                    sx={{
                        fontWeight: "normal",
                        textTransform: "capitalize",
                        letterSpacing: "1.2px"
                    }}
                />
            </StyledMySalesTail>
        }
        >
            <StyledMySells >
                <Typography variant='h5'>
                    My Sales
                </Typography>
                <Typography variant='h4'>
                    0
                </Typography>
            </StyledMySells>
        </CustomCard>
    );
};

MySells.propTypes = {
    children: propTypes.array
}

export default MySells;