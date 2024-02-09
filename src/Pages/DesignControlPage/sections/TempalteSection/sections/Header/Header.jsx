//React
import { useState } from 'react'

import {
    
} from 'react-redux'

// Functions of styles 
import * as utils from '../../StylesFunctions/StylesFunctions.js';


//Components
import { AdminMainButton } from '../../../../../../Components'
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

    const [HeaderTexts, setHeaderTexts] = useState([
      {
              sx : {
                  color : 'white',
                  opacity: 1,
                  backgroundColor:'',
                  borderRadius:'0',
                  fontSize: "16",
                  fontWeight: '700',
                  padding:"10px",
              },
              text:"Example title of header",
              variant:'h3',

          },
          {
            sx : {
                color : 'white',
                opacity: 1,
                backgroundColor:'',
                borderRadius:'0',
                fontSize: "16",
                fontWeight: '700',
                padding:"10px"
            },
            variant:'h6',
            text:"Example Description of header"
        },
      ]);



    const [selectedImage, setSelectedImage] = useState("https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg");


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
        NameOfBox={"text"}
        setTextOfHeader = {setHeaderTexts} 
        TextOfHeader= {HeaderTexts} 
        />,
        ];

    return (
        <StyledHeader>
                {/* Tooltip Container for Edit Nav button */}
                <TooltipContainer>
                <AdminMainButton
                    title='Edit Header'
                    type='modal'
                    appearance='iconButton'
                    putTooltip
                    willShow={
                      <CustomVerticalTabs  tabLabels={tabLabels} tabContents={tabContents}/>
                    }
                    icon={<EditIcon />}
                    // onClick={handleOpenDialog}
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
                      
                          {HeaderTexts.map((item, index) => (
                            <Typography
                                key={index}
                                sx={item.sx}
                                component="div"
                                variant={item.variant}
                            >
                                {item.text}
                            </Typography>
                            ))}
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
        </StyledHeader>
    );
};

export default Header;