import { Box, TextField } from '@mui/material';

// CustomTextField component
const CustomTextField = ({ id, label, variant, BoxStyle, value, onChange, disableHover, labelStyle, inputStyle, TextFiledStyle }) => {
  // Handler function for TextField value change
  const handleChange = (event) => {
    if (onChange) {
      // Pass the updated value and id to the parent component
      onChange(event.target.value, id);
    }
  };

  return (
    <Box sx={{ width: "75%", ...BoxStyle }}>
      {/* MUI TextField with props */}
      <TextField
        id={id}
        label={label}
        variant={variant}
        value={value}
        onChange={handleChange}
        size={"small"}
        sx={{
          width: '100%',
          textAlign: 'center',
          ...(disableHover ? { '&:focus': { backgroundColor: 'transparent', outline: '0px' } } : {}),
          ...TextFiledStyle
        }}
        InputLabelProps={{ style: labelStyle }}  // Apply label style
        inputProps={{ style: inputStyle }}        // Apply input style
      />
    </Box>
  );
};

export default CustomTextField;
