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
    Skeleton
} from '@mui/material'
import { styled } from '@mui/system'
import CliserImageLogo from '../../../../../Ecommerce/utils/CliserImageLogo'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { AdminMainButton, ConfirmModal } from '../../../../../../Components'
import DateHelper from '../../../../../../Helpers/DateHelper'
import useEffectFetchData from '../../../../../../Helpers/customHooks/useEffectFetchData'

import {  fetchUserUsersPaymentPlans } from '../../../../../../Services/UserServices/Services/userPaymentPlanUsersService'
import { writeFilterObject } from '../../../../../../Helpers/filterData'
import { getCardImage, getCardType } from '../../../../../../Helpers/getCardType'

//propTypes 
import propTypes from 'prop-types'
import { cancelSubscriptionService, resumeSubscriptionService } from '../../../../../../Services/SubscriptionsServices/SubscriptionServices'

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

    const params = useMemo(() => {
        return [
            null,
            null,
            [
                writeFilterObject("user_id", "string", '=', user.id)
            ]
        ]
    }, [user])

    const {data: userPaymentPlans, download} = useEffectFetchData(fetchUserUsersPaymentPlans, params, true, false)
    

    return (
        !download
        ?
            userPaymentPlans && userPaymentPlans.length > 0
            ?
                userPaymentPlans.map((plan, key) => {
                    return (
                        <UserPaymentPlan key={key} plan={plan} />
                    )
                })
                
            :
            <StyledCurrentPaymentPlan >
                    <Typography color={'info.main'}>
                    You currently do not have an active subscription.
                    </Typography>
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

const UserPaymentPlan = ({plan}) => {
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [activateConfirmOpen, setActivateConfirmOpen] = useState(false)


    const user = useSelector(state => state.authSlice.user)
    const currency = useSelector(state => state.currencySlice.currency);


    const activeCurrentPaymentPlan = user?.active_payment_plan
    const currentSubscription = user?.subscription
    
    const isPlanCurrentActivePlan = useMemo(() => activeCurrentPaymentPlan ? plan?.id === activeCurrentPaymentPlan?.id : false, [activeCurrentPaymentPlan, plan?.id])

    const billingInfo = useMemo(() => {
        return plan?.status === "monthly"
        ?
            `${plan?.payment_plan.payment_plan_monthly_price} ${currency} Monthly`  
        :   `${plan?.payment_plan.payment_plan_yearly_price} ${currency} Yearly`  
    }, [currency, plan])

    console.log(user)

    

    //expand details
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    //ACTIONS ON SUBSCRIPTION
    //cancel subscription
    const cancelSubscription = async () => {
        if(!activeCurrentPaymentPlan && !currentSubscription) {
            return
        }

        //don't cancel subscription if ends_at field is not null
        if(currentSubscription.ends_at) {
            return
        }

        // USER WILL NOT BE ABLE TO SUBSCRIBE TO MORE THAN ONE SUBSCRIPTION AT SAME TIME, FOR THAT I TAKE DIRECTLY THE CURRENT SUBSCRIPTION AND CURRENT PAYMENT PLAN
        const res = await cancelSubscriptionService(plan?.id, currentSubscription?.stripe_id)
        if(res.success) {
            window.location.reload();
        }
    }

    const handleOpenConfirmModal = () => {

        setActivateConfirmOpen(() => true)
    }
    
    const handleActivePlan = async () => {
        if(!activeCurrentPaymentPlan && !currentSubscription) {
            return
        }

        //don't resume subscription if ends_at field is null
        if(!currentSubscription.ends_at) {
            return
        }

        // USER WILL NOT BE ABLE TO SUBSCRIBE TO MORE THAN ONE SUBSCRIPTION AT SAME TIME, FOR THAT I TAKE DIRECTLY THE CURRENT SUBSCRIPTION AND CURRENT PAYMENT PLAN
        const res = await resumeSubscriptionService(plan?.id, currentSubscription?.stripe_id)
        if(res.success) {
            window.location.reload();
        }
    }

    return (
    <StyledCurrentPaymentPlan >
        <StyledCurrentPaymentPlanInfo elevation={1}>
            <CardHeader
                avatar={<CliserImageLogo style={{width: 60, height: 60, cursor: 'default'}} />}
                action={
                    <AdminMainButton
                        icon={ isPlanCurrentActivePlan &&
                            (expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />)
                        }
                        title={
                            activeCurrentPaymentPlan
                                ?
                                isPlanCurrentActivePlan 
                                && "Manage Plan" 
                                :
                                isPlanCurrentActivePlan 
                                ? "Manage Plan" 
                                : "Active Plan"
                        }
                        appearance="primary"
                        type="custom"
                        onClick={isPlanCurrentActivePlan ? handleExpandClick : handleOpenConfirmModal}
                    />
                }
                title={plan.payment_plan.payment_plan_title}
                subheader={
                    <>
                        <Typography variant='body2'>
                            {billingInfo}
                        </Typography>
                        
                        {!isPlanCurrentActivePlan && (
                            <Typography variant='body2' color='error.main'>Plan Is Inactive</Typography>
                        )}
                    </>
                }
            />

            <Collapse in={expanded} timeout="auto" unmountOnExit sx={{
                    padding: theme => `${theme.spacing(0)} ${theme.spacing(4)}`,
                    
                }}>
                <Box>
                    <Typography variant='subtitle1'>
                        Hello {user.first_name},
                    </Typography>
                    <Typography variant='subtitle1'>
                        Thank you to subscribe to <Typography component='span' color='secondary'>{plan.payment_plan.payment_plan_title} Plan</Typography>
                    </Typography>
                </Box>
                <CardContent sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <StyledHeaders>
                        <Typography variant='subtitle1' letterSpacing={1.5} color={!plan && 'error.main'}>
                            {/* TODO: correct the date */}
                            Next payment date: {!plan ? "Plan Is Inactive" : DateHelper.formattedDate(plan.bill_date)} 
                        </Typography>
                        <Typography variant='subtitle1' letterSpacing={1.5} display={'flex'} alignItems={'center'} gap={2}>
                            {/* TODO: correct the date */}
                            Billed using {plan?.bank_card?.card_number}
                                <img 
                                    src={getCardImage(plan?.bank_card?.card_number)} 
                                    label={getCardType(plan?.bank_card?.card_number)}  
                                    width={50}
                                    height={50}
                                />
                        </Typography>
                        
                    </StyledHeaders>
                    <StyledBody>
                        {
                            isPlanCurrentActivePlan
                            &&
                            <>
                                <AdminMainButton
                                    type="custom"
                                    onClick={() => setConfirmOpen(true)}
                                    appearance="primary"
                                    putBorder
                                    title={"Cancel"}
                                />
                            </>
                        }
                        
                        
                    </StyledBody>

                </CardContent>
            </Collapse>
            
        </StyledCurrentPaymentPlanInfo>
        <ConfirmModal
            ConfirmMessage={"Are you sure you want to cancel this plan?"}
            title={"Cancel Plan"}
            confirmModalState={[confirmOpen, setConfirmOpen]}
            handleAgree={cancelSubscription}
        />
        <ConfirmModal
            ConfirmMessage={"Are you sure you want to resume this plan?"}
            title={"Resume Plan"}
            confirmModalState={[activateConfirmOpen, setActivateConfirmOpen]}
            handleAgree={handleActivePlan}
        />
    </StyledCurrentPaymentPlan>)
}

UserPaymentPlan.propTypes = {
    plan: propTypes.object
}