//React
import { Fragment, useEffect, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,Divider,Grid,List,ListItem,ListItemText,Stack,Typography
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { productList } from '../../../data/CradsData'
import { CartData } from '../../../data/CartData'
import TotalCart from '../../../utils/TotalCart'

//Styled Components
const StyledReview = styled(Box)(
    () => ({
    
    })
)
const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type:', detail: 'Visa' },
  { name: 'Card holder:', detail: 'Mr. John Smith' },
  { name: 'Card number:', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date:', detail: '04/2024' },
];
const getProductById = (productId) => {
    return productList.find(product => product.id === productId);
  };


const Review = () => {
    const cartItems = (CartData);
    const [CartTotal, setCartTotal] = useState(0);
    useEffect(() => {
        TheCartTotal();
      }, [cartItems]);
    
      const TheCartTotal = () => {
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
    const shippingFee = 9.99;
    const calculateTotalWithShipping = () => {
        const theTotal=CartTotal + shippingFee;
        return theTotal;
    };
    return (
        <StyledReview>
            <Stack spacing={2}>
                <List disablePadding>
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText
                        primary="products"
                        secondary={`${cartItems.length} items were selected`}
                        />
                        <Typography variant="body1" fontWeight="medium">
                        $<TotalCart />
                        </Typography>
                    </ListItem>
                    <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Shipping" secondary="Plus taxes" />
                    <Typography variant="body2">${shippingFee}</Typography>
                    </ListItem>
                    <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        ${calculateTotalWithShipping()}
                    </Typography>
                    </ListItem>
                </List>
                <Divider />
                <Stack
                    direction="column"
                    divider={<Divider flexItem />}
                    spacing={2}
                    sx={{ my: 2 }}
                >
                    <div>
                    <Typography variant="subtitle2" gutterBottom>
                        Shipment details
                    </Typography>
                    <Typography gutterBottom>John Smith</Typography>
                    <Typography color="text.secondary" gutterBottom>
                        {addresses.join(', ')}
                    </Typography>
                    </div>
                    <div>
                    <Typography variant="subtitle2" gutterBottom>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                        <Fragment key={payment.name}>
                            <Stack
                            direction="row"
                            spacing={1}
                            useFlexGap
                            sx={{ width: '100%', mb: 1 }}
                            >
                            <Typography variant="body1" color="text.secondary">
                                {payment.name}
                            </Typography>
                            <Typography variant="body2">{payment.detail}</Typography>
                            </Stack>
                        </Fragment>
                        ))}
                    </Grid>
                    </div>
                </Stack>
            </Stack>
        </StyledReview>
    );
};


Review.propTypes = {
    children: propTypes.array
}

export default Review;