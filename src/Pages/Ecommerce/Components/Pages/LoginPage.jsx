//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Avatar,
    Button,
    TextField,
    Link,
    Grid,
    Typography,
    Container,
} from '@mui/material'
import { styled } from '@mui/system'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledLoginPage = styled(Box)(
    ({ theme }) => ({
    
    })
)


const LoginPage = () => {



    return (
        <StyledLoginPage>
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
                    Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                        <Link href="#" variant="body2" style={{ color: 'inherit' }}>
                            Forgot password?
                        </Link>
                        </Grid>
                        <Grid item>
                        <Link href="/SignUp" variant="body2" style={{  color: 'inherit' }}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                        </Grid>
                    </Grid>
                    </Box>
                </Box>
            </Container>
        </StyledLoginPage>
    );
};

LoginPage.propTypes = {
    children: propTypes.array
}

export default LoginPage;