//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box, Grid
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import NavBar from './Components/NavBar'
import MainSlider from './Components/MainSlider'
import ProductCard from './Components/ProductCard'

//Styled Components
const StyledEcommerceMain = styled(Box)(
    ({ theme }) => ({
    
    })
)


const EcommerceMain = () => {
    const handleLearnMoreClick = () => {
        console.log('Learn more button clicked');
      };
    return (
        <StyledEcommerceMain>
            <NavBar />
            <MainSlider />
            <Grid
                item xs={12} sm={6} md={6} lg={4}
                container
                spacing={1}
                justifyContent={'center'} // Center the content on small screens
                alignItems="center"
                style={{ minHeight: '20vh',marginTop:'10px' }} // Adjusted minHeight for better visibility
            >
                <ProductCard 
                title="Card Title"
                description="This is a card description."
                image="https://source.unsplash.com/random"
                action={handleLearnMoreClick}
                price={30.00}
                rating={4} />
            </Grid>
            
        </StyledEcommerceMain>
    );
};

EcommerceMain.propTypes = {
    children: propTypes.array
}

export default EcommerceMain;