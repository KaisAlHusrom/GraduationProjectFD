//React
import { useRef, useState } from 'react';

//MUI
import {
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Box,
  TextField
} from '@mui/material';
import { styled } from '@mui/system';

//propTypes
import PropTypes from 'prop-types';

//Hooks and Services
import useFetchData from '../../../../Helpers/customHooks/useFetchData';
import { fetchUserProducts } from '../../../../Services/UserServices/Services/productsUsersService';
import { useNavigate } from 'react-router-dom';

//Styled Components
const StyledSearchBox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2)
}));

const StyledSearchBar = styled(TextField)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '20px',
  backgroundColor: theme.palette.mode === 'light'
    ? 'rgba(255, 255, 255, 0.4)'
    : 'rgba(0, 0, 0, 0.4)',
  '& .MuiInputLabel-root': {
    fontSize: '0.9rem',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    padding: theme.spacing(1),
    height: '36px',
  },
}));

const SearchBox = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const searchBarRef = useRef(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    columnName: 'product_name',
    searchTerm: ''
  });

  const { data: products } = useFetchData(fetchUserProducts, 'all', null, null, true, query);

  const handleCloseMenu = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleSearchChange = (event) => {
    const queryValue = event.target.value;

    // Update the query state to trigger a re-fetch of the products
    setQuery(prevQuery => ({
      ...prevQuery,
      searchTerm: queryValue
    }));

    // Filtering based on query (search term)
    const filteredProducts = products.flatMap(product =>
      product.categories.map(cat => ({
        ...product,
        category: cat.category_name,
      }))
    ).filter(product =>
      product.product_name.toLowerCase().includes(queryValue.toLowerCase()) ||
      product.product_short_description.toLowerCase().includes(queryValue.toLowerCase())
    );

    setSearchResults(filteredProducts);
    setOpen(Boolean(filteredProducts.length && queryValue));
  };

  const handleClickProduct = (product) => {
    navigate(`/cliser-digital-market/productView/${product.id}`);
    setOpen(false);
  };

  return (
    <StyledSearchBox>
      <StyledSearchBar
        ref={searchBarRef}
        label="Search"
        variant="outlined"
        value={query?.searchTerm}
        onChange={handleSearchChange}
        size="small"
        fullWidth
      />
      <Popper open={open} anchorEl={searchBarRef.current} placement="bottom-start" transition>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: 'left top' }}>
            <Paper>
              <ClickAwayListener onClickAway={handleCloseMenu}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {searchResults.map((product, index) => (
                    <MenuItem key={index} onClick={() => handleClickProduct(product)}>
                      {product.product_name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </StyledSearchBox>
  );
};

SearchBox.propTypes = {
  children: PropTypes.array
};

export default SearchBox;
