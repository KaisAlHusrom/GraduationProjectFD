//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import PageSettings from '../../Components/PageSettings/PageSettings';


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import TuneIcon from '@mui/icons-material/Tune';


//Styled Components
const StyledElementSettingsPage = styled(Box)(
    () => ({
    
    })
)

const elementsItems = [
    {
        path: "element-types",
        title: "Element Types",
        body: "Control Element Types",
        icon: <CodeIcon color='primary' sx={{fontSize: "64px"}} />
    },
    {
        path: "element-props",
        title: "Element Props",
        body: "Control Element Props",
        icon: <TuneIcon color='primary' sx={{fontSize: "64px"}} />
    },
    {
        path: "create-element-template",
        title: "Create Element Template",
        body: "You can create the new elements here",
        icon: <DesignServicesIcon color='primary' sx={{fontSize: "64px"}} />
    },
]

const ElementSettingsPage = () => {
    

    return (
        <StyledElementSettingsPage >
            <PageSettings
                items={elementsItems}
            />
        </StyledElementSettingsPage>
    );
};

export default ElementSettingsPage;