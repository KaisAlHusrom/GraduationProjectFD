import PropTypes from 'prop-types';
import { AppBar, Box, Button, Container, MenuItem, Toolbar, Typography,TextField,List,ListItem,ListItemText,IconButton} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { styled } from '@mui/system';
import { AdminMainButton } from '../../../Components';
import { useNavigate} from 'react-router-dom';

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};
const StyledSearchBar = styled(TextField)(
    ({ theme }) => ({
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2), // Add some bottom margin
    })
);
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

function NavBar() {

const [searchValue, setSearchValue] = useState('');

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
const handleCategoryItemClick = (categoryName, item) => {
    // Handle the click event for category items
    console.log(`Clicked on ${item.name} in ${categoryName}`);
    // Add your handling logic here
};


const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    // Handle search functionality here if needed
};
const Navigate = useNavigate();

const HandleMainButton = () => {
    Navigate('/Ecommerce');
    };
const handleCartClick = () => {
    Navigate('/Cart');
    };


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
                    <img
                        src={
                        'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                        }
                        style={logoStyle}
                        alt="logo of sitemark"
                        onClick={HandleMainButton}
                    />
                    <Box sx={{ display: { xxs:'none',xs: 'none', sm:"none", md: 'flex' } }}>
                        <MenuItem
                        onClick={() => scrollToSection('Cards')}
                        sx={{ py: '6px', px: '12px' }}
                        >
                        <Typography variant="body2" color="text.primary">
                            Items
                        </Typography>
                        </MenuItem>
                        <MenuItem
                        onClick={() => scrollToSection('footer')}
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
                    <IconButton
                        color="primary"
                        onClick={handleCartClick} // Add your cart click handler function here
                    >
                        <ShoppingCartIcon />
                    </IconButton>
                                    
                    
                    <Button
                        color="primary"
                        variant="outlined"
                        size="small"
                        component="a"
                        href="/Login"
                        target="_blank"
                    >
                        Sign in
                    </Button>
                    
                    <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        component="a"
                        href="/SignUp"
                        target="_blank"
                    >
                        Sign up
                    </Button>
                    </Box>
                    <Box sx={{ display: {xxs:'flex',xs: 'flex', sm: 'flex', md: 'none' } }}>
                        <AdminMainButton
                            title=""
                            type="drawer"
                            appearance="primary"
                            putTooltip
                            putDrawerCloseButton
                            drawerAnchor="right"
                            drawerWidth = '300px'
                            icon={<MenuIcon />}
                            willShow={
                            <Box
                            sx={{
                                minWidth: '300px',
                                p: 2,
                                backgroundColor: 'background.paper',
                                flexGrow: 1,
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
                                <Accordion disableGutters elevation={0} square>
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
                                <MenuItem onClick={() => scrollToSection('footer')}>About us</MenuItem>
                                    <Button
                                    color="primary"
                                    variant="contained"
                                    component="a"
                                    href="SignUp"
                                    target="_blank"
                                    sx={{ width: '100%' }}
                                    >
                                    Sign up
                                    </Button>
                                    <Button
                                    color="primary"
                                    variant="outlined"
                                    component="a"
                                    href="Login"
                                    target="_blank"
                                    sx={{ width: '100%',marginTop:1 }}
                                    >
                                    Sign in
                                    </Button>
                            </Box>
                            }>
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