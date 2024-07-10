import { useMemo, useRef, useState } from 'react';
import {
  Box, Typography, Container,
  Grid, IconButton, Divider, Button, Skeleton
} from '@mui/material';
import { styled } from '@mui/system';
import ProductCard from '../ProductCard';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import useEffectFetchData from '../../../../Helpers/customHooks/useEffectFetchData';
import { fetchSpecificUserProductsCategories } from '../../../../Services/UserServices/Services/productCategoriesUsersService';
import { navigateCliserStoreProductsPage} from '../../../../Helpers/navigations';
import useFetchData from '../../../../Helpers/customHooks/useFetchData';
import { fetchUserProducts } from '../../../../Services/UserServices/Services/productsUsersService';

//Styled Components
const StyledProductsTape = styled(Box)(
  () => ({
    marginTop: 15,
    borderRadius: '15px',
    overflow: 'hidden', // Prevent overflow
    width: '100%',
    padding: '10px 0', // Add padding
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add box shadow
  })
);

const ScrollContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto', // Allow horizontal scrolling
  gap: '16px',
  padding: '16px 40px',
  position: 'relative',
  scrollbarWidth: 'none', // Hide scrollbar
  '&::-webkit-scrollbar': {
    display: 'none', // Hide scrollbar in Webkit-based browsers
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2), // Add padding for small screens
    paddingRight: theme.spacing(2),
  },
  '& > *': {
    flex: '0 0 auto', // Ensure children are sized properly
  }
}));

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
  '&:disabled': {
    color: theme.palette.action.disabled,
  },
}));

const ProductsTape = ({ title, Cat }) => {
  const [filters, setFilters] = useState([]);
  const [sorts, setSorts] = useState([]);

  const scrollContainerRef = useRef(null);
  
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      scrollContainerRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: 'smooth' });
    }
  };

  
  const params = useMemo(() => {
    return [Cat?.id];
  }, [Cat]);
  
  
  const { data: allProducts, loading } = useFetchData(fetchUserProducts, 'all', filters, sorts, title === "You Might Like", null);
  const { download: productsDownload, data: updatedCat } = useEffectFetchData(fetchSpecificUserProductsCategories, params,
    title !== "You Might Like", true);
    const products = useMemo(() => {
      return title === "You Might Like" ? allProducts : updatedCat?.products
    }, [allProducts, title, updatedCat?.products])
    
    
    const handleAllproductsClick = () => {
      navigateCliserStoreProductsPage()
    };
    
    return (
      <StyledProductsTape>
      <Container sx={{ paddingTop: '20px' }} maxWidth="lg">
        <Grid>
          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
            <Grid item xxs={12} xs={6} md={6}>
              <Typography variant="h4" sx={{ paddingTop: 1, paddingBottom: 1, fontWeight: 'bold' }}>
                {title}
              </Typography>
            </Grid>
            <Grid item xxs={12} xs={6} md={6} display="flex" justifyContent="flex-end">
              <Button variant='contained' size='large' onClick={handleAllproductsClick} sx={{ fontWeight: 'bold' }}>
                All Products
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ marginBottom: '20px' }} />
          <Box sx={{ position: 'relative' }}>
            <ScrollButton style={{ left: 0 }} onClick={() => scroll('left')}>
              <ArrowBackIosIcon />
            </ScrollButton>
            <ScrollContainer ref={scrollContainerRef}>
              {
                !productsDownload && !loading
                  ? products && products?.length > 0
                    ? products.map((product, key) => {
                      return (
                        <Box
                          key={key}
                          width={280}
                        >
                          <ProductCard
                            product={product}
                          />
                        </Box>
                      );
                    })
                    : <Typography color={'info.main'}>
                      There are no products.
                    </Typography>
                  : <>
                    <Skeleton width={'300px'} height={'400px'} />
                    <Skeleton width={'300px'} height={'400px'} />
                    <Skeleton width={'300px'} height={'400px'} />
                    <Skeleton width={'300px'} height={'400px'} />
                  </>
              }
            </ScrollContainer>
            <ScrollButton style={{ right: 0 }} onClick={() => scroll('right')}>
              <ArrowForwardIosIcon />
            </ScrollButton>
          </Box>
        </Grid>
      </Container>
    </StyledProductsTape>
  );
}

export default ProductsTape;
