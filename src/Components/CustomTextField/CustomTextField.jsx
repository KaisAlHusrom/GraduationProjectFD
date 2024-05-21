import { Box, TextField } from '@mui/material';

// CustomTextField component
const CustomTextField = ({ id, label, variant, style, value, onChange, disableHover, labelStyle, inputStyle, sxStyle }) => {
  // Handler function for TextField value change
  const handleChange = (event) => {
    if (onChange) {
      // Pass the updated value and id to the parent component
      onChange(event.target.value, id);
    }
  };

  return (
    <Box sx={{ width: "75%", ...style }}>
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
          ...sxStyle
        }}
        InputLabelProps={{ style: labelStyle }}  // Apply label style
        inputProps={{ style: inputStyle }}        // Apply input style
      />
    </Box>
  );
};

export default CustomTextField;
