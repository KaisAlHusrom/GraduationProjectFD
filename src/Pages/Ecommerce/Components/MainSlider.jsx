
import { useNavigate } from 'react-router-dom'; // or 'react-router' depending on your setup
import { Box, Button, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import propTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../Components/Styles/CustomSwiper.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Designer from "../data/Designer.jpeg"
import Designer2 from "../data/Designer2.jpeg"


// Styled Components
const StyledMainSlider = styled(Box)(
  ({ theme }) => ({
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.mode === 'dark' 
      ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), #121212)'
      : 'linear-gradient(to bottom, #121212, #fff)',
    color: '#fff',
    textAlign: 'center',
    padding: theme.spacing(3),
  })
);
const LeftContainer = styled(Box)(
  ({ theme }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
    marginTop: 110,
    animation: 'fadeInLeft 1s ease-in-out',
    '@keyframes fadeInLeft': {
      '0%': {
        opacity: 0,
        transform: 'translateX(-50px)',
      },
      '100%': {
        opacity: 1,
        transform: 'translateX(0)',
      },
    },
  })
);

const StyledHeading = styled(Typography)(
  ({ theme }) => ({
    fontSize: '3rem',
    marginBottom: theme.spacing(2),
    animation: 'fadeIn 2s ease-in-out',
    '@keyframes fadeIn': {
      '0%': {
        opacity: 0,
      },
      '100%': {
        opacity: 1,
      },
    },
  })
);

const StyledSubheading = styled(Typography)(
  ({ theme }) => ({
    fontSize: '1.5rem',
    marginBottom: theme.spacing(4),
    animation: 'fadeIn 2s ease-in-out 0.5s',
    '@keyframes fadeIn': {
      '0%': {
        opacity: 0,
      },
      '100%': {
        opacity: 1,
      },
    },
  })
);

const StyledButton = styled(Button)(
  ({ theme }) => ({
    marginTop: theme.spacing(4),
    padding: theme.spacing(1, 4),
    fontSize: '1rem',
    color: '#007bff',
    backgroundColor: '#fff',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    '&:hover': {
      backgroundColor: '#f0f0f0',
      transform: 'scale(1.05)',
    },
  })
);

const RightContainer = styled(Box)(
  ({ theme }) => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
    animation: 'fadeInRight 1s ease-in-out',
    '@keyframes fadeInRight': {
      '0%': {
        opacity: 0,
        transform: 'translateX(50px)',
      },
      '100%': {
        opacity: 1,
        transform: 'translateX(0)',
      },
    },
  })
);


const MainSlider = () => {
const navigate = useNavigate();

  const handleNavigateToProducts = () => {
    navigate('/products');
  };

  return (
    <StyledMainSlider>
      <Grid container spacing={2} maxWidth="lg">
        <Grid item xxs={6}>
      <LeftContainer>
        <StyledHeading variant="h1">Cliser Market</StyledHeading>
        <StyledSubheading variant="h6">Explore our amazing products!</StyledSubheading>
        <StyledButton
          variant="contained"
          onClick={handleNavigateToProducts}
        >
          Shop Now
        </StyledButton>
      </LeftContainer>
        </Grid>
        <Grid item xxs={6}>
      <RightContainer>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide><img src={Designer} alt="Product 1" /></SwiperSlide>
          <SwiperSlide><img src={Designer2} alt="Product 2" /></SwiperSlide>

        </Swiper>
      </RightContainer>

        </Grid>
        
      </Grid>
    </StyledMainSlider>
  );
};

MainSlider.propTypes = {
  children: propTypes.node,
};

export default MainSlider;
