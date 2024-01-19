//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import SearchInput from '../../../../Components/CustomSearchInput/SearchInput';
import AdminMainButton from '../../../../Components/AdminMainButton/AdminMainButton';
import NewPageDrawerModel from '../DrawerModals/NewPageDrawerModel';
//MUI
import {
    Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material'
import { styled } from '@mui/system'



// icons 
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import ContactsIcon from '@mui/icons-material/Contacts';
import AddIcon from '@mui/icons-material/Add';


//Styled Components
const StyledHomeDrawerList = styled(Box)(
    ({theme}) => ({
        color:theme.palette.success.main,
    })
)
const AdminButtonHome = styled(Box)(
    ({theme}) => ({
        borderRadius: '50px',
        margin:'10px',
        color:theme.palette.white.main,
    })
)

const customSearchStyle = {
    width: '300px',
    display: 'flex', 
    justifyContent: 'center',
    margin:'20px', 
    color:'white',
    
};

const HomeDrawerList = () => {

    const drawerItems = [
        {
            name :'Home', 
            icon : <HomeIcon />,
            onClick: ()=> {}
        },
        {
            name :'About Us', 
            icon : <InfoIcon />,
            onClick: ()=> {}
        },
        {
            name :'Contact Us', 
            icon : <ContactsIcon />,
            onClick: ()=> {}
        }
        
    ]



    return (
        <StyledHomeDrawerList>
            <List>
            <SearchInput className="custom-search-input" style={customSearchStyle} />
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
            <Box>
            <AdminButtonHome>
            <AdminMainButton 

                title='Add New Page'
                type='modal'
                appearance='secondary'
                badgeContent="hi"
                putTooltip
                willShow={
                        <NewPageDrawerModel />
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
                    backgroundColor:'success.dark',
                    '&:hover' : {backgroundColor: 'action.hover'}, 

                }}
                icon={<AddIcon />}
            />
            </AdminButtonHome>
            </Box>
        </List>
        
        </StyledHomeDrawerList>
    );
};

export default HomeDrawerList;