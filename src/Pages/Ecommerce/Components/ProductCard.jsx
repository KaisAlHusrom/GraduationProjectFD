import { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  CardMedia,
  Rating,
  Avatar,
  Grid
} from '@mui/material';
import { styled } from '@mui/system';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCart } from '../utils/CartContext';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import config from "../../../../Config.json";
import { mediaFolderName } from '../../../Services/UserServices/Services/productsMediaUsersService';
import { productsImagesFolderName } from '../../../Services/AdminServices/Services/productsService';
import { AdminMainButton } from '../../../Components';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { usersProfileImagesFolderName } from '../../../Services/AdminServices/Services/usersService';

// Styled Components
const StyledProductCard = styled(Box)(
  () => ({
    width: 300, // Set a fixed width for the card
    height: 480, // Set a fixed height for the card
    marginBottom: "20px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    },
  })
);

const StyledSwiper = styled(Swiper)(
  () => ({
    width: '100%',
    height: 200, // Set a fixed height for the Swiper
  })
);

const StyledSwiperSlide = styled(SwiperSlide)(
  () => ({
    textAlign: 'center',
    fontSize: '18px',
    background: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%', // Ensure slide takes full height of Swiper
  })
);

const ProductCard = (props) => {
  const { AddToCartId, title, image, action, price, rating, creator, category, mainImage, creatorImage } = props;

  // Ensure image is an array
  const mainImagePath = useMemo(() => {
    return `${config.ServerImageRoute}/${productsImagesFolderName}/${mainImage}`;
  }, [mainImage]);

  const creatorImagePath = `${config.ServerImageRoute}/${usersProfileImagesFolderName}/${creatorImage}`;

  const mediaArray = Array.isArray(image) ? image : [];
  const { addToCart, cartItems } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: AddToCartId,
      product_name: title,
      product_price: price,
    });
  };

  return (
    <StyledProductCard>
      <Card sx={{ width: '100%', height: '100%', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
        <StyledSwiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={false}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <StyledSwiperSlide>
            <CardMedia
              component="img"
              height="200"
              image={mainImagePath}
              alt={`Media for ${title}`}
              sx={{ maxHeight: 200, maxWidth: "100%", objectFit: "contain" }}
            />
          </StyledSwiperSlide>
          {mediaArray.map((media, index) => {
            const imagePath = `${config.ServerImageRoute}/${mediaFolderName}/${media?.product_media_name}`;
            const videoPath = `${config.ServerVideoRoute}/${mediaFolderName}/${media?.product_media_name}`;
            return (
              <StyledSwiperSlide key={index}>
                {media.is_video ? (
                  <CardMedia
                    component="video"
                    controls
                    src={videoPath}
                    alt={`Media for ${title}`}
                    sx={{ maxHeight: 200, maxWidth: "100%", objectFit: "contain" }}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    height="200"
                    image={imagePath}
                    alt={`Media for ${title}`}
                    sx={{ maxHeight: 200, maxWidth: "100%", objectFit: "contain" }}
                  />
                )}
              </StyledSwiperSlide>
            );
          })}
        </StyledSwiper>
        <CardContent sx={{ padding: '16px' }}>
          <Typography gutterBottom variant="h6" sx={{fontWeight:"bold"}}>
            {title} 
          </Typography>

          <Typography variant="body1" color="text.secondary" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" sx={{ marginBottom: '8px' }}>
            {category?.map((cat, index) => (
              <span key={index}>{cat.category_name}{index < category.length - 1 ? ', ' : ''}</span>
            ))}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '8px' }}>
            <Rating name="read-only" value={rating !== undefined ? rating : 0} precision={0.2} readOnly />
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: '8px' }}>
            ${price}
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: 1 }}>
            <Avatar src={creatorImagePath} sx={{ width: 32, height: 32 }} /> {creator}
          </Typography>
          <AdminMainButton
            title="Add To Cart"
            type="custom"
            appearance="iconButton"
            icon={<ShoppingCartOutlinedIcon />}
            putBorder
            onClick={handleAddToCart}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1000,
              color: theme => cartItems.find(item => item.id === AddToCartId) ? theme.palette.primary.contrastText : undefined,
              backgroundColor: theme => cartItems.find(item => item.id === AddToCartId) ? theme.palette.primary.main : undefined,
              "&:hover": {
                backgroundColor: theme => cartItems.find(item => item.id === AddToCartId) ? theme.palette.primary.dark : undefined,
              }
            }}
          />
        </CardContent>
        <CardActions>
          <Grid container spacing={2}>
            <Grid item xxs={12} xs={12}>
              <AdminMainButton
                title="Learn More"
                type="custom"
                onClick={action}
                sx={{
                  width: "100%",
                  backgroundColor: theme => theme.palette.primary.main,
                }}
              >
              </AdminMainButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </StyledProductCard>
  );
};

ProductCard.propTypes = {
  AddToCartId: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.array.isRequired,
  price: PropTypes.string.isRequired,
  category: PropTypes.array.isRequired,
  action: PropTypes.func.isRequired,
  rating: PropTypes.number,
  creator: PropTypes.string,
  mainImage: PropTypes.string.isRequired,
  creatorImage: PropTypes.string.isRequired,
};

export default ProductCard;
