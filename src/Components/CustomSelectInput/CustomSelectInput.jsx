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



const CustomSelectInput = ({id,name , children ,className ,  onChange , valueSet , disabled , sx , required, size}) => {


    const value = valueSet

    return (
        <Box sx = {sx}>
        <FormControl sx={{width: "100%"}} size={size}>
            <InputLabel id="demo-simple-select-label" sx = {{
                fontWeight:'bold',
                fontSize: '16px',
            }}>{name}
            </InputLabel>
            <Select 
                fullWidth
                sx = {{width: "100%", ...className}}
                labelId="demo-simple-select-label"
                id={id}
                value={value}
                label={name}
                onChange={onChange}
                disabled={disabled}
                required={required} // Pass the required prop to the Select component
                size={size}
            >
                {children}
            </Select>
        </FormControl>
    </Box>
    );
};

export default CustomSelectInput;
