//React
import { useMemo, useState } from 'react'

import { useSelector } from 'react-redux'

//Components


//MUI
import {
    Box,
    Typography,
    Card,
    CardHeader,
    CardContent,
    Collapse,
    Stack,
    Chip,
    CardActions,
    IconButton,
    Skeleton,
    Grid
} from '@mui/material'
import { styled } from '@mui/system'
import { writeFilterObject } from '../../../../../../Helpers/filterData'
import useFetchData from '../../../../../../Helpers/customHooks/useFetchData'
import { getCardImage, getCardType } from '../../../../../../Helpers/getCardType'
import DateHelper from '../../../../../../Helpers/DateHelper'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchUserUsersPayments } from '../../../../../../Services/UserServices/Services/userPaymentsUsersService'

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledMyBills = styled(Box)(
    ({ theme }) => ({
        padding: `${theme.spacing()} ${theme.spacing(2)}`,
        width: "100%"
    })
)

const StyledBills = styled(Grid)(
    ({ theme }) => ({
        padding: theme.spacing(),

    })
);

const BillCard = styled(Card)(
    ({ theme }) => ({
        padding: theme.spacing(),
        height: '100%'
    })
);

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
}));

const MyBills = () => {
    const user = useSelector(state => state.authSlice.user);

    const filters = useMemo(() => {
        return [
            writeFilterObject("user_id", "string", "=", user?.id)
        ]
    }, [user])

    
    const {data: payments, lastDataRecord, loading} = useFetchData(fetchUserUsersPayments, 'all', filters, null, true)
    return (
        <StyledMyBills>
            <Typography variant='h5' letterSpacing={2} mb={2} >
                Billing Information
            </Typography>
            <StyledBills container spacing={2}>
                {
                    !loading
                    ?
                        payments && payments.length > 0
                        ?
                            payments.map((bill, key) => {
                                return (
                                    <Grid item xxs={12} md={6} ref={payments.length === key + 1 ? lastDataRecord : null} key={key} >
                                        <BillCardComponent bill={bill} />
                                    </Grid>
                                )
                            })
                        :   
                                <Typography color={'info.main'}>
                                    There are no billing info.
                                </Typography>
                            
                    :
                    <>
                        <Grid item xxs={12} md={6}  elevation={2}>
                            <Skeleton width={'100%'} height={200} />
                        </Grid>
                        <Grid item xxs={12} md={6}  elevation={2}>
                            <Skeleton width={'100%'} height={200} />
                        </Grid>
                        <Grid item xxs={12} md={6}  elevation={2}>
                            <Skeleton width={'100%'} height={200} />
                        </Grid>
                        <Grid item xxs={12} md={6}  elevation={2}>
                            <Skeleton width={'100%'} height={200} />
                        </Grid>
                    </>
                }
                
            </StyledBills>
        </StyledMyBills>
    );
};

export default MyBills;


const BillCardComponent = ({bill}) => {
    const currency = useSelector(state => state.currencySlice.currency);

    //expand details
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return (
        <BillCard  elevation={2}>
            <CardHeader 
                // sx={{
                //     display: 'flex',
                //     alignItems: 'center',
                // }}
                avatar={
                        <img 
                        src={getCardImage(bill.bank_card?.card_number)} 
                        label={getCardType(bill.bank_card?.card_number)}  
                        width={50}
                        height={50}
                        />
                }
                title={DateHelper.formattedDate(bill.created_at)}
                subheader={"Amount: " + bill.amount + ' ' + currency}
            />
            <CardContent sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                {
                    bill.order
                    ?
                        <>
                            <Typography 
                                variant="subtitle2" 
                            >
                                Order No: {bill.order.id}
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                <Chip label={bill.status} color= {bill.status === "accepted" ? "success" : "error"} />
                                {/* <Chip label="success" color="success" /> */}
                            </Stack>
                        </>
                    : 
                    bill.user_payment_plan
                    ?
                        <>
                            <Typography 
                                variant="subtitle2" 
                            >
                                {bill.user_payment_plan.payment_plan.payment_plan_title} Plan
                            </Typography>
                            
                            
                            <Stack direction="row" spacing={1}>
                                <Chip label={bill.status} color= {bill.status === "accepted" ? "success" : "error"} />
                                {/* <Chip label="success" color="success" /> */}
                            </Stack>
                        </>
                    :null
                }
            </CardContent>
            {
                bill.user_payment_plan &&
                <>
                    <CardActions disableSpacing>
                        
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                        <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit sx={{
                                padding: theme => `${theme.spacing(0)} ${theme.spacing(4)}`,
                                
                    }}>
                        <CardContent>
                            <Typography 
                            variant="subtitle2" 
                            >
                                Subscription Date
                            </Typography>
                            <Typography 
                            variant="body1"
                            color="text.secondary" 
                            >
                                {DateHelper.formattedDate(bill.user_payment_plan.payment_plan.created_at)}
                            </Typography>
                            <Typography 
                            variant="subtitle2" 
                            >
                                Plan Details
                            </Typography>
                            <Typography 
                                variant="body1"
                                color="text.secondary" 
                            >
                                {bill.user_payment_plan.payment_plan.payment_plan_monthly_price} Monthly
                            </Typography>
                            <Typography 
                                variant="body1"
                                color="text.secondary" 
                            >
                                {bill.user_payment_plan.payment_plan.payment_plan_yearly_price} Yearly
                            </Typography>
                        </CardContent>
                    </Collapse>
                
                </>
            }
        </BillCard>
    )
}

BillCardComponent.propTypes = {
    bill: propTypes.object
}
