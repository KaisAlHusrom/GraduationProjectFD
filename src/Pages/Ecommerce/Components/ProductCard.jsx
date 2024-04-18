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
    Rating
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'


//Styled Components
const StyledProductCard = styled(Box)(
    ({ theme }) => ({
    
    })
)


const ProductCard = (props) => {
    const {
        title, description, image, action,price,rating
    }=props


    return (
        <StyledProductCard>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={title}
                />
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
                    <Rating name="read-only" value={rating} readOnly />
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={action}>Learn More</Button>
                </CardActions>
            </Card>
        </StyledProductCard>
    );
};

ProductCard.propTypes = {
    children: propTypes.array
}

export default ProductCard;