//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components
import { productList } from '../../../data/CradsData'

//MUI
import {
    Box,List,ListItem,ListItemText,Typography
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import TotalCart from '../../../utils/TotalCart'
import useEffectFetchData from '../../../../../Helpers/customHooks/useEffectFetchData'
import { fetchSpecificUserProducts } from '../../../../../Services/UserServices/Services/productsUsersService'
import { useCart } from '../../../utils/CartContext'
import RenderCartItem from '../../RenderCartItem/RenderCartItem'

//Styled Components
const StyledInfo = styled(Box)(
    () => ({
    
    })
)
  const getProductById = (productId) => {
    return productList.find(product => product.id === productId);
  };


const Info = () => {
    const {cartItems, cartTotal} = useCart()
    
    
    return (
        <StyledInfo>
            <>
            <Typography variant="subtitle2" color="text.secondary">
                Total
            </Typography>
            <Typography variant="h4" gutterBottom>
                ${cartTotal}
            </Typography>
            <List disablePadding>
                {cartItems.map((product, index) => (
                    <RenderCartItem
                    cartProduct={product}
                        key={index}
                    />
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

