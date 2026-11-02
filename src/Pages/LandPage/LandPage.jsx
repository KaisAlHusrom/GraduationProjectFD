//React
import { } from 'react'

import {
    
} from 'react-redux'

//Components

//MUI
import {
    Box,
    Divider,
    ToggleButton,
    ToggleButtonGroup,
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

import LogoCollection from './LogoCollection'
import MainAppBar from '../../Components/MainAppBar/MainAppBar'
import PaymentPlansComponent from '../../Components/PaymentPlansComponent/PaymentPlansComponent'
import ProfileFooter from '../NewWebSite/Components/ProfileFooter/ProfileFooter'


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

    // const toggleCustomTheme = () => {
    //   setShowCustomTheme((prev) => !prev);
    // };

    // const [data, setData] = useState(null)
    // useEffect(() => {
    //   const fetchUser = async () => {
    //     const res = await fetchUserData()
    //     console.log(res)
    //     if(res.success) {
    //       setData(res.data)
    //     }
    //   }

    //   fetchUser()
    // }, [])

    return (
      <>
        <MainAppBar />
        <Hero />
        <Box>
          <LogoCollection />
          <Features />
          <Divider />
          <Testimonials />
          <Divider />
          <Highlights />
          <Divider />
          {/* <Pricing /> */}
          <PaymentPlansComponent />
          <Divider />
          <FAQ />
          <Divider />
          {/* <Footer /> */}
          <ProfileFooter />
        </Box>

      </>
    );
  }