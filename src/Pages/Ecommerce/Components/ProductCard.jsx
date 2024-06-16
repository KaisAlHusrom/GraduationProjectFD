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
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import propTypes from 'prop-types';

import config from "../../../../Config.json"

import { mediaFolderName } from '../../../Services/UserServices/Services/productsMediaUsersService';
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
    const { title, description, image, action, price, rating, creator, category } = props;
    // Ensure image is an array
    const mediaArray = Array.isArray(image) ? image : [];

    

    return (
        <StyledProductCard>
            <Container id="Cards">
                <Card sx={{ maxWidth: '600', borderRadius: '10px', objectFit: "contain" }}>
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
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Price: ${price}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {category?.[0]?.category_name}
                        </Typography>
                        <Rating name="read-only" value={rating !== undefined ? rating : 'No ratings'} precision={0.2} readOnly />
                        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'start', gap: '10px', paddingTop: 1 }}>
                            <Avatar src={image?.[0]?.product_media_name} sx={{ width: 32, height: 32 }} /> {creator}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Grid container spacing={2}>
                            <Grid item xxs={12} xs={12} sm={6} md={6}>
                            <Button variant='contained' fullWidth onClick={action}>
                                Learn More
                            </Button>
                            </Grid>
                            <Grid item xxs={12} xs={12} sm={6} md={6}>
                            <Button variant='contained' fullWidth color='error'>
                                Add to Cart
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
