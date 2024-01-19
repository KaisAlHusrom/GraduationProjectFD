//React

import {
    
} from 'react-redux'

//Components
import CustomTextField from '../../../../../../Components/CustomTextField/CustomTextField'
import ColorBar from '../../../../components/ColorBar'

// icons 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { AdminMainButton } from '../../../../../../Components';

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


    const [title, setTitle] = titleSelect;

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

 

    // title 
    const handleText = (e) => {
        setTitle(e.target.value);
      };


    return (
        <StyledTitleTapContent>
                {/* change the title  */}
                <CustomTextField
                        label="Title" 
                        variant="filled"
                        value={title}
                        onChange={handleText}
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



        </StyledTitleTapContent>
    );
};

export default TitleTapContent;