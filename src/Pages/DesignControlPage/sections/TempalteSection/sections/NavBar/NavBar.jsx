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


// Functions of styles 
import * as utils from '../../StylesFunctions/StylesFunctions.js';


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
    const [selectedFontSize, setSelectedFontSize] = useState("10");
    const [selectedFontWight, setSelectedFontWeight] = useState("500");
    const [selectedImages, setSelectedImage] = useState();
    // State for hovered button
    const [hoveredButton, setHoveredButton] = useState(null);

    // State for link tab - list of links
    const [navItemsLink, setNavItemsLink] = useState([
      { name: 'Home', id: "1", onClick: () => {}, color: 'primary', link: 'https://' },
      { name: 'About Us', id: "2", onClick: () => {}, color: 'primary', link: 'https://' },
      { name: 'Contact Us', id: "3", onClick: () => {}, color: 'primary', link: 'https://' },
    ]);
  const FontSize = [
    5,
    10,
    15,
    20,
  ]
  const FontWight = [
    700 , 
    900, 
    500,
  ]

  
    // State for the title
    const [title, setTitle] = useState('MUI');
  
    // State for opacity
    const [opacity, setOpacity] = useState(1);
  
    

    const handleColorSelectWrapper = (color) => {
      utils.handleColorSelect(color, setCurrentColor);
    };
    
    const handleOpacityChangeWrapper = (event) => {
      utils.handleOpacityChange(event, setOpacity);
    };
    
    const handleColorChangeWrapper = (color) => {
      utils.handleColorChange(color, setCurrentColor);
    };
    
    const generateRandomColorWrapper = () => {
      utils.generateRandomColor(setCurrentColor);
    };

    const handleImageChangeWrapper = (file) => {
    handleImageChange(file, setSelectedImage);
    };
  
    const handleUploadImageClickWrapper = () => {
      utils.handleUploadImageClick(handleImageChangeWrapper);
    };

    const handleImageChange = (file) => {
      utils.handleImageChange(file, setSelectedImage);
    };

    const handleDeleteLogoClick = () => {
      utils.handleDeleteLogoClick(setSelectedImage);
    };

    const handleFontSizeChange = (event) => {
      utils.handleFontSizeChange(event, setSelectedFontSize);
    };
    
    const handleFontWeightChange = (event) => {
      utils.handleFontWeightChange(event, setSelectedFontWeight);
    };


    // Define tab contents
    const tabContents = [
      () => <TitleTapContent handleDeleteLogoClick= {handleDeleteLogoClick} handleUploadImageClick = {handleUploadImageClickWrapper}   titleSelect= {[title, setTitle]} ColorSelect={[colorOfTitle, setColorOfTitle]} />,
      () => <LinksTabContent FontWight={FontWight} handleFontWightChange={handleFontWeightChange} selectedFontWight={selectedFontWight} FontSize = {FontSize} handleFontSizeChange={handleFontSizeChange} selectedFontSize={selectedFontSize} navItemsLinkList={navItemsLink} setNavItemsLink={setNavItemsLink} OpacityState={[opacity, setOpacity]} currentColorLinksState={[currentColorLinks, setCurrentColorLinks]} currentColorLinksTextState={[currentColorLinksText, setCurrentColorLinksText]} />,
      () => <ColorTabContent currentColor={currentColor} handleColorSelect={handleColorSelectWrapper} handleOpacityChange={handleOpacityChangeWrapper} handleColorChange={handleColorChangeWrapper} generateRandomColor={generateRandomColorWrapper} />,
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
                        fontWeight: selectedFontWight,
                        fontSize:selectedFontSize,
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




