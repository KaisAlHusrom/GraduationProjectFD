//React
import { useEffect, useMemo, useState } from 'react'

import { useSelector } from 'react-redux'

//Components


//MUI
import {
    Box,
    Typography,
    Skeleton,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    Divider,
    Card,
    CardHeader,
    CardContent,
    Stack
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { writeFilterObject } from '../../../../Helpers/filterData'
import useEffectFetchData from '../../../../Helpers/customHooks/useEffectFetchData'
import { fetchUserUsersPaymentPlans } from '../../../../Services/UserServices/Services/userPaymentPlanUsersService'
import { navigateLoginPage } from '../../../../Helpers/navigations'
import PaymentMethodItem from '../PaymentMethodItem/PaymentMethodItem'
import AdminMainButton from '../../../AdminMainButton/AdminMainButton'
import calculateYearlySavings, { calculateYearlySavingsPrice } from '../../../../Helpers/yearlySaving'
import { handleCheckDate } from '../../../../Pages/NewWebSite/Pages/ProfileHomePage/components/UserInfo/Utils/handleCheckData'

//Styled Components
const StyledBuyPaymentPlanModal = styled(Grid)(
    ({ theme }) => ({
        width: "100%",
        padding: theme.spacing()
    })
)

const YourPlan = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        flexDirection: 'column',
        gap: theme.spacing(3)
    })
);

const RadioItem = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(2)
    })
);

