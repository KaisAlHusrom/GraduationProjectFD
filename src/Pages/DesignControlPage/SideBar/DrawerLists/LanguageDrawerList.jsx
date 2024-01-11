//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components
import SearchInput from '../../../../Components/CustomSearchInput/SearchInput'
import AddIcon from '@mui/icons-material/Add';
import LanguageIcon from '@mui/icons-material/Language';

//MUI
import {
    Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import TranslateIcon from '@mui/icons-material/Translate';
import AdminMainButton from '../../../../Components/AdminMainButton/AdminMainButton'
import NewLanguageDrawerModel from '../DrawerModals/NewLanguageDrawerModel';
import CustomAlert from '../../../../Components/CustomAlert/CustomAlert';

//Styled Components
const StyledLanguageDrawerList = styled(Box)(
    ({ theme }) => ({
        padding:theme.spacing()
    })
)


const drawerItems = [
    {
        name :'English', 
        icon : <TranslateIcon />,
        onClick: ()=> {}
    },
    // {
    //     name :'Arabic', 
    //     icon : <TranslateIcon />,
    //     onClick: ()=> {}
    // },
    // {
    //     name :'Turkish', 
    //     icon : <TranslateIcon />,
    //     onClick: ()=> {}
    // },
    // {
    //     name :'French', 
    //     icon : <TranslateIcon />,
    //     onClick: ()=> {}
    // },
    // {
    //     name :'English', 
    //     icon : <TranslateIcon />,
    //     onClick: ()=> {}
    // },
    // {
    //     name :'Arabic', 
    //     icon : <TranslateIcon />,
    //     onClick: ()=> {}
    // },
    // {
    //     name :'Turkish', 
    //     icon : <TranslateIcon />,
    //     onClick: ()=> {}
    // },
    // {
    //     name :'French', 
    //     icon : <TranslateIcon />,
    //     onClick: ()=> {}
    // },

    // {
    //     name :'English', 
    //     icon : <TranslateIcon />,
    //     onClick: ()=> {}
    // },
    // {
    //     name :'Arabic', 
    //     icon : <TranslateIcon />,
    //     onClick: ()=> {}
    // },
    // {
    //     name :'Turkish', 
    //     icon : <TranslateIcon />,
    //     onClick: ()=> {}
    // },
    // {
    //     name :'French', 
    //     icon : <TranslateIcon />,
    //     onClick: ()=> {}
    // },
    
]


const customSearchStyle = {
    width: '300px',
    display: 'flex', 
    justifyContent: 'center',
    margin:'20px', 
    color:'white'
};

const LanguageDrawerList = () => {

    const [open, setOpen] = useState(false);


    return (
        <StyledLanguageDrawerList>
            <List>
            <SearchInput className="custom-search-input" style={customSearchStyle} />
            <Typography>
                <h1>Used Language</h1>
            </Typography>

            {drawerItems.map((item) => (
                <ListItem key={item.name} disablePadding sx={{
                    borderBottom:'1px solid' , 
                    borderColor:'gray',
                    paddingBottom:'10px' ,
                    fontWeight: 'bold',
                    color: 'success.main',
                }}>
                    <ListItemButton onClick={item.onClick}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                            <AdminMainButton 
                                title="Make Default"
                                icon={< LanguageIcon/>}
                                appearance="iconButton"
                                putTooltip
                                type='custom'
                                onClick={()=> setOpen(true)}
                                />
                    </ListItemButton>
                </ListItem>
            
                ))}       

                <AdminMainButton 
                title='Add New Language'
                type='modal'
                appearance='secondary'
                badgeContent="hi"
                putTooltip
                willShow={
                        <NewLanguageDrawerModel />
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
            </List> 
            <CustomAlert AlertOpenState={[open, setOpen]}  title="Maked Defualt"></CustomAlert>
        </StyledLanguageDrawerList>
    );
};

export default LanguageDrawerList;