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
import TuneIcon from '@mui/icons-material/Tune';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';

//Styled Components
const StyledElementSettingsPage = styled(Box)(
    () => ({
    
    })
)

const elementsItems = [
    {
        path: "element-types-categories",
        title: "Element Types Categories",
        body: "Control Element Types Categories",
        icon: <WidgetsOutlinedIcon color='primary' sx={{fontSize: "64px"}} />
    },
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