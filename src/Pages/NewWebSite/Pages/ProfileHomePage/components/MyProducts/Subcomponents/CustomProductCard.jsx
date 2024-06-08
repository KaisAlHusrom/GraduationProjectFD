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
    Avatar
} from '@mui/material';
import { styled } from '@mui/system';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import propTypes from 'prop-types';

import config from "../../../../../../../../Config.json"
import { mediaFolderName } from '../../../../../../../Services/UserServices/Services/productsMediaUsersService';
import { AdminMainButton } from '../../../../../../../Components';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useSelector } from 'react-redux';
// Styled Components
const StyledProductCard = styled(Card)(
    () => ({
        width: '100%', // Make the card take the full width of its container
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '600',
        borderRadius: '10px',
        objectFit: "contain" ,
        '& .swiper-slide': {
            textAlign: 'left',
        }
    })
);

const CustomProductCard = (props) => {
    const { title, description, image, price, rating, category } = props;
    // Ensure image is an array
    const mediaArray = Array.isArray(image) ? image : [];

    const currency = useSelector(state => state.currencySlice.currency)

    return (
        <StyledProductCard>
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
                    <CardContent sx={{position: "relative", textAlign: "left"}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                        
                        <Typography variant="body1" color="text.secondary">
                            {category?.[0]?.category_name}
                        </Typography>
                        <Rating name="read-only" value={rating !== undefined ? rating : 'No ratings'} precision={0.2} readOnly />
                        <Typography 
                        right={0} 
                        position='absolute' 
                        variant="body1" 
                        color="text.secondary"
                        sx={{
                            backgroundColor: theme => theme.palette.primary.main,
                            color: theme => theme.palette.primary.contrastText,
                            borderRadius: '50%',
                            width: 50,
                            height: 50,
                            overflow: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        >
                            {currency}{price}
                        </Typography>
                    </CardContent>

                    <CardActions sx={{width: "90%"}}>
                        <AdminMainButton
                            title='Reviews'
                            type='custom'
                            appearance='iconButton'
                            icon={<RateReviewOutlinedIcon />}
                            onClick={() => {}}
                            putTooltip
                            toolTipPosition={'top'}
                        />
                        <AdminMainButton
                            title='Watches'
                            type='custom'
                            appearance='iconButton'
                            icon={<RemoveRedEyeOutlinedIcon />}
                            onClick={() => {}}
                            putTooltip
                            toolTipPosition={'top'}
                        />
                        <AdminMainButton
                            title='Edit'
                            type='custom'
                            appearance='iconButton'
                            icon={<EditOutlinedIcon />}
                            onClick={() => {}}
                            putTooltip
                            toolTipPosition={'top'}
                        />
                    </CardActions>
        </StyledProductCard>
    );
};

CustomProductCard.propTypes = {
    title: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    image: propTypes.array.isRequired,
    price: propTypes.string.isRequired,
    category: propTypes.array.isRequired,
    // action: propTypes.func.isRequired,
    rating: propTypes.number,
    creator: propTypes.string
};

export default CustomProductCard;
