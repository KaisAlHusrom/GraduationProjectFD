

//React
import {
  useState
} from 'react'

import {
  
} from 'react-redux'

//Components
import { AdminMainButton } from '../../../../../Components';
import DialogCom from '../../../components/DialogCom';
import CustomVerticalTabs from '../components/CustomVerticalTabs';
import LinksTabContent from './LinksTabContent';
import ColorTabContent from './ColorTabContent';


//MUI
import {
  Box,
  styled,
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  ListItemIcon,
} from '@mui/material';

// icons 
import { Edit as EditIcon, Menu as MenuIcon } from '@mui/icons-material';


const drawerWidth = 240;

//Styled Components
const StyledNavBar = styled(Box)(
    () => ({

    })
)


const NavBar = () => {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // For link tab - list of links
  const [navItemsLink, setNavItemsLink] = useState([
    { name: 'Home', id: "1", onClick: () => {}, color: 'primary', link: 'https://' },
    { name: 'About Us', id: "2", onClick: () => {}, color: 'primary', link: 'https://' },
    { name: 'Contact Us', id: "3", onClick: () => {}, color: 'primary', link: 'https://' },
    { name: 'Contact Us', id: "4", onClick: () => {}, color: 'primary', link: 'https://' },
    { name: 'Contact Us', id: "5", onClick: () => {}, color: 'primary', link: 'https://' },
  ]);

  const handleTextFieldChange = (value, id, field) => {
    setNavItemsLink((prevNavItems) =>
      prevNavItems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // For color tab
  const [currentColor, setCurrentColor] = useState('#00000');
  const [currentColorLinks, setCurrentColorLinks] = useState('#00000');
  const [currentColorLinksText, setCurrentColorLinksText] = useState('#00000');
  const [title, setTitle] = useState('MUI'); // Yeni eklenen state

  const [opacity, setOpacity] = useState(1);

  const handleColorSelect = (color) => {
    setCurrentColor(color);
  };

  const handleOpacityChange = (event, newValue) => {
    setOpacity(newValue);
  };

  const handleColorChange = (color) => {
    setCurrentColor(color.hex);
  };

  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setCurrentColor(randomColor);
  };

  const applyColor = () => {
    console.log('Selected Color:', currentColor, 'Opacity:', opacity);
  };

  const handleColorSelectLinks = (color) => {
    setCurrentColorLinks(color);
  };

  const handleColorChangeLinks = (color) => {
    setCurrentColorLinks(color.hex);
  };

  const generateRandomColorLinks = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setCurrentColorLinks(randomColor);
  };

  const applyColorLinks = () => {
    console.log('Selected Color:', currentColorLinks);
  };


  const handleColorSelectLinksText = (color) => {
    setCurrentColorLinksText(color);
  };

  const handleColorChangeLinksText = (color, itemId) => {
    setNavItemsLink((prevNavItems) =>
      prevNavItems.map((item) =>
        item.id === itemId ? { ...item, color: color.hex } : item
      )
    );
  };

  const generateRandomColorLinksText = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setCurrentColorLinksText(randomColor);
  };

  const applyColorLinksText = () => {
    console.log('Selected Color:', currentColorLinksText);
  };


  const tabContents = [
    () => <LinksTabContent 
        // to change the backGroundColor  
      navItemsLink={navItemsLink} 
      handleTextFieldChange={handleTextFieldChange}
      currentColorLinks={currentColorLinks} 
      applyColorLinks={applyColorLinks} 
      handleColorSelectLinks={handleColorSelectLinks} 
      handleOpacityChange={handleOpacityChange} 
      handleColorChangeLinks={handleColorChangeLinks} 
      generateRandomColorLinks={generateRandomColorLinks} 

    // to change the text color  

      currentColorLinksText={currentColorLinksText} 
      applyColorLinksText={applyColorLinksText} 
      handleColorSelectLinksText={handleColorSelectLinksText} 
      handleColorChangeLinksText={handleColorChangeLinksText} 
      generateRandomColorLinksText={generateRandomColorLinksText}

      // to change title on nav 
      title={title} 
      setTitle= {setTitle}
      />,
    () => <ColorTabContent currentColor={currentColor} applyColor={applyColor} handleColorSelect={handleColorSelect} handleOpacityChange={handleOpacityChange} handleColorChange={handleColorChange} generateRandomColor={generateRandomColor} />
  ];

  const tabLabels = ['Links', 'Color'];

  const StyledAppBar = styled(AppBar)(( ) => ({
    marginTop: '100px',
    backgroundColor: currentColor,
    position: 'relative',
  }));

  const TooltipContainer = styled('div')({
    position: 'absolute',
    top: '-50px',
    transform: 'translateX(-50%)',
  });

  const handleBoxClick = () => setOpenDialog(true);

  const handleDrawerToggle = () => setMobileOpen((prevState) => !prevState);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
      {title}
      </Typography>
    
      <Divider />
      <List>
        {navItemsLink.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton onClick={item.onClick}>
              <ListItemIcon>{/* You might want to add an icon here */}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const [hoveredButton, setHoveredButton] = useState(null);

    return (
        <StyledNavBar>
                <Box>
            <StyledAppBar>
              <Toolbar>
                <IconButton color='inherit' aria-label='open drawer' edge='start' onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
                  <MenuIcon />
                </IconButton>
                {/* edit navbar button */}
                <TooltipContainer>
                  <AdminMainButton
                    title='Edit Nav'
                    type='custom'
                    appearance='iconButton'
                    putTooltip
                    icon={<EditIcon />}
                    onClick={handleBoxClick}
                    sx={{
                      border: '1px solid red',
                      padding: '10px 15px',
                      fontWeight: 'bold',
                      color: 'white.main',
                      backgroundColor: 'primary.dark',
                    }}
                  />
                </TooltipContainer>

                <Typography variant='h6' component='div' sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                {title}
                </Typography>
                {/* link on nav  */}
                <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                  {navItemsLink.map((item) => (
                  <AdminMainButton
                  key={item.name}
                  title={item.name}
                  type='custom'
                  appearance='secondary'
                  badgeContent='hi'
                  sx={{
                    border: '1px solid red',
                    marginLeft: '10px',
                    padding: '10px 15px',
                    fontWeight: 'bold',
                    color: hoveredButton === item.name ? 'black' : currentColorLinksText,
                    backgroundColor: hoveredButton === item.name ? 'yellow' : currentColorLinks,
                  }}
                  onMouseEnter={() => setHoveredButton(item.name)}
                  onMouseLeave={() => setHoveredButton(null)}
                />
                  ))}
                </Box>
              </Toolbar>
            </StyledAppBar>
            <nav>
              <Drawer variant='temporary' open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
                {drawer}
              </Drawer>
            </nav>
            {/* Modal */}
            <DialogCom title='Media' dialogOpenState={[openDialog, setOpenDialog]}>
              {/* Call the tab com */}
              <CustomVerticalTabs tabLabels={tabLabels} tabContents={tabContents} />
            </DialogCom>
            {/* Modal */}
              </Box>
        </StyledNavBar>
    );
};

export default NavBar;

