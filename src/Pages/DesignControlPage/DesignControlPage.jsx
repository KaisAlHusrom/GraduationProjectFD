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
        padding:theme.spacing(2),
    })
)


const DesignControlPage = () => {

    const [AboutUsPage, setAboutUsPage] = useState(true)

    const valuesOfPages = {AboutUsPage, setAboutUsPage }
    return (
        <MainTemplateSectionSet.Provider value={valuesOfPages}>

        <StyledDesignControlPage>
            <AppBarCom></AppBarCom>
        </StyledDesignControlPage>

        </MainTemplateSectionSet.Provider>

    );
};

export default DesignControlPage;