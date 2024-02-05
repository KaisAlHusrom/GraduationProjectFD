//React

import {
    
} from 'react-redux'

//Components
import CustomTextField from '../../../../../../Components/CustomTextField/CustomTextField'
import ColorBar from '../../../../components/ColorBar'

// icons 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { AdminMainButton } from '../../../../../../Components';
import { useState } from 'react';
import CustomAlert from '../../../../../../Components/CustomAlert/CustomAlert';

//Styled Components
const StyledTitleTapContent = styled(Box)(
    ({ theme }) => ({
    
    })
)

const TitleTapContent = ({ 
    ColorSelect,
    titleSelect  , 
    handleUploadImageClick,
    handleDeleteLogoClick , 
}) => {



    const [colorOfTitle, setColorOfTitle] = ColorSelect ;
    const [open, setOpen] = useState(true);


    const [title, setTitle] = titleSelect;
    const [temporaryText, setTemporaryText] = useState(title);

    
    const handleTextFieldChange = (e) => {
        // Update the temporary state while typing
        setTemporaryText(e.target.value);
      };

      const handleSaveChanges = () => {
        // Update the main state only when "Save Changes" button is clicked
        setTitle(temporaryText);
      };


    const handleColorOfTitle = (color) => {
        setColorOfTitle(color);
      };
    
    
      const generateRandomColorLinksText = () => {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        setColorOfTitle(randomColor);
      };
    
      const applyColorLinksText = () => {
        console.log('Selected Color:', colorOfTitle);
      };

 


    return (
        <StyledTitleTapContent>
                {/* change the title  */}
                <CustomTextField
                        label="Title" 
                        variant="filled"
                        value={temporaryText}
                        onChange={handleTextFieldChange}
                        focused
                    />

                        <Box  sx={{display:'flex', flexWrap:'wrap' , justifyContent:'space-around'}}>

                            <AdminMainButton
                                title='Change Text Color'
                                type='drawer'
                                drawerAnchor="right"
                                putDrawerCloseButton
                                appearance='primary'
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
                                currentColor={colorOfTitle}
                                applyColor={applyColorLinksText}
                                handleColorSelect={handleColorOfTitle}
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
                            <AdminMainButton
                                title='Upload logo '
                                type='custom'
                                appearance='primary'
                                icon={<AddCircleOutlineIcon />}
                                onClick={handleUploadImageClick}
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
                                title='Delete logo '
                                type='custom'
                                appearance='primary'
                                onClick={handleDeleteLogoClick}
                                icon={<DeleteIcon />}

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
                            
                        <Box sx={{
                            width:'100%',
                            marginTop:'50px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
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


                <CustomAlert AlertOpenState={[open, setOpen]} title="Don't Forget click on the save button"></CustomAlert>

                            </Box> 



        </StyledTitleTapContent>
    );
};

export default TitleTapContent;