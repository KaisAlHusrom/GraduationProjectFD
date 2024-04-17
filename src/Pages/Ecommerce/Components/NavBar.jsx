//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/system'
import { Link } from 'react-router-dom';

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledNavBar = styled(Box)(
    ({ theme }) => ({
    
    })
)


const NavBar = () => {
    return (
        <StyledNavBar>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/Ecommerce" style={{ textDecoration: 'none', color: 'inherit' }}>YourLogo</Link>
                    </Typography>
                    <div>
                    <IconButton color="inherit">
                        <SearchIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <Badge badgeContent={0} color="error">
                        <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                        <AccountCircleIcon />
                    </IconButton>
                    </div>
                    {/* Example of login/signup buttons */}
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">Sign Up</Button>
                </Toolbar>
             </AppBar>
        </StyledNavBar>
    );
};

NavBar.propTypes = {
    children: propTypes.array
}

export default NavBar;