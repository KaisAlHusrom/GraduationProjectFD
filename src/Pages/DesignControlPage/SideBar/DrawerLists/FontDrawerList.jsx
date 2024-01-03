//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledFontDrawerList = styled(Box)(
    () => ({
    width: '200px',
    })
)


const FontDrawerList = () => {


    
    const drawerItems = [
        {
          name :'Roboto.' , 
          onClick: ()=> {
           
          },
        },
        {
          name :'Open Sans.' , 
          onClick: ()=> {},
        },
        {
          name :'Lato' , 
          onClick: ()=> {},
        }
    ];

    return (
        <StyledFontDrawerList >
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
        </StyledFontDrawerList>
    );
};

export default FontDrawerList;