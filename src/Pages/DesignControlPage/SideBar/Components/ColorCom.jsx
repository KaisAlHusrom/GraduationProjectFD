
//React
import {
  useState
} from 'react'

import {
  
} from 'react-redux'

//Components
import ColorBar from './ColorBar';


//MUI
import {
  Box,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledColorCom = styled(Box)(
    ({ theme }) => ({
      padding:theme.spacing(2)
    })
)


const ColorCom = () => {

  const colors = [
    { name: 'Red', shades: ['#ff0000', '#cc0000', '#990000', '#660000', '#330000'] },
    { name: 'Blue', shades: ['#0000ff', '#0000cc', '#000099', '#000066', '#000033'] },
    { name: 'Green', shades: ['#00ff00', '#00cc00', '#009900', '#006600', '#003300'] },
    { name: 'Yellow', shades: ['#ffff00', '#cccc00', '#999900', '#666600', '#333300'] },
    { name: 'Purple', shades: ['#800080', '#660066', '#4b004b', '#320032', '#1a001a'] },
    { name: 'Orange', shades: ['#ff6600', '#cc5200', '#993d00', '#662900', '#331400'] },
    { name: 'Pink', shades: ['#ff3399', '#cc2677', '#991c55', '#661133', '#33080c'] },
    { name: 'Gray', shades: ['#808080', '#666666', '#4d4d4d', '#333333', '#1a1a1a'] },
    { name: 'Brown', shades: ['#8b4513', '#6e3511', '#523210', '#362110', '#1b1108'] },
    { name: 'Black', shades: ['#000000', '#000000', '#000000', '#000000', '#000000'] },
  ];






  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedShade, setSelectedShade] = useState(null);

  // const handleColorClick = (color) => {
  //   setSelectedColor(color);
  //   setSelectedShade(null);
  // };

  const handleShadeClick = (shade) => {
    setSelectedShade(shade);
  };

    return (
        <StyledColorCom>
      <div>
      <h1>Color Picker</h1>
      {colors.map((color) => (
        <div key={color.name}>
          <h3>{color.name}</h3>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            {color.shades.map((shade , index) => (
              <div
              key={`${color.name}-${index}`}
                onClick={() => handleShadeClick(shade)}
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: shade,
                  border: selectedShade === shade ? '2px solid #000' : 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '5px',
                }}
              />
            ))}
          </div>
        </div>
      ))}

      {selectedColor && (
        <div style={{ marginTop: '20px', display: 'flex', marginBottom: '10px' }}>
          {colors
            .find((color) => color.name === selectedColor)
            .shades.map((shade) => (
              <div
                key={shade}
                onClick={() => handleShadeClick(shade)}
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: shade,
                  border: selectedShade === shade ? '2px solid #000' : 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '5px',
                }}
              />
            ))}
        </div>
      )}

      <ColorBar></ColorBar>
      
    </div>
        </StyledColorCom>
    );
};

export default ColorCom;








