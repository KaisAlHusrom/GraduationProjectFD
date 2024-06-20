//React
import { useEffect, useMemo, useState } from 'react'

import { useSelector } from 'react-redux'

//Components


//MUI
import {
    Card,
    Modal,
    Fade,
    Backdrop,
    Box,
    Typography,
    Divider
} from '@mui/material'
import { styled } from '@mui/system'
import { daysUntil, handleCheckDate } from '../../Pages/ProfileHomePage/components/UserInfo/Utils/handleCheckData';
import PaymentPlansComponent from '../../../../Components/PaymentPlansComponent/PaymentPlansComponent';

//Styled Components

const StyledModal = styled(Card)(
    ({ theme }) => ({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "80%",
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        height: "90vh",
        overflow: 'auto',
        borderRadius: theme.spacing(2),
    })
);

const StyledHeaderBox = styled(Box)(
    ({ theme }) => ({
        width: "100%",
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
        alignItems: "center",
    })
);


const CheckPaymentPlanModel = () => {
    //modal states
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const user = useSelector(state => state.authSlice.user)

    //payment plan
    const [paymentPlan, setPaymentPlan] = useState(null)
    useEffect(() => {
        if (user && user?.payment_plans && user?.payment_plans?.length > 0) {
            setPaymentPlan(user.payment_plans[0]);
        }
    }, [user, setPaymentPlan]);

    // plan expire date
    const expiryDatePaymentPlan = useMemo(() => {
        if(paymentPlan) {
            return new Date(paymentPlan?.pivot?.expire_date)
        }
        return null
    }, [paymentPlan])

    //free trial
    const expiryDateFreeTrial = useMemo(() => {
        if (user) {
            const date = new Date(user.free_trial_expiration_date)
            return date;
        }
        return null;
    }, [user])



    
    //open the modal when there is no a payment plan, or on free plan
    useEffect(() => {
        const timer = setTimeout(() => {
            if(paymentPlan) {
                if(paymentPlan?.payment_plan_title !== "Free") {
                    if(!handleCheckDate(expiryDatePaymentPlan)) {
                        handleOpen()
                    }
                    return;
                } 
                handleOpen()
            } else {
                
                handleOpen()
            }
        }, 1000);
    
        return () => clearTimeout(timer);
    }, [expiryDateFreeTrial, expiryDatePaymentPlan, paymentPlan]);
    


    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
            backdrop: {
                timeout: 500,
            },
            }}
        >
            <Fade in={open}>
                <StyledModal elevation={2}>
                    <StyledHeaderBox>
                                            
                    {
                        handleCheckDate(expiryDateFreeTrial) 
                        ? (
                            // When free trial not finished
                            <>
                                <Typography variant='h4' letterSpacing={2} color='warning.main'>
                                    {`Your free trial ends in ${daysUntil(expiryDateFreeTrial)} days.`}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    letterSpacing={1}
                                    width='90%'
                                    textAlign='center'
                                >
                                    Once your complimentary trial concludes, you'll be automatically switched to the default Free Plan, which provides limited access to Cliser Web Projects Services.
                                </Typography>
                                <Divider sx={{ width: '100%' }} />
                                <PaymentPlansComponent />
                            </>
                        ) : paymentPlan ? (
                                handleCheckDate(expiryDatePaymentPlan) ? (
                                    // When free trial finished and there is a free plan
                                    <>
                                        <Typography variant='h4' letterSpacing={2} color='warning.main'>
                                            You are currently on the Free Plan!
                                        </Typography>
                                        <Typography
                                            variant='body2'
                                            color='text.secondary'
                                            letterSpacing={1}
                                            width='90%'
                                            textAlign='center'
                                        >
                                            To unlock all services offered by Cliser Web Projects, simply purchase one of the plans listed below.
                                        </Typography>
                                        <Divider sx={{ width: '100%' }} />
                                        <PaymentPlansComponent />
                                    </>
                                ) : (
                                    // When free trial finished and current plan has ended
                                    <>
                                        <Typography variant='h4' letterSpacing={2} color='warning.main'>
                                            Your current plan has ended.
                                        </Typography>
                                        <Typography
                                            variant='body2'
                                            color='text.secondary'
                                            letterSpacing={1}
                                            width='90%'
                                            textAlign='center'
                                        >
                                            To unlock all services offered by Cliser Web Projects Services, simply purchase one of the plans listed below, or use the Free Plan to access some of the services.
                                        </Typography>
                                        <Divider sx={{ width: '100%' }} />
                                        <PaymentPlansComponent />
                                    </>
                                )
                            ) : (
                                // When not subscribed to any plan
                                <>
                                    <Typography variant='h4' letterSpacing={2} color='warning.main'>
                                    You currently do not have an active subscription.                                    
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                        letterSpacing={1}
                                        width='90%'
                                        textAlign='center'
                                    >
                                        To unlock all services offered by Cliser Web Projects Services, simply purchase one of the plans listed below, or use the Free Plan to access some of the services.
                                    </Typography>
                                    <Divider sx={{ width: '100%' }} />
                                    <PaymentPlansComponent />
                                </>
                        )
                    }

                        
                    </StyledHeaderBox>
                </StyledModal>
            </Fade>
        </Modal>
    );
};

export default CheckPaymentPlanModel;