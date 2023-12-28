//React
import {
    
} from 'react'

//Components
import SettingsListHeader from "./SettingsListHeader"
import SettingsListContent from "./SettingsListContent"

//MUI
import {
    Box,
    Divider
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledSettingsList = styled(Box)(
    ({ theme }) => ({
        height: "100vh",
        backgroundColor: theme.palette.background.default,
        width: "350px",
    })
)


const SettingsList = () => {
    return (
        <StyledSettingsList>
            <SettingsListHeader />
            <Divider />
            <SettingsListContent />
        </StyledSettingsList>
    );
};

export default SettingsList;