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
import MainSlider from '../MainSlider'
import ProductsTape from '../UI/ProductsTape'

//Styled Components
const StyledCliserDigitalMarketHomePage = styled(Box)(
    () => ({
    
    })
)


const CliserDigitalMarketHomePage = () => {


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
                    <ProductsTape title="Recommended" Cat="Web Page Front-End Templates" />
                    <ProductsTape title="WordPress" Cat="" />
                    <ProductsTape title="Blog" Cat="Portfolio Templates" />
                </Grid>
            </Container>
        </StyledCliserDigitalMarketHomePage>
    );
};

export default CliserDigitalMarketHomePage;