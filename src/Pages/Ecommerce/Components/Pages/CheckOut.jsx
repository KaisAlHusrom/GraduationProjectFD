//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components
import Info from "../UI/Info"
import InfoMobile from "../UI/InfoMobile"
import AddressForm from '../UI/AddressForm';
import PaymentForm from '../UI/PaymentForm';
import Review from '../UI/Review';
import Cliser from "../../data/Cliser-r.png"
//MUI
import {
    Box,Button,Card,CardContent,Grid,Stack,Step,StepLabel,Stepper,Typography
} from '@mui/material'
import { styled } from '@mui/system'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';


//propTypes 
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';



//Styled Components
const StyledCheckOut = styled(Box)(
    () => ({
    
    })
)
const steps = ['Shipping address', 'Payment details', 'Review your order'];
const logoStyle = {
    width: '100px',
    height: '90px',
    marginLeft: '-4px',
    marginRight: '-8px',
  };

function getStepContent(step) {
    switch (step) {
        case 0:
        return <AddressForm />;
        case 1:
        return <PaymentForm />;
        case 2:
        return <Review />;
        default:
        throw new Error('Unknown step');
    }
}



const CheckOut = () => {
    const Navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => {
        setActiveStep(activeStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep(activeStep - 1);
      };
      const handleBackToMain = ()=>{
        Navigate(`/Ecommerce`);
      }
    return (
        <StyledCheckOut>
            <Grid container sx={{ height: { xs: '100%', sm: '100dvh' } }}>
                <Grid
                item
                xs={12}
                sm={5}
                lg={4}
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    backgroundColor: 'background.paper',
                    borderRight: { sm: 'none', md: '1px solid' },
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
                        <img
                            src={Cliser}
                            style={logoStyle}
                            
                        />
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
                        <Info totalPrice={activeStep >= 2 ? '$144.97' : '$134.98'} />
                    </Box>
                </Grid>
                <Grid
                item
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
                    pt: { xs: 2, sm: 4 },
                    px: { xs: 2, sm: 10 },
                    gap: { xs: 4, md: 8 },
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
                            display: { xs: 'flex', md: 'none' },
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                        }}
                        >
                            <Button
                            startIcon={<ArrowBackRoundedIcon />}
                            component="a"
                            href="/material-ui/getting-started/templates/landing-page/"
                            sx={{ alignSelf: 'start' }}
                            >
                                Back to
                                <img
                                src={
                                    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                                }
                                style={logoStyle}
                                alt="Sitemark's logo"
                                />
                            </Button>
                        </Box>
                        <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            flexGrow: 1,
                            height: 150,
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
                                    ':first-child': { pl: 0 },
                                    ':last-child': { pr: 0 },
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
                        display: { xs: 'flex', md: 'none' },
                        width: '100%',
                        }}
                    >
                        <CardContent
                        sx={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            ':last-child': { pb: 2 },
                        }}
                        >
                        <div>
                            <Typography variant="subtitle2" gutterBottom>
                            Selected products
                            </Typography>
                            <Typography variant="body1">
                            {activeStep >= 2 ? '$144.97' : '$134.98'}
                            </Typography>
                        </div>
                        <InfoMobile totalPrice={activeStep >= 2 ? '$144.97' : '$134.98'} />
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
                        gap: { xs: 5, md: 'none' },
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
                                ':first-child': { pl: 0 },
                                ':last-child': { pr: 0 },
                                '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                            }}
                            key={label}
                            >
                            <StepLabel
                                sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
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
                            <Typography variant="body1" color="text.secondary">
                            Your order number is
                            <strong>&nbsp;#140396</strong>. We have emailed your order
                            confirmation and will update you once its shipped.
                            </Typography>
                            <Button
                            variant="contained"
                            sx={{
                                alignSelf: 'start',
                                width: { xs: '100%', sm: 'auto' },
                            }}
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
                                flexDirection: { xs: 'column-reverse', sm: 'row' },
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
                                    display: { xs: 'none', sm: 'flex' },
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
                                    display: { xs: 'flex', sm: 'none' },
                                }}
                                >
                                Previous
                                </Button>
                            )}

                            <Button
                                variant="contained"
                                endIcon={<ChevronRightRoundedIcon />}
                                onClick={handleNext}
                                sx={{
                                width: { xs: '100%', sm: 'fit-content' },
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