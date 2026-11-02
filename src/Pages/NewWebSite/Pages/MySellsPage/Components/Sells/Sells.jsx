//React
import config from "../../../../../../../Config.json"


import { useSelector } from 'react-redux'

//Components


//MUI
import {
    Box,
    Typography,
    Grid,
    Card,
    Divider,
    Skeleton,
    Chip,
    Avatar
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import useFetchData from '../../../../../../Helpers/customHooks/useFetchData'
import { navigatePortfolio, navigateProductView } from '../../../../../../Helpers/navigations'
import { fetchUserComingOrders } from '../../../../../../Services/UserServices/Services/ordersUsersService'
import DateHelper from '../../../../../../Helpers/DateHelper'


//icons
import InfoIcon from '@mui/icons-material/Info';
import OrderDetailsModal from '../../../MyOrdersAndBilling/Components/MyOrders/Subcomponents/OrderDetailsModal'
import { AdminMainButton } from '../../../../../../Components'
import { productsImagesFolderName } from "../../../../../../Services/AdminServices/Services/productsService"
import { usersProfileImagesFolderName } from "../../../../../../Services/AdminServices/Services/usersService"

//Styled Components
const StyledSells = styled(Box)(
    ({ theme }) => ({
        padding: `${theme.spacing()} ${theme.spacing(2)}`,
        width: "100%"
    })
)

const StyledSellsGrid = styled(Grid)(
    () => ({
        // Your styles here
    })
);

const StyledSellsHeader = styled(Box)(
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
        cursor: 'pointer',
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

const Sells = () => {
    const currency = useSelector(state => state.currencySlice.currency);


    const {data: sells, lastDataRecord, loading} = useFetchData(fetchUserComingOrders, 'all', null, null, true)

    const navigateToProduct = (id) => {
        navigateProductView(id)
    }

   

    return (
        <StyledSells>
            <Typography variant='h5' letterSpacing={2} mb={2} >
                My Sales
            </Typography>
            <StyledSellsGrid
                container
                spacing={2}
            >
                {
                    !loading 
                    ?
                        sells && sells.length > 0
                        ?
                            sells.map((sell, key) => {
                                const userProfileImage = `${config.ServerImageRoute}/${usersProfileImagesFolderName}/${sell.user.profile_image}`;
                                return (
                                        <Grid ref={sells.length === key + 1 ? lastDataRecord : null} key={key} item xxs={12} md={6}>
                                            <Card elevation={1} sx={{padding: theme => theme.spacing()}}>
                                                <StyledSellsHeader>
                                                    <Box>
                                                        <Typography variant='h7' letterSpacing={1.2}>
                                                            {DateHelper.formattedDate(sell.created_at)}
                                                        </Typography>
                                                        <Typography variant='h6' letterSpacing={1.5}>
                                                            Total: {sell.total_amount}{currency}
                                                        </Typography>
                                                        <Typography 
                                                        variant="body2" 
                                                        color="text.primary" 
                                                        sx={
                                                            {
                                                                cursor: 'pointer', 
                                                                display: 'flex', 
                                                                alignItems: 'center', 
                                                                gap: 2, 
                                                                padding: theme => theme.spacing(),
                                                                transition: '0.2s',
                                                                borderRadius: 8,
                                                                
                                                                "&:hover": {
                                                                    backgroundColor: theme => theme.palette.action.hover
                                                                }
                                                            }
                                                        }
                                                        onClick={() => navigatePortfolio(sell.user.id)}
                                                        >
                                                            <Avatar 
                                                            src={userProfileImage} 
                                                            sx={{ width: 32, height: 32,  }} /> 
                                                            {sell.user.first_name + " " + sell.user.last_name
                                                            }
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
                                                                <OrderDetailsModal order={sell} />
                                                            }
                                                        />
                                                    </Box>
                                                </StyledSellsHeader>
                                                <Divider width="100%" />
                                                <StyledOrderBody>
                                                    <Box>
                                                        <Typography textTransform={'capitalize'} letterSpacing={1.5} color={sell.status === "accepted" ? 'success.main' : sell.status === "rejected" ?  'error.main' : "warning.main"}>
                                                            {sell.status}
                                                        </Typography>
                                                    </Box>
                                                    <StyledOrderShortDetails>
                                                        {
                                                            sell.products && sell.products.length > 0 
                                                            ?
                                                                sell.products.map((product, key) => {
                                                                    const imagePath = `${config.ServerImageRoute}/${productsImagesFolderName}/${product.product_main_image_name}`
                                                                    return (
                                                                        <OrderItemBox key={key} onClick={() => !(product?.deleted_at) && navigateToProduct(product.id)}>
                                                                            <Box display={'flex'} alignItems={'center'} gap={2}>
                                                                                <Box width={70} height={70}>
                                                                                    <img src={imagePath} alt={product.product_name} width='100%' height='100%' />
                                                                                </Box>
                                                                                <Typography variant='body1'>
                                                                                    {product.product_name}
                                                                                </Typography>
                                                                            </Box>
                                                                            
                                                                            {
                                                                                product?.deleted_at
                                                                                &&
                                                                                <Chip label="Deleted" color='error' />
                                                                            }

                                                                        </OrderItemBox>
                                                                    )
                                                                })
                                                            :null
                                                        }
                                                        
                                                    </StyledOrderShortDetails>
                                                </StyledOrderBody>
                                                <StyledOrderFoot>
                                                    <Typography color='text.secondary' variant='body2'>
                                                        {sell?.products?.length} products purchased
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
            </StyledSellsGrid>
        </StyledSells>
    );
};

Sells.propTypes = {
    children: propTypes.array
}

export default Sells;