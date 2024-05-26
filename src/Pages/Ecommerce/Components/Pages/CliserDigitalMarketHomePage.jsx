//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Container,
    Grid,
} from '@mui/material'
import { styled } from '@mui/system'
import ProductCard from '../ProductCard'
import { useNavigate } from 'react-router-dom'
import { productList } from '../../data/CradsData'
import MainSlider from '../MainSlider'

//Styled Components
const StyledCliserDigitalMarketHomePage = styled(Box)(
    () => ({
    
    })
)


const CliserDigitalMarketHomePage = () => {

    const Navigate = useNavigate();
    const handleLearnMoreClick = (index) => {
        // Navigate to the ProductView page with the product index as a parameter
        Navigate(`/cliser-digital-market/productView/${index}`);
    };

    return (
        <StyledCliserDigitalMarketHomePage>
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
        </StyledCliserDigitalMarketHomePage>
    );
};

export default CliserDigitalMarketHomePage;