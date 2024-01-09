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
const StyledCustomSelectInput = styled(Box)(
    ({ theme }) => ({
    
    })
)



const CustomSelectInput = ({id,name , children ,className}) => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };



    return (
        <StyledCustomSelectInput>
        <Box  style= {className}  >
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{name}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id={id}
                value={value}
                label={name}
                onChange={handleChange}
            >
                {children}
            </Select>
        </FormControl>
    </Box>
        </StyledCustomSelectInput>
    );
};

export default CustomSelectInput;