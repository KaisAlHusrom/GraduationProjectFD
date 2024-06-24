//React
import { } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,List,Typography
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { useCart } from '../../../utils/CartContext'
import RenderCartItem from '../../RenderCartItem/RenderCartItem'

//Styled Components
const StyledInfo = styled(Box)(
    () => ({
    
    })
)



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

