//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import { CartData } from '../../data/CartData'
import { productList } from '../../data/CradsData'
import NavBar from '../NavBar'

//MUI
import {
    Box,Container,Grid,Typography,Divider,Button,
    Rating
} from '@mui/material'
import { styled } from '@mui/system'


//propTypes 
import propTypes from 'prop-types'
import Footer from '../Footer'
import CustomCard from '../UI/CustomCard'

//Styled Components
const StyledCart = styled(Box)(
    ({ theme }) => ({
    
    })
)

const getProductById = (productId) => {
    return productList.find(product => product.id === productId);
  };

const Cart = () => {
    const cartItems = CartData;
    const itemsPurchase = [
        { contentTitle: "Price", content: "" }, // Leave the content empty initially
      ];
    const renderCartItem = (productId, index) => {
        const product = getProductById(productId);
        itemsPurchase[0].content = `$${product.price}`;
        
        return (
          <li key={index}>
            {product && (
              <div>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                {/* Add more product information as needed */}
              </div>
            )}
          </li>
        );
      };

return (
    <div>
        <NavBar style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}/>
        <Container sx={{ marginTop: '100px',minHeight:"67vh" }} maxWidth="lg">
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                    Cart
                </Typography>
                <Divider />
            </Grid>
            <Grid item xs={12} >
                <Box 
                    my={4}
                    display="flex"
                    alignItems="center"
                    gap={4}
                    p={2}
                    
                    sx={{ border: '2px solid grey' }}
                    >
                    {cartItems.length === 0 ? (
                        <Button variant="outlined"
                        sx={{
                            margin: 'auto', // Center horizontally
                        }}>
                        Browse Products
                        </Button>
                    ) : (
                        
                        <CustomCard title="product" SecondTitle="the Cost" items={itemsPurchase}>
                            
                                {cartItems.map((productId, index) => renderCartItem(productId, index))}
                            
                        </CustomCard>
                )}
                </Box>
            </Grid>
        </Grid>
        
        </Container>
        <Footer />
    </div>
    );
};
export default Cart;

Cart.propTypes = {
    children: propTypes.array
}