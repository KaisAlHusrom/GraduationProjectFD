//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import DrawerBox from './DrawerBox';
import DrawerCom from './DrawerCom';


//MUI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



  const listItems = [
    { icon: <InboxIcon />, text: 'Inbox' },
    { icon: <MailIcon />, text: 'Starred' },
    // Add more list items as needed
  ];
  

const DialogCom = () => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

    return (
    <React.Fragment>
    <DrawerBox icon={<PermMediaIcon />} handleSecondDrawerOpen={handleClickOpen} open={open} name="Media Center" />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
                save
            </Button>
            <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
            >
            <CloseIcon />
            </IconButton>
        </Toolbar>
        </AppBar>
            <DrawerCom listItems={listItems}></DrawerCom>
    </Dialog>
    </React.Fragment>
    );
};

export default DialogCom;