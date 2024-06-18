import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components

// MUI
import {
    Box, Container, Grid, Typography, Divider, Button, TextField,
} from '@mui/material';

// propTypes
import propTypes from 'prop-types';
import CustomCard from '../UI/CustomCard';

// Import the utility function
import ProductsTape from '../UI/ProductsTape';
import { useCart } from '../../utils/CartContext';
import RenderCartItem from '../RenderCartItem/RenderCartItem';

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, cartTotal } = useCart();

    const [discountCode, setDiscountCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);

    


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
                                    {cartItems.map((product, index) => (
                                        <RenderCartItem
                                                cartProduct={product}
                                                key={index}
                                                index={index}
                                                forCart
                                            />
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
                                                            size='small'
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
                                                                ${cartTotal - discountAmount}
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
                <Divider width={'100%'} />
                <Grid item xxs={12} mt={6}>
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
