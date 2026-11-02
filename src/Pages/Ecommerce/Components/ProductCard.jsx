import { useCallback, useMemo, useState } from 'react';
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
  Grid,
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

import { ReviewCalculateSum } from '../utils/functions';
import { navigateProductView, navigateProfileUpdateProduct } from '../../../Helpers/navigations';
import FullScreenModal from '../../../Components/FullScreenModal/FullScreenModal';
import { useSelector } from 'react-redux';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

import { deleteUserProducts } from '../../../Services/UserServices/Services/productsUsersService';

// Styled Components
const StyledProductCard = styled(Box)(
  () => ({
    width: '100%', // Set a fixed width for the card
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
  const { product, notInStore, fetchAgain } = props;
  //product info
  const AddToCartId = product.id
  const title=product.product_name
  const image=product.product_media
  const mainImage=product.product_main_image_name
  const price=product.product_price

  const rating=ReviewCalculateSum(product?.review_averages[0])

  const creator=`${product?.user?.first_name} ${product?.user?.last_name}`
  const category=product.categories
  const action=() => navigateProductView(product.id)
  const creatorImage=product.user.profile_image
  const user = useSelector(state => state.authSlice.user)
  const ownProduct = user ? user.id === product.user.id : false;

  // Ensure image is an array
  const mainImagePath = useMemo(() => {
    return `${config.ServerImageRoute}/${productsImagesFolderName}/${mainImage}`;
  }, [mainImage]);

  const [fullScreenModal, setFullScreenModal] = useState(false)
  const [mediaForFullScreen,] = useState(() => {
      const mainImage = {
          path: mainImagePath,
          name: mainImagePath.split('/').pop(),
          type: 'existing',
          size: 10, //! fixed number
          isVideo: false
      }
  
      const media = product?.product_media?.map((item) => {
          const path = item.is_video
          ?
              `${config.ServerVideoRoute}/${mediaFolderName}/${item.product_media_name}`
          :
              `${config.ServerImageRoute}/${mediaFolderName}/${item.product_media_name}`
              const mediaData = {
              path: path,
              name: path.split('/').pop(),
              type: 'existing',
              size: 10, //! fixed number
              isVideo: item.is_video
          };
          return mediaData
      })
      return [mainImage, ...media]
  })

  const creatorImagePath = `${config.ServerImageRoute}/${usersProfileImagesFolderName}/${creatorImage}`;

    const mediaArray = Array.isArray(image) ? image: [];
    const { addToCart, cartItems } = useCart() || {};
    
    const handleAddToCart = () => {
        if(notInStore) {
          return
        }
        addToCart({
            id: AddToCartId,
            creatorId: product?.user?.id,
            product_name: title,
            product_price: price,
        });
    };


    const handleDeleteProduct = useCallback(async () => {
      const res = await deleteUserProducts([product.id])
        if(res.success) {
            fetchAgain()
        }
    }, [fetchAgain, product.id])

    const menuItems = useMemo(() => {
        return [
          {
            value: 'Edit',
            onClick: () => navigateProfileUpdateProduct(product.id),
            icon: <EditOutlinedIcon />
          },
          {
            value: 'Delete',
            onClick: handleDeleteProduct,
            icon: <DeleteIcon />
          },
        ]
        
    }, [handleDeleteProduct, product.id])


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
              onClick={() => setFullScreenModal(true)}
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
                    onClick={() => setFullScreenModal(true)}

                    src={videoPath}
                    alt={`Media for ${title}`}
                    sx={{ maxHeight: 200, maxWidth: "100%", objectFit: "contain" }}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    height="200"
                    onClick={() => setFullScreenModal(true)}

                    image={imagePath}
                    alt={`Media for ${title}`}
                    sx={{ maxHeight: 200, maxWidth: "100%", objectFit: "contain" }}
                  />
                )}
              </StyledSwiperSlide>
            );
          })}
        </StyledSwiper>
        <CardContent sx={{ padding: '16px', position: 'relative' }}>
          {
            ownProduct
            &&
            (
              <Box
                sx={{
                  position: 'absolute',
                  right: 10,
                  top: 12,
                }}
                >
                  <AdminMainButton
                      icon={<MoreVertIcon  />}
                      title="Profile"
                      appearance="iconButton"
                      type="menu"
                      sx={{
                          color: theme => theme.palette.text.primary
                      }}
                      menuItems={menuItems}
                      menuPaperProps={
                      {
                          elevation: 1,
                          sx: {
                              overflow: 'visible',
                              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                              mt: 1.5,
                              '& .MuiAvatar-root': {
                                  width: 32,
                                  height: 32,
                                  ml: -0.5,
                                  mr: 1,
                              },
                              '&::before': {
                                  content: '""',
                                  display: 'block',
                                  position: 'absolute',
                                  top: 0,
                                  right: 14,
                                  width: 10,
                                  height: 10,
                                  bgcolor: 'background.paper',
                                  transform: 'translateY(-50%) rotate(45deg)',
                                  zIndex: 0,
                              },
                          } 
                          }
                      }
                  />
              </Box>
            )
          }

          <Typography gutterBottom variant="h6" sx={{fontWeight:"bold"}}>
            {title} 
          </Typography>

          <Typography variant="body1" color="text.secondary" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis" sx={{ marginBottom: '8px' }}>
            {category?.map((cat, index) => (
              <span key={index}>{cat.category_name}{index < category.length - 1 ? ', ' : ''}</span>
            ))}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '8px' }}>
            <Rating name="read-only" value={rating !== undefined ? Number.parseFloat(rating) : 0} precision={0.5} readOnly />
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: '8px' }}>
            ${price}
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: 1 }}>
            <Avatar src={creatorImagePath} sx={{ width: 32, height: 32 }} /> {creator}
          </Typography>
          {
            !notInStore && !ownProduct
            &&
            (
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
            )
          }
          
        </CardContent>
        <CardActions>
          <Grid container spacing={2}>
            <Grid item xxs={12} >
              <AdminMainButton
                title="Learn More"
                appearance='primary'
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
      {fullScreenModal && (
          <FullScreenModal
              open={fullScreenModal}
              onClose={() => setFullScreenModal(false)}
              media={mediaForFullScreen}
          />
      )}
    </StyledProductCard>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
  notInStore: PropTypes.bool,
  fetchAgain: PropTypes.func,
};

export default ProductCard;
