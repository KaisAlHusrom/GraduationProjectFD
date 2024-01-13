//React
import {
  
} from 'react'

import {
  
} from 'react-redux'

//Components
import CustomTextField from "../../../../../Components/CustomTextField/CustomTextField";
import { AdminMainButton } from '../../../../../Components';
import ColorBar from '../../../components/ColorBar';


//MUI
import {
  TextField,
  Typography,
  Box,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledLinksTabContent = styled(Box)(
    ({ theme }) => ({
  
    })
)


const LinksTabContent = (
  { 
    // to change the backGroundColor  
      navItemsLink, 
      handleTextFieldChange, 
      currentColorLinks, 
      applyColorLinks,
      handleColorSelectLinks,
      handleOpacityChange,
      handleColorChangeLinks,
      generateRandomColorLinks ,

      // to change the color  
      currentColorLinksText, 
      applyColorLinksText,
      handleColorSelectLinksText,
      handleColorChangeLinksText,
      generateRandomColorLinksText,
      
    
      title,
      setTitle
    }
) => {
    return (
        <StyledLinksTabContent>
              <Box>

                {/* change the title  */}
                    <TextField
                      label="Title" 
                      variant="outlined"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)} 
                    />


                    <Typography variant='h4'>Links Of Nav</Typography>
                    {/* box of buttons to change the background color and color of links  */}
                  <Box  sx={{display:'flex', flexWrap:'wrap' , justifyContent:'space-around'}}>

                      <AdminMainButton
                          title='Change BackGround Color'
                              type='drawer'
                              putDrawerCloseButton
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
                                currentColor={currentColorLinks}
                                applyColor={applyColorLinks}
                                handleColorSelect={handleColorSelectLinks}
                                handleOpacityChange={handleOpacityChange}
                                handleColorChange={handleColorChangeLinks}
                                generateRandomColor={generateRandomColorLinks}
                          />
                    }
                    sx={{
                    marginTop: '10px',
                    width: '30%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white.main',
                    backgroundColor: 'success.dark',
                    }}
                    />
                    <AdminMainButton
                          title='Change Text Color'
                          type='drawer'
                          putDrawerCloseButton

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
                            currentColor={currentColorLinksText}
                            applyColor={applyColorLinksText}
                            handleColorSelect={handleColorSelectLinksText}
                            handleColorChange={handleColorChangeLinksText}
                            generateRandomColor={generateRandomColorLinksText}
                    />
                    }
                    sx={{
                    marginTop: '10px',
                    width: '30%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white.main',
                    backgroundColor: 'success.dark',
                    }}
                    />
                    </Box>

                    {/* get the nav list item and show it on modal  */}

                    {navItemsLink.map((item) => (
                    <Box key={item.id} sx={{ display: 'flex', width: '100%', flexDirection: 'row', flexWrap: 'wrap', padding: '16px', justifyContent: 'space-between' }}>
                          <CustomTextField
                                id={item.id}
                                    variant='filled'
                                    value={item.name}
                                    label='Name'
                                onChange={(updatedValue) => handleTextFieldChange(updatedValue, item.id, 'name')}
                          />

                          <CustomTextField
                                id={item.id}
                                    variant='filled'
                                    value={item.link}
                                    label='Link'
                                onChange={(updatedValue) => handleTextFieldChange(updatedValue, item.id, 'link')}
                          />
                          <AdminMainButton
                              title={`Change Text Color for ${item.name}`}
                                  type='drawer'
                                    putDrawerCloseButton

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
                                      currentColor={currentColorLinksText}
                                      applyColor={applyColorLinksText}
                                      handleColorSelect={handleColorSelectLinksText}
                                      handleColorChange={handleColorChangeLinksText}
                                      generateRandomColor={generateRandomColorLinksText}
                                    />
                                    }
                                    sx={{
                                        marginTop: '10px',
                                        width: '30%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: 'white.main',
                                        backgroundColor: 'success.dark',
                              }}
                          />
                    </Box>
                    ))}



                    </Box>


        </StyledLinksTabContent>
    );
};

export default LinksTabContent;


