//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components
import * as utils from '../../../StylesFunctions/StylesFunctions.js';


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { AdminMainButton } from '../../../../../../../Components'
import CustomVerticalTabs from '../../../components/CustomVerticalTabs'
import { Edit as EditIcon } from '@mui/icons-material';
import TitleTapContent from '../TitleTapContent'
import LinksTabContent from '../LinksTabContent'
import ColorTabContent from '../ColorTabContent'
import NavBarElement from './NavBarElement.jsx';

//Styled Components
const StyledNavBarComponent = styled(Box)(
    ({ theme }) => ({
    
    })
)



const TooltipContainer = styled('div')({
  position: 'absolute',
  top: '-50px',
  transform: 'translateX(-50%)',
});



const NavBarComponent = ({component}) => {

    

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


       // State for mobile drawer and dialog
    //    const [mobileOpen, setMobileOpen] = useState(false);
    //    const [openDialog, setOpenDialog] = useState(false);
     
       // State for colors
       const [currentColorLinks, setCurrentColorLinks] = useState('#00000');
       const [currentColorLinksText, setCurrentColorLinksText] = useState('#00000');
       const [currentColor, setCurrentColor] = useState('#00000');
       const [colorOfTitle, setColorOfTitle] = useState('#00000');
       const [selectedFontSize, setSelectedFontSize] = useState("10");
       const [selectedFontWight, setSelectedFontWeight] = useState("500");
       const [selectedImages, setSelectedImage] = useState();
       // State for hovered button
       const [hoveredButton, setHoveredButton] = useState(null);
   
       // State for link tab - list of links
       const [navItemsLink, setNavItemsLink] = useState([
         { name: 'Home', id: "1", onClick: () => {}, color: 'primary', link: 'https://' },
         { name: 'About Us', id: "2", onClick: () => {}, color: 'primary', link: 'https://' },
         { name: 'Contact Us', id: "3", onClick: () => {}, color: 'primary', link: 'https://' },
       ]);
     const FontSize = [
       5,
       10,
       15,
       20,
     ]
     const FontWight = [
       700 , 
       900, 
       500,
     ]
   
     
       // State for the title
       const [title, setTitle] = useState('MUI');
     
       // State for opacity
       const [opacity, setOpacity] = useState(1);
     
       
   
       const handleColorSelectWrapper = (color) => {
         utils.handleColorSelect(color, setCurrentColor);
       };
       
       const handleOpacityChangeWrapper = (event) => {
         utils.handleOpacityChange(event, setOpacity);
       };
       
       const handleColorChangeWrapper = (color) => {
         utils.handleColorChange(color, setCurrentColor);
       };
       
       const generateRandomColorWrapper = () => {
         utils.generateRandomColor(setCurrentColor);
       };
   
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
   
       const handleFontSizeChange = (event) => {
         utils.handleFontSizeChange(event, setSelectedFontSize);
       };
       
       const handleFontWeightChange = (event) => {
         utils.handleFontWeightChange(event, setSelectedFontWeight);
       };
    
    // Define tab contents
    const tabContents = [
        () => <TitleTapContent handleDeleteLogoClick= {handleDeleteLogoClick} handleUploadImageClick = {handleUploadImageClickWrapper}   titleSelect= {[title, setTitle]} ColorSelect={[colorOfTitle, setColorOfTitle]} />,
        () => <LinksTabContent FontWight={FontWight} handleFontWightChange={handleFontWeightChange} selectedFontWight={selectedFontWight} FontSize = {FontSize} handleFontSizeChange={handleFontSizeChange} selectedFontSize={selectedFontSize} navItemsLinkList={navItemsLink} setNavItemsLink={setNavItemsLink} OpacityState={[opacity, setOpacity]} currentColorLinksState={[currentColorLinks, setCurrentColorLinks]} currentColorLinksTextState={[currentColorLinksText, setCurrentColorLinksText]} />,
        () => <ColorTabContent currentColor={currentColor} handleColorSelect={handleColorSelectWrapper} handleOpacityChange={handleOpacityChangeWrapper} handleColorChange={handleColorChangeWrapper} generateRandomColor={generateRandomColorWrapper} />,
      ];
    
      // Define tab labels
      const tabLabels = ['Title', 'Links', 'Back Ground Color Nav Bar'];

    return (
        <StyledNavBarComponent sx={componentStyle}>
              {
                component && component.component_elements.map((element, i) => {
                    return (
                        <NavBarElement key={i} element={element} />
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
        </StyledNavBarComponent>
    );
};

NavBarComponent.propTypes = {
    component: propTypes.component
}

export default NavBarComponent;