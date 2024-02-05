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
    <Box sx={{ width:"75%", ...style  , marginTop:"20px" , marginBottom:'20px'}}>
      {/* MUI TextField with props */}
      <TextField id={id} label={label} variant={variant} value={value} onChange={onChange} sx= {
        {width: '100%'}
      } />
    </Box>
  );
};

export default CustomTextField;
