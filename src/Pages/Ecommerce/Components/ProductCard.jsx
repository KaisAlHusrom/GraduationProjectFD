import {
    Box,
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    CardMedia,
    Rating,
    Container,
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
import propTypes from 'prop-types';

import config from "../../../../Config.json"

import { mediaFolderName } from '../../../Services/UserServices/Services/productsMediaUsersService';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { productsImagesFolderName } from '../../../Services/AdminServices/Services/productsService';
import { AdminMainButton } from '../../../Components';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { position } from 'stylis';

// Styled Components
const StyledProductCard = styled(Box)(
    () => ({
        width: '100%', // Make the card take the full width of its container
        marginBottom: "20px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    })
);

const ProductCard = (props) => {
    const navigate = useNavigate();
    const { AddToCartId,title, description, image, action, price, rating, creator, category, mainImage } = props;

    // Ensure image is an array
    const mainImagePath = useMemo(() => {
        return `${config.ServerImageRoute}/${productsImagesFolderName}/${mainImage}`
    }, [mainImage])

    console.log(category)

    const mediaArray = Array.isArray(image) ? image: [];
    const { addToCart, cartItems } = useCart();

    const handleAddToCart = () => {
        addToCart({
            id: AddToCartId,
            product_name: title,
            product_price: price,
        });
        // navigate('/cliser-digital-market/Cart');
    };

    return (
        <StyledProductCard>
            <Container id="Cards">
                <Card sx={{ maxWidth: '600', borderRadius: '10px', objectFit: "contain", position: 'relative' }}>
                    <Swiper
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
                        <SwiperSlide>
                            <CardMedia
                                component="img"
                                height="140"
                                image={mainImagePath}
                                alt={`Media for ${title}`}
                                sx={{ maxHeight: 150, maxWidth: "100%", objectFit: "contain" }}
                            />
                        </SwiperSlide>
                        {mediaArray.map((media, index) => {
                            const imagePath = `${config.ServerImageRoute}/${mediaFolderName}/${media?.product_media_name}`;
                            const videoPath = `${config.ServerVideoRoute}/${mediaFolderName}/${media?.product_media_name}`;
                            return (
                                <SwiperSlide key={index}>
                                    {media.is_video ? (
                                        <CardMedia
                                            component="video"
                                            controls
                                            src={videoPath}
                                            alt={`Media for ${title}`}
                                            sx={{ maxHeight: 150, maxWidth: "100%", objectFit: "contain" }}
                                        />
                                    ) : (
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={imagePath}
                                            alt={`Media for ${title}`}
                                            sx={{ maxHeight: 150, maxWidth: "100%", objectFit: "contain" }}
                                        />
                                    )}
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    <CardContent sx={{position: 'relative'}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {description}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" whiteSpace='nowrap' overflow='hidden' textOverflow={'ellipsis'}>
                            {category?.map(cat => (
                                cat.category_name + ', '
                            ))}
                        </Typography>
                        
                        
                        <Typography variant='body1'>
                            <Rating name="read-only" value={rating !== undefined ? rating : 'No ratings'} precision={0.2} readOnly />
                        </Typography>
                        <Typography variant="h7" color="text.primary">
                            ${price}
                        </Typography>
                        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'start', gap: '10px', paddingTop: 1 }}>
                            <Avatar src={image?.[0]?.product_media_name} sx={{ width: 32, height: 32 }} /> {creator}
                        </Typography>
                        <AdminMainButton
                            title='Add To Cart'
                            type='custom'
                            appearance='iconButton'
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
                            <Grid item xxs={12} xs={12} sm={6} md={6}>
                                <Button variant='contained' fullWidth onClick={action}>
                                    Learn More
                                </Button>
                            </Grid>
                            
                        </Grid>
                    </CardActions>
                    
                </Card>
            </Container>
        </StyledProductCard>
    );
};

ProductCard.propTypes = {
    AddToCartId:propTypes.string,
    title: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    image: propTypes.array.isRequired,
    price: propTypes.string.isRequired,
    category: propTypes.array.isRequired,
    action: propTypes.func.isRequired,
    rating: propTypes.number,
    creator: propTypes.string
};

export default ProductCard;
