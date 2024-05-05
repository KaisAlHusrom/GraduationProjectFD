//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import { CartData } from '../../data/CartData'

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'


//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledCart = styled(Box)(
    ({ theme }) => ({
    
    })
)



const Cart = () => {
    const cartItems = CartData;

    return (
        <StyledCart>
             <div>
      <h1>Cart</h1>
      <ul>
        {cartItems.map((productId, index) => (
          <li key={index}>{productId}</li>
        ))}
      </ul>
    </div>
        </StyledCart>
    );
};
export default Cart;

Cart.propTypes = {
    children: propTypes.array
}