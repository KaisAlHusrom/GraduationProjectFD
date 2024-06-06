import { useState } from 'react';
import { productList,NewList } from '../../data/CradsData';
import { useParams,useNavigate } from 'react-router-dom';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Tabs,
  Tab,
  Box,
  Divider,
  Avatar,
  Rating,
} from '@mui/material';

import images from '../../data/SliderImages';

import CustomCard from '../UI/CustomCard';
import '../Styles/CustomSwiper.css';
import { CartData } from '../../data/CartData';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ChipSet from '../UI/ChipSet';
import ProductsTape from '../UI/ProductsTape';
import { calculateAverageRating } from '../../utils/functions';

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


  const ProductView = () => {
    const [value, setValue] = useState(0);
    const Navigate = useNavigate();
    const [cartItems, setCartItems] = useState(() => {
      const cart_data = JSON.parse(localStorage.getItem("cart_data"));
      if(cart_data) {
        return cart_data;
      }
      return []
    })

    
    const handleAddCartBtn = () => {
        // Update the list of product IDs with the new productId
      const updatedCartItems = [...cartItems, product.id];
      setCartItems(() => updatedCartItems);
      localStorage.setItem("cart_data", JSON.stringify(updatedCartItems))

      // Update the CartData with the new list of product IDs
      CartData.push(product.id);
      Navigate('/cliser-digital-market/Cart')
    };
    

    const { idx } = useParams();
    console.log(idx)
    const product = NewList.find((product) => product.id === idx);
    if (!idx || !product) {
      return <Typography variant="h2">Product not found</Typography>;
    }
    
    const skillNames = product.product_used_skills.map(skill => skill.product_used_skill_name);

    const Features = product.product_features
    const handleTapChange = (event, newValue) => {
      setValue(newValue);
    };
    const itemsInfo = [
      { contentTitle: 'Added', content: product.created_at},
      { contentTitle: 'Last-Updated', content: product.updated_at},
      { contentTitle: 'Views', content: product.views },
      { contentTitle: 'Sells', content: product.sells },
      // Add more items as needed
    ];
    const itemsPurchase = [
      { contentTitle: "Price", content: "$"+product.product_price},
      // Add more items as needed
    ];
    const itemsReviews = [
      { contentTitle: 'quality of the work',
       content: <Rating name="quality of the work"
                  value={calculateAverageRating(product.product_reviews, 'design_quality_rate')} readOnly sx={{paddingTop:0.3}} />},
      { contentTitle: 'communication',
       content: <Rating name="communication" 
                  value={calculateAverageRating(product.product_reviews, 'communication_rate')} readOnly sx={{paddingTop:0.8}} /> },
      { contentTitle: 'usability',
       content: <Rating name="usability"
                   value={calculateAverageRating(product.product_reviews, 'ease_of_use_rate')} readOnly sx={{paddingTop:0.6}} /> },
      // Add more items as needed
    ];


    return (
      <div>
      <Container sx={{ marginTop: '100px' }} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xxs={12}>
            <Typography variant="h4" gutterBottom>
              {product.product_name}
            </Typography>
            <Divider />
            <Typography variant="body1" color="text.secondary">
                {product.product_short_description}
              </Typography>
          </Grid>
          <Grid item xxs={12} sm={12} md={12} lg={6}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleTapChange} aria-label="basic tabs example">
                  <Tab label="Product" />
                  <Tab label="Reviews" />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div style={{ position: 'relative'}}>
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="mySwiper"
                >
                  {images.map((step, index) => (
                    <SwiperSlide key={index}>
                    <Box
                      component="img"
                      sx={{
                        position: 'relative',
                        maxHeight: '63vh', // Limit the height of the image to 60vh
                        width: 'auto', // Allow the width to adjust automatically to maintain aspect ratio
                        maxWidth: '100%', // Ensure the image does not exceed the width of its container
                        objectFit: 'contain'
                      }}
                      src={step.path}
                      alt={step.label}
                    />
                  </SwiperSlide>
                  ))}
                </Swiper>
                  
                </div>
                
                <div style={{ position: 'static', height: '65vh' }}>
                  <Divider />
                  <Typography variant="h4" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                    Features of the Template
                  </Typography>
                  {Features.map((feature, index) => (
                    <Box key={index} sx={{ marginBottom: 2, padding: 2, backgroundColor: '', borderRadius: '8px' }}>
                      <Typography variant="h5" sx={{ paddingTop: 1, paddingBottom: 1, fontWeight: 'bold' }}>
                        {feature.product_feature_name}
                      </Typography>
                      <Typography variant="h6" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                        {feature.product_feature_description}
                      </Typography>
                    </Box>
                  ))}
                </div>

              </CustomTabPanel>
              <CustomTabPanel value={value} index={1} >
                Item Two
              </CustomTabPanel>
          </Grid>
          <Grid item xxs={12} sm={12} md={12} lg={6}>
              <CustomCard title="Purchase" items={itemsPurchase}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      onClick={handleAddCartBtn}
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        padding: '10px 10px',
                        borderRadius: '10px',
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
              </CustomCard>
              <CustomCard title="Info" items={itemsInfo}>
                <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom sx={{ paddingTop: 1, paddingBottom: 1 }}>
                      <ChipSet title={"Used Teknolojies:"} label={skillNames} />
                    </Typography>
                    <Divider />
                    <Typography variant="h5" sx={{ paddingTop: 1, paddingBottom: 1 }}>Creator</Typography>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'start', gap: '10px' ,paddingTop:1}}>
                      <Avatar src={product} sx={{ width: 32, height: 32 }} /> {product.creator}
                    </Typography>
                </Grid>
              </CustomCard> 
              <CustomCard title="Ratings" items={itemsReviews}>
              </CustomCard>
          </Grid>
          <Grid item xxs={12}>
              <ProductsTape title="You Might Like" Cat="" />
          </Grid>
        </Grid>
      </Container>

    </div>
  );
};
export default ProductView;