//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


//Styled Components
const StyledCustomCheckBox = styled(Box)(
    () => ({
    
    })
)


const CustomCheckBox = ({label , control , className , onChange}) => {
    return (
        <StyledCustomCheckBox>
            <FormGroup style={className}>
                <FormControlLabel control={control} label={label} onChange={onChange}/>
            </FormGroup>
        </StyledCustomCheckBox>
    );
};

export default CustomCheckBox;