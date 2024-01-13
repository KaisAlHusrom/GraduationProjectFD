import { Box, TextField } from '@mui/material';

// CustomTextField component
const CustomTextField = ({ id, label, variant, style, value, onChange }) => {
  // Handler function for TextField value change
  const handleChange = (event) => {
    if (onChange) {
      // Pass the updated value and id to the parent component
      onChange(event.target.value, id);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', ...style }}>
      {/* MUI TextField with props */}
      <TextField id={id} label={label} variant={variant} value={value} onChange={handleChange} />
    </Box>
  );
};

export default CustomTextField;
