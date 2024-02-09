
//React
import  { useContext } from 'react';

import {
    
} from 'react-redux'

//Components
import AboutHeader from './AboutHeader';
import AboutTextContent from './AboutTextContent';

// use context for set the pages 
import { MainTemplateSectionSet } from '../../UseContext/UserSetSections'

//MUI


//Styled Components
import StyledAboutUs from './StyledAboutUs';




const AboutUs = () => {

    const {AboutUsPage } = useContext(MainTemplateSectionSet)

    return (
    AboutUsPage ? (
    <StyledAboutUs>
        <AboutHeader/>
        <AboutTextContent  />    
    </StyledAboutUs>
    ) : (
        null
    )
    );
};

export default AboutUs;








