//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Container,
    Typography,
    Link
} from '@mui/material'
import { styled } from '@mui/system'


//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledFooter = styled(Box)(
    ({ theme }) => ({
        backgroundColor: 'black',
        padding: '50px 0',
        marginTop: 'auto',
        position: "relative",
        bottom: 0,
        width: "100%",
        height: "100%",
        
        
        
    })
)


const Footer = () => {

    return (
        <StyledFooter>
            <Container id='footer'>
                <Container maxWidth="lg">
                    <Typography variant="h6" align="center" gutterBottom>
                    Your E-commerce Site
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Explore our amazing products and enjoy shopping with us!
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center">
                    {'© '}
                    {new Date().getFullYear()}
                    {' '}
                    Your E-commerce Site. All rights reserved.
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center">
                    <Link color="inherit" href="#">
                        Privacy Policy
                    </Link>{' '}
                    |{' '}
                    <Link color="inherit" href="#">
                        Terms & Conditions
                    </Link>
                    </Typography>
                </Container>
            </Container>
        </StyledFooter>
    );
};

Footer.propTypes = {
    children: propTypes.array
}

export default Footer;