const BuyPaymentPlanModal = ({selectedPaymentPlan}) => {
    const user = useSelector(state => state.authSlice.user);
    const currency = useSelector(state => state.currencySlice.currency);
    //navigation to login page if not logged in
    useEffect(() => {
        if(!user) {
            navigateLoginPage()
        }
    }, [user])

    const [planDuration, setPlanDuration] = useState('yearly')
    const handleChangePlanDuration = (e) => {
        setPlanDuration(e.target.value)
    }

    const total = planDuration === "yearly" 
    ? selectedPaymentPlan.payment_plan_yearly_price
    : selectedPaymentPlan.payment_plan_monthly_price

    const [selectedBankCard, setSelectedBankCard] = useState(null)
    const handleChangeBankCard = (e) => {
        setSelectedBankCard(e.target.value)
    }
    
    //fetch user's current payment plan
    const params = useMemo(() => {
        return [
            null,
            null,
            [
                writeFilterObject("user_id", "string", '=', user?.id)
            ]
        ]
    }, [user])
    const {data: userPaymentPlans, download} = useEffectFetchData(fetchUserUsersPaymentPlans, params, true, false)

    

    const currentPaymentPlan = userPaymentPlans && userPaymentPlans[0] && handleCheckDate(userPaymentPlans[0]?.expire_date)

    // check if user has already payment plan
    const isUserSubscribeToPaymentPlan = useMemo(() => {
        return currentPaymentPlan ? true : false
    }, [currentPaymentPlan])


    //check if the user's payment plan is equal to the selected payment plan
    // const isCurrentPaymentPlanEqualToSelectedPaymentPlan = useMemo(() => {
    //     if(currentPaymentPlan) {
    //         return (currentPaymentPlan?.payment_plan?.payment_plan_title  === selectedPaymentPlan?.payment_plan_title) && handleCheckDate(currentPaymentPlan?.expire_date)
    //     }
    //     return false
    // }, [currentPaymentPlan, selectedPaymentPlan?.payment_plan_title])

    const handleSubscribe = () => {

    }
    return (
        <Box>
            {
                !download 
                ?
                    isUserSubscribeToPaymentPlan
                    ?
                        (
                            <Box>
                                <Typography variant='h5' color='error.main'>
                                    You already have a subscription
                                </Typography>
                                <Typography variant='subtitle`' color='text.secondary'>
                                    Cancel your current plan if you want to subscribe to {selectedPaymentPlan.payment_plan_title} Plan
                                </Typography>
                            </Box>
                        )
                    : 
                        (
                            <StyledBuyPaymentPlanModal container spacing={2}>
                                <Grid item xxs={12}>
                                    <Typography variant='h5' letterSpacing={1.5} color='primary' textTransform={'uppercase'} fontWeight={'bold'} width={'100%'} textAlign={'center'}>
                                        {selectedPaymentPlan.payment_plan_title} Plan
                                    </Typography>
                                </Grid>
                                <Grid item xxs={12} md={7}>
                                    <Typography variant='h6' letterSpacing={1.5} >
                                        Confirm Payment Method
                                    </Typography>
                                    <RadioGroup
                                            name="plan-duration"
                                            onChange={handleChangePlanDuration}
                                            value={planDuration}
                                        >
                                    <YourPlan>
                                            <FormControlLabel
                                                value="yearly"
                                                control={<Radio />}
                                                label={
                                                    <RadioItem>
                                                    <Box>
                                                        <Typography variant='h7'>
                                                        {selectedPaymentPlan.payment_plan_title} - paid yearly
                                                        </Typography>
                                                        <Typography variant='body2'>
                                                        {(selectedPaymentPlan.payment_plan_yearly_price / 12).toFixed(2)}{currency} / month
                                                        </Typography>
                                                        <Typography variant='body2' color='primary' textTransform='uppercase'>
                                                        12 months for the price of {selectedPaymentPlan.payment_plan_yearly_price}
                                                        </Typography>
                                                    </Box>
                                                    </RadioItem>
                                                }
                                            />
                                            <FormControlLabel
                                                value="monthly"
                                                control={<Radio />}
                                                label={
                                                    <RadioItem>
                                                    <Box>
                                                        <Typography variant='h7'>
                                                        {selectedPaymentPlan.payment_plan_title} - paid monthly
                                                        </Typography>
                                                        <Typography variant='body2'>
                                                        {selectedPaymentPlan.payment_plan_monthly_price}{currency} / month
                                                        </Typography>
                                                    </Box>
                                                    </RadioItem>
                                                }
                                            />
                                    </YourPlan>
                                    </RadioGroup>

                                </Grid>
                                <Grid item xxs={12} md={5}>
                                    <Card elevation={3}>
                                        <CardHeader 
                                            title="Order Summary"
                                        />
                                        <CardContent>
                                            <Stack gap={2}>
                                                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                                    <Typography variant='body1' color='text.secondary'>
                                                        1 user
                                                    </Typography>
                                                    <Typography variant='body1' color='text.secondary'>
                                                        {total}{currency} per {planDuration === 'yearly' ? "year" : "month"}
                                                    </Typography>
                                                </Stack>
                                                {
                                                    planDuration === 'yearly'
                                                    &&
                                                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                                        <Typography variant='body1' color='text.secondary'>
                                                            Yearly Saving ({calculateYearlySavings(selectedPaymentPlan.payment_plan_yearly_price, selectedPaymentPlan.payment_plan_monthly_price)}%)
                                                        </Typography>
                                                        <Typography variant='body1' color='text.secondary'>
                                                            -{calculateYearlySavingsPrice(selectedPaymentPlan.payment_plan_yearly_price, selectedPaymentPlan.payment_plan_monthly_price)}{currency}
                                                        </Typography>
                                                    </Stack>
                                                }
                                                <Divider />
                                                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                                    <Typography variant='body1' color='text.secondary'>
                                                        Total
                                                    </Typography>
                                                    <Typography variant='body1' color='text.secondary'>
                                                        {total}{currency}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xxs={12} md={7} mt={2} mb={2}>
                                    <Divider />
                                </Grid>
                                {
                                    selectedPaymentPlan.payment_plan_title !== "Free"
                                    &&
                                    (
                                        <>
                                            <Grid item xxs={12}>
                                                <PaymentMethodItem 
                                                    bankCardState={[selectedBankCard, setSelectedBankCard]}
                                                    handleChangeBankCard={handleChangeBankCard}
                                                />

                                            </Grid>
                                            <Grid item xxs={12} mt={2} mb={2}>
                                                <Divider />
                                            </Grid>
                                        </>
                                    )
                                }
                                
                                <Grid item xxs={12}>
                                    <AdminMainButton
                                    type='custom'
                                    appearance='primary'
                                    filled
                                    putBorder
                                    onClick={handleSubscribe}
                                    title='Subscribe Now'
                                    />

                                </Grid>
                            </StyledBuyPaymentPlanModal>
                        )
                :
                (
                    <>
                        <Skeleton height={100} />
                        <Skeleton height={100} />
                        <Skeleton height={100} />
                    </>
                )
            }
        </Box>
    );
};

BuyPaymentPlanModal.propTypes = {
    selectedPaymentPlan: propTypes.object
}

export default BuyPaymentPlanModal;