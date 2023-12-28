//React
import {  } from 'react'

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { openSettingsDrawer, closeSettingsDrawer } from '../../../Redux/Slices/componentsOpenSlice';

//Components
import SettingsList from './SettingsList';

//MUI
import {
    IconButton,
    Box,
    Drawer
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';



//Styled Components
const StyledSettingsButton = styled(IconButton)(
    ({ theme }) => ({
        border: '1px solid',
        borderColor: theme.palette.divider,
        borderRadius: "10px",
    })
)


const SettingsButton = () => {
    //dispatch
    const dispatch = useDispatch()
    //redux states
    const open = useSelector(state => state.componentsOpenSlice.settingsDrawerOpen)
    const dir = useSelector(state => state.langSlice.dir)

    //handles
    const handleClick = () => {
        dispatch(openSettingsDrawer());
    };

    const handleClose = () => {
        dispatch(closeSettingsDrawer());
    };

    return (
        <Box>
            <StyledSettingsButton size='small' color='primary' onClick={handleClick}>
                <SettingsOutlinedIcon />
            </StyledSettingsButton>
            <Drawer
            anchor={dir === "rtl" ? "left" : "right"}
            open={open}
            onClose={handleClose}
            variant='temporary'
            >
                <SettingsList />
            </Drawer>
        </Box>
    );
};

export default SettingsButton;