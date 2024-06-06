//React
import {  } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    MenuItem,
    TextField,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import countries from '../../StaticData/countries'

//functions
export const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    value = value.replace(/\D/g, '');

    // Prevent the phone number from starting with 0
    if (value.startsWith('0')) {
    value = value.substring(1);
    }

    let formattedNumber = '';

    // Format first 6 numbers with spaces between each 3 numbers
    for (let i = 0; i < value.length && i < 6; i++) {
        if (i !== 0 && i % 3 === 0) {
            formattedNumber += ' ';
        }
        formattedNumber += i === 5 ? value[i] + ' ' : value[i];
    }

    // Format the remaining numbers with spaces between each 2 numbers
    for (let i = 6; i < value.length; i++) {
        if (i !== 6 && (i - 6) % 2 === 0) {
            formattedNumber += ' ';
        }
        formattedNumber += value[i];
    }

return formattedNumber.trim();
};

//Styled Components
const StyledMobileNumberTextField = styled(Box)(
    () => ({
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
    })
)


const MobileNumberTextField = (props) => {
    const {
        item,
        formData,
        setFormData,
        handleChangeFormData,
        countryCodeState,
        errors
    } = props



    const [countryCode, setCountryCode] = countryCodeState;

    const handleCountryChange = (event) => {
        setCountryCode(event.target.value);
        setFormData(prev => {
            return {...prev, 'mobile_number': ''}
        })
        
    };

    
    return (
        <StyledMobileNumberTextField>
            <TextField
                size='small'
                select
                value={countryCode}
                onChange={handleCountryChange}
                // variant="standard"
                error={errors && errors[item.name] !== null && errors[item.name] !== undefined}
                helperText={errors && (errors[item.name] ? " " : "")}
                SelectProps={{
                    size: "small",
                    sx: {
                        width: 120,
                        marginRight: 6.7,
                        marginTop: "16px",
                        marginBottom: '8px',
                        borderRadius: '4px 0 0 4px',
                        "& .MuiOutlinedInput-notchedOutline.css-9425fu-MuiOutlinedInput-notchedOutline": {
                            borderRight: 'none'
                        }
                    }
                }}
                >
                {countries.map((option) => (
                    <MenuItem key={option.code} value={`+${option.phone}`}>
                    {option.code} {`+${option.phone}`}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                type={item.type}
                error={errors && errors[item.name] !== null && errors[item.name] !== undefined}
                helperText={errors && (errors[item.name] ? errors[item.name] : "")}
                size='small'
                margin="normal"
                id={item.name}
                label={item.label}
                required={item.required}
                name={item.name}
                autoComplete={item.name}
                autoFocus={item.autoFocus}
                onChange={handleChangeFormData}
                value={formData[item.name]}
                fullWidth
                inputProps={{maxLength: 16 - countryCode.length}}
                InputProps={{
                    sx: {
                        // width: "100%",
                        borderRadius: '0 4px 4px 0',
                        "& .MuiOutlinedInput-notchedOutline.css-9425fu-MuiOutlinedInput-notchedOutline": {
                            borderLeft: 'none'
                        }
                    }
                }}
            />
        </StyledMobileNumberTextField>
    );
};

MobileNumberTextField.propTypes = {
    item: propTypes.object,
    formData: propTypes.object,
    setFormData: propTypes.func,
    handleChangeFormData: propTypes.func,
    countryCodeState: propTypes.array,
    errors: propTypes.object
}

export default MobileNumberTextField;