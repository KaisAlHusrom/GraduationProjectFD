import PropTypes from 'prop-types';
import { Box, TextField, Typography } from '@mui/material';

// CustomTextField component
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
  required, // Add required prop here
}) => {
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
        required={required} // Use the required prop here
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

CustomTextField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  BoxStyle: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  disableHover: PropTypes.bool,
  labelStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  TextFiledStyle: PropTypes.object,
  OutLabel: PropTypes.string,
  required: PropTypes.bool, // Add required prop here
};

CustomTextField.defaultProps = {
  variant: 'outlined',
  BoxStyle: {},
  disableHover: false,
  labelStyle: {},
  inputStyle: {},
  TextFiledStyle: {},
  required: false, // Set the default value for required
};

export default CustomTextField;
