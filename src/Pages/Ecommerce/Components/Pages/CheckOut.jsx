//React
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'

//Components
import Info from "../UI/CheckOut/Info"
import InfoMobile from "../UI/CheckOut/InfoMobile"
import PaymentForm from '../UI/CheckOut/PaymentForm';
import Review from '../UI/CheckOut/Review';

//MUI
import {
    Box,Button,Card,CardContent,Grid,Stack,Step,StepLabel,Stepper,Typography
} from '@mui/material'
import { styled } from '@mui/system'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';


//propTypes 
import propTypes from 'prop-types'
import CliserImageLogo from '../../utils/CliserImageLogo';
import { navigateProfileOrdersBilling, navigateStoreMainPage } from '../../../../Helpers/navigations'
import { useCart } from '../../utils/CartContext'
import { handleCheckoutPage } from '../../../../Services/CheckoutServices/checkoutProducts'




//Styled Components
const StyledCheckOut = styled(Box)(
    () => ({
    
    })
)
const steps = [ 'Payment details', 'Review your order'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <PaymentForm />;
        case 1:
            return <Review />;
        default:
        throw new Error('Unknown step');
    }
}



const CheckOut = () => {
    const [activeStep, setActiveStep] = useState(0);
    const user = useSelector(state => state.authSlice.user);

    const {cartItems} = useCart()


    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };
    
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const handleBackToMain =() => {
        navigateStoreMainPage()
    }
    const handleToOrders =() => {
        navigateProfileOrdersBilling()
    }

    const handleCheckOut = async () => {
        const data = {
            order_items: cartItems
        }

        const checkoutRes = await handleCheckoutPage(data)
        if(checkoutRes.success) {
            window.location = checkoutRes.data.url;
        } else {
            console.error("Couldn't checkout");
        }
    }

    return (
        <StyledCheckOut>
            <Grid container sx={{ height: { xxs:'100%',xs: '100%', sm:'100dvh' } }}>
                <Grid
                item
                xxs={12}
                xs={12}
                sm={5}
                lg={4}
                sx={{
                    display: { xxs: 'none',xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    backgroundColor: 'background.paper',
                    borderRight: { sm: 'none', md: '2px solid' },
                    borderColor: { sm: 'none', md: 'divider' },
                    alignItems: 'start',
                    pt: 4,
                    px: 10,
                    gap: 4,
                }}
                >
                    <Box
                        sx={{
                        display: 'flex',
                        alignItems: 'end',
                        height: 150,
                        }}
                    >
                        <Button
                        startIcon={<ArrowBackRoundedIcon />}
                        component="a"
                        onClick={handleBackToMain}
                        sx={{ ml: '-8px' }}
                        >
                        Back to
                        <CliserImageLogo HandleMainButton={handleBackToMain}/>
                        </Button>
                    </Box>
                    <Box
                        sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        width: '100%',
                        maxWidth: 500,
                        }}
                    >
                        <Info />
                    </Box>
                </Grid>
                <Grid
                item
                xxs={12}
                xs={12}
                sm={12}
                md={7}
                lg={8}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '100%',
                    width: '100%',
                    backgroundColor: { xs: 'transparent', sm: 'background.default' },
                    alignItems: 'start',
                    marginTop:1,
                    pt: { xxs: 2, sm: 4 },
                    px: { xxs: 2, sm: 10 },
                    gap: { xxs: 4, md: 8 },
                }}
                >
                    <Box
                    sx={{
                    display: 'flex',
                    justifyContent: { sm: 'space-between', md: 'flex-end' },
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: { sm: '100%', md: 600 },
                    }}
                    >
                        <Box
                        sx={{
                            display: {xxs:"flex", xs: 'flex', md: 'none',xxl:"100%",xl:"100%" },
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                        }}
                        >
                        
                        </Box>
                        <Box
                        sx={{
                            display: { xxs: 'none', md: 'flex' },
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            flexGrow: 1,
                            height: 60,
                        }}
                        >
                            <Stepper
                                id="desktop-stepper"
                                activeStep={activeStep}
                                sx={{
                                width: '100%',
                                height: 40,
                                }}
                            >
                                {steps.map((label) => (
                                <Step
                                    sx={{
                                    '&:first-of-type': { pl: 0 },
                                    '&:last-child': { pr: 0 },
                                    }}
                                    key={label}
                                >
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                                ))}
                            </Stepper>
                        </Box>
                    </Box>
                    <Card
                        sx={{
                        display: { xxs: 'flex', md: 'none' },
                        width: '100%',
                        }}
                    >
                        <CardContent
                        sx={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            '&:last-child': { pb: 2 },
                        }}
                        >
                        <div>
                            <Typography variant="subtitle2" gutterBottom>
                            Selected products
                            </Typography>
                            <Typography variant="body1">
                            {`${cartItems.length} items were selected`}
                            </Typography>
                        </div>
                        <InfoMobile  />
                        </CardContent>
                    </Card>
                    <Box
                        sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        width: '100%',
                        maxWidth: { sm: '100%', md: 600 },
                        maxHeight: '720px',
                        gap: { xxs: 5, md: 'none' },
                        }}
                    >
                        <Stepper
                        id="mobile-stepper"
                        activeStep={activeStep}
                        alternativeLabel
                        sx={{ display: { sm: 'flex', md: 'none' } }}
                        >
                        {steps.map((label) => (
                            <Step
                            sx={{
                                '&:first-of-type': { pl: 0 },
                                '&:last-child': { pr: 0 },
                                '& .MuiStepConnector-root': { top: { xxs: 6, sm: 12 } },
                            }}
                            key={label}
                            >
                            <StepLabel
                                sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' }}}
                            >
                                {label}
                            </StepLabel>
                            </Step>
                        ))}
                        </Stepper>
                        {activeStep === steps.length ? (
                        <Stack spacing={2} useFlexGap>
                            <Typography variant="h1">📦</Typography>
                            <Typography variant="h5">Thank you for your order!</Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mt: 2, mb: 2 }}>
                            Your order number is
                            <strong>&nbsp;#140396</strong>.
                            </Typography>
                            <Typography variant="body1" color="text.primary" sx={{ mt: 1 }}>
                            Dear {user.first_name},
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 1 }}>
                            Thank you for purchasing from Cliser !
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 1 }}>
                            Your order is currently under review. We will email you once it's ready.
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                            If you have any questions, feel free to contact us
                            <a href="/contact-us" style={{ color: 'primary', textDecoration: 'none'}}> Here</a>.
                            </Typography>

                            <Button
                            variant="contained"
                            sx={{
                                alignSelf: 'start',
                                width: { xxs: '100%', sm: 'auto' },
                            }}
                            onClick={handleToOrders}
                            >
                            Go to my orders
                            </Button>
                        </Stack>
                        ) : (
                        <>
                            {getStepContent(activeStep)}
                            <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xxs: 'column-reverse', sm: 'row' },
                                justifyContent: activeStep !== 0 ? 'space-between' : 'flex-end',
                                alignItems: 'end',
                                flexGrow: 1,
                                gap: 1,
                                pb: { xs: 12, sm: 0 },
                                mt: { xs: 2, sm: 0 },
                                mb: '60px',
                            }}
                            >
                            {activeStep !== 0 && (
                                <Button
                                startIcon={<ChevronLeftRoundedIcon />}
                                onClick={handleBack}
                                variant="text"
                                sx={{
                                    display: { xxs: 'none', sm: 'flex' },
                                }}
                                >
                                Previous
                                </Button>
                            )}

                            {activeStep !== 0 && (
                                <Button
                                startIcon={<ChevronLeftRoundedIcon />}
                                onClick={handleBack}
                                variant="outlined"
                                fullWidth
                                sx={{
                                    display: { xxs: 'flex', sm: 'none' },
                                }}
                                >
                                Previous
                                </Button>
                            )}

                            <Button
                                variant="contained"
                                endIcon={<ChevronRightRoundedIcon />}
                                onClick={activeStep === steps.length - 1 ? handleCheckOut : handleNext}
                                sx={{
                                width: { xxs: '100%', md: 'fit-content' },
                                }}
                            >
                                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                            </Button>
                            </Box>
                        </>
                        )}
                    </Box> 
                </Grid>
            </Grid>
        </StyledCheckOut>
    );
};

CheckOut.propTypes = {
    children: propTypes.array
}

export default CheckOut;