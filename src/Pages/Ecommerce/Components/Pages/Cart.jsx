//React
import {
    
} from 'react'

import {
    
} from 'react-redux'
import { useNavigate} from 'react-router-dom';

//Components
import { CartData } from '../../data/CartData'
import { productList } from '../../data/CradsData'
import NavBar from '../NavBar'


//MUI
import {
    Box,Container,Grid,Typography,Divider,Button,
    Rating, IconButton,Avatar
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system'


//propTypes 
import propTypes from 'prop-types'
import Footer from '../Footer'
import CustomCard from '../UI/CustomCard'

//Styled Components
const StyledCart = styled(Box)(
    ({ theme }) => ({
    
    })
)

const getProductById = (productId) => {
    return productList.find(product => product.id === productId);
  };

const Cart = () => {
    const Navigate = useNavigate();
    const cartItems = CartData;
    const itemsPurchase = [
        { contentTitle: "", content: "" }, // Leave the content empty initially
    ];
    const renderCartItem = (productId, index) => {
        const product = getProductById(productId);
        const handleItemClick = () => {
            // Navigate to the ProductView page with the product index as a parameter
            Navigate(`/productView/${product.id}`);
        }
        return (
            <div>
                {product && (
                    <li key={index} style={{ listStyleType: 'none', borderBottom: index === cartItems.length - 1 ? 'none' : '1px solid grey'  }}>
                    <Grid container>
                        {/* Left part: Image, Title, and Creator */}
                        <Grid item xs={6}>
                        <Box display="flex" alignItems="center">
                            {/* Image */}
                            <Box mr={2}>
                            <img src={product.image} alt={product.title} style={{ width: 100, height: 100, objectFit: 'cover' }}
                            onClick={handleItemClick} />
                            </Box>
                            {/* Title and Creator */}
                            <Box sx={{marginTop:"-1rem",marginBottom:"1.2rem"}}>
                            <a href="#" onClick={handleItemClick} style={{ textDecoration: 'none' }}>
                            <h2 style={{ marginBottom: '0.5rem',color:"white"}}>{product.title}</h2>
                            </a>
                            <Rating value={product.rating} readOnly style={{ marginBottom: '0.5rem' }} />
                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'start', gap: '10px'}}>
                            <Avatar src={product.image} sx={{ width: 32, height: 32 }} /> {product.creator}
                            </Typography>
                            </Box>
                        </Box>
                        </Grid>
                        {/* Right part: Price */}
                        <Grid item xs={6}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            {/* Price */}
                            <Box sx={{paddingTop:"20px",paddingLeft:"8px"}}>
                                <h2>${product.price}</h2>
                            </Box>
                            {/* Delete Icon */}
                            <Box sx={{paddingTop:"20px"}}>
                                <IconButton aria-label="Delete" onClick={() => {}}>
                                <DeleteIcon color='warning' />
                                </IconButton>
                            </Box>
                        </Box>
                        </Grid>
                    </Grid>
                    </li>
              )}
              </div>
        );
      };

return (
    <div>
        <NavBar style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}/>
        <Container sx={{ marginTop: '100px',minHeight:"67vh" }} maxWidth="lg">
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                    Cart
                </Typography>
                <Divider />
            </Grid>
            <Grid item xs={12} >
                <Box 
                    my={3}
                    display="flex"
                    alignItems="center"
                    gap={4}
                    p={2}
                    sx={{ marginTop:"-1rem" }}
                    >
                    {cartItems.length === 0 ? (
                        <Button variant="outlined"
                        sx={{
                            margin: 'auto', // Center horizontally
                        }}>
                        Browse Products
                        </Button>
                    ) : (
                        <div style={{ width: '100%' }}>
                            <CustomCard
                                title={`product`} // Example title
                                SecondTitle="the Cost" // Example second title
                                items={itemsPurchase}
                                sx={{ marginBottom: 2 }} // Set width to 100% and add margin bottom
                                >
                                {cartItems.map((productId, index) => (
                                    renderCartItem(productId, index)
                                ))}
                            </CustomCard>

                        </div>       
                )}
                </Box>
            </Grid>
        </Grid>
        
        </Container>
        <Footer />
    </div>
    );
};
export default Cart;

Cart.propTypes = {
    children: propTypes.array
}