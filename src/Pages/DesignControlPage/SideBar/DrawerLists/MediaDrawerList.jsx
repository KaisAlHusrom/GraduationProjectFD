//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components
import DialogCom from '../../components/DialogCom'
import PersistentDrawerLeft from '../../components/PersistentDrawerLeft'

//MUI
import {
    Box, Card, CardMedia, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material'
import { styled } from '@mui/system'
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import MovieIcon from '@mui/icons-material/Movie';
//Styled Components
const StyledMediaDrawerList = styled(Box)(
    ({theme}) => ({
      width: '350px',
      color:theme.palette.success.main,
    })
)


const MediaDrawerList = () => {

   
    const [openDialog , setOpenDialog] = useState(false)
    const [list, setList] = useState(true);

    const drawerItems = [
        {
          name :'Media Center' , 
          icon : <MovieIcon />,

          onClick: ()=> {
            setOpenDialog(true)
          },
        },
    ];
    const [image , setImage] = useState(false)

    const [selectedImages, setSelectedImages] = useState([]);

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
        <StyledMediaDrawerList>
            <List>
          {drawerItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton onClick={item.onClick}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      <PersistentDrawerLeft drawerOpenState = {[image, setImage]} closebtn={false} >
        <DialogCom title="Media" dialogOpenState={[openDialog , setOpenDialog]}>
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
          <PersistentDrawerLeft drawerOpenState = {[list, setList]} closebtn={false} >
          <List>
          {listItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton onClick={item.onClick}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
          </PersistentDrawerLeft>
          </Box>
          </DialogCom>
        </PersistentDrawerLeft>
        </StyledMediaDrawerList>
    );
};

export default MediaDrawerList;