//React
import { Fragment, useEffect, useState } from 'react'

import {
    
} from 'react-redux'

//Components
import { productList } from '../../data/CradsData'
import { CartData } from '../../data/CartData'

//MUI
import {
    Box,List,ListItem,ListItemText,Typography
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledInfo = styled(Box)(
    () => ({
    
    })
)
  const getProductById = (productId) => {
    return productList.find(product => product.id === productId);
  };


const Info = () => {
    const [CartTotal, setCartTotal] = useState(0);
    const cartItems = (CartData);

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
            <Fragment>
            <Typography variant="subtitle2" color="text.secondary">
                Total
            </Typography>
            <Typography variant="h4" gutterBottom>
                ${CartTotal}
            </Typography>
            <List disablePadding>
            {cartItems.map((productId, index) => (
                renderCartItem(productId, index)
            ))}
            </List>
            </Fragment>
        </StyledInfo>
    );
};

Info.propTypes = {
    children: propTypes.array,
}

export default Info;