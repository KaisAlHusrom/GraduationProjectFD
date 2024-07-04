import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Container, Grid, Typography, Divider, Button, TextField, Slide
} from '@mui/material';
import propTypes from 'prop-types';
import CustomCard from '../UI/CustomCard';
import ProductsTape from '../UI/ProductsTape';
import { useCart } from '../../utils/CartContext';
import RenderCartItem from '../RenderCartItem/RenderCartItem';
import { handleCheckoutPage } from '../../../../Services/CheckoutServices/checkoutProducts';
import { navigateCliserStoreProductsPage, navigateLoginPage, navigateStoreMainPage } from '../../../../Helpers/navigations';
import { useSelector } from 'react-redux';

const Cart = () => {
    const { cartItems, cartTotal, setCartItems } = useCart();
    const [discountCode, setDiscountCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);

    
    const user = useSelector(state => state.authSlice.user)

    //Handle go to stripe payment page
    const handleCheckOutClick = async () => {
        // if user not logged in
        if(!user) {
            navigateLoginPage()
            return
        }
        
        const data = {
            order_items: cartItems
        }
        const checkoutRes = await handleCheckoutPage(data)
        if(checkoutRes.success) {
            setCartItems(() => [])
            window.location = checkoutRes.data.url;
        } else {
            console.error("Couldn't checkout");
        }
    };

    const handleBrowseClick = () => {
        navigateCliserStoreProductsPage()
    };

    const handleApplyDiscount = () => {
        const couponDiscounts = {
            'SAVE10': 10,
            'SAVE20': 20,
            'SAVE30': 30,
        };

        if (couponDiscounts[discountCode]) {
            setDiscountAmount(couponDiscounts[discountCode]);
        } else {
            alert('Invalid coupon code');
        }
    };
    const itemsPurchase = [
        { contentTitle: "", content: "" },
    ];

    return (
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
                            <Button
                                variant="outlined"
                                onClick={handleBrowseClick}
                                sx={{
                                    margin: 'auto',
                                }}
                            >
                                Browse Products
                            </Button>
                        ) : (
                            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                                <Box style={{ width: '100%' }}>
                                    <CustomCard
                                        title={`product`}
                                        items={itemsPurchase}
                                        sx={{ marginBottom: 2 }}
                                    >
                                        {cartItems.map((product, index) => (
                                            <RenderCartItem
                                                cartProduct={product}
                                                key={index}
                                                index={index}
                                                forCart
                                            />
                                        ))}
                                    </CustomCard>
                                    <Grid container spacing={2} justifyContent="space-between">
                                        <Grid item xxs={12} md={5}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1rem' }}>
                                                <TextField
                                                    id="Discount"
                                                    label="Discount Code"
                                                    fullWidth
                                                    size='small'
                                                    value={discountCode}
                                                    onChange={(e) => setDiscountCode(e.target.value)}
                                                />
                                                <Button
                                                    variant='contained'
                                                    fullWidth
                                                    size='small'
                                                    onClick={handleApplyDiscount}
                                                    sx={{ marginTop: '1rem' }}
                                                >
                                                    Apply
                                                </Button>
                                            </Box>
                                        </Grid>
                                        <Grid item xxs={12} md={5}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1rem' }}>
                                                <Typography variant="h5" sx={{ textAlign: 'left' }}>
                                                    Discount: ${discountAmount}
                                                </Typography>
                                                <Typography variant="h5" sx={{ textAlign: 'left' }}>
                                                    Total: ${cartTotal - discountAmount}
                                                </Typography>
                                                <Button
                                                    variant='contained'
                                                    fullWidth
                                                    onClick={handleCheckOutClick}
                                                    sx={{ marginTop: '1rem' }}
                                                >
                                                    Checkout
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Slide>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                    <Box mt={6}>
                        <ProductsTape title="You Might Like" />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cart;

Cart.propTypes = {
    children: propTypes.array
};
