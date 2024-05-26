import { useCallback, useEffect, useMemo, useState } from 'react';
import propTypes from 'prop-types';
import { CartData } from '../data/CartData';
import { productList } from '../data/CradsData';

const getProductById = (productId) => {
    return productList.find(product => product.id === productId);
};

const TotalCart = () => {
    const [CartTotal, setCartTotal] = useState(0);
    const cartItems = useMemo(() => {
        const cart_data = JSON.parse(localStorage.getItem("cart_data"));
        if(cart_data) {
            return cart_data;
        }
        return []
    }, []);

    const total = useCallback(() => {
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
    }, [cartItems])
    
    useEffect(() => {
        total();
    }, [cartItems, total]);

    

    return CartTotal;
};

TotalCart.propTypes = {
    children: propTypes.array
};

export default TotalCart;
