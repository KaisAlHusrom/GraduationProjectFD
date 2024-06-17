import { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the cart
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const cart_data = JSON.parse(localStorage.getItem("cart_data"));
    return cart_data ? cart_data : [];
  });

  // Sync the cart state with local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart_data", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (productId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems, productId];
      return updatedCartItems;
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(id => id !== productId);
      return updatedCartItems;
    });
  };

  // Calculate the total number of items in the cart
  const itemsCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, itemsCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
