//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    TextField,
} from '@mui/material'

//propTypes 
import propTypes from 'prop-types'

//Styled Components


import _ from 'lodash';

const DebouncedInput = ({onChange, delay, ...props}) => {


     // useMemo to create a debounced version of the onChange handler
    const debouncedOnChange = useMemo(() => _.debounce(onChange, delay), [onChange, delay]);

    const handleChange = (e) => {
        debouncedOnChange(e.target.value);
    };

    return (
        <TextField 
        onChange={handleChange}
        {...props}
        />
    );
};

DebouncedInput.propTypes = {
    children: propTypes.array
}

export default DebouncedInput;