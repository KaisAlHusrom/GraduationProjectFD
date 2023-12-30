

//React
import {
    useState
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';


//Styled Components
const StyledColorBar = styled(Box)(
    ({ theme }) => ({
    
    })
)


const ColorBar = () => {

    const [selectedColor, setSelectedColor] = useState({ r: 255, g: 0, b: 0 });

    const handleColorChange = (channel, value) => {
      setSelectedColor((prevColor) => ({
        ...prevColor,
        [channel]: value,
      }));
    };
  
    const rgbColor = `rgb(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b})`;
  
    const colorStyle = {
      backgroundColor: rgbColor,
      height: '30px',
      width: '100%',
      borderRadius: '5px',
    };

    return (
        <StyledColorBar>
        <div>
        <Typography variant="h6" gutterBottom>
            Renk Seçici
        </Typography>
        <div style={colorStyle}></div>
        <div>
                <Typography gutterBottom>Red</Typography>
                <Slider value={selectedColor.r} onChange={(e, newValue) => handleColorChange('r', newValue)} min={0} max={255} />
        </div>
        <div>
                <Typography   Typography gutterBottom>Green</Typography>
                <Slider value={selectedColor.g} onChange={(e, newValue) => handleColorChange('g', newValue)} min={0} max={255} />
        </div>
        <div>
                <Typography gutterBottom>Blue</Typography>
                <Slider value={selectedColor.b} onChange={(e, newValue) => handleColorChange('b', newValue)} min={0} max={255} />
        </div>
        <div>
                <Typography gutterBottom>RGB</Typography>
                <Typography>{rgbColor}</Typography>
        </div>
    </div>
        </StyledColorBar>
    );
};

export default ColorBar;






