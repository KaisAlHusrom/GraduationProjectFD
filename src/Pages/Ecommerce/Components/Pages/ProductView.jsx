import { useMemo, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

import config from "../../../../../Config.json"
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
import useEffectFetchData from '../../../../Helpers/customHooks/useEffectFetchData';
import { fetchSpecificUserProducts } from '../../../../Services/UserServices/Services/productsUsersService';
import { mediaFolderName } from '../../../../Services/UserServices/Services/productsMediaUsersService';
import DateHelper from '../../../../Helpers/DateHelper';

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
    const params = useMemo(() => {
      return [idx]
    }, [idx])
    const {data: product} = useEffectFetchData(fetchSpecificUserProducts, params, true, true)

    // const product = NewList.find((product) => product.id === idx);
    if (!idx || !product) {
      return <Typography variant="h2">Product not found</Typography>;
    }
    
    const skillNames = product.product_used_skills.map(skill => skill.product_used_skill_name);

    const Features = product.product_features
    const Reviews = product.product_reviews
    const handleTapChange = (event, newValue) => {
      setValue(newValue);
    };
    const itemsInfo = [
      { contentTitle: 'Added', content: DateHelper.formattedDate(product.created_at)},
      { contentTitle: 'Last-Updated', content: DateHelper.formattedDate(product.updated_at)},
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
                    {product.product_media.map((media, index) => {
                      const imagePath = `${config.ServerImageRoute}/${mediaFolderName}/${media?.product_media_name}`;
                      const videoPath = `${config.ServerVideoRoute}/${mediaFolderName}/${media?.product_media_name}`;
                      const isVideo = /\.(mp4|webm|ogg)$/.test(media?.product_media_name);

                      return (
                        <SwiperSlide key={index}>
                          {isVideo ? (
                            <Box
                              component="video"
                              sx={{
                                position: 'relative',
                                maxHeight: '63vh',
                                width: 'auto',
                                maxWidth: '100%',
                                objectFit: 'contain'
                              }}
                              controls
                            >
                              <source src={videoPath} type="video/mp4" />
                              Your browser does not support the video tag.
                            </Box>
                          ) : (
                            <Box
                              component="img"
                              sx={{
                                position: 'relative',
                                maxHeight: '63vh',
                                width: 'auto',
                                maxWidth: '100%',
                                objectFit: 'contain'
                              }}
                              src={imagePath}
                            />
                          )}
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
                
                <div style={{ position: 'static', height: '65vh' }}>
                  <Divider />
                  <Typography variant="h4" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                    Features of the Template
                  </Typography>
                  {Features.map((feature, index) => (
                    <Box key={index}                     sx={{
                      marginBottom: 2,
                      padding: 3,
                      borderRadius: '8px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #e0e0e0',
                    }}>
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
              <div style={{ position: 'static', height: '65vh' }}>
                <Divider />
                <Typography variant="h4" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                  Reviews of the Template
                </Typography>
                {Reviews.map((Review, index) => (
                  <Box
                    key={index}
                    sx={{
                      marginBottom: 2,
                      padding: 3,
                      borderRadius: '8px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #e0e0e0',
                    }}
                  >
                    <Typography variant="h5" sx={{ paddingTop: 1, paddingBottom: 1, fontWeight: 'bold' }}>
                      {Review.id}
                    </Typography>
                    <Typography variant="h6" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                      {Review.comment}
                    </Typography>
                    <Typography variant="h6">
                      Created At {DateHelper.formattedDate(Review.created_at)}
                    </Typography>
                  </Box>
                ))}
              </div>

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
                      <Avatar src={product} sx={{ width: 32, height: 32 }} /> {product?.user?.first_name}
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