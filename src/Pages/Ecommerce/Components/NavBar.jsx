import PropTypes from 'prop-types';
import config from "../../../../Config.json"
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  List,
  ListItem,
  IconButton,
  Badge,
  Dialog,
  DialogContent,
  Slide,
  Avatar,
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
import { useSelector } from 'react-redux';
import { useCart } from '../utils/CartContext';
import { usersProfileImagesFolderName } from '../../../Services/AdminServices/Services/usersService';
import ToggleColorMode from '../../../Components/ToggleColorMode/ToggleColorMode';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CategoriesPopover from './CategoriesPopover/CategoriesPopover';
import { useCliserMarketContext } from '../EcommerceMain';
import SearchBox from './UI/searchBox';
import { navigateCliserStoreCartPage, navigateLoginPage, navigateMainPage, navigateSignUpPage, navigateStoreMainPage } from '../../../Helpers/navigations';
import { logOut } from '../../../Services/AuthServices/authService';


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


const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
const [value, setValue] = useState(0);
const [openSearch, setSearchOpen] = useState(false);
const [openAccount, setAccountOpen] = useState(false);
const [open, setOpen] = useState(false);
const anchorRef = useRef(null);
const navigate = useNavigate();

// Get the user if logged
const user = useSelector(state => state.authSlice.user);
const imagePath = useMemo(() => {
  return `${config.ServerImageRoute}/${usersProfileImagesFolderName}/${user?.profile_image}`;

}, [user?.profile_image])

const { itemsCount } = useCart(); // Use the useCart hook to get itemsCount


  // Return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

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
    navigateStoreMainPage();
  };

  const handleCartClick = () => {
    navigateCliserStoreCartPage();
  };

  const handleHomeClick = () => {
    navigateMainPage();
  };

  const handleLoginClick = () => {
    navigateLoginPage();
  };

  const handleSignUpClick = () => {
    navigateSignUpPage();
  };

  const handleLogOut = async () => {
    const res = await logOut()
    console.log(res)
    if(res.success){
      navigate("/")
    } else {
      console.log("Log Out Failed")
    }
  }

  const menuItems = [
    { value: 'Profile', onClick: handleHomeClick},
    { value: 'Logout', onClick: handleLogOut },
  ].filter(item => item);

  return (
    <div>
      <Box>
        {isSmallScreen ? (
          /* on small screens */
          <div>
            {/* bottom navigation control */}
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
                sx={{textDecoration:"none"}}
                icon={imagePath ? (
                  <Avatar
                    src={imagePath}
                    sx={{ cursor: 'pointer', width: 32, height: 32 }}
                  />
                ) : (
                    <AccountCircleIcon />
                )}
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
                <SearchBox />
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
                  {
                    !user ? 
                    (
                      <>
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
                      </>
                    )
                    :
                    menuItems.map((item, key) => {
                      return (
                        <ListItem key={key}>
                            <Button
                              color={item.value === "Logout" ? "error" : "primary"}
                              variant="outlined"
                              component="a"
                              onClick={item.onClick}
                              sx={{ width: '100%', marginTop: 1 }}
                            >
                              {item.value}
                            </Button>
                        </ListItem>
                      )
                    })
                  }
                  
                </List>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          /* on normal screens */
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
                {/* logo and categories pop over part */}
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
                  </Box>  
                </Box>
                {/* the search bar */}
                <Box
                  sx={{
                    display: { xxs: 'none', xs: 'none', md: 'flex' },
                    gap: 0.5,
                    alignItems: 'center',
                  }}
                >
                <SearchBox />
                </Box>
                
                {/*  , sign in and sign out part */}
                <Box
                  sx={{
                    display: { xxs: 'none', xs: 'none', md: 'flex' },
                    gap: 0.5,
                    alignItems: 'center',
                  }}
                >
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
                        onClick={handleLoginClick}
                      >
                        Sign in
                      </Button>
                      <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={handleSignUpClick}
                      >
                        Sign up
                      </Button>
                    </>
                    : 
                    <>
                    <AdminMainButton
                            icon={<Avatar src={imagePath} sx={{ cursor: 'pointer', width: 32, height: 32 }} />}
                            title="Profile"
                            appearance="iconButton"
                            type="menu"
                            menuItems={menuItems}
                            menuPaperProps={
                                {
                                elevation: 1,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                } 
                                }
                            }
                            />
                      
                    </>
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
