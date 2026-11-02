//React
import { Fragment, useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//icons
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

//MUI
import {
    Avatar,
    Box,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

import MobileNumberTextField, { formatPhoneNumber } from '../../../../Components/MobileNumberTextField/MobileNumberTextField';

//Styled Components
const StyledCustomTextFields = styled(Box)(
    () => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    })
)


const CustomTextFields = (props) => {
    const {
        title,
        onSubmit,
        items,
        additionalLinksComp,
        buttonText,
        errors
    } = props

    const [countryCode, setCountryCode] = useState(`+90`);
    const [seePassword, setSeePassword] = useState(false)
    const [seeConfirmPassword, setSeeConfirmPassword] = useState(false)
    
    const [formData, setFormData] = useState(
        items.reduce((acc, item) => {
            acc[item.name] = ''
            return acc
        }, {})
    );


    const handleChangeFormData = (e) => {
        const name = e.target.name
        const value = e.target.value
        if(name === "mobile_number") {
            setFormData(prev => {
                return {...prev, [name]: formatPhoneNumber(value)}
            })
        } else {
            setFormData(prev => {
                return {...prev, [name]: value}
            })
        }
        
    }

    const handleTogglePasswordVisibility = (confirm) => {
        if(confirm) {
            setSeeConfirmPassword(prev => !prev)
        } else {
            setSeePassword((prev) => !prev)

        }
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let submission = {...formData}
        if(formData.mobile_number) {
            submission = {
                ...formData,
                mobile_number: `${countryCode} ${formData.mobile_number}`
            };
        }

        onSubmit(e, submission);
    };
    
    return (
        <StyledCustomTextFields>
            <Avatar sx={{ m: 1, bgcolor: 'econdary.main' }}>
                    <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                {title}
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                {
                    items && items.length > 0 &&
                        items.map((item, key) => {
                            if(item.mobileNumber) {
                                return (
                                    <MobileNumberTextField 
                                    formData={formData}
                                    handleChangeFormData={handleChangeFormData}
                                    item={item}
                                    setFormData={setFormData}
                                    key={key} 
                                    countryCodeState={[countryCode, setCountryCode]}
                                    errors={errors}
                                    />
                                )
                            }
                            return (
                                <TextField
                                    size='small'
                                    error={errors && errors[item.name] !== null && errors[item.name] !== undefined}
                                    helperText={errors && (errors[item.name] ? errors[item.name] : "")}
                                    key={key}
                                    fullWidth
                                    margin="normal"
                                    id={item.name}
                                    label={item.label}
                                    required={item.required}
                                    name={item.name}
                                    autoComplete={item.name}
                                    autoFocus={item.autoFocus}
                                    type={item.type === "password" ?  item.name === "password_confirmation" ? seeConfirmPassword ? "text" : item.type : seePassword ? "text" : item.type : item.type}
                                    onChange={handleChangeFormData}
                                    value={formData[item.name]}
                                    InputProps={{
                                        endAdornment: item.type === "password" && (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => handleTogglePasswordVisibility (item.name === "password_confirmation" ? true : false)}
                                                    edge="end"
                                                    color='primary'
                                                    >
                                                    {item.name === "password_confirmation"
                                                        ?
                                                            seeConfirmPassword ? <VisibilityOffOutlinedIcon /> : <RemoveRedEyeOutlinedIcon />
                                                        :
                                                            seePassword ? <VisibilityOffOutlinedIcon /> : <RemoveRedEyeOutlinedIcon />
                                                        
                                                    }
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )
                        })
                }
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    {buttonText}
                </Button>
                {additionalLinksComp}
            </Box>
        </StyledCustomTextFields>
    );
};

CustomTextFields.propTypes = {
    title: propTypes.string,
    buttonText: propTypes.string,
    onSubmit: propTypes.func,
    items: propTypes.array,
    additionalLinksComp: propTypes.object,
    errors: propTypes.object
}

export default CustomTextFields;