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
    Container
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'


//Styled Components
const StyledProductCard = styled(Box)(
    ({ theme }) => ({
        width: '100%', // Make the card take the full width of its container
        padding: theme.spacing(0.5), // Add padding to the card
        marginBottom:"20px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    })
)


const ProductCard = (props) => {
    const {
        title, description, image, action,price,rating
    }=props


    return (
        <StyledProductCard>
            <Container id="Cards" maxWidth="lg">
                <Card sx={{ maxWidth: 600 }}>
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