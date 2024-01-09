//React
import {
  
} from 'react'

import {
  
} from 'react-redux'

//Components


//MUI
import {
  Box, TextField,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledCustomTextFiled = styled(Box)(
    ({ theme }) => ({
  
    })
)


const CustomTextFiled = ({id , label , variant , style}) => {
    return (
    <StyledCustomTextFiled>
      <Box
      component="form"
      sx={style ? style : { '& > :not(style)': { m: 1, width: '25ch'  } }}
      noValidate
      autoComplete="off"
    >
      <TextField id={id} label={label} variant={variant} />
    </Box>
        </StyledCustomTextFiled>
    );
};

export default CustomTextFiled;