//React
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Components
import { productList } from '../../data/CradsData';
//MUI
import {
    Box, Container, Grid, Typography, Divider, Button,

} from '@mui/material';


//propTypes 
import propTypes from 'prop-types';
import CustomCard from '../UI/CustomCard';
import { CartData } from '../../data/CartData';

// Import the utility function
import { renderCartItem } from '../../utils/RenderCartItems';

const getProductById = (productId) => {
    return productList.find(product => product.id === productId);
};

const Cart = () => {
    const navigate = useNavigate();
    const [CartTotal, setCartTotal] = useState(0);
    const [cartItems, setCartItems] = useState(() => {
        const cart_data = JSON.parse(localStorage.getItem("cart_data"));
        if (cart_data) {
            return cart_data;
        }
        return [];
    });

    const handleRemoveCartBtn = (productId) => {
        const updatedCartItems = cartItems.filter(id => id !== productId);
        setCartItems(updatedCartItems);
        localStorage.setItem("cart_data", JSON.stringify(updatedCartItems));

        // Assuming CartData is a global or higher-level state or variable
        const index = CartData.indexOf(productId);
        if (index > -1) {
            CartData.splice(index, 1);
        }
        window.location.reload();
    };

    const total = useCallback(() => {
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
    }, [cartItems]);

    useEffect(() => {
        total();
    }, [cartItems, total]);

    const handleCheckOutClick = () => {
        // Navigate to the ProductView page with the product index as a parameter
        navigate(`/cliser-digital-market/checkout`);
    };
    const handleBrowseClick = () => {
        // Navigate to the ProductView page with the product index as a parameter
        navigate(`/cliser-digital-market/main`);
    };

    const itemsPurchase = [
        { contentTitle: "", content: "" }, // Leave the content empty initially
    ];

    return (
<div>
            <Container sx={{ marginTop: '100px', minHeight: "67vh" }} maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>
                            Cart
                        </Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            my={3}
                            display="flex"
                            alignItems="center"
                            gap={4}
                            p={2}
                            sx={{ marginTop: "-1rem" }}
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
                                        items={itemsPurchase}
                                        sx={{ marginBottom: 2 }} // Set width to 100% and add margin bottom
                                    >
                                        {cartItems.map((productId, index) => (
                                            renderCartItem(productId, index, cartItems, handleRemoveCartBtn, navigate)
                                        ))}
                                    </CustomCard>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginTop: '1rem', width: { xs: "100%", sm: "60%", md: "40%" }, marginLeft: "auto" }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Box>
                                                    <Typography variant="h5" sx={{ textAlign: 'left' }}>
                                                        Total
                                                    </Typography>
                                                </Box>
                                                <Box>
                                                    <Typography variant="h5" sx={{ textAlign: 'left' }}>
                                                        Discount
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Box>
                                                    <Typography variant="h5">
                                                        ${CartTotal}
                                                    </Typography>
                                                </Box>
                                                <Box>
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
        </div>
    );
};

export default Cart;

Cart.propTypes = {
    children: propTypes.array
};
