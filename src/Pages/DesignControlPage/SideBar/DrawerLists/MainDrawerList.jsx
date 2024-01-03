//React
import  { useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material'
import { styled } from '@mui/system'
import MediaDrawerList from './MediaDrawerList'
import StylesDrawerList from './StylesDrawerList'
import PersistentDrawerLeft from '../../components/PersistentDrawerLeft'
//Styled Components
const StyledMainDrawerList = styled(Box)(
    () => ({
        width:'200px'
    })
)





const MainDrawerList = () => {
    const [style , setStyle] = useState(false)
    const [media , setMedia] = useState(false)

    const drawerItems = [
        {
          name :'Styles' , 
          onClick: ()=> {
            setStyle(true)
          },
        },
        {
          name :'Media' , 
          onClick: ()=> {setMedia(true)},
        }
    ];
    return (
        <StyledMainDrawerList>
        <List>
          {drawerItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton onClick={item.onClick}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <PersistentDrawerLeft drawerOpenState = {[style, setStyle]} closebtn={true} >
            <StylesDrawerList></StylesDrawerList>
        </PersistentDrawerLeft>


        <PersistentDrawerLeft drawerOpenState = {[media, setMedia]} closebtn={true} >
            <MediaDrawerList></MediaDrawerList>
        </PersistentDrawerLeft>
        </StyledMainDrawerList>
    );
};

export default MainDrawerList;