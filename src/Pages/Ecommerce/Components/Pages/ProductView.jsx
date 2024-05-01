import { useState } from 'react';
import { productList } from '../../data/CradsData';
import { useParams } from 'react-router-dom';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {
  Container,
  Typography,
  Button,
  Grid,
  Tabs,
  Tab,
  Box,
  Divider,
  Card,
  CardContent,
  Chip,
  Avatar,
  MobileStepper,
  Rating,
} from '@mui/material';
import NavBar from '../NavBar';
import images from '../../data/SliderImages';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Footer from '../Footer';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }


  const ProductView = (addToCart) => {
    const [value, setValue] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const theme = useTheme();
    const imagesSize = images.length;
    const { idx } = useParams();
    const product = productList.find((product) => product.id === parseInt(idx));

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStepChange = (step) => {
      setActiveStep(step);
    };

    if (!idx || !product) {
      return <Typography variant="h2">Product not found</Typography>;
    }
  

    const handleTapChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <div>
      <NavBar style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }} />
      <Container sx={{ marginTop: '80px' }} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            <Divider />
            <Typography variant="body1" color="text.secondary">
                {product.description}
              </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Box>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleTapChange} aria-label="basic tabs example">
                  <Tab label="Product" />
                  <Tab label="Reviews" />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div style={{ position: 'relative'}}>
                  <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                    style={{ height: '100%'}}
                  >
                  {images.map((step, index) => (
                    <div key={step.label} >
                            {Math.abs(activeStep - index) <= 2 ? (
                              <Box
                                component="img"
                                sx={{
                                  position: 'relative',
                                  maxHeight: '63vh', // Limit the height of the image to 60vh
                                  width: 'auto', // Allow the width to adjust automatically to maintain aspect ratio
                                  maxWidth: '100%', // Ensure the image does not exceed the width of its container
                                  objectFit:"contain"
                                }}
                                src={step.path}
                                alt={step.label}
                              />
                            ) : null}
                          </div>
                        ))}
                  </AutoPlaySwipeableViews>
                  <MobileStepper
                    variant='dots'
                    steps={imagesSize}
                    position="static"
                    activeStep={activeStep}
                    sx  = {{
                      justifyContent : 'center' // did for en Abdullah Alhasan
                    }}
                    nextButton={
                      <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === imagesSize - 1}
                        sx={{ position: 'absolute', right: 0 }}
                      >
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                      </Button>
                    }
                    backButton={
                      <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        sx={{ position: 'absolute', left: 0 }}
                      >
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                      </Button>
                    }
                  />
                </div>
                
                <div style={{ position: 'static',height: '65vh',paddingTop:40}}>
                  <Divider />
                  <Typography variant="h4" sx={{ paddingTop: 1, paddingBottom: 1 }}>Features of the Template</Typography>
      

                  <Typography variant="h5" sx={{ paddingTop: 1, paddingBottom: 1 }}>Title</Typography>
                  <Typography variant="h6" sx={{ paddingTop: 1, paddingBottom: 1 }}>Description</Typography>
                </div>

              </CustomTabPanel>
              <CustomTabPanel value={value} index={1} >
                Item Two
              </CustomTabPanel>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Box sx={{paddingTop:'45px' }} maxWidth="lg">
              <Card>
                <CardContent>
                  <Typography variant="h4" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                    Purchase
                  </Typography>
                  <Divider />
                  <Grid item container spacing={2}>
                    <Grid item xs={6}>
                    <Typography variant="h6" sx={{ paddingTop: 1, paddingBottom: 1 }}>Price</Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom sx={{ paddingTop: 1, paddingBottom: 1 }}>
                      ${product.price}
                    </Typography>
                    </Grid>
                  </Grid>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      onClick={() => addToCart(product)}
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        padding: '10px 10px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                          backgroundColor: '#0056B3',
                        },
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Divider />
              <Box sx={{paddingTop:'20px' }} maxWidth="lg">
              <Card>
                <CardContent>
                <Typography variant="h4">
                      Product Details
                    </Typography>
                    <Divider />
                  <Grid container spacing={2}>
                    <Grid item container spacing={2}>
                      {/* Left side: labels */}
                      <Grid item xs={6}>
                        <Typography variant="body1" sx={{ paddingTop: 1, paddingBottom: 1 }}>Added</Typography>
                        <Typography variant="body1" sx={{ paddingTop: 1, paddingBottom: 1 }}>Last-Updated</Typography>
                        <Typography variant="body1" sx={{ paddingTop: 1, paddingBottom: 1 }}>Views</Typography>
                        <Typography variant="body1" sx={{ paddingTop: 1, paddingBottom: 1 }}>Sells</Typography>
                      </Grid>

                      {/* Right side: values */}
                      <Grid item xs={6}>
                        <Typography variant="body1" sx={{ paddingTop: 1, paddingBottom: 1 }}>{product['adding-date']}</Typography>
                        <Typography variant="body1" sx={{ paddingTop: 1, paddingBottom: 1 }}>{product['last-updated']}</Typography>
                        <Typography variant="body1" sx={{ paddingTop: 1, paddingBottom: 1 }}>{product.views}</Typography>
                        <Typography variant="body1" sx={{ paddingTop: 1, paddingBottom: 1 }}>{product.sells}</Typography>
                      </Grid>
                    </Grid>

                    
                  
                    <Grid item xs={12}>
                      <Typography variant="body2" gutterBottom sx={{ paddingTop: 1, paddingBottom: 1 }}>
                        <Typography variant="body1" sx={{ paddingBottom: 1 }}> Attached Files: </Typography>
                        <Chip label={product["attached files"].php} color="primary" clickable style={{ marginRight: '10px' }} />
                        <Chip label={product["attached files"].javascript} color="primary" clickable style={{ marginRight: '10px' }} />
                        <Chip label={product["attached files"].html} color="primary" clickable style={{ marginRight: '10px' }} />

                      </Typography>
                      <Divider />
                      <Typography variant="h5" sx={{ paddingTop: 1, paddingBottom: 1 }}>Creator</Typography>
                      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'start', gap: '10px' ,paddingTop:1}}>
                        <Avatar src={product.image} sx={{ width: 32, height: 32 }} /> {product.creator}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              </Box>
              <Divider />
              <Box sx={{paddingTop:'20px' }} maxWidth="lg">
              <Card>
                <CardContent>
                  <Typography variant="h4">
                      Ratings
                  </Typography>
                  <Divider />
                  <Grid container spacing={2}>
                    {/* Left side: labels */}
                    <Grid item xs={6} container direction="column">
                      <Typography variant="body1" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                        quality of the work
                      </Typography>
                      <Typography variant="body1" sx={{ paddingTop: 1.8, paddingBottom: 1 }}>
                        communication
                      </Typography>
                      <Typography variant="body1" sx={{ paddingTop: 1.8, paddingBottom: 1 }}>
                        usability
                      </Typography>
                    </Grid>

                    {/* Right side: values */}
                    <Grid item xs={6} container direction="column">
                      <Typography variant="body1" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                        <Rating name="quality of the work" value="2" readOnly />
                      </Typography>
                      <Typography variant="body1" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                        <Rating name="communication" value="5" readOnly />
                      </Typography>
                      <Typography variant="body1" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                        <Rating name="usability" value="4" readOnly />
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};
export default ProductView;