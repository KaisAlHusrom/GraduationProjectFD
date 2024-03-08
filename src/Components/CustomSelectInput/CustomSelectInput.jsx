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



const CustomSelectInput = ({id,name , children ,className ,  onChange , valueSet , disabled}) => {


    const value = valueSet

    return (
        <StyledCustomSelectInput>
        <Box sx= {{
            margin: "10px",
            display: 'block',
            width: '250px',
            padding: '10px',
            transition: 'all 0.5s ease',
            borderRadius: '10px',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: "white.dark",
                boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
            },
            boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
        }}>
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

