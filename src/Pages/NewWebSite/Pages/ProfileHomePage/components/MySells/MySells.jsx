//React
import { useMemo } from 'react'

import { useSelector } from 'react-redux'

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
import { writeFilterObject } from '../../../../../../Helpers/filterData';
import useFetchData from '../../../../../../Helpers/customHooks/useFetchData';
import { fetchUserComingOrders } from '../../../../../../Services/UserServices/Services/ordersUsersService';
import useEffectFetchData from '../../../../../../Helpers/customHooks/useEffectFetchData';

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

    //in this fetch function there is no any parameter
    const params = useMemo(() => {
        return [
        ]
    }, [])
    const {data: orders, download} = useEffectFetchData(fetchUserComingOrders, params, true, false)

    const user = useSelector(state => state.authSlice.user)
    console.log(user.id)
    console.log(orders)
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