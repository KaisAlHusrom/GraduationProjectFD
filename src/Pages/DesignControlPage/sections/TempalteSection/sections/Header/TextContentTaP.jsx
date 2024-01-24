//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components
import CustomTextField from '../../../../../../Components/CustomTextField/CustomTextField'
import { AdminMainButton } from '../../../../../../Components'
import ColorButtons from '../../components/ColorButtons';
import CustomSelectInput from '../../../../../../Components/CustomSelectInput/CustomSelectInput';

// icons 

import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';

//MUI
import {
    Box, MenuItem,
} from '@mui/material'
import { styled } from '@mui/system'


//Styled Components
const StyledTextContentTaP = styled(Box)(
    ({ theme }) => ({
    
    })
)



const TextContentTaP = ({
    BackGroundColor,
    handleBackgroundColor,
    handleBackgroundColorDelete,
    currentColor,
    handleColor,
    setTextOfHeader,
    TextOfHeader,
    //opacity  
    opacity,
    handleOpacityChange,
    selectedOpacity , 

    //Radius   
    Radius,
    handleRadiusChange,
    selectedRadius , 

    // FONT SİZE 
    handleFontSizeChange , 
    FontSize, 
    selectedFontSize,
    // FONT Wight 
    FontWight, 
    handleFontWeightChange , 
    selectedFontWight,
  }) => {

    const [temporaryText, setTemporaryText] = useState(TextOfHeader);

    const handleTextFieldChange = (e) => {
      setTemporaryText(e.target.value);
    };
  
    const handleSaveChanges = () => {
      setTextOfHeader(temporaryText);
    };
 
    const customInputStyle = {
      display: 'block',
      width: '200px',
      padding: '10px',
      borderColor:'red',
      transition: '0.3s all',
      borderRadius: '10px',
      '&:hover': {
        backgroundColor: "rgba(255, 255, 255, 0.45)",
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
      },
    };
    const customSelectStyle = {
      display: 'block',
      width: '200px',
      padding: '5px',
      borderColor: 'red',
      transition: '0.3s all',
      borderRadius: '10px',
      cursor: 'pointer',
      // Add any additional styles or hover effects here
      '&:hover': {
        backgroundColor: "white.dark",
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
      },
    };
  
    return (
      <StyledTextContentTaP>
        <Box>
        

          <Box sx = {{display:'flex' , flexWrap:'wrap' , justifyContent:'start' , alignItems:'center' , width:"100%"}}>
          <CustomTextField
           style = {customInputStyle}
            id={`name`}
            label='Text'
            variant='filled'
            value={temporaryText}
            onChange={handleTextFieldChange}
          />
  
            <CustomSelectInput
                name="opacity"
                className={customSelectStyle}
                onChange={handleOpacityChange}
                valueSet = {selectedOpacity}
                >
                {opacity.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
                ))}
              </CustomSelectInput>


              <CustomSelectInput
                name="Border Radius"
                className={customSelectStyle}
                onChange={handleRadiusChange}
                valueSet = {selectedRadius}
                >
                {Radius.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
                ))}
              </CustomSelectInput>

              <CustomSelectInput
                name="Font Size "
                className={customSelectStyle}
                onChange={handleFontSizeChange}
                valueSet = {selectedFontSize}
                >
                {FontSize.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
                ))}
              </CustomSelectInput>

              <CustomSelectInput
                name="Font Wight"
                className={customSelectStyle}
                onChange={handleFontWeightChange}
                valueSet = {selectedFontWight}
                >
                {FontWight.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
                ))}
              </CustomSelectInput>


          </Box>


          <Box
            sx={{
              marginTop: '50px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <ColorButtons
              ButtonName="Change Color"
              handleColorSelect={handleColor}
              currentColor={currentColor}
            />
  
            <ColorButtons
              ButtonName="Change Back Color"
              handleColorSelect={handleBackgroundColor}
              currentColor={BackGroundColor}
            />
  
            <AdminMainButton
              title='Delete background color'
              icon={<DeleteIcon />}
              type='custom'
              appearance='secondary'
              onClick={handleBackgroundColorDelete}
              sx={{
                marginTop: '10px',
                width: '30%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white.main',
                backgroundColor: 'warning.dark',
              }}
            />
          </Box>
  
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '50px',
            }}
          >
            <AdminMainButton
              title='Save Changes'
              type='custom'
              appearance='primary'
              icon={<DoneAllIcon />}
              onClick={handleSaveChanges}
              sx={{
                marginTop: '10px',
                width: '30%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white.main',
                backgroundColor: 'info.dark',
              }}
            />
          </Box>
        </Box>
      </StyledTextContentTaP>
    );
  };
  
  export default TextContentTaP;
  