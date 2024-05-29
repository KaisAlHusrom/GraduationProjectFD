import { useCallback, useEffect, useState } from 'react';
import { productList } from '../data/CradsData';
import { useMemo } from 'react';

const getProductById = (productId) => {
    return productList.find(product => product.id === productId);
};

const TotalCart = () => {
    const [cartTotal, setCartTotal] = useState(0);
    const cartItems = useMemo(() => {
        const cart_data = JSON.parse(localStorage.getItem("cart_data"));
        return cart_data || [];
    }, []);

    const calculateTotal = useCallback(() => {
        let totalVal = 0;
        cartItems.forEach(itemId => {
            const product = getProductById(itemId);
            if (product) {
                totalVal += product.price;
            }
        });
        setCartTotal(totalVal);
    }, [cartItems]);

    useEffect(() => {
        calculateTotal();
    }, [cartItems, calculateTotal]);

    return cartTotal;
};

export default TotalCart;
