// React

// MUI
import {
    Box,
    Avatar,
    Button,
    TextField,
    Grid,
    Typography,
    Container,
    Link,
} from '@mui/material';
import { styled } from '@mui/system';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// React Router
import { useNavigate } from 'react-router-dom';

// Styled Components
const StyledLoginPage = styled(Box)(() => ({
    // Add your styles here
}));

const LoginPage = () => {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('/SignUp');
    };

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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
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
                                <Button
                                    variant="text"
                                    style={{ textTransform: 'none', padding: 0, color: 'inherit' }}
                                    onClick={handleSignUpClick}
                                >
                                    {"Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </StyledLoginPage>
    );
};


export default LoginPage;

