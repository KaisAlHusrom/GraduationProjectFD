//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components
import propTypes from 'prop-types'
import * as utils from '../../../StylesFunctions/StylesFunctions.js';

import { Edit as EditIcon } from '@mui/icons-material';

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import HeaderElement from './HeaderElement';
import { AdminMainButton } from '../../../../../../../Components';
import CustomVerticalTabs from '../../../components/CustomVerticalTabs';
import ImageContentTap from '../ImageContentTap';
import TextContentTaP from '../../../components/TextContentTaP';

//Styled Components
const StyledHeaderComponent = styled(Box)(
    ({ theme }) => ({
    
    })
)



const TooltipContainer = styled(Box)({
    position: 'absolute',
    top: '10%',
    left: '0%',
    zIndex: 100,
    transform: 'translateX(50%)',
    });


const HeaderComponent = ({component}) => {
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


    const componentStyle = useMemo(() => {
        const styleObject = {};

        component.section_css_props.forEach((cssProp) => {
        const { css_prop, css_prop_value } = cssProp;

        if (css_prop.is_component) {
            styleObject[css_prop.prop_name] = css_prop_value;
        }
        });

        return styleObject;
    }, [component.section_css_props]);
    return (
        <StyledHeaderComponent sx={componentStyle}>
            {
                component && component.component_elements.map((element, i) => {
                    return (
                        <HeaderElement key={i} element={element} />
                    )
                })
            }

            <TooltipContainer>
                    <AdminMainButton
                        title='Edit About us Content'
                        type='modal'
                        appearance='iconButton'
                        putTooltip
                        icon={<EditIcon />}
                        willShow={
                        <CustomVerticalTabs  tabLabels={tabLabels} tabContents={tabContents}/>
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
        </StyledHeaderComponent>
    );
};

HeaderComponent.propTypes = {
    component: propTypes.object
}


export default HeaderComponent;