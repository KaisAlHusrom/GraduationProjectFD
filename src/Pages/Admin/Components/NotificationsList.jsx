//React
import {
    
} from 'react'

//Components


//MUI
import {
    Divider,
    List,
    ListItem,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledNotificationsList = styled(List)(
    ({ theme }) => ({
        border: '1px solid',
        borderColor: theme.palette.divider,
        borderRadius: "10px",
        width: "320px",
        maxHeight: "540px",
        overflow: "auto",
        padding: `${theme.spacing()} 0`
    })
)

const Notification = styled(ListItem)(
    ({ theme }) => ({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: `${theme.spacing()} ${theme.spacing(2)}`,
        textAlign: document.dir === "rtl" ? "right" : "left"
    })
)


const NotificationTitle = styled(Typography)(
    ({ theme }) => ({
        
    })
)


const NotificationsList = () => {
    return (
            <StyledNotificationsList>
                <Notification>
                    <NotificationTitle variant='subtitle1' component="p">
                    MUI Toolpad is now in Beta
                    </NotificationTitle>
                    <Typography variant='subtitle2' component="p" color="text.secondary">
                    Import in your codebase, connect to datasources and build your UI in minutes! Read our Beta announcement, try toolpad and share your feedback.
                    </Typography>
                    
                </Notification>
                <Divider />
                <Notification>
                    <NotificationTitle variant='subtitle1' component="p">
                    MUI Toolpad is now in Beta
                    </NotificationTitle>
                    <Typography variant='subtitle2' component="p" color="text.secondary">
                    Import in your codebase, connect to datasources and build your UI in minutes! Read our Beta announcement, try toolpad and share your feedback.
                    </Typography>
                    
                </Notification>
                <Divider />
                <Notification>
                    <NotificationTitle variant='subtitle1' component="p">
                    MUI Toolpad is now in Beta
                    </NotificationTitle>
                    <Typography variant='subtitle2' component="p" color="text.secondary">
                    Import in your codebase, connect to datasources and build your UI in minutes! Read our Beta announcement, try toolpad and share your feedback.
                    </Typography>
                    
                </Notification>
                
            </StyledNotificationsList>
    );
};

export default NotificationsList;