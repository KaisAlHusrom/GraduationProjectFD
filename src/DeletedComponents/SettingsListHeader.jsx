//React
import {
    
} from 'react'

//Redux
import { useDispatch } from 'react-redux';
import { closeSettingsDrawer } from '../Redux/Slices/componentsOpenSlice';

//Components


//MUI
import {
    Box,
    Typography,
    IconButton
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import CloseIcon from '@mui/icons-material/Close';


//Styled Components
const StyledSettingsListHeader = styled(Box)(
    ({ theme }) => ({
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: `${theme.spacing(2)} ${theme.spacing(1)}`
    })
)


const SettingsListHeader = () => {
    //Redux
    const dispatch = useDispatch()

    //handlers
    const closeSettings = () => {
        dispatch(closeSettingsDrawer())
    }

    return (
        <StyledSettingsListHeader>
            <Typography variant='subtitle1'>
                Settings
            </Typography>
            <IconButton color='primary' size='small' onClick={closeSettings}>
                <CloseIcon />
            </IconButton>
        </StyledSettingsListHeader>
    );
};

export default SettingsListHeader;