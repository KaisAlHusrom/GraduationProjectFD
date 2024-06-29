import {useState, useEffect, useMemo} from "react"


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import useEffectFetchData from "../../Helpers/customHooks/useEffectFetchData";
import { fetchUserPaymentPlans } from "../../Services/UserServices/Services/paymentPlansUsersService";
import { useSelector } from "react-redux";
import HandshakeIcon from '@mui/icons-material/Handshake';
import { handleCheckDate } from "../../Pages/NewWebSite/Pages/ProfileHomePage/components/UserInfo/Utils/handleCheckData";

//propTypes 
import propTypes from 'prop-types'
import { styled } from '@mui/system'
import useInView from "../../Helpers/customHooks/useInView";
import AdminMainButton from "../AdminMainButton/AdminMainButton";
import BuyPaymentPlanModal from "./Subcomponents/BuyPaymentPlanModal/BuyPaymentPlanModal";


const CurrentPlanHeaderBox = styled(Box)(
    ({ theme }) => ({
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: "8px 8px 0 0",
        padding: theme.spacing()
    })
);

export default function PaymentPlansComponent({paymentPlanPage}) {
    const user = useSelector(state => state.authSlice.user)

    // const { ref, inView: isInView } = useInView();


    const params = useMemo(() => {
        return [
            null,
            null,
            null,
            null,
            null,
            null,
        ]
    }, [])
    const {data, download} = useEffectFetchData(fetchUserPaymentPlans, params, true, false) 
    const [paymentPlans, setPaymentPlans] = useState(null)
    useEffect(() => {
        if (data) {
            setPaymentPlans(() => {
                return data.filter(plan => plan.is_active);
            });
        }
    }, [data]);

    return (
        <Container
            id="pricing"
            sx={{
                pt: 4,
                pb: { xs: 8, sm: 16 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 3, sm: 6 },
                // opacity: isInView ? 1 : 0,
            }}
            // className={isInView ? 'slide-up-animation' : ''}
            // ref={ref}
        >
            <Box
                sx={{
                width: { sm: '100%', md: '60%' },
                textAlign: { sm: 'left', md: 'center' },
                }}
            >
                <Typography component="h2" variant="h4" color="text.primary" letterSpacing={2}>
                    Plans
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Cliser Web Projects Services Subscribe Plans
                </Typography>
            </Box>
            <Grid container spacing={3} alignItems="center" justifyContent="center">
                {
                    !download 
                    ?
                        paymentPlans && paymentPlans?.length > 0 &&
                        paymentPlans?.map((paymentPlan, key) => {
                            const currentPlan = ((user && user?.payment_plans) && (user?.payment_plans[0]?.payment_plan_title  === paymentPlan.payment_plan_title) && handleCheckDate(user?.payment_plans[0]?.pivot?.expire_date))

                            return (
                                (
                                    <Grid
                                        item
                                        key={key}
                                        xxs={12}
                                        sm={paymentPlan.payment_plan_title === 'Enterprise' ? 12 : 6}
                                        md={4}
                                    >
                                        {currentPlan && (
                                                <CurrentPlanHeaderBox>
                                                    Current Plan
                                                </CurrentPlanHeaderBox>
                                            )
                                        }
                                        <Card
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 4,
                                            border: paymentPlan.payment_plan_title === "Individual" || currentPlan ? '1px solid' : undefined,
                                            borderColor:
                                            paymentPlan.payment_plan_title === 'Individual' || currentPlan ? 'primary.main' : undefined,
                                            background:
                                            paymentPlan.payment_plan_title === 'Individual' || currentPlan
                                                ? 'linear-gradient(#033363, #021F3B)'
                                                : undefined,
                                        }}
                                        >
                                        <CardContent>
                                            <Box
                                            sx={{
                                                mb: 1,
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                color: paymentPlan.payment_plan_title === 'Individual' || currentPlan ? 'grey.100' : '',
                                            }}
                                            >
                                            <Typography component="h3" variant="h6">
                                                {paymentPlan.payment_plan_title}
                                            </Typography>
                                            {paymentPlan.payment_plan_title === 'Individual' && (
                                                <Chip
                                                icon={<AutoAwesomeIcon />}
                                                label={"Recommended"}
                                                size="small"
                                                sx={{
                                                    background: (theme) =>
                                                    theme.palette.mode === 'light' ? '' : 'none',
                                                    backgroundColor: 'primary.contrastText',
                                                    '& .MuiChip-label': {
                                                    color: 'primary.dark',
                                                    },
                                                    '& .MuiChip-icon': {
                                                    color: 'primary.dark',
                                                    },
                                                }}
                                                />
                                            )}
                                            {paymentPlan.payment_plan_title === 'Free' && (
                                                <Chip
                                                icon={<HandshakeIcon />}
                                                label={"Default"}
                                                size="small"
                                                sx={{
                                                    background: (theme) =>
                                                    theme.palette.mode === 'light' ? '' : 'none',
                                                    backgroundColor: 'secondary.main',
                                                    '& .MuiChip-label': {
                                                    color: 'secondary.contrastText',
                                                    },
                                                    '& .MuiChip-icon': {
                                                    color: 'secondary.contrastText',
                                                    },
                                                }}
                                                />
                                            )}
                                            
                                            </Box>
                                            <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'baseline',
                                                color: paymentPlan.payment_plan_title  === 'Individual' || currentPlan ? 'grey.50' : undefined,
                                            }}
                                            >
                                            <Typography component="h3" variant="h2">
                                                ${paymentPlan.payment_plan_monthly_price}
                                            </Typography>
                                            <Typography component="h3" variant="h6">
                                                &nbsp; per month
                                            </Typography>
                                            </Box>
                                            <Divider
                                            sx={{
                                                my: 2,
                                                opacity: 0.2,
                                                borderColor: 'grey.500',
                                            }}
                                            />
                                            {paymentPlan?.features?.map((feature,key) => (
                                            <Box
                                                key={key}
                                                sx={{
                                                py: 1,
                                                display: 'flex',
                                                gap: 1.5,
                                                alignItems: 'center',
                                                }}
                                            >
                                                <CheckCircleRoundedIcon
                                                sx={{
                                                    width: 20,
                                                    color:
                                                    paymentPlan.payment_plan_title  === 'Individual' || currentPlan
                                                        ? 'primary.light'
                                                        : 'primary.main',
                                                }}
                                                />
                                                <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    color:
                                                    paymentPlan.payment_plan_title  === 'Individual' || currentPlan ? 'grey.200' : undefined,
                                                }}
                                                >
                                                {feature?.payment_plan_feature_name}
                                                </Typography>
                                            </Box>
                                            ))}
                                        </CardContent>
                                        <CardActions>
                                            <AdminMainButton
                                            type="modal"
                                            modalProps={{
                                                backdropClick: true,
                                                withoutModalHeader: true,
                                                cardSx: {
                                                    width: "70%"
                                                },
                                            }}
                                            appearance="primary"
                                            disabled={currentPlan}
                                            sx={{
                                                // opacity: currentPlan && "0.5",
                                                color: (paymentPlan.payment_plan_title  === 'Individual' || currentPlan) ? (theme => theme.palette.primary.contrastText) : (theme => theme.palette.text.primary),
                                                backgroundColor: (paymentPlan.payment_plan_title  === 'Individual' || currentPlan) && (theme => theme.palette.primary.main),
                                                width: '100%'
                                            }}
                                            filled={currentPlan}
                                            putBorder
                                            title={currentPlan ? "Current Plan" : "Buy Now"}
                                            willShow={
                                                <BuyPaymentPlanModal 
                                                selectedPaymentPlan={paymentPlan}
                                                />
                                            }
                                            />
                                        </CardActions>
                                        </Card>
                                    </Grid>
                                    )
                            )
                        })
                    :
                        <>
                        <Grid
                            item
                            xxs={4}
                        >
                            <Skeleton width={"100%"} height={600} animation="wave" />
                        </Grid>
                        <Grid
                            item
                            xxs={4}
                        >
                            <Skeleton width={"100%"} height={600} animation="wave" />
                        </Grid>
                        <Grid
                            item
                            xxs={4}
                        >
                            <Skeleton width={"100%"} height={600} animation="wave" />
                        </Grid>
                        </>
                }
            </Grid>
        </Container>
    );
}

PaymentPlansComponent.propTypes = {
    paymentPlanPage: propTypes.bool
}