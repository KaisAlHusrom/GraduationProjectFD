//React
import React , {
  useState 
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
import PermMediaIcon from '@mui/icons-material/PermMedia';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import DrawerBox from './DrawerBox';
import DrawerCom from './DrawerCom';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import BurstModeIcon from '@mui/icons-material/BurstMode';


//Styled Components
const StyledDialogCom = styled(Box)(
    ({ theme }) => ({
  
    })
)
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogCom = () => {

  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageChange = (file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImages((prevImages) => [...prevImages, imageUrl]);
    }
  };

  const handleUploadImageClick = () => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*';
    inputElement.onchange = (e) => {
      const file = e.target.files[0];
      handleImageChange(file);
    };
    inputElement.click();
  };

  const listItems = [
    {
      icon: <BurstModeIcon />,
      text: 'Upload Image',
      onClick: handleUploadImageClick,
    },
    {
      icon: <BrokenImageIcon />,
      text: 'Unsplash',
      onClick: ()=> {console.log('clicked')},
    },
    {
      icon: <AddPhotoAlternateIcon />,
      text: 'Pexels',
      onClick: ()=> {console.log('clicked')},
    },
  ];

  return (
    <StyledDialogCom>
 <React.Fragment>
      <DrawerBox
        icon={<PermMediaIcon />}
        handleSecondDrawerOpen={handleClickOpen}
        open={open}
        name="Media Center"
      />
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginLeft: 30,
            marginBottom: 2,
          }}
        >
          {selectedImages.map((image, index) => (
            <Card key={index}>
              <CardMedia
                component="img"
                alt={`Selected ${index + 1}`}
                style={{ height: 140 }}
                src={image}
              />
            </Card>
          ))}
        </Box>
        <DrawerCom listItems={listItems} />
      </Dialog>
    </React.Fragment>
    </StyledDialogCom>
   
  );
};

export default DialogCom;




