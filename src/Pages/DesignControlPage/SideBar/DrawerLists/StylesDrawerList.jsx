//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material'
import { styled } from '@mui/system'
import PersistentDrawerLeft from '../../components/PersistentDrawerLeft'
import FontDrawerList from './FontDrawerList'
import ColorBar from '../Components/ColorBar'

//Styled Components
const StyledStylesDrawerList = styled(Box)(
    () => ({
        width:'200px'
    })
)


const StylesDrawerList = () => {
    const [color , setColor] = useState(false)
    const [font , setFont] = useState(false)

    const drawerItems = [
        {
          name :'Colors' , 
          onClick: ()=> {
            setColor(true)
          },
        },
        {
          name :'Fonts' , 
          onClick: ()=> {setFont(true)},
        }
    ];

    return (
        <StyledStylesDrawerList>
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
        <PersistentDrawerLeft drawerOpenState = {[color, setColor]} closebtn={true} >
            <ColorBar></ColorBar>
        </PersistentDrawerLeft>
        <PersistentDrawerLeft drawerOpenState = {[font, setFont]} closebtn={true} >
            <FontDrawerList></FontDrawerList>
        </PersistentDrawerLeft>
        </StyledStylesDrawerList>
    );
};

export default StylesDrawerList;