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
    ({theme}) => ({
        backgroundColor: theme.palette.mode,
        padding: '50px 0',
        marginTop: 'auto',
        position: "relative",  
    })
)


const Footer = () => {

    return (
        <StyledFooter>
            <Container id="Footer">
                <Container maxWidth="lg">
                    <Typography variant="h6" align="center" gutterBottom>
                    CLISER E-commerce Site
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Explore our amazing Templates and enjoy shopping with us!
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center">
                    {'© '}
                    {new Date().getFullYear()}
                    {' '}
                    CLISER E-commerce Site. All rights reserved.
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