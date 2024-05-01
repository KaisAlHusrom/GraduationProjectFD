//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components

//MUI
import {
    Box,
    CssBaseline,
    Divider,
    ThemeProvider,
    ToggleButton,
    ToggleButtonGroup,
    createTheme,
} from '@mui/material'
import './style.css'
import Hero from './Sections/Hero/Hero'
import Features from './Sections/Features/Features'
import Highlights from './Sections/Highlights/Highlights'
import Pricing from './Sections/Pricing/Pricing'
import Testimonials from './Sections/Testimonials/Testimonials'
import FAQ from './Sections/FAQ/FAQ'
import Footer from './Sections/Footer/Footer'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import PropTypes from 'prop-types';
import getLPTheme from './getLPTheme';
import AppAppBar from './Sections/AppAppBar/AppAppBar'
import LogoCollection from './LogoCollection'

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100dvw',
          position: 'fixed',
          bottom: 24,
        }}
      >
        <ToggleButtonGroup
          color="primary"
          exclusive
          value={showCustomTheme}
          onChange={toggleCustomTheme}
          aria-label="Platform"
          sx={{
            backgroundColor: 'background.default',
            '& .Mui-selected': {
              pointerEvents: 'none',
            },
          }}
        >
          <ToggleButton value>
            <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
            Custom theme
          </ToggleButton>
          <ToggleButton value={false}>Material Design 2</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    );
  }
  
  ToggleCustomTheme.propTypes = {
    showCustomTheme: PropTypes.shape({
      valueOf: PropTypes.func.isRequired,
    }).isRequired,
    toggleCustomTheme: PropTypes.func.isRequired,
  };
  
  export default function LandingPage() {
    const [mode, setMode] = useState('light');
    const [showCustomTheme, setShowCustomTheme] = useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });
  
    const toggleColorMode = () => {
      setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };
  
    const toggleCustomTheme = () => {
      setShowCustomTheme((prev) => !prev);
    };
  
    return (
      <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
        <CssBaseline />
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <Hero />
        <Box sx={{ bgcolor: 'background.default' }}>
          <LogoCollection />
          <Features />
          <Divider />
          <Testimonials />
          <Divider />
          <Highlights />
          <Divider />
          <Pricing />
          <Divider />
          <FAQ />
          <Divider />
          <Footer />
        </Box>

      </ThemeProvider>
    );
  }