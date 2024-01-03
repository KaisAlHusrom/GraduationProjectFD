

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
import { SketchPicker } from 'react-color'

//Styled Components
const StyledColorBar = styled(Box)(
    ({theme}) => ({
        width: '400px',
        padding: theme.spacing(2)
    })
)


const ColorBar = () => {

    const [currentColor , setCurrentColor ] = useState("#fff");
    const handleOnChange = (color)=> {
        setCurrentColor(color);
        console.log(color.rgb);
    }
    return (
        <StyledColorBar>
            <Box>
                <h2>Color Choses</h2>
                <SketchPicker 
                    color={currentColor}
                    onChangeComplete={handleOnChange}
                />
            </Box>
        </StyledColorBar >
    );
};

export default ColorBar;






