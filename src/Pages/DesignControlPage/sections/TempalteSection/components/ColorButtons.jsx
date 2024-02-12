// ColorButtons.js
import { Box } from '@mui/material';
import AdminMainButton from '../../../../../Components/AdminMainButton/AdminMainButton';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ColorBar from '../../../components/ColorBar';

const ColorButtons = ({ drawerAnchor,  ButtonName , handleColorSelect, handleOpacityChange, generateRandomColor, currentColor, applyColor }) => {
  return (
    <Box sx={{width:'auto'}}>
      {/* Background color button */}
      <AdminMainButton
        title={ButtonName}
        icon={<ColorLensIcon />}
        type='drawer'
        putDrawerCloseButton
        appearance='primary'
      
        drawerAnchor={drawerAnchor}
        willShow={
        <ColorBar
          sx={{
            width: '100%',
            padding: '60px',
            borderRadius: '8px',
            justifyContent: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
          handleColorChange={applyColor}
          currentColor={currentColor}
          applyColor={applyColor}
          handleColorSelect={handleColorSelect}
          handleOpacityChange={handleOpacityChange}
          generateRandomColor={generateRandomColor}
        />}
        sx={{
          marginTop: '10px',
          width: '100%',
          display: 'flex',
          flexWrap:'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white.main',
          backgroundColor: 'success.dark',
        }}
      />
    </Box>
  );
};

export default ColorButtons;
