//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components
import { productList } from '../../../data/CradsData'
import { CartData } from '../../../data/CartData'

//MUI
import {
    Box,List,ListItem,ListItemText,Typography
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import TotalCart from '../../../utils/TotalCart'

//Styled Components
const StyledInfo = styled(Box)(
    () => ({
    
    })
)
  const getProductById = (productId) => {
    return productList.find(product => product.id === productId);
  };


const Info = () => {
    const cartItems = useMemo(() => {
        const cart_data = JSON.parse(localStorage.getItem("cart_data"));
        if(cart_data) {
            return cart_data;
        }
        return []
    }, []);
    
    const renderCartItem = (productId, index)=>{
        const product = getProductById(productId)
        return(
            <div>
            {product && (
                    <ListItem key={index} sx={{ py: 1, px: 0 }}>
                        <ListItemText
                        sx={{ mr: 2 }}
                        primary={product.title}
                        secondary={product.description}
                        />
                        <Typography variant="body1" fontWeight="medium">
                        ${product.price}
                        </Typography>
                    </ListItem>
            )}
            </div>
        );
    };

    return (
        <StyledInfo>
            <>
            <Typography variant="subtitle2" color="text.secondary">
                Total
            </Typography>
            <Typography variant="h4" gutterBottom>
                $<TotalCart/>
            </Typography>
            <List disablePadding>
                {cartItems.map((productId, index) => (
                    renderCartItem(productId, index)
                ))}
            </List>
            </>
        </StyledInfo>
    );
};

Info.propTypes = {
    children: propTypes.array,
}

export default Info;