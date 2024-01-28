
//React
import  { useContext, useState } from 'react';

import {
    
} from 'react-redux'

//Components
import AboutHeader from './AboutHeader';
import AboutTextContent from './AboutTextContent';


// js functions of style 
import * as utils from '../../StylesFunctions/StylesFunctions.js';

// use context for set the pages 
import { MainTemplateSectionSet } from '../../UseContext/UserSetSections'

//MUI


//Styled Components
import StyledAboutUs from './StyledAboutUs';
import TextContentTaP from '../../components/TextContentTaP.jsx';




const AboutUs = () => {

    const {AboutUsPage } = useContext(MainTemplateSectionSet)



    



    //  of text title 
    const [currentColor, setCurrentColor] = useState('#eee');
    const [BackGroundColor, setBackGroundColor] = useState('');

    const [TextOfTitle , setTextOfTitle] = useState("example title ");

    const [selectedOpacity, setSelectedOpacity] = useState("");
    const [selectedRadius, setSelectedRadius] = useState("");

    const [selectedFontSize, setSelectedFontSize] = useState("16");
    const [selectedFontWeight, setSelectedFontWeight] = useState("700");

    const [TextOfDescription , setTextOfDescription] = useState("example Description ");

      //  of text description  
    const [currentColorDescription, setCurrentColorDescription] = useState('#eee');
    const [BackGroundColorDescription, setBackGroundColorDescription] = useState('');

    const [selectedOpacityDescription, setSelectedOpacityDescription] = useState("");
    const [selectedRadiusDescription, setSelectedRadiusDescription] = useState("");

    const [selectedFontSizeDescription, setSelectedFontSizeDescription] = useState("16");
    const [selectedFontWeightDescription, setSelectedFontWeightDescription] = useState("700");


        // 
        // for title 
        const handleColorSelectWrapper = (color) => {
            utils.handleColorSelect(color, setCurrentColor);
        };

        const handleBackgroundColorWrapper = (color) => {
            utils.handleBackgroundColor(color, setBackGroundColor);
        };
        
        const handleBackgroundColorDeleteWrapper = () => {
            utils.handleBackgroundColorDelete(setBackGroundColor);
        };


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

        const handleTextTitleChangeWrapper = (e) => {
            utils.handleTextHeaderChange(e, setTextOfTitle);
        };

        // for description 
        const handleColorSelectWrapperDescription = (color) => {
            utils.handleColorSelect(color, setCurrentColorDescription);
        };

        const handleBackgroundColorWrapperDescription = (color) => {
            utils.handleBackgroundColor(color, setBackGroundColorDescription);
        };
        
        const handleBackgroundColorDeleteWrapperDescription = () => {
            utils.handleBackgroundColorDelete(setBackGroundColorDescription);
        };


        const handleOpacityChangeDescription = (event) => {
            utils.handleOpacityChange(event, setSelectedOpacityDescription);
        };

        const handleRadiusChangeDescription = (event) => {
            utils.handleRadiusChange(event, setSelectedRadiusDescription);
        };
        const handleFontSizeChangeDescription = (event) => {
            utils.handleFontSizeChange(event, setSelectedFontSizeDescription);
        };
        
        const handleFontWeightChangeDescription = (event) => {
            utils.handleFontWeightChange(event, setSelectedFontWeightDescription);
        };
        const handleTextDescriptionChangeWrapper = (e) => {
            utils.handleTextHeaderChange(e, setTextOfDescription);
        };

    const tabLabels = [ 'Title' , 'Description'];
    // Define tab contents
    const tabContents = [
        () => <TextContentTaP 
        // for title 
        NameOfBox = "Title"
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
        selectedFontWight = {selectedFontWeight}

        handleBackgroundColorDelete= {handleBackgroundColorDeleteWrapper}
        currentColor = {currentColor}
        handleColor = {handleColorSelectWrapper}
        textHeaderChange = {handleTextTitleChangeWrapper} 
        BackGroundColor = {BackGroundColor}
        handleBackgroundColor = {handleBackgroundColorWrapper}
        setTextOfHeader = {setTextOfTitle} 
        TextOfHeader= {TextOfTitle} 
        />,
        () => <TextContentTaP 
        NameOfBox = "Description"
        opacity = {utils.opacity}
        handleOpacityChange = {handleOpacityChangeDescription}
        selectedOpacity = {selectedOpacityDescription}

        Radius = {utils.Radius}
        handleRadiusChange = {handleRadiusChangeDescription}
        selectedRadius = {selectedRadiusDescription}

        FontSize = {utils.FontSize}
        handleFontSizeChange = {handleFontSizeChangeDescription}
        selectedFontSize = {selectedFontSizeDescription}
        
        FontWight = {utils.FontWight}
        handleFontWeightChange = {handleFontWeightChangeDescription}
        selectedFontWight = {selectedFontWeight}

        handleBackgroundColorDelete= {handleBackgroundColorDeleteWrapperDescription}
        currentColor = {currentColorDescription}
        handleColor = {handleColorSelectWrapperDescription}
        textHeaderChange = {handleTextDescriptionChangeWrapper} 
        BackGroundColor = {BackGroundColorDescription}
        handleBackgroundColor = {handleBackgroundColorWrapperDescription}
        setTextOfHeader = {setTextOfDescription} 
        TextOfHeader= {TextOfDescription} 
        />
        ];


    return (
    AboutUsPage ? (
    <StyledAboutUs>
        <AboutHeader
            // openDialog={openDialog}
            // handleOpenDialog={handleOpenDialog}
            tabLabels={tabLabels}
            tabContents={tabContents}
            selectedOpacity={selectedOpacity}
            selectedFontSize={selectedFontSize}
            selectedFontWeight={selectedFontWeight}
            selectedRadius={selectedRadius}
            currentColor={currentColor}
            BackGroundColor={BackGroundColor}
            TextOfTitle={TextOfTitle}
            selectedOpacityDescription={selectedOpacityDescription}
            selectedFontSizeDescription={selectedFontSizeDescription}
            selectedFontWeightDescription={selectedFontWeightDescription}
            selectedRadiusDescription={selectedRadiusDescription}
            currentColorDescription={currentColorDescription}
            BackGroundColorDescription={BackGroundColorDescription}
            TextOfDescription={TextOfDescription}
        />
        <AboutTextContent  />
        
    </StyledAboutUs>
    ) : (
      null
    )
    );
};

export default AboutUs;








