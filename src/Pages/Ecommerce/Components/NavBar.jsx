import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Button,
  Container,
  MenuItem,
  Toolbar,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Badge,
  Dialog,
  DialogContent,
  Slide,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { forwardRef, useMemo, useState } from 'react';
import { styled } from '@mui/system';
import { AdminMainButton } from '../../../Components';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { useMediaQuery, useTheme } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CliserImageLogo from '../utils/CliserImageLogo';
import { NewList } from '../data/CradsData';

const StyledSearchBar = styled(TextField)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center', // Center the label vertically
  justifyContent: 'center', // Center horizontally
  borderRadius: '20px', // Adding rounded corners
  backgroundColor: '#606060', // Adding background color
  '& .MuiInputLabel-root': {
    fontSize: '0.9rem', // Smaller label font size
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px', // Full rounded corners
    padding: theme.spacing(1), // Adjusting padding for smaller size
    height: '36px', // Adjusting height for smaller size
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: -3,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

// Sample categories and their items
const categories = {
  "Category 1": [
    { id: 1, name: "Item 1.1" },
    { id: 2, name: "Item 1.2" },
    { id: 3, name: "Item 1.3" },
  ],
  "Category 2": [
    { id: 4, name: "Item 2.1" },
    { id: 5, name: "Item 2.2" },
    { id: 6, name: "Item 2.3" },
  ],
  // Add more categories as needed
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NavBar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [openSearch, setSearchOpen] = useState(false);
  const [openAccount, setAccountOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    setSearchOpen(true);
  };

  const handleAccountClick = () => {
    setAccountOpen(true);
  };

  const handleClose = () => {
    setSearchOpen(false);
    setAccountOpen(false);
  };

  const handleMainClick = () => {
    navigate('/cliser-digital-market');
  };

  const handleCartClick = () => {
    navigate('/cliser-digital-market/Cart');
  };

  const handleHomeClick = () => {
    navigate('/LandPage');
  };

  const handleLoginClick = () => {
    navigate('/Login');
  };

  const handleSignUpClick = () => {
    navigate('/SignUp');
  };

  const itemsCount = useMemo(() => {
    const count = JSON.parse(localStorage.getItem('cart_data'))?.length || 0;
    return count;
  }, []);

  return (
    <div>
      <Box>
        {isSmallScreen ? (
          <div>
            <BottomNavigation
              showLabels
              sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
              }}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction
                label="Home"
                icon={<HomeIcon />}
                onClick={handleMainClick}
              />
              <BottomNavigationAction
                label="Search"
                icon={<SearchIcon />}
                onClick={handleSearchClick}
              />
              <BottomNavigationAction
                label="Cart"
                icon={
                  <StyledBadge badgeContent={itemsCount} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                }
                onClick={handleCartClick}
              />
              <BottomNavigationAction
                label="Account"
                icon={<AccountCircleIcon />}
                onClick={handleAccountClick}
              />
            </BottomNavigation>

            {/* Search Dialog */}
            <Dialog
              fullScreen
              open={openSearch}
              onClose={handleClose}
              TransitionComponent={Transition}
            >
              <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Search
                  </Typography>
                </Toolbar>
              </AppBar>
              <DialogContent>
                <StyledSearchBar
                    label="Search"
                    variant="outlined"
                    value={searchValue}
                    onChange={handleSearchChange}
                    fullWidth
                />
                <Accordion disableGutters elevation={0} square sx={{ backgroundColor: "transparent" }}>
                  <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                    <Typography>Categories</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {NewList.flatMap(product =>
                      product.categories.map(category => (
                        <Button
                          key={category.id}
                          onClick={() => console.log(`Category clicked: ${category.category_name}`)}
                          sx={{ width: '100%', justifyContent: 'flex-start' }}
                        >
                          {category.category_name}
                        </Button>
                      ))
                    )}
                  </AccordionDetails>
                </Accordion>
              </DialogContent>
            </Dialog>

            {/* Account Dialog */}
            <Dialog
              fullScreen
              open={openAccount}
              onClose={handleClose}
              TransitionComponent={Transition}
            >
              <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Account
                  </Typography>
                </Toolbar>
              </AppBar>
              <DialogContent>
                <List>
                  <ListItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      onClick={handleSignUpClick}
                      sx={{ width: '100%' }}
                    >
                      Sign up
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      onClick={handleLoginClick}
                      sx={{ width: '100%', marginTop: 1 }}
                    >
                      Sign in
                    </Button>
                  </ListItem>
                </List>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <AppBar
            position="fixed"
            sx={{
              boxShadow: 0,
              bgcolor: 'transparent',
              backgroundImage: 'none',
              mt: 2
            }}
          >
            <Container maxWidth="lg">
              <Toolbar
                variant="regular"
                sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexShrink: 0,
                  borderRadius: '999px',
                  bgcolor:
                    theme.palette.mode === 'light'
                      ? 'rgba(255, 255, 255, 0.4)'
                      : 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(24px)',
                  maxHeight: 40,
                  border: '1px solid',
                  borderColor: 'divider',
                })}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    ml: '-18px',
                    px: 0,
                  }}
                >
                  <CliserImageLogo HandleMainButton={handleMainClick} />
                  <Box sx={{ display: { xxs: 'none', xs: 'none', sm: "none", md: 'flex' } }}>
                    <IconButton
                      onClick={handleHomeClick}
                    >
                      <HomeIcon />
                    </IconButton>
                    <MenuItem
                      onClick={() => scrollToSection('Cards')}
                      sx={{ py: '6px', px: '12px' }}
                    >
                      <Typography variant="body2" color="text.primary">
                        Items
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => scrollToSection("Footer")}
                      sx={{ py: '6px', px: '12px' }}
                    >
                      <Typography variant="body2" color="text.primary">
                        FAQ
                      </Typography>
                    </MenuItem>
                  </Box>
                </Box>
                <Box sx={{
                  display: { xxs: 'none', xs: 'none', md: 'flex' },
                  gap: 0.5,
                  alignItems: 'center',
                }}
                >
                  <StyledSearchBar
                    label="Search"
                    variant="outlined"
                    value={searchValue}
                    onChange={handleSearchChange}
                    size='small'
                  />
                  <AdminMainButton
                    appearance='iconButton'
                    type='custom'
                    icon={<ShoppingCartIcon />}
                    onClick={handleCartClick}
                    title='Cart'
                    badgeContent={itemsCount}
                  />

                  <Button
                    color="primary"
                    variant="outlined"
                    size="small"
                    component="a"
                    onClick={handleLoginClick}
                  >
                    Sign in
                  </Button>

                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    component="a"
                    onClick={handleSignUpClick}
                  >
                    Sign up
                  </Button>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        )}
      </Box>
    </div>
  );
}

NavBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']),
  toggleColorMode: PropTypes.func,
};

export default NavBar;
