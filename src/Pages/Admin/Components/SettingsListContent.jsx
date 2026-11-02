//React
import {
    
} from 'react'

//redux
import { useDispatch } from 'react-redux'
import { changeMode } from '../../../Redux/Slices/modeSlice';

//icons
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';

//Components
import  SettingsListItem from './SettingsListItem'

//MUI
import {
    List,
    ListItem,
} from '@mui/material'
import { styled } from '@mui/system'


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




const SettingsListContent = () => {
    const dispatch = useDispatch();

    const handleDarkMode = () => {
        dispatch(changeMode({
            mode: "dark"
        }))
    }

    const handleLightMode = () => {
        dispatch(changeMode({
            mode: "light"
        }))
    }

    const modeButtons = [
        {
            value: "dark",
            name: "Dark",
            icon: <DarkModeIcon />,
            onClick: handleDarkMode,
        },
        {
            value: "light",
            name: "Light",
            icon: <WbSunnyIcon />,
            onClick: handleLightMode,
        },
    ] 

    return (
        <StyledSettingsListContent>
            <StyledListItem>
                <SettingsListItem 
                title="Mode:"
                groupButtons={modeButtons}
                />
            </StyledListItem>
            {/* <StyledListItem>
                <SettingsListItem 
                title="Mode:"
                groupButtons={modeButtons}
                />
            </StyledListItem> */}
        </StyledSettingsListContent>
    );
};

export default SettingsListContent;