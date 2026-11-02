//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

import config from '../../../../../Config.json'

//Components


//MUI
import {

    ListItem,
    ListItemText,
    Typography,
    Box, Grid, IconButton, Avatar,
    Rating
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

//propTypes 
import propTypes from 'prop-types'
import useEffectFetchData from '../../../../Helpers/customHooks/useEffectFetchData'
import { fetchSpecificUserProducts } from '../../../../Services/UserServices/Services/productsUsersService'
import { useCart } from '../../utils/CartContext'
import { useNavigate } from 'react-router-dom'
import { ReviewCalculateSMA } from '../../utils/functions';
import { productsImagesFolderName } from '../../../../Services/AdminServices/Services/productsService';
import { usersProfileImagesFolderName } from '../../../../Services/AdminServices/Services/usersService';
import { navigatePortfolio } from '../../../../Helpers/navigations';

//Styled Components



const RenderCartItem = ({cartProduct, forCart, index})=>{
    const navigate = useNavigate()

    
    const {cartItems, removeFromCart} = useCart()
    const params = useMemo(() => {
        return [
            cartProduct.id
        ]
    }, [cartProduct])

    const handleRemoveCartBtn = (productId) => {
        removeFromCart(productId)
    };

    const {data: product} = useEffectFetchData(fetchSpecificUserProducts, params, true, true)

    const handleItemClick = () => {
        // Navigate to the ProductView page with the product index as a parameter
        navigate(`/cliser-digital-market/productView/${product?.id}`);
    };

    const mainImagePath = useMemo(() => {
        if(!product) {
            return ""
        }
        return `${config.ServerImageRoute}/${productsImagesFolderName}/${product?.product_main_image_name}`
    }, [product])

    const creatorImagePath = `${config.ServerImageRoute}/${usersProfileImagesFolderName}/${product?.user?.profile_image}`;



    if(forCart) {
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
                                        src={mainImagePath}
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
                                    <Typography onClick={() => navigatePortfolio(product.user.id)} variant="h6" sx={{ cursor: 'pointer', display: 'flex', alignItems: 'start', gap: '10px' }}>
                                        <Avatar src={creatorImagePath} sx={{ width: 32, height: 32 }} /> 
                                        {product.user.first_name + " " + product.user.last_name}
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
        )
    }
    return(
        <div>
        {product && (
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText
                    sx={{ mr: 2 }}
                    primary={product.product_name}
                    secondary={product.product_description}
                    />
                    <Typography variant="body1" fontWeight="medium">
                    ${product.product_price}
                    </Typography>
                </ListItem>
        )}
        </div>
    );
};

RenderCartItem.propTypes = {
    children: propTypes.array
}

export default RenderCartItem;