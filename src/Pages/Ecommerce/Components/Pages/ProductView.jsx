import { useMemo, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import config from "../../../../../Config.json";
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
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ChipSet from '../UI/ChipSet';
import ProductsTape from '../UI/ProductsTape';
import { calculateAverageRating } from '../../utils/functions';
import { productsFilesFolderName, productsImagesFolderName } from '../../../../Services/UserServices/Services/productsUsersService';
import { mediaFolderName } from '../../../../Services/UserServices/Services/productsMediaUsersService';
import DateHelper from '../../../../Helpers/DateHelper';
import { useCart } from '../../utils/CartContext';
import { usersProfileImagesFolderName } from '../../../../Services/AdminServices/Services/usersService';
import FullScreenModal from '../../../../Components/FullScreenModal/FullScreenModal';
import CustomProductReviewModal from '../CustomProductReviewModal/CustomProductReviewModal';
import ReviewsTab from '../ReviewsTab/ReviewsTab';
import useEffectFetchData from '../../../../Helpers/customHooks/useEffectFetchData';
import { hadBuyProduct } from '../../../../Services/UserServices/Services/ordersUsersService';
import { useSelector } from 'react-redux';
import { AdminMainButton } from '../../../../Components';

const CustomTabPanel = ({ children, value, index, ...other }) => {
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
};

const ProductView = () => {
  const [value, setValue] = useState(0);
  const { addToCart, cartItems } = useCart();
  const { product } = useLoaderData();

  

  const mainImagePath = `${config.ServerImageRoute}/${productsImagesFolderName}/${product?.product_main_image_name}`;
  const creatorImage = `${config.ServerImageRoute}/${usersProfileImagesFolderName}/${product?.user?.profile_image}`;

  const skillNames = useMemo(() => product.product_used_skills.map(skill => skill.product_used_skill_name), [product]);
  const Features = product.product_features;

  const handleAddCartBtn = () => {
    addToCart({
      id: product.id,
      creatorId: product?.user?.id,
      product_name: product.product_name,
      product_price: product.product_price,
    });
  };

  const handleTapChange = (event, newValue) => {
    setValue(newValue);
  };

  const itemsInfo = useMemo(() => [
    { contentTitle: 'Added', content: DateHelper.timeAgo(product.created_at) },
    { contentTitle: 'Last-Updated At', content: DateHelper.formattedDate(product.updated_at) },
    { contentTitle: 'Views', content: product.views },
    { contentTitle: 'Sells', content: product.sells },
  ], [product]);

  const itemsPurchase = useMemo(() => [
    { contentTitle: "Price", content: "$" + product.product_price },
  ], [product]);

  const itemsReviews = useMemo(() => [
    { 
      contentTitle: 'Quality of the Work',
      content: <Rating name="quality-of-the-work" value={product.review_averages[0]?.avg_design_quality_rate} readOnly sx={{ paddingTop: 0.3 }} />
    },
    { 
      contentTitle: 'Communication',
      content: <Rating name="communication" value={product.review_averages[0]?.avg_communication_rate} readOnly sx={{ paddingTop: 0.8 }} />
    },
    { 
      contentTitle: 'Usability',
      content: <Rating name="usability" value={product.review_averages[0]?.avg_ease_of_use_rate} readOnly sx={{ paddingTop: 0.6 }} />
    },
  ], [product.review_averages]);

  const [openMedia, setOpenMedia] = useState(false);

  const selectedMedia = useMemo(() => {
    const mainImage = {
      path: mainImagePath,
      name: mainImagePath.split('/').pop(),
      type: 'existing',
      size: 10,
      isVideo: false,
    };

    const media = product.product_media.map((item) => {
      const path = item.is_video
        ? `${config.ServerVideoRoute}/${mediaFolderName}/${item.product_media_name}`
        : `${config.ServerImageRoute}/${mediaFolderName}/${item.product_media_name}`;
      
      return {
        path: path,
        name: path.split('/').pop(),
        type: 'existing',
        size: 10,
        isVideo: item.is_video,
      };
    });

    return [mainImage, ...media];
  }, [product, mainImagePath]);

  const handleClickMedia = () => {
    setOpenMedia(true);
  };

  //!Had Buy The Product
  const user = useSelector(state => state.authSlice.user);
  const params = useMemo(() => {
      return [
          product?.id
      ];
  }, [product?.id])
  const {data} = useEffectFetchData(hadBuyProduct, params, user, false)

  const {reviewedBefore, boughtBefore} = useMemo(() => {
      if(data){
        return {
            reviewedBefore: data.reviewedBefore,
            boughtBefore: data.boughtBefore,
        }
      }
      return {}
  }, [data])

  const handleDownloadProduct = () => {
    const link = document.createElement('a');
    link.href = `${config.ServerFilesRoute}/${productsFilesFolderName}/${product.product_file_name}`;
    link.setAttribute('download', true);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const styles = useMemo(() => ({
    "& .swiper-slide img, & .swiper-slide video": {
      width: "100%",
      height: 350,
      objectFit: "contain",
      position: 'relative',
      cursor: "pointer"
    }
  }), []);




  return (
    <div>
      <Container sx={{ marginTop: '100px', ...styles }} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {product.product_name}
            </Typography>
            <Divider />
            <Typography variant="body1" color="text.secondary">
              {product.product_short_description}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleTapChange} aria-label="product tabs">
                <Tab label="Product" />
                <Tab label="Reviews" />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <div style={{ position: 'relative' }}>
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
                  <SwiperSlide>
                    <Box component="img" src={mainImagePath} />
                  </SwiperSlide>
                  {product.product_media.map((media, index) => {
                    const imagePath = `${config.ServerImageRoute}/${mediaFolderName}/${media.product_media_name}`;
                    const videoPath = `${config.ServerVideoRoute}/${mediaFolderName}/${media.product_media_name}`;
                    const isVideo = /\.(mp4|webm|ogg)$/.test(media.product_media_name);

                    return (
                      <SwiperSlide key={index}>
                        {isVideo ? (
                          <Box component="video" controls onClick={() => handleClickMedia(media)}>
                            <source src={videoPath} type="video/mp4" />
                            Your browser does not support the video tag.
                          </Box>
                        ) : (
                          <Box component="img" src={imagePath} onClick={() => handleClickMedia(media)} />
                        )}
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div style={{ position: 'static', height: '65vh' }}>
                <Divider />
                <Typography variant="h5" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                  Features of the Template
                </Typography>
                {Features.map((feature, index) => (
                  <Box key={index}>
                    <Typography variant="h6" textTransform={'capitalize'} sx={{ paddingTop: 1, paddingBottom: 1, fontWeight: 'bold' }}>
                      {feature.product_feature_name}
                    </Typography>
                    <Typography variant="h7" sx={{ paddingLeft: 1 }}>
                      {feature.product_feature_description}
                    </Typography>
                    <Divider sx={{marginTop: 2}} />
                  </Box>
                ))}
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <ReviewsTab />
            </CustomTabPanel>
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomCard title="Purchase" items={itemsPurchase}>
              <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection:"column", gap: 2 }}>
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
                  {cartItems.find(item => item.id === product.id) ? "Remove from Cart" : "Add to Cart"}
                </Button>
                {
                  boughtBefore
                  &&
                  <Button
                    onClick={handleDownloadProduct}
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
                    Download
                </Button>
                }
              </Box>
            </CustomCard>
            <CustomCard title="Info" items={itemsInfo}>
              <Grid item xs={12}>
                <Typography variant="body2" gutterBottom sx={{ paddingTop: 1, paddingBottom: 1 }}>
                  <ChipSet title={"Used Technologies:"} label={skillNames} />
                </Typography>
                <Divider />
                <Typography variant="h6" sx={{ paddingTop: 1, paddingBottom: 1 }}>Product Owner</Typography>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'start', gap: '10px', paddingTop: 1 }}>
                  <Avatar src={creatorImage} sx={{ width: 32, height: 32 }} /> {product?.user?.first_name + " " + product.user?.last_name}
                </Typography>
              </Grid>
            </CustomCard>
            <CustomCard title="Ratings" items={itemsReviews} />
          </Grid>
          {/* <Grid item xs={12}>
            <ProductsTape title="You Might Like" Cat="" />
          </Grid> */}
        </Grid>
        {openMedia && (
          <FullScreenModal
            open={openMedia}
            onClose={() => setOpenMedia(false)}
            media={selectedMedia}
          />
        )}
      </Container>

      <CustomProductReviewModal
        reviewedBefore={reviewedBefore}
        boughtBefore={boughtBefore}
        productId={product?.id}
      />
    </div>
  );
};

export default ProductView;
