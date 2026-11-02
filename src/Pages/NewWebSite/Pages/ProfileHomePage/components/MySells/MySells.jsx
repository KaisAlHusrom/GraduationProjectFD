//React
import { useMemo } from 'react'


//Components


//MUI
import {
    Box,
    Typography,
    Skeleton
} from '@mui/material'
import { styled } from '@mui/system'
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
//propTypes 
import propTypes from 'prop-types'
import CustomCard from '../CustomCard/CustomCard'
import { AdminMainButton } from '../../../../../../Components'
import useEffectFetchData from '../../../../../../Helpers/customHooks/useEffectFetchData';
import { fetchUserComingOrdersCounts } from '../../../../../../Services/UserServices/Services/ordersUsersService';
import { navigateProfileMySells } from '../../../../../../Helpers/navigations';

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
    const {data: orders, download} = useEffectFetchData(fetchUserComingOrdersCounts, params, true, false)
    // const user = useSelector(state => state.authSlice.user)
    
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
            <StyledMySells onClick={navigateProfileMySells} >
                <Typography variant='h5'>
                    My Sales
                </Typography>
                {
                    !download
                    ?
                    <Typography variant='h4'>
                        {orders?.count}
                    </Typography>
                    :
                    <Skeleton variant='circular' width={50} height={50} animation="wave" />
                }
                
            </StyledMySells>
        </CustomCard>
    );
};

MySells.propTypes = {
    children: propTypes.array
}

export default MySells;