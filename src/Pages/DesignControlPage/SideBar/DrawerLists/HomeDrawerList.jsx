import { useContext, useState } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from '@mui/material';
import { styled } from '@mui/system';
import SearchInput from '../../../../Components/CustomSearchInput/SearchInput';
import AdminMainButton from '../../../../Components/AdminMainButton/AdminMainButton';
import NewPageDrawerModel from '../DrawerModals/NewPageDrawerModel';

import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import CollectionsIcon from '@mui/icons-material/Collections';
import { MainTemplateSectionSet } from '../../sections/TempalteSection/UseContext/UserSetSections';

const StyledHomeDrawerList = styled(Box)(
    ({ theme }) => ({
        color: theme.palette.success.main,
    })
);

const AdminButtonHome = styled(Box)(
    ({ theme }) => ({
        borderRadius: '50px',
        margin: '10px',
        color: theme.palette.white.main,
    })
);

const customSearchStyle = {
    width: '300px',
    display: 'flex',
    justifyContent: 'center',
    margin: '20px',
    color: 'white',
};

const HomeDrawerList = () => {
    const { AboutUsPage, setAboutUsPage , setGalleryPage , GalleryPage } = useContext(MainTemplateSectionSet);


    const [drawerItemsState, setDrawerItemsState] = useState({
        'Home': false,
        'About Us': AboutUsPage,
        'Gallery': GalleryPage,
    });
    const handleItemClick = (itemName) => {
        setDrawerItemsState((prevState) => ({
            ...prevState,
            [itemName]: !prevState[itemName],
        }));

        if (itemName === 'About Us') {
            setAboutUsPage((prevAboutUs) => !prevAboutUs);
        }
        if (itemName === 'Gallery') {
            setGalleryPage((prevAboutUs) => !prevAboutUs);
        }
    };


// const handleItemClick = (itemName) => {
//     if (itemName === 'About Us') {
//         setAboutUsPage((prevAboutUs) => !prevAboutUs);
//     }
//     if (itemName === 'Gallery') {
//         setGalleryPage((prevAboutUs) => !prevAboutUs);
//     }
// };


  const drawerItems = [
    {
        name: 'Home',
        icon: <HomeIcon />,
        onClick: () => {},
    },
    {
        name: 'About Us',
        icon: <InfoIcon />,
        onClick: () => handleItemClick('About Us'),
    },
    {
        name: 'Gallery',
        icon: <CollectionsIcon />,
        onClick: () => handleItemClick('Gallery'),
    },
    ];

  return (
    <StyledHomeDrawerList>
        <List>
            <SearchInput className="custom-search-input" style={customSearchStyle} />
            {drawerItems.map((item) => (
                <ListItem key={item.name} disablePadding>
                <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                            <Switch checked={drawerItemsState[item.name]} color="primary" onChange={() => handleItemClick(item.name)} />
                    </ListItemButton>
                </ListItem>
            ))}
        <Box>
        <AdminButtonHome>
            <AdminMainButton
                title="Add New Page"
                type="modal"
                appearance="secondary"
                putTooltip
                willShow={<NewPageDrawerModel />}
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
                icon={<AddIcon />}
            />
        </AdminButtonHome>
        </Box>
    </List>
    </StyledHomeDrawerList>
);
};

export default HomeDrawerList;
