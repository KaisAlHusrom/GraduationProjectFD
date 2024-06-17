import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import { NewList } from '../../data/CradsData';
// MUI
import {
    Box, Container, Grid, Typography, Divider, Button, TextField,
} from '@mui/material';

// propTypes
import propTypes from 'prop-types';
import CustomCard from '../UI/CustomCard';

// Import the utility function
import { renderCartItem } from '../../utils/RenderCartItems';
import ProductsTape from '../UI/ProductsTape';
import { useCart } from '../../utils/CartContext';

const getProductById = (productId) => {
    return NewList.find(product => product.id === productId);
};

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart } = useCart();
    const [CartTotal, setCartTotal] = useState(0);
    const [discountCode, setDiscountCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);

    const handleRemoveCartBtn = (productId) => {
        removeFromCart(productId)
    };

    const total = useCallback(() => {
        let totalVal = 0;
        cartItems.forEach(itemId => {
            const product = getProductById(itemId);
            if (product) {
                totalVal += parseFloat(product.product_price);
            }
        });
        setCartTotal(totalVal);
    }, [cartItems]);

    useEffect(() => {
        total();
    }, [cartItems, total]);

    const handleCheckOutClick = () => {
        navigate(`/cliser-digital-market/checkout`);
    };

    const handleBrowseClick = () => {
        navigate(`/cliser-digital-market`);
    };

    const handleApplyDiscount = () => {
        // Example coupon codes and their corresponding discount amounts
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
                            <Button variant="outlined"
                                onClick={handleBrowseClick}
                                sx={{
                                    margin: 'auto',
                                }}>
                                Browse Products
                            </Button>
                        ) : (
                            <div style={{ width: '100%' }}>
                                <CustomCard
                                    title={`product`}
                                    items={itemsPurchase}
                                    sx={{ marginBottom: 2 }}
                                >
                                    {cartItems.map((productId, index) => (
                                        renderCartItem(productId, index, cartItems, handleRemoveCartBtn, navigate)
                                    ))}
                                </CustomCard>
                                <Box sx={{ width: '100%' }}>
                                    <Grid container spacing={2} justifyContent="space-between">
                                        <Grid item xxs={12} md={5}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1rem', width: '100%' }}>
                                                <Grid container spacing={1}>
                                                    <Grid item xxs={6}>
                                                        <Box>
                                                            <TextField
                                                                id="Discount"
                                                                label="Discount Code"
                                                                fullWidth
                                                                size='small'
                                                                value={discountCode}
                                                                onChange={(e) => setDiscountCode(e.target.value)}
                                                                sx={{ height: "100%" }}
                                                            />
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xxs={6}>
                                                        <Button
                                                            variant='contained'
                                                            fullWidth
                                                            size='large'
                                                            onClick={handleApplyDiscount}
                                                            sx={{ height: "100%" }}>
                                                            Apply
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                        <Grid item xxs={12} md={5}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1rem', width: '100%' }}>
                                                <Grid container spacing={1}>
                                                    <Grid item xxs={6}>
                                                        <Box>
                                                            <Typography variant="h5" sx={{ textAlign: 'left' }}>
                                                                Discount
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="h5" sx={{ textAlign: 'left' }}>
                                                                Total
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xxs={6}>
                                                        <Box>
                                                            <Typography variant="h5">
                                                                ${discountAmount}
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="h5">
                                                                ${CartTotal - discountAmount}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xxs={12}>
                                                        <Button
                                                            variant='contained'
                                                            fullWidth
                                                            onClick={handleCheckOutClick}>
                                                            Checkout
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </div>
                        )}
                    </Box>
                </Grid>
                <Grid item xxs={12}>
                    <ProductsTape title="You Might Like" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cart;

Cart.propTypes = {
    children: propTypes.array
};
