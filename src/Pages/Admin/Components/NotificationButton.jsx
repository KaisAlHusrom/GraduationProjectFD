//React
import { useState } from 'react'

//Components
import NotificationsList from "./NotificationsList"

//MUI
import {
    IconButton,
    Badge,
    Box,
    Popover
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

//Styled Components


const StyledNotificationButton = styled(IconButton)(
    ({ theme }) => ({
        border: '1px solid',
        borderColor: theme.palette.divider,
        borderRadius: "10px",
        // height: "34px",
        // width: "34px",
    })
)

const StyledPopover = styled(Popover)(
    ({ theme }) => ({
        marginTop: theme.spacing(1), // Adjust this value to add space between the button and popover
    })
)


const NotificationButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    //handles
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <StyledNotificationButton color='primary' size='small' onClick={handleClick}>
                <Badge color='error' badgeContent={3}>
                    <NotificationsOutlinedIcon size="small" />
                </Badge>
            </StyledNotificationButton>
            <StyledPopover 
            open={open} 
            anchorEl={anchorEl} 
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            elevation={0}
            >
                <NotificationsList />
            </StyledPopover>
        </Box>
    );
};

export default NotificationButton;