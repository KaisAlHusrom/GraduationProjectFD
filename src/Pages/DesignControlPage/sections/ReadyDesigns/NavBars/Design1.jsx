/* eslint-disable no-unused-vars */
// React
import { useState } from 'react';

// Components

// MUI
import { AppBar, Toolbar, IconButton, InputBase, Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: '#000',
});

const StyledIconButton = styled(IconButton)({
  position: 'relative',
  fontSize: '1.1em',
  fontWeight: 500,
  color: '#333',
  textDecoration: 'none',
  padding: '6px 20px',
  transition: '0.5s',
  '&:hover': {
    color: '#8ef',
  },
});

const StyledButton = styled(Button)({
  position: 'relative',
  fontSize: '1.1em',
  fontWeight: 500,
  color: '#333',
  textDecoration: 'none',
  padding: '6px 20px',
  transition: '0.5s',
  '&:hover': {
    color: '#8ef',
  },
});

const StyledInputBase = styled(InputBase)({
  position: 'relative',
  fontSize: '1.1em',
  fontWeight: 500,
  color: '#333',
  textDecoration: 'none',
  padding: '6px 20px',
  transition: '0.5s',
  '&:hover': {
    color: '#8ef',
  },
});

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledIconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
      Menu
    </StyledIconButton>
  );
};

const LinkButton = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <StyledButton color="inherit" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
    </StyledButton>
  );
};

const SearchInput = () => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <StyledInputBase
      placeholder="Search…"
      inputProps={{ 'aria-label': 'search' }}
      value={value}
      onChange={handleChange}
    />
  );
};

const DesignOne = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <MenuButton />
        <SearchInput />
        <LinkButton>Sign in</LinkButton>
        <LinkButton>Sign Up</LinkButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default DesignOne;
