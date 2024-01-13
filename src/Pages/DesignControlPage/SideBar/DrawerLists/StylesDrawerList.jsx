//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components
import PersistentDrawerLeft from '../../components/PersistentDrawerLeft'
import FontDrawerList from './FontDrawerList'

//MUI
import {
    Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material'
import { styled } from '@mui/system'

import ColorLensIcon from '@mui/icons-material/ColorLens';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import ColorBar from '../../components/ColorBar'
//Styled Components
const StyledStylesDrawerList = styled(Box)(
    ({theme}) => ({
      width: '350px',
      color:theme.palette.success.main,

    })
)


const StylesDrawerList = () => {
    const [color , setColor] = useState(false)
    const [font , setFont] = useState(false)
    const [color1, setColor1] = useState('#000000');

    const handleColorChange = (newColor) => {
      setColor1(newColor);
    };

    const drawerItems = [
        // {
        //   name :'Colors' , 
        //   icon : <ColorLensIcon />,
        //   onClick: ()=> {
        //     setColor(true)
        //   },
        // },
        {
          name :'Fonts' , 
          icon : <FontDownloadIcon />,
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
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <PersistentDrawerLeft drawerOpenState = {[color, setColor]} closebtn={true} >
            <ColorBar value={color1} onChange={handleColorChange}></ColorBar>
        </PersistentDrawerLeft> */}


        
        <PersistentDrawerLeft drawerOpenState = {[font, setFont]} closebtn={true} >
            <FontDrawerList></FontDrawerList>
        </PersistentDrawerLeft>
        </StyledStylesDrawerList>
    );
};

export default StylesDrawerList;