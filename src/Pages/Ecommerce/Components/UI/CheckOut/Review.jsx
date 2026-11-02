import { Fragment, useMemo } from 'react';
import { Box, Divider, Grid, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import propTypes from 'prop-types';

import { useCart } from '../../../utils/CartContext';

const StyledReview = styled(Box)(() => ({}));

const payments = [
  { name: 'Card type:', detail: 'Visa' },
  { name: 'Card holder:', detail: 'Mr. John Smith' },
  { name: 'Card number:', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date:', detail: '04/2024' },
];


const Review = () => {
  const {cartItems} = useCart()
  // console.log(cartItems)
  const shippingFee = 0;
  const {cartTotal} = useCart();
  const totalWithShipping = cartTotal + shippingFee;

  return (
    <StyledReview>
      <Stack spacing={2}>
        <List disablePadding>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary="Products"
              secondary={`${cartItems.length} items were selected`}
            />
            <Typography variant="body1" fontWeight="medium">
              ${cartTotal}
            </Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Shipping" secondary="Plus taxes" />
            <Typography variant="body2">${shippingFee}</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              ${totalWithShipping}
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
  children: propTypes.array,
};

export default Review;
