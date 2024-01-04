//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import SearchInput from '../../../../Components/CustomSearchInput/SearchInput'

//MUI
import {
    Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material'
import { styled } from '@mui/system'
import TranslateIcon from '@mui/icons-material/Translate';

//Styled Components
const StyledLanguageDrawerList = styled(Box)(
    ({ theme }) => ({
        color: theme.palette.success.main
    })
)


const drawerItems = [
    {
        name :'English', 
        icon : <TranslateIcon />,
        onClick: ()=> {}
    },
    {
        name :'Arabic', 
        icon : <TranslateIcon />,
        onClick: ()=> {}
    },
    {
        name :'Turkish', 
        icon : <TranslateIcon />,
        onClick: ()=> {}
    },
    {
        name :'French', 
        icon : <TranslateIcon />,
        onClick: ()=> {}
    },
    {
        name :'English', 
        icon : <TranslateIcon />,
        onClick: ()=> {}
    },
    {
        name :'Arabic', 
        icon : <TranslateIcon />,
        onClick: ()=> {}
    },
    {
        name :'Turkish', 
        icon : <TranslateIcon />,
        onClick: ()=> {}
    },
    {
        name :'French', 
        icon : <TranslateIcon />,
        onClick: ()=> {}
    },

    {
        name :'English', 
        icon : <TranslateIcon />,
        onClick: ()=> {}
    },
    {
        name :'Arabic', 
        icon : <TranslateIcon />,
        onClick: ()=> {}
    },
    {
        name :'Turkish', 
        icon : <TranslateIcon />,
        onClick: ()=> {}
    },
    {
        name :'French', 
        icon : <TranslateIcon />,
        onClick: ()=> {}
    },
    
]


const customSearchStyle = {
    width: '300px',
    display: 'flex', 
    justifyContent: 'center',
    margin:'20px', 
    color:'white'
};

const LanguageDrawerList = () => {
    return (
        <StyledLanguageDrawerList>
            <List>
            <SearchInput className="custom-search-input" style={customSearchStyle} />
          {drawerItems.map((item) => (
            <ListItem key={item.name} disablePadding sx={{
                borderBottom:'1px solid' , 
                borderColor:'gray',
                paddingBottom:'10px' ,
                fontWeight: 'bold',
            }}>
              <ListItemButton onClick={item.onClick}>
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name}  />
              </ListItemButton>

        
            </ListItem>
          ))}
        </List> 
        </StyledLanguageDrawerList>
    );
};

export default LanguageDrawerList;