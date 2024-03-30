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
import DialogCom from '../../components/DialogCom';

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
    const { 
        HeaderSection, setHeaderSection , AboutUsPage, setAboutUsPage , setGalleryPage , GalleryPage ,TeamSection,
        setTeamSection ,CarouselSection, setCarouselSection ,WorkSection, setWorkSection ,CounterSection, setCounterSection ,
        ServicesSection, setServicesSection , SliderSection, setSliderSection} = useContext(MainTemplateSectionSet);


    const [drawerItemsState, setDrawerItemsState] = useState({
        'Home': false,
        'Header': HeaderSection,
        'About Us': AboutUsPage,
        'Gallery': GalleryPage,
        'Team': TeamSection,
        'Carousel': CarouselSection,
        'Work': WorkSection,
        'Counters': CounterSection,
        'Services': ServicesSection,
        'Slider' : SliderSection,
    });
    const handleItemClick = (itemName) => {
        setDrawerItemsState((prevState) => ({
            ...prevState,
            [itemName]: !prevState[itemName],
        }));
        if (itemName === 'Header') {
            setHeaderSection((prevAboutUs) => !prevAboutUs);
        }
        if (itemName === 'About Us') {
            setAboutUsPage((prevAboutUs) => !prevAboutUs);
        }
        if (itemName === 'Gallery') {
            setGalleryPage((prevAboutUs) => !prevAboutUs);
        }
        if (itemName === 'Team') {
            setTeamSection((prevAboutUs) => !prevAboutUs);
        }
        if (itemName === 'Carousel') {
            setCarouselSection((prevAboutUs) => !prevAboutUs);
        }
        if (itemName === 'Work') {
            setWorkSection((prevAboutUs) => !prevAboutUs);
        }
        if (itemName === 'Counters') {
            setCounterSection((prevAboutUs) => !prevAboutUs);
        }
        if (itemName === 'Services') {
            setServicesSection((prevAboutUs) => !prevAboutUs);
        }
        if (itemName === 'Slider') {
            setSliderSection((prevAboutUs) => !prevAboutUs);
        }
    };



const drawerItems = [
    {
        name: 'Home',
        icon: <HomeIcon />,
        onClick: () => {},
    },
    {
        name: 'Header',
        icon: <InfoIcon />,
        onClick: () => handleItemClick('Header'),
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
    {
        name: 'Team',
        icon: <CollectionsIcon />,
        onClick: () => handleItemClick('Team'),
    },
    {
        name: 'Carousel',
        icon: <CollectionsIcon />,
        onClick: () => handleItemClick('Carousel'),
    },
    {
        name: 'Work',
        icon: <InfoIcon />,
        onClick: () => handleItemClick('Work'),
    },
    {
        name: 'Counters',
        icon: <InfoIcon />,
        onClick: () => handleItemClick('Counters'),
    },
    {
        name: 'Services',
        icon: <InfoIcon />,
        onClick: () => handleItemClick('Services'),
    },
    {
        name: 'Slider',
        icon: <InfoIcon />,
        onClick: () => handleItemClick('Slider'),
    },
    ];
    const [openDialog , setOpenDialog] = useState(false)

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
                title="Add New Page "
                type="custom"
                appearance="secondary"
                putTooltip
                onClick={ () => setOpenDialog(true)}
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
    <DialogCom title={"Add New Page" || ''} dialogOpenState={[openDialog, setOpenDialog]}>
                <NewPageDrawerModel></NewPageDrawerModel>
        </DialogCom>


    </StyledHomeDrawerList>
);
};

export default HomeDrawerList;
