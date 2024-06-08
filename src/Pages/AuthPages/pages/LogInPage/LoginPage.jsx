//React
import {useState } from 'react'

import { useDispatch } from 'react-redux'

//Components


//MUI
import {
    Box,
    Grid,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'


//propTypes 
import propTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import CustomTextFields from '../../components/CustomTextFields/CustomTextFields';
import { handleCloseLinearProgress, handleOpenLinearProgress } from '../../../../Redux/Slices/DownloadPageSlice';
import { handleLogin } from '../../../../Services/AuthServices/authService';
import { setTokenInfo, setUserInfo } from '../../../../Redux/Slices/authSlice'

//Styled Components
const StyledLoginPage = styled(Box)(
    () => ({
        
    })
)


const LoginPage = () => {


    const loginFields = [
        {
            name: "email",
            label: "Email",
            required: true,
            autoFocus: true,
            type: "email",
        },
        {
            name: "password",
            label: "Password",
            required: true,
            autoFocus: false,
            type: "password",
        },
    ]

     //errors 
     const [errors, setErrors] = useState(null)



    // for linear progress
    const dispatch = useDispatch();


    const handleSubmit = async (e, formData) => {
        e.preventDefault()

        dispatch(handleOpenLinearProgress())
        const res = await handleLogin(formData)
        dispatch(handleCloseLinearProgress())

        
        if(res?.success) {
            // Create an anchor element
            const anchorElement = document.createElement('a');

            // Set its href attribute to "/profile"
            anchorElement.href = "http://localhost:5173/profile";

            // Programmatically click on the anchor element
            anchorElement.click();

        } else {
            setErrors(res?.errors)
        }
    }

    return (
        <StyledLoginPage>
            
                    <CustomTextFields 
                        items={loginFields}
                        errors={errors}
                        onSubmit={handleSubmit}
                        title={"Log In"}
                        buttonText={"Log in"}
                        additionalLinksComp={
                            <Grid container>
                                <Grid item xs>
                                    <Typography variant="body2">
                                        <NavLink to="/auth/forget-password"  style={{ color: 'inherit' }}>
                                            Forgot password?
                                        </NavLink>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">
                                        <NavLink to="/auth/sign-up" style={{  color: 'inherit' }}>
                                            {"Don't have an account? Sign Up"}
                                        </NavLink>
                                    </Typography>
                                </Grid>
                            </Grid>
                        }
                    />
        </StyledLoginPage>
    );
};

LoginPage.propTypes = {
    children: propTypes.array
}

export default LoginPage;