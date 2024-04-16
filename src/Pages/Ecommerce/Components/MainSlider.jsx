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
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledMainSlider = styled(Box)(
    ({ theme }) => ({
    
    })
)

const useStyles = makeStyles({
    slider: {
      height: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to right, #007bff, #6c757d, #28a745)', // Example gradient background
      color: '#fff',
      fontSize: '2rem',
      textAlign: 'center',
    },
  });

const MainSlider = () => {
    const classes = useStyles();
    return (
        <StyledMainSlider>
            <Box className={classes.slider}>
                <div>
                    <h1>Welcome to Your E-commerce Site</h1>
                    <p>Explore our amazing products!</p>
                </div>
            </Box>
        </StyledMainSlider>
    );
};

MainSlider.propTypes = {
    children: propTypes.array
}

export default MainSlider;