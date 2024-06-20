//React
import {  useMemo, useState } from 'react'

import { useSelector } from 'react-redux'

//Components


//MUI
import {
    Box,
    Card,
    Typography,
    CardHeader,
    Collapse,
    CardContent,
    Button,
    Skeleton
} from '@mui/material'
import { styled } from '@mui/system'
import CliserImageLogo from '../../../../../Ecommerce/utils/CliserImageLogo'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { AdminMainButton } from '../../../../../../Components'
import DateHelper from '../../../../../../Helpers/DateHelper'
import useEffectFetchData from '../../../../../../Helpers/customHooks/useEffectFetchData'

import { fetchSpecificUserUsersPaymentPlans, fetchUserUsersPaymentPlans } from '../../../../../../Services/UserServices/Services/userPaymentPlanUsersService'
import { writeFilterObject } from '../../../../../../Helpers/filterData'
//Styled Components
const StyledCurrentPaymentPlan = styled(Box)(
    ({ theme }) => ({
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(),
    })
)

const StyledCurrentPaymentPlanInfo = styled(Card)(
    ({ theme }) => ({
        // padding: `${theme.spacing()} ${theme.spacing()}`,
        // borderRadius: theme.spacing(),
        // display: 'flex',
        // justifyContent: 'space-between',
        // alignItems: 'center'
        [theme.breakpoints.up('md')]: {
            width: '80%',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    })
);

const StyledHeaders = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing()
    })
);

const StyledBody = styled(Box)(
    ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing()
    })
);

const CurrentPaymentPlan = () => {
    const user = useSelector(state => state.authSlice.user)
    const currency = useSelector(state => state.currencySlice.currency);

    //TODOLfetch payment plan here from database
    const params = useMemo(() => {
        return [
            null,
            null,
            [
                writeFilterObject("user_id", "string", '=', user.id)
            ]
        ]
    }, [user])

    const {data: userPaymentPlans} = useEffectFetchData(fetchUserUsersPaymentPlans, params, true, false)
    const currentPaymentPlan = userPaymentPlans && userPaymentPlans[0]

    const billingInfo = useMemo(() => {
        return currentPaymentPlan?.status === "monthly"
        ?
            `${currentPaymentPlan?.payment_plan.payment_plan_monthly_price} ${currency} Monthly`  
        :   `${currentPaymentPlan?.payment_plan.payment_plan_yearly_price} ${currency} Yearly`  
    }, [currency, currentPaymentPlan])

    //expand details
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    console.log(userPaymentPlans)
    return (
        currentPaymentPlan
        ?
            <StyledCurrentPaymentPlan>
                <StyledCurrentPaymentPlanInfo elevation={1}>
                    <CardHeader 
                        // sx={{
                        //     display: 'flex',
                        //     alignItems: 'center',
                        // }}
                        avatar={<CliserImageLogo style={{width: 60, height: 60, cursor: undefined}} />}
                        action={
                            <AdminMainButton
                                icon={expanded ? <KeyboardArrowUpIcon /> :<KeyboardArrowDownIcon  />}
                                title="Manage Plan"
                                appearance="primary"
                                type="custom"
                                onClick={handleExpandClick}
                            />
                        }
                        title={currentPaymentPlan.payment_plan.payment_plan_title}
                        subheader={billingInfo}
                    />
                    <Collapse in={expanded} timeout="auto" unmountOnExit sx={{
                            padding: theme => `${theme.spacing(0)} ${theme.spacing(4)}`,
                            
                        }}>
                        <Box>
                            <Typography variant='subtitle1'>
                                Hello {user.first_name},
                            </Typography>
                            <Typography variant='subtitle1'>
                                Thank you to subscribe to <Typography component='span' color='secondary'>{currentPaymentPlan.payment_plan.payment_plan_title} Plan</Typography>
                            </Typography>
                        </Box>
                        <CardContent sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <StyledHeaders>
                                <Typography variant='subtitle1' letterSpacing={1.5}>
                                    {/* TODO: correct the date */}
                                    Next payment date: {DateHelper.formattedDate(currentPaymentPlan.bill_date)} 
                                </Typography>
                                <Typography variant='subtitle1' letterSpacing={1.5}>
                                    {/* TODO: correct the date */}
                                    Billed using {currentPaymentPlan.bank_card.card_number}
                                </Typography>
                            </StyledHeaders>
                            <StyledBody>
                                <Button>
                                    Cancel
                                </Button>
                                <Button>
                                    Edit
                                </Button>
                            </StyledBody>

                        </CardContent>
                    </Collapse>
                    
                </StyledCurrentPaymentPlanInfo>
            </StyledCurrentPaymentPlan>
        :
        <StyledCurrentPaymentPlan>
            <StyledCurrentPaymentPlanInfo>
                <Skeleton width={'100%'} height={100} />
            </StyledCurrentPaymentPlanInfo>

        </StyledCurrentPaymentPlan>
    );
};

export default CurrentPaymentPlan;