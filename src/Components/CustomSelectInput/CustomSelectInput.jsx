//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


//Styled Components
const StyledCustomSelectInput = styled(Box)(() => ({}))



const CustomSelectInput = ({id,name , children ,className ,  onChange , valueSet , disabled , sx}) => {


    const value = valueSet

    return (
        <StyledCustomSelectInput>
        <Box sx = {sx}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" sx = {{
                fontWeight:'bold',
                fontSize: '16px',
            }}>{name}</InputLabel>
            <Select sx = {className}
                labelId="demo-simple-select-label"
                id={id}
                value={value}
                label={name}
                onChange={onChange}
                disabled={disabled}
            >
                {children}
            </Select>
        </FormControl>
    </Box>
        </StyledCustomSelectInput>
    );
};

export default CustomSelectInput;

