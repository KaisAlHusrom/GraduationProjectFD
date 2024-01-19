//React
import React , {

} from 'react'

import {
  
} from 'react-redux'

//Components


//MUI
import {
  Box,
} from '@mui/material'
import { styled } from '@mui/system'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';



//Styled Components
const StyledDialogCom = styled(Box)(
    () => ({
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      boxShadow: 24,
      p: 4,
    })
)
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="center" ref={ref} {...props} />;
});

const DialogCom = ({title,dialogOpenState , children}) => {

  const [open, setOpen] = dialogOpenState;

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <StyledDialogCom>
 <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {title}
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
        {children}
      </Dialog>
      
    </React.Fragment>
    </StyledDialogCom>
    
  );
};

export default DialogCom;




