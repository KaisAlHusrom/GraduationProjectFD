//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components


// icons 


//MUI
import {
    Box, Typography,
} from '@mui/material'
import { styled } from '@mui/system'


// icons 
import { Edit as EditIcon  } from '@mui/icons-material';


//Styled Components
import './Header.css'
import { AdminMainButton } from '../../../../../../Components'
import DialogCom from '../../../../components/DialogCom';
import CustomVerticalTabs from '../../components/CustomVerticalTabs';
import ImageContentTap from './ImageContentTap';
import TextContentTaP from './TextContentTaP.JSX';
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
   const TooltipContainer = styled('div')({
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

     // logo

        const handleUploadImageClick = () => {
        const inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.accept = 'image/*';
        inputElement.onchange = (e) => {
        const file = e.target.files[0];
        handleImageChange(file);
        };
        inputElement.click();
        };


     const handleImageChange = (file) => {
       if (file) {
         const imageUrl = URL.createObjectURL(file);
         setSelectedImage(imageUrl);
       }
     };

 const handleDeleteLogoClick = () => {
   // Implement the logic to delete the logo, for example, set selectedImages to null
   setSelectedImage(null);
 };

    const textHeaderChange = (e) => {
            setTextOfHeader(e.target.value);
    }

    // Define tab contents
    const tabContents = [
        () => <ImageContentTap handleDeleteLogoClick= {handleDeleteLogoClick} handleUploadImageClick = {handleUploadImageClick} ></ImageContentTap> , 
        () => <TextContentTaP textHeaderChange = {textHeaderChange} TextOfHeader= {TextOfHeader}></TextContentTaP>
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
                        selectedImage ? 
                        <Box class="header-image">
                        <Typography class="header-text" variant="h2" >{TextOfHeader} </Typography>
                        <Box
                        component="img"
                        style={StyledImage}
                        src={selectedImage}
                        />
                        </Box> : ''
                    }
              {/* Dialog for editing */}
            <DialogCom title='Header' dialogOpenState={[openDialog, setOpenDialog]}>
            <CustomVerticalTabs  tabLabels={tabLabels} tabContents={tabContents}/>
            </DialogCom>

        </StyledHeader>
    );
};

export default Header;