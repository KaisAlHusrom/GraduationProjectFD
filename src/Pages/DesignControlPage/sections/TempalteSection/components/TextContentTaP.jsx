//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components
import CustomSelectInput from '../../.../../../../../Components/CustomSelectInput/CustomSelectInput'
import CustomTextField from '../../.../../../../../Components/CustomTextField/CustomTextField'

import ColorButtons from './ColorButtons'

// icons 

import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';

//MUI
import {
    Box, Divider, MenuItem, Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { AdminMainButton } from '../../../../../Components';


//Styled Components
const StyledTextContentTaP = styled(Box)(
    ({ theme }) => ({
    
    })
)



const TextContentTaP = ({

  NameOfBox ,
  // for title 
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

    const handleTextFieldChangeArray = (index) => (e) => {
      setTemporaryText((prevText) => {
        const newText = [...prevText];
        newText[index] = { ...newText[index], text: e.target.value };
        return newText;
      });
    };

          // Function to handle opacity change
      const handleOpacityChangeArray = (index) => (event) => {
        const newOpacity = parseFloat(event.target.value);
        setTemporaryText((prevText) => {
          const newText = [...prevText];
            newText[index] = { ...newText[index], sx: { ...newText[index].sx, opacity: newOpacity } };
            return newText;
          });
      };

             // Function to handle opacity change
      const handleFontSizeChangeArray = (index) => (event) => {
        const newFontSize = parseFloat(event.target.value);
          setTemporaryText((prevText) => {
          const newText = [...prevText];
            newText[index] = { ...newText[index], sx: { ...newText[index].sx, fontSize: newFontSize } };
            return newText;
            });
      };
      const handleBorderRadiusChangeArray = (index) => (event) => {
        const newBorderRadius = parseFloat(event.target.value);
          setTemporaryText((prevText) => {
          const newText = [...prevText];
            newText[index] = { ...newText[index], sx: { ...newText[index].sx, borderRadius: newBorderRadius } };
            return newText;
            });
      };
      const handleFontWeightChangeArray = (index) => (event) => {
        const newFontWeight = parseFloat(event.target.value);
          setTemporaryText((prevText) => {
          const newText = [...prevText];
            newText[index] = { ...newText[index], sx: { ...newText[index].sx, fontWeight: newFontWeight} };
            return newText;
            });
      };
      const handleColorChangeArray = (index) => (event) => {
        const newColor = parseFloat(event.target.value);
          setTemporaryText((prevText) => {
          const newText = [...prevText];
            newText[index] = { ...newText[index], sx: { ...newText[index].sx, color: newColor} };
            return newText;
            });
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
          {/* <Typography component="div" variant="h6" sx={{ margin: '30px 0px', width: '100%', display: 'flex', justifyContent: 'center' }}>Texts</Typography> */}
    
          <Box >
            {Array.isArray(temporaryText) ?
                temporaryText.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                <CustomTextField
                  style={customSelectStyle}
                  id={`name-${index}`}
                  label={NameOfBox}
                  variant='filled'
                  value={item.text}
                  onChange={handleTextFieldChangeArray(index)}
                  />
                    <CustomSelectInput
                      name="opacity"
                      className={customSelectStyle}
                      onChange={handleOpacityChangeArray(index)} // Use the new function to handle opacity change
                      valueSet={item.sx['opacity']}
              >
                      {opacity.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </CustomSelectInput>
                    <CustomSelectInput
                      name="Font Size"
                      className={customSelectStyle}
                      onChange={handleFontSizeChangeArray(index)}
                      valueSet={item.sx['fontSize']}
                    >
                      {FontSize.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </CustomSelectInput>

                    <CustomSelectInput
                      name="Border Radius"
                      className={customSelectStyle}
                      onChange={handleBorderRadiusChangeArray(index)}
                      valueSet={item.sx['borderRadius']}
                    >
                      {Radius.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </CustomSelectInput>
                    <CustomSelectInput
                      name="Font Wight"
                      className={customSelectStyle}
                      onChange={handleFontWeightChangeArray(index)}
                      valueSet={item.sx['fontWeight']}
                    >
                      {FontWight.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </CustomSelectInput>
    
                      <Box sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          justifyContent:'space-evenly',
                          alignItems: 'center',
                          width: "100%",
                          borderBottom:'1px solid white',
                          paddingBottom:"30px",
                        }}>

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
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white.main',
                        backgroundColor: 'warning.dark',
                      }} />
                        </Box>

                </Box>
              )) :
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                <CustomTextField
                  style={customSelectStyle}
                  id={`name`}
                  label={NameOfBox}
                  variant='filled'
                  value={temporaryText}
                  onChange={handleTextFieldChange}
                />
                  <CustomSelectInput
                    name="opacity"
                    className={customSelectStyle}
                    onChange={handleOpacityChange}
                    valueSet={selectedOpacity}
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
                    valueSet={selectedRadius}
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
                    valueSet={selectedFontSize}
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
                    valueSet={selectedFontWight}
                  >
                    {FontWight.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </CustomSelectInput>
    
                  <Box sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          justifyContent:'space-evenly',
                          alignItems: 'center',
                          width: "100%",
                          borderBottom:'1px solid white',
                          paddingBottom:"30px",
                        }}>

                      <ColorButtons
                      ButtonName="Change Color"
                      handleColorSelect={handleColorChangeArray}
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
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white.main',
                        backgroundColor: 'warning.dark',
                      }} />
                        </Box>
              </Box>
            }
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
  