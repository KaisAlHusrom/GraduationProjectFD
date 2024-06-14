import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

const CustomTextField = ({
  id,
  label,
  OutLabel,
  variant = 'outlined',
  BoxStyle,
  value,
  onChange,
  disableHover,
  labelStyle,
  inputStyle,
  TextFiledStyle,
  required,
}) => {
  const handleChange = (event) => {
    const { value } = event.target; // Extract value from event.target
    if (onChange) {
      onChange(value, id); // Pass both value and id back to the parent component
    }
  };

  return (
    <Box sx={{ width: "75%", ...BoxStyle }}>
      <Typography sx={{
        marginBottom: '10px',
        color: 'text.secondary'
      }}>
        {OutLabel}
      </Typography>
      <TextField
        id={id}
        label={label}
        variant={variant}
        value={value}
        onChange={handleChange}
        size={"small"}
        required={required}
        sx={{
          width: '100%',
          textAlign: 'center',
          '&:hover': disableHover ? { backgroundColor: 'none', outline: 'none' } : {},
          '&:focus': disableHover ? { backgroundColor: 'none', outline: 'none' } : {},
          '&:active': disableHover ? { backgroundColor: 'none', outline: 'none' } : {},
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: disableHover ? 'none' : 'none',
              transition:  'all 0.3s ease-in-out'
            },
            '&:hover fieldset': {
              borderColor: disableHover ? 'none' : 'currentColor',
            },
            '&.Mui-focused fieldset': {
              borderColor: disableHover ? 'none' : 'currentColor',
            },
          },
          ...TextFiledStyle
        }}
        InputLabelProps={{ style: labelStyle }}
        inputProps={{ style: inputStyle }}
      />
    </Box>
  );
};

export default CustomTextField;
