//React
import  { useState } from 'react'

import {
    
} from 'react-redux'

//Components
import MediaDrawerList from './MediaDrawerList'
import StylesDrawerList from './StylesDrawerList'
import PersistentDrawerLeft from '../../components/PersistentDrawerLeft'
import AdminMainButton from '../../../../Components/AdminMainButton/AdminMainButton'
//MUI
import {
    Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material'
import { styled } from '@mui/system'
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import StreetviewIcon from '@mui/icons-material/Streetview';
import TemplatesDrawerModel from '../DrawerModals/TemplatesDrawerModel'
//Styled Components
const StyledMainDrawerList = styled(Box)(
    ({theme}) => ({
      color:theme.palette.success.main,
    })
)







const MainDrawerList = () => {
    const [style , setStyle] = useState(false)
    const [media , setMedia] = useState(false)

    const drawerItems = [
        {
          name :'Styles',
          icon : <FormatColorFillIcon />,
          onClick: () => setStyle(true), // Use setStyle directly in the onClick handler
        },
        {
          name :'Media' , 
          icon : <PermMediaIcon />,
          onClick: ()=> {setMedia(true)},
        },
     
    ];
    return (
        <StyledMainDrawerList>
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



        <PersistentDrawerLeft drawerOpenState = {[style, setStyle]} closebtn={true} >
            <StylesDrawerList></StylesDrawerList>
        </PersistentDrawerLeft>


        <PersistentDrawerLeft drawerOpenState = {[media, setMedia]} closebtn={true} >
            <MediaDrawerList></MediaDrawerList>
        </PersistentDrawerLeft>

        <AdminMainButton 
                title='Look at templates'
                type='modal'
                willShow={
                  <TemplatesDrawerModel></TemplatesDrawerModel>
                }
                sx={{
                    marginTop: '10px',
                    width: '100%',
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    padding: '10px 15px',
                    fontWeight: 'bold',
                    color: 'green'

                }}

                icon={< StreetviewIcon/>}
            />


        </StyledMainDrawerList>
    );
};

export default MainDrawerList;