//React
import {
    useState
} from 'react'

import {
    
} from 'react-redux'

//Components
import AppBarCom  from '../DesignControlPage/components/AppbarCom'

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

// useContext 
import { MainTemplateSectionSet } from './sections/TempalteSection/UseContext/UserSetSections'

//Styled Components
const StyledDesignControlPage = styled(Box)(
    ({ theme }) => ({
        backgroundColor:'white',
    })
)


const DesignControlPage = () => {
    const [HeaderSection, setHeaderSection] = useState(true)
    
    const [AboutUsPage, setAboutUsPage] = useState(false)
    const [GalleryPage, setGalleryPage] = useState(false)
    const [TeamSection, setTeamSection] = useState(true)
    const [CarouselSection, setCarouselSection] = useState(true)
    const [WorkSection, setWorkSection] = useState(true)
    const [CounterSection, setCounterSection] = useState(true)
    const [ServicesSection, setServicesSection] = useState(true)

    const valuesOfPages = {HeaderSection, setHeaderSection , AboutUsPage, setAboutUsPage , GalleryPage, setGalleryPage , TeamSection ,setTeamSection,CarouselSection, setCarouselSection , WorkSection, setWorkSection ,CounterSection, setCounterSection ,ServicesSection, setServicesSection}
    return (
        <MainTemplateSectionSet.Provider value={valuesOfPages}>
        <StyledDesignControlPage>
            <AppBarCom></AppBarCom>
        </StyledDesignControlPage>
        </MainTemplateSectionSet.Provider>

    );
};

export default DesignControlPage;