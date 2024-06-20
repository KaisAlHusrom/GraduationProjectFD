//React
import { useMemo } from 'react'

import { useSelector } from 'react-redux'

//Components


//MUI
import {
    Box,
    Typography,
    Card
} from '@mui/material'
import { styled } from '@mui/system'
import { writeFilterObject } from '../../../../../../Helpers/filterData'
import useFetchData from '../../../../../../Helpers/customHooks/useFetchData'
import { fetchUsersPayments } from '../../../../../../Services/AdminServices/Services/userPayments'

//Styled Components
const StyledMyBills = styled(Box)(
    ({ theme }) => ({
        padding: `${theme.spacing()} ${theme.spacing(2)}`,
        width: "100%"
    })
)

const StyledBills = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(),
        padding: theme.spacing(),
    })
);

const BillCard = styled(Card)(
    ({ theme }) => ({
        padding: theme.spacing(),

    })
);

const MyBills = () => {
    const user = useSelector(state => state.authSlice.user);

    const filters = useMemo(() => {
        return [
            writeFilterObject("user_id", "string", "=", user?.id)
        ]
    }, [user])

    const {data: payments, lastDataRecord, loading} = useFetchData(fetchUsersPayments, 'all', filters, null, true)
    console.log(payments)
    return (
        <StyledMyBills>
            <Typography variant='h5' letterSpacing={2} mb={2} >
                Billing Information
            </Typography>
            <StyledBills>
                <BillCard elevation={2}>

                </BillCard>
            </StyledBills>
        </StyledMyBills>
    );
};

export default MyBills;