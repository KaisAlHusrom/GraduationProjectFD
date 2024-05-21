//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
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
} from '@mui/material'
import { styled } from '@mui/system'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import images from '../data/SliderImages';
//propTypes 
import propTypes from 'prop-types'


//Styled Components
const StyledProductCard = styled(Box)(
    ({ theme }) => ({
        width: '100%', // Make the card take the full width of its container
        marginBottom:"20px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    })
)


const ProductCard = (props) => {
    const {
        title, description, image, action,price,rating,creator,Category
    }=props


    return (
        <StyledProductCard>
            <Container id="Cards">
                <Card sx={{ maxWidth: 600,borderRadius:'10px',objectFit:"contain" }}>
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
                    {images.map((step, index) => (
                    <SwiperSlide key={step.label}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={step.path}
                        alt={step.label}
                        sx={{maxHeight:150,maxWidth:"100%",objectFit:"contain"}}
                    />
                  </SwiperSlide>
                  ))}
                    
                    {/* Add additional SwiperSlides if you have more images */}
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
                            Category: {Category}
                        </Typography>
                        <Rating name="read-only" value={rating} readOnly />
                        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'start', gap: '10px' ,paddingTop:1}}>
                        <Avatar src={image} sx={{ width: 32, height: 32 }} /> {creator}
                        </Typography>
                        
                    </CardContent>
                    <CardActions>
                        <Button variant='contained' fullWidth onClick={action} >Learn More</Button>
                    </CardActions>
                </Card>
            </Container>
        </StyledProductCard>
    );
};

ProductCard.propTypes = {
    children: propTypes.array
}

export default ProductCard;