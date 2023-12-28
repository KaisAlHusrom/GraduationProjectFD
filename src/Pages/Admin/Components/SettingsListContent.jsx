//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    List,
    ListItem,
    ButtonGroup,
    Button,
    Typography
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
//Styled Components
const StyledSettingsListContent = styled(List)(
    ({ theme }) => ({
        width: "100%",
        padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    })
)

const StyledListItem = styled(ListItem)(
    ({ theme }) => ({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    })
)

const StyledButtonGroup = styled(ButtonGroup)(
    ({ theme }) => ({
        width: "100%",
    })
)

const StyledButton = styled(Button)(
    ({ theme }) => ({
        width: "100%",
    })
)


const SettingsListContent = () => {
    return (
        <StyledSettingsListContent>
            <StyledListItem>
            <Typography
            variant='subtitle1'
            color="text.secondary"
            fontWeight="bold"
            component="div"
            >
                Mode:
            </Typography>
            <StyledButtonGroup variant="outlined" aria-label="outlined button group">
                <StyledButton
                value="Light"
                >
                    <WbSunnyIcon />
                    Light
                </StyledButton>
                <StyledButton>
                    <DarkModeIcon />
                    Dark
                </StyledButton>
            </StyledButtonGroup>
            </StyledListItem>
        </StyledSettingsListContent>
    );
};

export default SettingsListContent;