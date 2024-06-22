import { Box, Grid, Typography, IconButton, Avatar } from '@mui/material';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import { NewList } from '../data/CradsData';
import { ReviewCalculateSMA } from './functions';

const getProductById = (productId) => {
    return NewList.find(product => product.id === productId);
};

export const renderCartItem = (productId, index, cartItems, handleRemoveCartBtn, navigate) => {
    const product = getProductById(productId);

    const handleItemClick = () => {
        // Navigate to the ProductView page with the product index as a parameter
        navigate(`/cliser-digital-market/productView/${product.id}`);
    };

    return (
        <div key={index}>
            {product && (
                <li
                    key={index}
                    style={{
                        listStyleType: 'none',
                        borderBottom: index === cartItems.length - 1 ? 'none' : '1px solid grey',
                    }}
                >
                    <Grid container>
                        {/* Left part: Image, Title, and Creator */}
                        <Grid item xxs={12} xs={12} sm={6} md={6} lg={6}>
                            <Box display="flex" alignItems="center">
                                {/* Image */}
                                <Box mr={2}>
                                    <img
                                        src={product.product_main_image_name}
                                        alt={product.product_name}
                                        style={{ width: 100, height: 100, objectFit: 'cover' }}
                                        onClick={handleItemClick}
                                    />
                                </Box>
                                {/* Title and Creator */}
                                <Box sx={{ marginTop: '-1rem', marginBottom: '1.2rem' }}>
                                    <a href="#" onClick={handleItemClick} style={{ textDecoration: 'none' }}>
                                        <h2 style={{ marginBottom: '0.5rem', color: 'white' }}>{product.product_name}</h2>
                                    </a>
                                    <Rating value={ReviewCalculateSMA(product.product_reviews)} readOnly style={{ marginBottom: '0.5rem' }} />
                                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'start', gap: '10px' }}>
                                        <Avatar src={product.user.profile_image} sx={{ width: 32, height: 32 }} /> {product.user.first_name}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        {/* Right part: Price */}
                        <Grid item xxs={12} xs={12} sm={6} md={6} lg={6}>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                {/* Price */}
                                <Box sx={{ paddingTop: '20px', paddingLeft: '8px' }}>
                                    <h2>${product.product_price}</h2>
                                </Box>
                                {/* Delete Icon */}
                                <Box sx={{ paddingTop: '20px' }}>
                                    <IconButton aria-label="Delete" onClick={() => handleRemoveCartBtn(product.id)}>
                                        <DeleteIcon color="warning" />
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
