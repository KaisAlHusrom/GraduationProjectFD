//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//data
import countries from '../../StaticData/countries'

//MUI
import {
    Autocomplete,
    Box,
    TextField,
} from '@mui/material'





const SelectCountry = () => {
    return (
        <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                    loading="lazy"
                    width="20"
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    alt=""
                />
                {option.label} ({option.code}) +{option.phone}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                {...params}
                size='small'
                width="100px"
                label="Choose a country"
                inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                }}
                />
            )}
        />
    );
};

export default SelectCountry;