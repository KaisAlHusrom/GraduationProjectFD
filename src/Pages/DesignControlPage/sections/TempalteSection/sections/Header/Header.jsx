//React
import { useState } from 'react'

import {
    
} from 'react-redux'

// Functions of styles 
import * as utils from '../../StylesFunctions/StylesFunctions.js';


//Components
import { AdminMainButton } from '../../../../../../Components'
import DialogCom from '../../../../components/DialogCom';
import CustomVerticalTabs from '../../components/CustomVerticalTabs';
import ImageContentTap from './ImageContentTap';


//MUI
import {
    Box, Typography,
} from '@mui/material'
import { styled } from '@mui/system'


// icons 
import { Edit as EditIcon  } from '@mui/icons-material';


//Styled Components
import './Header.css'
import TextContentTaP from '../../components/TextContentTaP.jsx';

const StyledHeader = styled(Box)(
    ({ theme }) => ({
        position:'relative'
    })
)

    const StyledImage = {
        borderRadius:'10px',
        height: '100%',
        width: '100%',
        maxHeight: { xs: "auto" , md: '100vh'},
        maxWidth: { xs: "auto" ,md: '100%'},    
    };
   // Tooltip Container
   const TooltipContainer = styled(Box)({
    position: 'absolute',
    top: '20px',
    left: '20px',
    zIndex: 100,
    transform: 'translateX(0%)',
  });

const Header = () => {
    const tabLabels = ['Image', 'Text'];

    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(true);
    const [selectedImage, setSelectedImage] = useState("https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg");
    const [TextOfHeader , setTextOfHeader] = useState("Text Of Header");
    const [selectedOpacity, setSelectedOpacity] = useState("");
    const [selectedRadius, setSelectedRadius] = useState("");
    const [selectedFontSize, setSelectedFontSize] = useState("16");
    const [selectedFontWight, setSelectedFontWeight] = useState("500");
    // color of text 
    const [currentColor, setCurrentColor] = useState('#00000');
    const [BackGroundColor, setBackGroundColor] = useState('');
    const handleOpacityChange = (event) => {
      utils.handleOpacityChange(event, setSelectedOpacity);
    };

    const handleRadiusChange = (event) => {
      utils.handleRadiusChange(event, setSelectedRadius);
    };
    const handleFontSizeChange = (event) => {
      utils.handleFontSizeChange(event, setSelectedFontSize);
    };
    
    const handleFontWeightChange = (event) => {
      utils.handleFontWeightChange(event, setSelectedFontWeight);
    };

    const handleTextHeaderChangeWrapper = (e) => {
      utils.handleTextHeaderChange(e, setTextOfHeader);
    };

  

  
      const handleColorSelectWrapper = (color) => {
        utils.handleColorSelect(color, setCurrentColor);
      };

      const handleBackgroundColorWrapper = (color) => {
        utils.handleBackgroundColor(color, setBackGroundColor);
      };
      
      const handleBackgroundColorDeleteWrapper = () => {
        utils.handleBackgroundColorDelete(setBackGroundColor);
      };


      // logo
      const handleImageChangeWrapper = (file) => {
        handleImageChange(file, setSelectedImage);
      };
      
      const handleUploadImageClickWrapper = () => {
        utils.handleUploadImageClick(handleImageChangeWrapper);
      };

      const handleImageChange = (file) => {
        utils.handleImageChange(file, setSelectedImage);
      };

      const handleDeleteLogoClick = () => {
        utils.handleDeleteLogoClick(setSelectedImage);
      };
      
    
    // Define tab contents
    const tabContents = [
        () => <ImageContentTap 
        handleDeleteLogoClick= {handleDeleteLogoClick}
        handleUploadImageClick = {handleUploadImageClickWrapper} 
        />, 
        () => <TextContentTaP 

        opacity = {utils.opacity}
        handleOpacityChange = {handleOpacityChange}
        selectedOpacity = {selectedOpacity}

        Radius = {utils.Radius}
        handleRadiusChange = {handleRadiusChange}
        selectedRadius = {selectedRadius}

        FontSize = {utils.FontSize}
        handleFontSizeChange = {handleFontSizeChange}
        selectedFontSize = {selectedFontSize}
        
        FontWight = {utils.FontWight}
        handleFontWeightChange = {handleFontWeightChange}
        selectedFontWight = {selectedFontWight}


        handleBackgroundColorDelete= {handleBackgroundColorDeleteWrapper}
        currentColor = {currentColor}
        handleColor = {handleColorSelectWrapper}
        textHeaderChange = {handleTextHeaderChangeWrapper} 
        BackGroundColor = {BackGroundColor}
        handleBackgroundColor = {handleBackgroundColorWrapper}
        setTextOfHeader = {setTextOfHeader} 
        TextOfHeader= {TextOfHeader} />
        ];

    return (
        <StyledHeader>
                {/* Tooltip Container for Edit Nav button */}
                <TooltipContainer>
                <AdminMainButton
                    title='Edit Header'
                    type='custom'
                    appearance='iconButton'
                    putTooltip
                
                    icon={<EditIcon />}
                    onClick={handleOpenDialog}
                    sx={{
                        border: '1px solid red',
                        padding: '10px 15px',
                        fontWeight: 'bold',
                        color: 'white.main',
                        backgroundColor: 'primary.dark',
                    }}
                />
                </TooltipContainer>
                {
                    selectedImage ? (
                      <Box className="header-image" sx={{ position: 'relative' }}>
                        <Box
                          sx={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: '1',
                            // Add other styles as needed
                          }}
                        >
                          <Typography variant="h2" sx={{
                            color: currentColor,
                            backgroundColor: BackGroundColor,
                            padding: '10px 15px',
                            fontWeight: selectedFontWight,
                            borderRadius: selectedRadius,
                            fontSize: selectedFontSize,
                            opacity: selectedOpacity,
                          }}>
                            {TextOfHeader}
                          </Typography>
                        </Box>
                        <Box
                          component="img"
                          style={StyledImage}
                          src={selectedImage}
                        />
                      </Box>
                    ) : null
                  }

              {/* Dialog for editing */}
            <DialogCom title='Header' dialogOpenState={[openDialog, setOpenDialog]}>
            <CustomVerticalTabs  tabLabels={tabLabels} tabContents={tabContents}/>
            </DialogCom>

        </StyledHeader>
    );
};

export default Header;