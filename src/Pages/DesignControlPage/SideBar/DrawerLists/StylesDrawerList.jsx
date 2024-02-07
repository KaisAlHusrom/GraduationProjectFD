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
import { AdminMainButton } from '../../../../Components'
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
          Component: FontDrawerList,
          icon : <FontDownloadIcon />,
          onClick: ()=> {setFont(true)},
        }
    ];

    return (
        <StyledStylesDrawerList>
            <List>
              
          {drawerItems.map((item) => (
              <AdminMainButton
              key={item.name}
              title={item.name}
              type="drawer"
              appearance="secondary"
              putTooltip
              willShow={
                <item.Component></item.Component>
              }
              sx={{
                marginTop: '10px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 15px',
                fontWeight: 'bold',
                color: 'white.main',
                backgroundColor: 'success.dark',
                '&:hover': { backgroundColor: 'action.hover' },
              }}
              icon={item.icon}
            />
          ))}
        </List>

        
        <PersistentDrawerLeft drawerOpenState = {[font, setFont]} closebtn={true} >
            <FontDrawerList></FontDrawerList>
        </PersistentDrawerLeft>
        </StyledStylesDrawerList>
    );
};

export default StylesDrawerList;