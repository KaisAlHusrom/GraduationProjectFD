//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Avatar,
    Button,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container,
} from '@mui/material'
import { styled } from '@mui/system'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledSignUp = styled(Box)(
    ({ theme }) => ({
    
    })
)


const SignUp = () => {
    return (
        <StyledSignUp>
           <Container component="main" maxWidth="xs">
            <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'econdary.main' }}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign up
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
                <Grid container>
                    <Grid item xs>
                    <Link href="/Login" variant="body2" style={{  color: 'inherit' }}>
                        {"Already have an account? Sign In"}
                    </Link>
                    </Grid>
                </Grid>
                </Box>
            </Box>
            </Container>
        </StyledSignUp>
    );
};

SignUp.propTypes = {
    children: propTypes.array
}

export default SignUp;