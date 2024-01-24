//React
import {
  useContext  
} from 'react'

import {
    
} from 'react-redux'

//Components




//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

// useContext 
import { MainTemplateSectionSet } from '../../UseContext/UserSetSections'

//Styled Components
const StyledAboutUs = styled(Box)(
    ({ theme }) => ({
    
    })
)


const AboutUs = () => {

    const {AboutUsPage } = useContext(MainTemplateSectionSet)

    return (
        AboutUsPage ? (
            <StyledAboutUs>
            HELLO About us
            </StyledAboutUs>
        ) : (
          null // or any other fallback content you want to render when AboutUsPage is false
        )
    );
};

export default AboutUs;