//React
import { useRef } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,Typography, Container,
    Grid,IconButton,Divider
} from '@mui/material'
import { styled } from '@mui/system'
import ProductCard from '../ProductCard'
import { productList } from '../../data/CradsData'
import { useNavigate } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

//Styled Components
const StyledProductsTape = styled(Box)(
    (theme) => ({
    backgroundColor: "#111111",
    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
    borderRadius:"15px"

    })
)

// Styled Components
const ScrollContainer = styled(Box)({
    display: 'flex',
    overflowX: 'hidden',
    gap: '16px',
    padding: '16px 0',
    position: 'relative',
});

const ScrollButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    '&:hover': {
        backgroundColor: theme.palette.background.default,
    },
}));

const ProductsTape = ({title}) => {
    const Navigate = useNavigate();
    const handleLearnMoreClick = (index) => {
        // Navigate to the ProductView page with the product index as a parameter
        Navigate(`/cliser-digital-market/productView/${index}`);
    };
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollAmount = direction === 'left' ? -clientWidth/2 : clientWidth/2;
            scrollContainerRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <>
        <StyledProductsTape>
            <Container sx={{paddingTop:'20px' }} maxWidth="lg">
                <Typography variant="h4" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                    {title}
                </Typography>
                <Divider />
                <Box sx={{ position: 'relative' }}>
                    <ScrollButton style={{ left: 0 }} onClick={() => scroll('left')}>
                        <ArrowBackIosIcon />
                    </ScrollButton>
                    <ScrollContainer ref={scrollContainerRef}>
                    {productList.map((product, index) => (
                            <Grid key={index} item xs={12} sm={4} md={4} lg={3}>
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
                    </ScrollContainer>
                    <ScrollButton style={{ right: 0 }} onClick={() => scroll('right')}>
                        <ArrowForwardIosIcon />
                    </ScrollButton>
                </Box>
            </Container>
        </StyledProductsTape>
        </>
    );
};

export default ProductsTape;