import PropTypes from 'prop-types';
import { AppBar, Box, Button, Container, MenuItem, Toolbar, Typography,TextField,List,ListItem,ListItemText,IconButton,Badge, Dialog, DialogContent, Slide} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { forwardRef, useMemo, useState } from 'react';
import { styled } from '@mui/system';
import { AdminMainButton } from '../../../Components';
import { useNavigate} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { useMediaQuery, useTheme } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import CliserImageLogo from '../utils/CliserImageLogo';


/* to be fixed to center the label on the middle horizontally */
const StyledSearchBar = styled(TextField)(
    ({ theme }) => ({

        '& .MuiOutlinedInput-root': {
            borderRadius: '20px', // Full rounded corners
            // padding: theme.spacing(1), // Adjusting padding for smaller size

        },
    })
);
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
        { id: 3, name: "Item 1.3" }
    ],
    "Category 2": [
        { id: 4, name: "Item 2.1" },
        { id: 5, name: "Item 2.2" },
        { id: 6, name: "Item 2.3" }
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
const Navigate = useNavigate();

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
    // Handle search functionality here if needed
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

    const HandleMainButton = () => {
    Navigate('/cliser-digital-market');
    };
const handleCartClick = () => {
    Navigate('/cliser-digital-market/Cart');
};
const handleHomeClick = () => {
    Navigate('/');
};
const handleLoginClick = () => {
    Navigate('auth/login');
};
const handleSignUpClick = () => {
    Navigate('auth/sign-up');
};

const itemsCount = useMemo(() => {
    const count = JSON.parse(localStorage.getItem('cart_data'))?.length;
    return count
}, [])

    return (
    <div>
        <AppBar
            position="fixed"
            sx={{
            boxShadow: 0,
            bgcolor: 'transparent',
            backgroundImage: 'none',
            mt: 2,
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
                boxShadow:
                    theme.palette.mode === 'light'
                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                    : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
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
                    <CliserImageLogo HandleMainButton={HandleMainButton} />
                    <Box sx={{ display: { xxs:'none',xs: 'none', sm:"none", md: 'flex' } }}>
                        <IconButton
                            onClick={handleHomeClick} // Add your cart click handler function here
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
                        display: { xxs:'none',xs: 'none', md: 'flex' },
                        gap: 0.5,
                        alignItems: 'center',
                    }}
                    >
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
                    <Box sx={{ display: {xxs:'flex',xs: 'flex', sm: 'flex', md: 'none' } }}>
                        <AdminMainButton
                            title=""
                            type="drawer"
                            appearance="secondary"
                            putTooltip
                            putDrawerCloseButton
                            drawerAnchor="right"
                            drawerWidth = '300px'
                            icon={<MenuIcon />}
                            drawerZIndex={1200}
                            withoutDrawerHeader
                            willShow={
                            <Box
                            sx={{
                                minWidth: '300px',
                                p: 2,
                                backgroundColor: 'background',
                                flexGrow: 1,
                                marginTop: 3
                            }}
                            >
                                <StyledSearchBar
                                    label="Search"
                                    variant="outlined"
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                    fullWidth
                                />
                                {/* Categories Section */}
                                <Accordion disableGutters elevation={0} square sx={{backgroundColor:"transparent"}}>
                                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                                        <Typography>Categories</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {/* Render your categories here */}
                                        {Object.entries(categories).map(([categoryName, categoryItems]) => (
                                            <div key={categoryName}>
                                                <Typography variant="subtitle1">{categoryName}</Typography>
                                                <List>
                                                    {categoryItems.map((item) => (
                                                        <ListItem button key={item.id} onClick={() => handleCategoryItemClick(categoryName, item)}>
                                                            <ListItemText primary={item.name} />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </div>
                                        ))}
                                    </AccordionDetails>
                                </Accordion>
                                <MenuItem onClick={() => scrollToSection('Cards')}>
                                    Cards
                                </MenuItem>
                                <MenuItem onClick={() => scrollToSection("Footer")}>About us</MenuItem>
                                    <Button
                                    color="primary"
                                    variant="contained"
                                    component="a"
                                    onClick={handleSignUpClick}
                                    sx={{ width: '100%' }}
                                    >
                                    Sign up
                                    </Button>
                                    <Button
                                    color="primary"
                                    variant="outlined"
                                    component="a"
                                    onClick={handleLoginClick}
                                    sx={{ width: '100%',marginTop:1 }}
                                    >
                                    Sign in
                                    </Button>
                            </Box>
                            }
                            >
                    </AdminMainButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']),
  toggleColorMode: PropTypes.func,
};

export default NavBar;