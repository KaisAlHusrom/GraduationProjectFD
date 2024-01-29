import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import { SketchPicker, CirclePicker } from 'react-color';

const StyledColorBar = styled(Box)({
  width: '450px',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 1000, // Set a high zIndex to ensure it appears above other elements
  position: 'fixed', // Set to 'fixed' to cover the entire viewport
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

const ColorBar = ({
  sx,
  currentColor,
  applyColor,
  handleColorSelect,
  handleOpacityChange,
  handleColorChange,
  generateRandomColor,
}) => {
  const Container = sx ? styled(Box)(sx) : StyledColorBar;


  return (
    <Container>

    <Box sx={{marginBottom:'50px'}}>
    <SketchPicker
        color={currentColor}
        onChange={handleColorChange}
        onChangeComplete={(color) => handleColorSelect(color.hex)}/>
    </Box>


        <Box>
        <CirclePicker color={currentColor} onChangeComplete={(color) => handleColorSelect(color.hex)} />

        </Box>


      <Box sx={{ flexDirection: "column", display: 'flex' }}>
        <Button variant="contained" color="primary" style={{ marginTop: '16px' }} onClick={applyColor}>
          Apply Color
        </Button>

        <Button variant="contained" color="secondary" style={{ marginTop: '8px' }} onClick={generateRandomColor}>
          Random Color
        </Button>
      </Box>
    </Container>
  );
};

export default ColorBar;
