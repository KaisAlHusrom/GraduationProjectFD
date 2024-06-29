import { useState } from 'react';
import { Grid, Box, Dialog, IconButton, useMediaQuery, AppBar, Toolbar, Typography} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';

// Components
import SideBar from '../UI/SideBar';
import FilteredData from '../../utils/FilteredData';

// Custom Hooks
import useFetchData from '../../../../Helpers/customHooks/useFetchData';
import { fetchUserProducts } from '../../../../Services/UserServices/Services/productsUsersService';

// Styled Components
import { styled } from '@mui/system';

const StyledContainer = styled(Box)(
  ({ theme }) => ({
    padding: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2),
    },
    paddingTop: 5,
  })
);

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [query, setQuery] = useState({
    columnName: 'product_name',
    searchTerm: '',
  });

  const [filters, setFilters] = useState([]);
  const [sorts, setSorts] = useState([]);

  const { data: products, lastDataRecord } = useFetchData(fetchUserProducts, 'all', filters, sorts, true, query);

  // Dialog control state
  const [openDialog, setOpenDialog] = useState(false);
  const isMediumOrSmaller = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event) => {
    setQuery((prev) => ({
      ...prev,
      searchTerm: event.target.value,
    }));
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const handleApplyFilters = () => {
    // Apply the filters logic here
    setFilters([
      { columnName: 'category', value: selectedCategory },
      { columnName: 'price', value: selectedPrice },
      { columnName: 'rating', value: selectedRating },
    ]);
    if (isMediumOrSmaller) {
      handleCloseDialog();
    }
  };

  return (
    <StyledContainer>
      <Grid container spacing={2} style={{ minHeight: '100vh', marginTop: '40px' }}>
        {isMediumOrSmaller ? (
          <>
            <Grid item xs={12} md={12} lg={2} marginTop={3}>
              <IconButton
                onClick={handleOpenDialog}
                style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
              >
                <MenuIcon />
              </IconButton>
              <Dialog fullScreen onClose={handleCloseDialog} open={openDialog}>
                <AppBar position="static">
                  <Toolbar>
                    <Typography variant="h6" style={{ flex: 1 }}>
                      Filters
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={handleCloseDialog}>
                      <CloseIcon />
                    </IconButton>
                  </Toolbar>
                </AppBar>
                <SideBar
                  products={products}
                  query={query}
                  handleInputChange={handleInputChange}
                  handleCategoryChange={handleCategoryChange}
                  handlePriceChange={handlePriceChange}
                  handleRatingChange={handleRatingChange}
                  handleApplyFilters={handleApplyFilters}
                />
              </Dialog>
            </Grid>
          </>
        ) : (
          <Grid item xs={12} md={12} lg={2} marginTop={3}>
            <SideBar
              products={products}
              query={query}
              handleInputChange={handleInputChange}
              handleCategoryChange={handleCategoryChange}
              handlePriceChange={handlePriceChange}
              handleRatingChange={handleRatingChange}
              handleApplyFilters={handleApplyFilters}
            />
          </Grid>
        )}
        {/* Main Content */}
        <Grid item xs={12} md={12} lg={10} marginTop={3}>
          <FilteredData
            products={products}
            lastData={lastDataRecord}
            category={selectedCategory}
            price={selectedPrice}
            rating={selectedRating}
            query={query}
          />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Products;
