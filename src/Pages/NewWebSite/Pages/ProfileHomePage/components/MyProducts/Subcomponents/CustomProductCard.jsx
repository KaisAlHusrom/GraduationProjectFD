import {
    Card,
    CardContent,
    CardActions,
    Typography,
    CardMedia,
    Rating,
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
import { ReviewCalculateSMA } from '../../../../../../Ecommerce/utils/functions';
import { useMemo } from 'react';
import { productsImagesFolderName } from '../../../../../../../Services/AdminServices/Services/productsService';
import { useNavigate } from 'react-router-dom';
// Styled Components
const StyledProductCard = styled(Card)(
    () => ({
        width: '100%', // Make the card take the full width of its container
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
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
    const { product } = props;
    // Ensure image is an array
    const mainImagePath = useMemo(() => {
        return `${config.ServerImageRoute}/${productsImagesFolderName}/${product.product_main_image_name}`
    }, [product.product_main_image_name])

    const mediaArray = Array.isArray(product?.product_media) ? product?.product_media : [];

    const rating = ReviewCalculateSMA(product?.product_reviews);

    const currency = useSelector(state => state.currencySlice.currency)


    const navigate = useNavigate()
    const navigateProduct = () => {
        navigate("/profile/handle-product/" + product.id)
    }

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
                        <SwiperSlide>
                            <CardMedia
                                component="img"
                                height="140"
                                image={mainImagePath}
                                alt={`Media for ${product.product_name}`}
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
                                            alt={`Media for ${product?.product_name}`}
                                            sx={{ maxHeight: 150, maxWidth: "100%", objectFit: "contain" }}
                                        />
                                    ) : (
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={imagePath}
                                            alt={`Media for ${product?.product_name}`}
                                            sx={{ maxHeight: 150, maxWidth: "100%", objectFit: "contain" }}
                                        />
                                    )}
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                    <CardContent sx={{position: "relative", textAlign: "left"}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {product?.product_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product?.product_short_description}
                        </Typography>
                        
                        <Typography variant="body1" color="text.secondary">
                            {product?.categories?.[0]?.category_name}
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
                            {currency}{product?.product_price}
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
                            onClick={navigateProduct}
                            putTooltip
                            toolTipPosition={'top'}
                        />
                    </CardActions>
        </StyledProductCard>
    );
};

CustomProductCard.propTypes = {
    product: propTypes.object.isRequired,
};

export default CustomProductCard;
