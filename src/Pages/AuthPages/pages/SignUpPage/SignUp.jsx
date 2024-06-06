//React
import { useEffect, useMemo, useState } from 'react'

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
import { NavLink, useNavigate } from 'react-router-dom';
import CustomTextFields from '../../components/CustomTextFields/CustomTextFields';
import { handleRegister } from '../../../../Services/AuthServices/authService'
import { handleCloseLinearProgress, handleOpenLinearProgress } from '../../../../Redux/Slices/DownloadPageSlice'

//Styled Components
const StyledSignUp = styled(Box)(
    () => ({
    
    })
)


const SignUp = () => {
    const signUpFields = useMemo(() => {
        return [
            {
                name: "email",
                label: "Email",
                required: true,
                autoFocus: true,
                type: 'email'
            },
            {
                name: "first_name",
                label: "First Name",
                required: true,
                autoFocus: false,
                type: 'text'
            },
            {
                name: "last_name",
                label: "Last Name",
                required: true,
                autoFocus: false,
                type: 'text'
            },
            {
                name: "mobile_number",
                label: "Mobile Number",
                required: true,
                autoFocus: false,
                mobileNumber: true,
                type: 'text'
            },
            {
                name: "password",
                label: "Password",
                required: true,
                autoFocus: false,
                type: 'password'
            },
            {
                name: "password_confirmation",
                label: "Confirm Password",
                required: true,
                autoFocus: false,
                type: 'password'
            },
        ]
    }, [])

    //errors 
    const [errors, setErrors] = useState(null)


    //for navigating
    const navigate = useNavigate()

    // for linear progress
    const dispatch = useDispatch();
    const [download, setDownload] = useState(false);

    //to add linear progress when changing category id
    useEffect(() => {
        if(download) {
            dispatch(handleOpenLinearProgress())
        } else {
            dispatch(handleCloseLinearProgress())
        }
    }, [dispatch, download])

    const handleSubmit = async (e, formData) => {
        e.preventDefault()

        setDownload(true)
        const data = await handleRegister(formData)
        setDownload(false)
        if(data?.success) {
            navigate("/auth/login")
        } else {
            setErrors(data?.errors)
        }
        
    }
    return (
        <StyledSignUp>
            <CustomTextFields 
                        items={signUpFields}
                        onSubmit={handleSubmit}
                        title={"Sign Up"}
                        buttonText={"Sign Up"}
                        errors={errors}
                        additionalLinksComp={
                            <Grid container>
                                <Grid item xs>
                                    <Typography variant="body2">
                                        <NavLink to="/auth/login" variant="body2" style={{ color: 'inherit' }}>
                                            {"Already have an account? Sign In"}
                                        </NavLink>
                                    </Typography>
                                </Grid>
                            </Grid>
                        }
                    />
        </StyledSignUp>
    );
};

SignUp.propTypes = {
    children: propTypes.array
}

export default SignUp;