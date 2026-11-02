//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import PageSettings from '../../Components/PageSettings/PageSettings'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import TuneIcon from '@mui/icons-material/Tune';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import MouseIcon from '@mui/icons-material/Mouse';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined';

//Styled Components
const StyledStylesSettings = styled(Box)(
    () => ({
    
    })
)

const stylesItems = [
    {
        path: "styles-property-categories",
        title: "Styles Property Categories",
        body: "Control Style Property Categories",
        icon: <WorkspacesOutlinedIcon color='primary' sx={{fontSize: "64px"}} />
    },
    {
        path: "styles-properties",
        title: "Styles Properties",
        body: "Control Style Properties",
        icon: <TuneIcon color='primary' sx={{fontSize: "64px"}} />
    },
    {
        path: "styles-properties-values",
        title: "Styles Properties' Values",
        body: "Control Styles Properties' Values",
        icon: <FormatColorFillIcon color='primary' sx={{fontSize: "64px"}} />
    },
    {
        path: "styles-status",
        title: "Styles Status",
        body: "Control Styles Status",
        icon: <MouseIcon color='primary' sx={{fontSize: "64px"}} />
    },
    {
        path: "styles-breakpoints",
        title: "Styles Breakpoints",
        body: "Control Styles Breakpoints",
        icon: <FitScreenIcon color='primary' sx={{fontSize: "64px"}} />
    },
]


const StylesSettings = () => {
    return (
        <StyledStylesSettings>
            <PageSettings
                items={stylesItems}
            />
        </StyledStylesSettings>
    );
};

export default StylesSettings;