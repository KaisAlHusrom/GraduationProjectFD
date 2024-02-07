//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components
import CustomSelectInput from '../../.../../../../../Components/CustomSelectInput/CustomSelectInput'
import CustomTextField from '../../.../../../../../Components/CustomTextField/CustomTextField'
import ColorButtons from './ColorButtons'
import { AdminMainButton } from '../../../../../Components';
import CustomAlert from '../../.../../../../../Components/CustomAlert/CustomAlert';

import * as TextUtils from '../StylesFunctions/StylesFunctionsOFArray';
import * as utils from '../StylesFunctions/StylesFunctions.js';

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
    () => ({
    
    })
)



const TextContentTaP = ({
    NameOfBox ,
    // the text 
    setTextOfHeader,
    TextOfHeader,
  }) => {

    const [temporaryText, setTemporaryText] = useState(TextOfHeader);
      // color of text 
      const [currentColor, setCurrentColor] = useState('');
      const [BackGroundColor, setBackGroundColor] = useState('');
      const [open, setOpen] = useState(true);

    const handleSaveChanges = () => {
      setTextOfHeader(temporaryText);
    };

    const customSelectStyle = {
      display: 'block',
      width: '300px',
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
            {
                temporaryText.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                <CustomTextField
                
                  id={`name-${index}`}
                  label={NameOfBox}
                  variant='filled'
                  value={item.text}
                  onChange={TextUtils.handleTextFieldChangeArray(index , setTemporaryText)}
                  />
                    <CustomSelectInput
                      name="opacity"
                      className={customSelectStyle}
                      onChange={TextUtils.handleOpacityChangeArray(index , setTemporaryText)} // Use the new function to handle opacity change
                      valueSet={item.sx['opacity']}
              >
                      {utils.opacity.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </CustomSelectInput>
                    <CustomSelectInput
                      name="Font Size"
                      className={customSelectStyle}
                      onChange={TextUtils.handleFontSizeChangeArray(index , setTemporaryText )}
                      valueSet={item.sx['fontSize']}
                    >
                      {utils.FontSize.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </CustomSelectInput>

                    <CustomSelectInput
                      name="Border Radius"
                      className={customSelectStyle}
                      onChange={TextUtils.handleBorderRadiusChangeArray(index , setTemporaryText)}
                      valueSet={item.sx['borderRadius']}
                    >
                      {utils.Radius.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </CustomSelectInput>
                    <CustomSelectInput
                      name="Font Wight"
                      className={customSelectStyle}
                      onChange={TextUtils.handleFontWeightChangeArray(index  , setTemporaryText)}
                      valueSet={item.sx['fontWeight']}
                    >
                      {utils.FontWight.map((item, index) => (
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
                      currentColor={currentColor}
                      handleColorSelect={TextUtils.handleColorSelectWrapperArray(index , setTextOfHeader)}
                      />

  
                    <ColorButtons
                          ButtonName="Change Back Color"
                          handleColorSelect={TextUtils.handleBackGroundColorSelectWrapperArray(index , setTextOfHeader)}
                          currentColor={BackGroundColor}
                    />

                    <AdminMainButton
                      title='Delete background color'
                      icon={<DeleteIcon />}
                      type='custom'
                      appearance='secondary'
                      onClick={TextUtils.handleBackgroundColorDeleteArray(index , setTextOfHeader)}
                      sx={{
                        marginTop: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white.main',
                        backgroundColor: 'warning.dark',
                      }} />
                        </Box>
                </Box>
              )) 
            }
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '50px',
            }}
          >
            <CustomAlert AlertOpenState={[open, setOpen]} title="Don't Forget click on the save button"></CustomAlert>

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
  