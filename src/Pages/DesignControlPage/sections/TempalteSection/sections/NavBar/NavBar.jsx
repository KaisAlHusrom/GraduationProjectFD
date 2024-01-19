//React
import {
  useState
} from 'react'

import {
} from 'react-redux'

//Components
import { AdminMainButton } from '../../../../../../Components';
import DialogCom from '../../../../components/DialogCom';
import CustomVerticalTabs from '../../components/CustomVerticalTabs';
import LinksTabContent from './LinksTabContent';
import ColorTabContent from './ColorTabContent';
import TitleTapContent from './TitleTapContent';
import   './navCss.css'

//MUI
import { Box, Typography, AppBar, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, ListItemIcon } from '@mui/material';
import { styled } from '@mui/system'


// icons 
import { Edit as EditIcon, Menu as MenuIcon } from '@mui/icons-material';

//Styled Components
const StyledNavBar = styled(Box)(() => ({}));

const drawerWidth = 240;




const NavBar = () => {

    // State for mobile drawer and dialog
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
  
    // State for colors
    const [currentColorLinks, setCurrentColorLinks] = useState('#00000');
    const [currentColorLinksText, setCurrentColorLinksText] = useState('#00000');
    const [currentColor, setCurrentColor] = useState('#00000');
    const [colorOfTitle, setColorOfTitle] = useState('#00000');
  
    // State for link tab - list of links
    const [navItemsLink, setNavItemsLink] = useState([
      { name: 'Home', id: "1", onClick: () => {}, color: 'primary', link: 'https://' },
      { name: 'About Us', id: "2", onClick: () => {}, color: 'primary', link: 'https://' },
      { name: 'Contact Us', id: "3", onClick: () => {}, color: 'primary', link: 'https://' },
    ]);
  
    // State for the title
    const [title, setTitle] = useState('MUI');
  
    // State for opacity
    const [opacity, setOpacity] = useState(1);
  
    // Handle color selection for ColorTabContent
    const handleColorSelect = (color) => setCurrentColor(color);
  
    // Handle opacity change
    const handleOpacityChange = (event, newValue) => setOpacity(newValue);
  
    // Handle color change for ColorTabContent
    const handleColorChange = (color) => setCurrentColor(color.hex);
  
    // Generate a random color
    const generateRandomColor = () => setCurrentColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  


      // logo

      const [selectedImages, setSelectedImages] = useState();
      
      const handleUploadImageClick = () => {
        const inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.accept = 'image/*';
        inputElement.onchange = (e) => {
          const file = e.target.files[0];
          handleImageChange(file);
        };
        inputElement.click();
      };


      const handleImageChange = (file) => {
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setSelectedImages(imageUrl);
        }
      };

  const handleDeleteLogoClick = () => {
    // Implement the logic to delete the logo, for example, set selectedImages to null
    setSelectedImages(null);
  };


    // Define tab contents
    const tabContents = [
      () => <TitleTapContent handleDeleteLogoClick= {handleDeleteLogoClick} handleUploadImageClick = {handleUploadImageClick}   titleSelect= {[title, setTitle]} ColorSelect={[colorOfTitle, setColorOfTitle]} />,
      () => <LinksTabContent navItemsLinkList={navItemsLink} setNavItemsLink={setNavItemsLink} OpacityState={[opacity, setOpacity]} currentColorLinksState={[currentColorLinks, setCurrentColorLinks]} currentColorLinksTextState={[currentColorLinksText, setCurrentColorLinksText]} />,
      () => <ColorTabContent currentColor={currentColor} handleColorSelect={handleColorSelect} handleOpacityChange={handleOpacityChange} handleColorChange={handleColorChange} generateRandomColor={generateRandomColor} />,
    ];
  
    // Define tab labels
    const tabLabels = ['Title', 'Links', 'Back Ground Color Nav Bar'];
  
    // Styled AppBar
    const StyledAppBar = styled(AppBar)(( ) => ({
      marginTop: '100px',
      backgroundColor: currentColor,
      position: 'relative',
    }));
  
    // Tooltip Container
    const TooltipContainer = styled('div')({
      position: 'absolute',
      top: '-50px',
      transform: 'translateX(-50%)',
    });
  
    // Handle click on Edit Nav button
    const handleBoxClick = () => setOpenDialog(true);
  
    // Handle toggle of mobile drawer
    const handleDrawerToggle = () => setMobileOpen((prevState) => !prevState);
  
    // Drawer content
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
  
    // State for hovered button
    const [hoveredButton, setHoveredButton] = useState(null);
            





    return (
      <StyledNavBar>
        <Box>
          {/* Styled AppBar */}
          <StyledAppBar>
            <Toolbar>
              {/* IconButton for mobile drawer */}
              <IconButton color='inherit' aria-label='open drawer' edge='start' onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
                <MenuIcon />
              </IconButton>
              
              {/* Tooltip Container for Edit Nav button */}
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
              
              {/* Typography for title */}
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' ,alignItems:'center' } }}>
                  {
                          selectedImages ? 
                            <div className="logo" >
                              <img src={selectedImages}   alt="" />
                            </div> : ''


                  }
                  <Typography color={colorOfTitle} variant='h6' component='div' >
                              {title}
                              </Typography>
                            
                </Box>


              {/* Box for links on nav */}
              <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                {navItemsLink.map((item) => (
                  <AdminMainButton
                    key={item.name}
                    title={item.name}
                    type='custom'
                    appearance='secondary'
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
  
          {/* Drawer for mobile view */}
          <nav>
            <Drawer variant='temporary' open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
              {drawer}
            </Drawer>
          </nav>
  
          {/* Dialog for editing */}
          <DialogCom title='Media' dialogOpenState={[openDialog, setOpenDialog]}>
            <CustomVerticalTabs tabLabels={tabLabels} tabContents={tabContents} />
          </DialogCom>
        </Box>
      </StyledNavBar>
    );
};

export default NavBar;




