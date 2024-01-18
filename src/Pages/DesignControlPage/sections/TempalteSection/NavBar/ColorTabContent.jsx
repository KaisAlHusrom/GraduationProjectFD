//React
import {
  
} from 'react'

import {
  
} from 'react-redux'

//Components
import ColorBar from '../../../components/ColorBar';


//MUI
import {
  Box,
  Typography
} from '@mui/material'
import { styled } from '@mui/system'



//Styled Components
const StyledColorTabContent = styled(Box)(
    ({ theme }) => ({
  
    })
)


const ColorTabContent = ({ currentColor, applyColor, handleColorSelect, handleOpacityChange, handleColorChange, generateRandomColor }) => {
    return (
        <StyledColorTabContent>
              <Box>
                <Typography variant='h4'>Color Of Nav</Typography>
                <ColorBar
                  sx={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '8px',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  }}
                  currentColor={currentColor}
                  applyColor={applyColor}
                  handleColorSelect={handleColorSelect}
                  handleOpacityChange={handleOpacityChange}
                  handleColorChange={handleColorChange}
                  generateRandomColor={generateRandomColor}
                />
              </Box>        
              
              
              </StyledColorTabContent>
    );
};

export default ColorTabContent;




