
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import propTypes from 'prop-types';

// Styled Components
const StyledMainSlider = styled(Box)(
  ({ theme }) => ({
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to right, #007bff, #6c757d, #28a745)', // Example gradient background
    color: '#fff',
    textAlign: 'center',
    flexDirection: 'column',
    padding: theme.spacing(3),
  })
);

const StyledHeading = styled(Typography)(
  ({ theme }) => ({
    fontSize: '3rem',
    marginBottom: theme.spacing(2),
  })
);

const StyledSubheading = styled(Typography)(
  ({ theme }) => ({
    fontSize: '1.5rem',
    marginBottom: theme.spacing(4),
  })
);

const StyledButton = styled(Button)(
  ({ theme }) => ({
    marginTop: theme.spacing(4),
    padding: theme.spacing(1, 4),
    fontSize: '1rem',
    color: '#007bff',
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  })
);

const MainSlider = () => {

  return (
    <StyledMainSlider>
      <StyledHeading variant="h1">Welcome to Cliser Ecommerce Market</StyledHeading>
      <StyledSubheading variant="h6">Explore our amazing products!</StyledSubheading>
      <StyledButton
        variant="contained"
      >
        Go to Products
      </StyledButton>
    </StyledMainSlider>
  );
};

MainSlider.propTypes = {
  children: propTypes.node,
};

export default MainSlider;
