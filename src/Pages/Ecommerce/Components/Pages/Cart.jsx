//React
import { useEffect, useState } from 'react'

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

//propTypes 
import propTypes from 'prop-types'
import Footer from '../Footer'
import CustomCard from '../UI/CustomCard'


const getProductById = (productId) => {
    return productList.find(product => product.id === productId);
  };


const Cart = () => {
    const Navigate = useNavigate();
    const [CartTotal, setCartTotal] = useState(0);
    const [cartItems, setCartItems] = useState(CartData);
    useEffect(() => {
        total();
      }, [cartItems]);
    
      const total = () => {
        let totalVal = 0;
        // Iterate over each item in cartItems
        cartItems.forEach(itemId => {
            // Find the product in productList by its ID
            const product = getProductById(itemId);
            // If product exists, add its price to the totalVal
            if (product) {
                totalVal += product.price;
            }
        });
        // Update the state with the total price
        setCartTotal(totalVal);
    };
    const handleCheckOutClick = () => {
        // Navigate to the ProductView page with the product index as a parameter
        Navigate(`/CheckOut`);
    }
    const handleBrowseClick = () => {
        // Navigate to the ProductView page with the product index as a parameter
        Navigate(`/Ecommerce`);
    }
      
    
    const itemsPurchase = [
        { contentTitle: "", content: "" }, // Leave the content empty initially
    ];
    const renderCartItem = (productId, index) => {
            const product = getProductById(productId);
            const handleItemClick = () => {
                // Navigate to the ProductView page with the product index as a parameter
                Navigate(`/productView/${product.id}`);
            }
        const handleItemDelete = (index) => {
            // Create a copy of the current cart items array
            const updatedCartItems = [...cartItems];
            // Remove the item at the specified index
            updatedCartItems.splice(index, 1);
            // Update the cart items state with the updated array
            setCartItems(updatedCartItems);
        };
        
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
                                <IconButton aria-label="Delete" onClick={() => handleItemDelete(index)}>
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
                        onClick={handleBrowseClick}
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
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginTop: '1rem',width:"40%", marginLeft: "auto" }}>
                                {/* Left side for the title */}
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                    <Box >
                                        <Typography variant="h5" sx={{ textAlign: 'left' }}>
                                            Total
                                        </Typography>
                                    </Box>
                                    <Box >
                                        <Typography variant="h5" sx={{ textAlign: 'left' }}>
                                           Discount
                                        </Typography>
                                    </Box>
                                    </Grid>
                                
                                {/* Right side for the content */}
                                    <Grid item xs={6}>
                                        <Box >
                                            <Typography variant="h5">
                                                ${CartTotal}
                                            </Typography>
                                        </Box>
                                        <Box >
                                            <Typography variant="h5">
                                                -$50
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                        variant='contained' 
                                        fullWidth
                                        onClick={handleCheckOutClick}>
                                            Checkout
                                        </Button>
                                    </Grid>
                                </Grid>
                                
                            </Box>
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