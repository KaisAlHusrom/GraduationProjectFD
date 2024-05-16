//React
import 
{

}from 'react'

import {
    
} from 'react-redux'

//Components
import NavBar from './Components/NavBar'
import MainSlider from './Components/MainSlider'
import ProductCard from './Components/ProductCard'
import Footer from './Components/Footer'
import {productList} from './data/CradsData'

//MUI
import {
    Box, Grid,Container
    
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

import { useNavigate} from 'react-router-dom';


//Styled Components
const StyledEcommerceMain = styled(Box)(
    () => ({
    
    })
)


const EcommerceMain = () => {
    const Navigate = useNavigate();
    const handleLearnMoreClick = (index) => {
        // Navigate to the ProductView page with the product index as a parameter
        Navigate(`/productView/${index}`);
      };
    return (
        <StyledEcommerceMain>
            <NavBar />
            <MainSlider />
            <Container maxWidth="lg">
            <Grid container
            justifyContent={'center'} // Center the content on small screens
            alignItems="center"
            style={{ minHeight: '20px',marginTop:'10px'}}
            sx={{
                '@media (max-width: 430px)': { // Apply styles for screens under 430px
                    display: 'block', // Turn off display flex for screens under 430px
                    },
                }}
            
            >
                {productList.map((product, index) => (
                    <Grid key={index} item xs={12} sm={6} md={6} lg={3}>
                    <ProductCard 
                        title={product.title}
                        description={product.description}
                        image={product.image}
                        price={product.price}
                        rating={product.rating}
                        creator={product.creator}
                        action={() => handleLearnMoreClick(index)}
                    />
                    </Grid>
                ))}
            </Grid>
            </Container>
            <Footer /> 
        </StyledEcommerceMain>
    );
};

EcommerceMain.propTypes = {
    children: propTypes.array
}

export default EcommerceMain;