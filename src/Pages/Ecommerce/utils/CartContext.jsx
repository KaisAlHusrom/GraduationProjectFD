import { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleOpenSnackbar, setSnackbarIsError, setSnackbarMessage } from '../../../Redux/Slices/snackbarOpenSlice';

//propTypes 
import propTypes from 'prop-types'

// Create a context for the cart
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const dispatch = useDispatch()

  const [cartTotal, setCartTotal] = useState(0)
  const [cartItems, setCartItems] = useState(() => {
    const cart_data = JSON.parse(localStorage.getItem("cart_data"));
    return cart_data ? cart_data : [];
  });

  // Sync the cart state with local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart_data", JSON.stringify(cartItems));

    //TODO: change this to fetch data from db
    const total = cartItems.reduce((sum, item) => sum + Number(item.product_price), 0);
    setCartTotal(total);
  }, [cartItems]);

  const user = useSelector(state => state.authSlice.user)

  //remove item from cart after login if it's product is in the cart
  useEffect(() => {
    if(user) {
        const updated = cartItems?.filter(item => item.creatorId !== user.id)
        setCartItems(() => updated)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  // Add item to cart
  const addToCart = (product) => {
    if(user) {
      if(user?.id === product.creatorId) {
            dispatch(setSnackbarMessage({message: "You can't add your own product to cart."}))
            dispatch(setSnackbarIsError({isError: true}))
            dispatch(handleOpenSnackbar())
            return
        }
    }

    setCartItems((prevCartItems) => {
      const alreadyExists = prevCartItems.find(item => item.id === product.id)
      if(alreadyExists) {
        const updatedCartItems = prevCartItems.filter(item => item.id !== product.id);
        return updatedCartItems
      }
      const updatedCartItems = [...prevCartItems, product];
      return updatedCartItems;
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(product => product.id !== productId);
      return updatedCartItems;
    });
  };

  // Calculate the total number of items in the cart
  const itemsCount = cartItems.length;




  return (
    <CartContext.Provider value={{ cartTotal, cartItems, setCartItems, addToCart, removeFromCart, itemsCount }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
    children: propTypes.any
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  return useContext(CartContext);
};
