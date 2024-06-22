import PropTypes from 'prop-types';
import config from "../../../../Config.json"
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
  IconButton,
  Badge,
  Dialog,
  DialogContent,
  Slide,
  Popper,
  Paper,
  MenuList,
  ClickAwayListener,
  Avatar,
  Grow,
  Divider
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
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
import { useSelector } from 'react-redux';
import { useCart } from '../utils/CartContext'; // Make sure the path is correct
import { usersProfileImagesFolderName } from '../../../Services/AdminServices/Services/usersService';
import ToggleColorMode from '../../../Components/ToggleColorMode/ToggleColorMode';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CategoriesPopover from './CategoriesPopover/CategoriesPopover';
import { useCliserMarketContext } from '../EcommerceMain';
const StyledSearchBar = styled(TextField)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center', // Center the label vertically
  justifyContent: 'center', // Center horizontally
  borderRadius: '20px', // Adding rounded corners
  backgroundColor: theme.palette.mode === 'light'
    ? 'rgba(255, 255, 255, 0.4)'
    : 'rgba(0, 0, 0, 0.4)', // Adding background color
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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NavBar() {

  const {categories} = useCliserMarketContext()


  // Get the user if logged
  const user = useSelector(state => state.authSlice.user);
  const imagePath = useMemo(() => {
    return `${config.ServerImageRoute}/${usersProfileImagesFolderName}/${user?.profile_image}`;

}, [user?.profile_image])

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [openSearch, setSearchOpen] = useState(false);
  const [openAccount, setAccountOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();

  const { itemsCount } = useCart(); // Use the useCart hook to get itemsCount

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

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

  // Return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleCategoryClick = (category) => {
    // Add your logic for handling category click
    console.log(`Category clicked: ${category.category_name}`);
    setOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    setSearchOpen(true);
  };

  const handleAccountClick = () => {
    if(user) {
      navigate("/")
    }
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
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/auth/login');
  };

  const handleSignUpClick = () => {
    navigate('/auth/sign-up');
  };

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
                    {categories?.map(mainCat =>{
                      return (

                        <>
                        <Typography variant='h6' color='primary' 
                        sx={{
                            cursor: 'pointer',
                            transition: "0.2s",
                            "&:hover": {
                                color: theme => theme.palette.primary.dark,
                            }
                        }}>
                          {mainCat.category_name}
                        </Typography>
                        {
                          mainCat.children.map(category => (
                            <Typography
                              key={category.id}
                              variant='body1'
                              sx={{
                                  cursor: 'pointer',
                                  transition: "0.2s",
                                  "&:hover": {
                                      color: theme => theme.palette.primary.main,
                                  }
                              }}
                            >
                              {category.category_name}
                            </Typography>
                          ))
                        }
                        <Divider />
                        </>
                      )
                    }
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
                  <Box sx={{ display: { xxs: 'none', xs: 'none', sm: 'none', md: 'flex' } }}>
                    <AdminMainButton
                      title="Categories"
                      type='popover'
                      appearance='primary'
                      icon={<CategoryOutlinedIcon />}
                      popOverProps={{
                        elevation: 6
                      }}
                      willShow={
                        <CategoriesPopover />
                      }
                    />
                    <Popper
                      open={open}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      placement="bottom-start"
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === 'bottom-start' ? 'left top' : 'left bottom',
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleCloseMenu}>
                              <MenuList
                                autoFocusItem={open}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                onKeyDown={handleListKeyDown}
                              >
                                {NewList.flatMap(product =>
                                  product.categories.map(category => (
                                    <MenuItem
                                      key={category.id}
                                      onClick={() => handleCategoryClick(category)}
                                    >
                                      {category.category_name}
                                    </MenuItem>
                                  ))
                                )}
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </Box>
                </Box>
                <Box
                  sx={{
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
                  <ToggleColorMode />
                  <AdminMainButton
                    appearance='iconButton'
                    type='custom'
                    icon={<ShoppingCartIcon />}
                    onClick={handleCartClick}
                    title='Cart'
                    badgeContent={itemsCount}
                    sx={{
                      marginRight: 1
                    }}
                  />
                  {
                    !user ? 


                    <>
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
                    </>
                    : <Avatar onClick={handleHomeClick} src={imagePath} sx={{ cursor: 'pointer', width: 32, height: 32 }} /> 
                  }
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
