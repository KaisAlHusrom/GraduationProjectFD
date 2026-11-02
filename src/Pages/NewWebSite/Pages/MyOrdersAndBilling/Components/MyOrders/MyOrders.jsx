//React
import { useMemo } from 'react'

import { useSelector } from 'react-redux'

import config from "../../../../../../../Config.json"

//Components


//MUI
import {
    Box,
    Typography,
    Grid,
    Divider,
    Card,
    Skeleton,
    Chip
} from '@mui/material'
import { styled } from '@mui/system'
import InfoIcon from '@mui/icons-material/Info';
//propTypes 
import propTypes from 'prop-types'
import useFetchData from '../../../../../../Helpers/customHooks/useFetchData'
import { fetchUserOrders } from '../../../../../../Services/UserServices/Services/ordersUsersService'
import { writeFilterObject } from '../../../../../../Helpers/filterData'
import { AdminMainButton } from '../../../../../../Components'
import OrderDetailsModal from './Subcomponents/OrderDetailsModal';
import DateHelper from '../../../../../../Helpers/DateHelper';
import { productsFilesFolderName, productsImagesFolderName } from '../../../../../../Services/AdminServices/Services/productsService';
import { navigateProductView } from '../../../../../../Helpers/navigations'

//Styled Components
const StyledMyOrders = styled(Box)(
    ({ theme }) => ({
        padding: `${theme.spacing()} ${theme.spacing(2)}`,
        width: "100%"
    })
)

const StyledOrders = styled(Grid)(
    () => ({
        // Your styles here
    })
);

const StyledOrderHeader = styled(Box)(
    ({ theme }) => ({
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing()
    })
);

const StyledOrderBody = styled(Box)(
    ({ theme }) => ({
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing()
    })
);


const StyledOrderShortDetails = styled(Box)(
    ({ theme }) => ({
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing()
    })
);

const OrderItemBox = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: theme.spacing(),

        transition: '0.2s',
        padding: theme.spacing(),
        "&:hover": {
            backgroundColor: theme.palette.action.hover
        }
    })
);

const StyledOrderFoot = styled(Box)(
    ({ theme }) => ({
        padding: `${theme.spacing(0)} ${theme.spacing(1)}`,
    })
);

const MyOrders = () => {
    const user = useSelector(state => state.authSlice.user);
    const currency = useSelector(state => state.currencySlice.currency);
    const filters = useMemo(() => {
        return [
            writeFilterObject("user_id", "string", "=", user?.id)
        ]
    }, [user])

    const {data: orders, lastDataRecord, loading} = useFetchData(fetchUserOrders, 'all', filters, null, true)

    const navigateToProduct = (id) => {
        navigateProductView(id)
    }

    
    return (
        <StyledMyOrders>
            <Typography variant='h5' letterSpacing={2} mb={2} >
                Orders
            </Typography>
            <StyledOrders container spacing={2}>
                {
                    !loading 
                    ?
                        orders && orders.length > 0
                        ?
                            orders.map((order, key) => {
                                return (
                                        <Grid ref={orders.length === key + 1 ? lastDataRecord : null} key={key} item xxs={12} md={6}>
                                            <Card elevation={1} sx={{padding: theme => theme.spacing()}}>
                                                <StyledOrderHeader>
                                                    <Box>
                                                        <Typography variant='h7' letterSpacing={1.2}>
                                                            {DateHelper.formattedDate(order.created_at)}
                                                        </Typography>
                                                        <Typography variant='h6' letterSpacing={1.5}>
                                                            Total: {order.total_amount}{currency}
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <AdminMainButton 
                                                            type='modal'
                                                            appearance='primary'
                                                            putBorder
                                                            title='Details'
                                                            icon={<InfoIcon />}
                                                            modalIcon={<InfoIcon />}
                                                            willShow={
                                                                <OrderDetailsModal order={order} />
                                                            }
                                                        />
                                                    </Box>
                                                </StyledOrderHeader>
                                                <Divider width="100%" />
                                                <StyledOrderBody>
                                                    <Box>
                                                        <Typography textTransform={'capitalize'} letterSpacing={1.5} color={order.status === "accepted" ? 'success.main' : order.status === "rejected" ?  'error.main' : "warning.main"}>
                                                            {order.status}
                                                        </Typography>
                                                    </Box>
                                                    <StyledOrderShortDetails>
                                                        {
                                                            order.products && order.products.length > 0 
                                                            ?
                                                                order.products.map((product, key) => {
                                                                    const imagePath = `${config.ServerImageRoute}/${productsImagesFolderName}/${product.product_main_image_name}`
                                                                    const handleDownloadProduct = () => {
                                                                        const link = document.createElement('a');
                                                                        link.href = `${config.ServerFilesRoute}/${productsFilesFolderName}/${product.product_file_name}`;
                                                                        link.setAttribute('download', true);
                                                                        document.body.appendChild(link);
                                                                        link.click();
                                                                        document.body.removeChild(link);
                                                                    }
                                                                    return (
                                                                        <OrderItemBox key={key} >
                                                                            <Box display={'flex'} alignItems={'center'} sx={{cursor: 'pointer',}} gap={2} onClick={() => !(product?.deleted_at) && navigateToProduct(product.id)}>
                                                                                <Box width={70} height={70}>
                                                                                    <img src={imagePath} alt={product.product_name} width='100%' height='100%' />
                                                                                </Box>
                                                                                <Typography variant='body1'>
                                                                                    {product.product_name}
                                                                                </Typography>
                                                                            </Box>
                                                                            
                                                                            <Box>
                                                                            {
                                                                                product?.deleted_at
                                                                                &&
                                                                                <Chip label="Deleted" color='error' sx={{mr: 1}} />
                                                                            }
                                                                                <Chip onClick={handleDownloadProduct} label="Download" color='primary' />
                                                                            </Box>

                                                                        </OrderItemBox>
                                                                    )
                                                                })
                                                            :null
                                                        }
                                                        
                                                    </StyledOrderShortDetails>
                                                </StyledOrderBody>
                                                <StyledOrderFoot>
                                                    <Typography color='text.secondary' variant='body2'>
                                                        {order?.products?.length} products purchased
                                                    </Typography>
                                                </StyledOrderFoot>
                                            </Card>
                                        </Grid>
                                )
                            })
                        : <Grid item xxs={12}>
                                <Typography color={'info.main'}>
                                    There are no orders.
                                </Typography>
                            </Grid>
                    :
                    <>
                        <Grid item xxs={12} md={6}>
                            <Skeleton width={'100%'} height={200} />
                        </Grid>
                        <Grid item xxs={12} md={6}>
                            <Skeleton width={'100%'} height={200} />
                        </Grid>
                        <Grid item xxs={12} md={6}>
                            <Skeleton width={'100%'} height={200} />
                        </Grid>
                        <Grid item xxs={12} md={6}>
                            <Skeleton width={'100%'} height={200} />
                        </Grid>
                        <Grid item xxs={12} md={6}>
                            <Skeleton width={'100%'} height={200} />
                        </Grid>
                        <Grid item xxs={12} md={6}>
                            <Skeleton width={'100%'} height={200} />
                        </Grid>

                    </>
                }
                
            </StyledOrders>
        </StyledMyOrders>
    );
};

MyOrders.propTypes = {
    children: propTypes.array
}

export default MyOrders;