
//React
import { useState } from 'react'

import {
  
} from 'react-redux'

//Components
import { AdminMainButton } from '../../../../../../Components';
import CustomVerticalTabs from '../../components/CustomVerticalTabs';
import * as utils from '../../StylesFunctions/StylesFunctions.js';

//MUI
import {
  Box,
  Card,
  CardMedia,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { Edit as EditIcon } from '@mui/icons-material';
import ImageContentTap from '../Header/ImageContentTap.jsx';
import TextContentTaP from '../../components/TextContentTaP.jsx';

//Styled Components
const StyledAboutTextContent = styled(Box)(
    () => ({
  
    })
)
        const customAboutUsStyle = {
          position: "relative",
          display: "flex" , 
          flexWrap : 'wrap',
          justifyContent: 'space-evenly',
          alignItems: 'start',
          width: '100%',
          height: '100%',
          
        };
        const customAboutUsImageStyle = {
          width:"33%",
          borderRadius:"10px",
          marginRight:'50px',
          marginTop:'20px'
        };
        const TooltipContainer = styled(Box)({
        position: 'absolute',
        top: '-20%',
        left: '0%',
        zIndex: 100,
        transform: 'translateX(50%)',
        });



  const AboutTextContent = () => {



      const [Text, setTexts] = useState([
        {
          sx: {
            width: "30%",
            color: '',
            fontSize: "16",
            fontWeight: '700',
            textAlign: 'start',
            padding: '20px',
            borderRadius:'0',
            backgroundColor:'',
            opacity: 1, 
          },
          variant: 'h6',
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore doloribus quia cumque ratione neque veniam nesciunt voluptatum perferendis eum temporibus incidunt impedit odio accusantium, architecto ad nobis id dolore voluptatem!"
        },
        {
          sx: {
            width: "30%",
            color: '',
            fontSize: "16",
            fontWeight: '700',
            textAlign: 'start',
            padding: '20px',
            borderRadius:'0',
            backgroundColor:'',
            opacity: 1,
          },
          variant: 'h6',
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore doloribus quia cumque ratione neque veniam nesciunt voluptatum perferendis eum temporibus incidunt impedit odio accusantium, architecto ad nobis id dolore voluptatem!"
        },
        {
          sx: {
            width: "30%",
            color: '',
            fontSize: "16",
            fontWeight: '700',
            textAlign: 'start',
            padding: '20px',
            borderRadius:'0',
            backgroundColor:'',
            opacity: 1,
          },
          variant: 'h6',
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore doloribus quia cumque ratione neque veniam nesciunt voluptatum perferendis eum temporibus incidunt impedit odio accusantium, architecto ad nobis id dolore voluptatem!"
        }
      ]);

  
  

      const [selectedImages, setSelectedImages] = useState([]);

    const handleUploadClick = () => {
      utils.handleUploadImagesClick(setSelectedImages);
    };

    const handleDeleteLogoClick = () => {
      utils.handleDeleteImagesClick(setSelectedImages);
    };

    
   

    const tabLabels = ['images' , 'Texts'] 
    // Define tab contents
    const tabContents = [
        () => <ImageContentTap handleDeleteLogoClick={handleDeleteLogoClick} handleUploadImageClick={handleUploadClick}/>,
        () => <TextContentTaP 

        NameOfBox={"text"}
        setTextOfHeader = {setTexts} 
        TextOfHeader= {Text} 

        />
      ];
    return (
        <StyledAboutTextContent>
            <Box style={customAboutUsStyle} className="AboutUsStyle" >

        <TooltipContainer>
                <AdminMainButton
                    title='Edit About us Content'
                    type='modal'
                    appearance='iconButton'
                    putTooltip
                    icon={<EditIcon />}
                    willShow={
                      <>
                      <CustomVerticalTabs  tabLabels={tabLabels} tabContents={tabContents}/>
                      {selectedImages.map((image, index) => (
                      <Card key={index}>
                        <CardMedia
                          component="img"
                          alt={`Selected ${index + 1}`}
                          style={{ height: 'auto' }}
                          src={image}
                        />
                      </Card>
                    ))}
                      </>
                      
                    }
                    sx={{
                        border: '1px solid red',
                        padding: '10px 15px',
                        fontWeight: 'bold',
                        color: 'white.main',
                        backgroundColor: 'primary.dark',
                    }}
                />
            </TooltipContainer>
            {selectedImages.map((item, index) => (
                  <img style={customAboutUsImageStyle} key={index} src={item} alt="" />
              ))}
              {Text.map((item, index) => (
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
        </StyledAboutTextContent>
    );
};

export default AboutTextContent;







