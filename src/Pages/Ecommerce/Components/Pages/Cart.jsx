//React
import {
    useEffect,useState
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { useLocation } from 'react-router-dom';
import {productList} from '../../data/CradsData'
//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledCart = styled(Box)(
    ({ theme }) => ({
    
    })
)


const Cart = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('productId');
    return (
        <StyledCart>
            Id:{productId}
        </StyledCart>
    );
};

Cart.propTypes = {
    children: propTypes.array
}

export default Cart;