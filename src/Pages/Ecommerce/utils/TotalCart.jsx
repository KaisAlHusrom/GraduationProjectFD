import { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { CartData } from '../data/CartData';
import { productList } from '../data/CradsData';

const getProductById = (productId) => {
    return productList.find(product => product.id === productId);
};

const TotalCart = () => {
    const [CartTotal, setCartTotal] = useState(0);
    const cartItems = CartData;

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

    return CartTotal;
};

TotalCart.propTypes = {
    children: propTypes.array
};

export default TotalCart;
