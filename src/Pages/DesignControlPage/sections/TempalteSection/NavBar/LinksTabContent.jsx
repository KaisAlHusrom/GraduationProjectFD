//React
import { useEffect, useState } from 'react'

import {
  
} from 'react-redux'

//Components
import { AdminMainButton } from '../../../../../Components';
import ColorBar from '../../../components/ColorBar';
import CustomTextField from '../../../../../Components/CustomTextField/CustomTextField';
import CustomAlert from '../../../../../Components/CustomAlert/CustomAlert';

//MUI
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';


// icons 
import ColorLensIcon from '@mui/icons-material/ColorLens';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
//Styled Components
const StyledLinksTabContent = styled(Box)(({ theme }) => ({}));



const LinksTabContent = (
  {
      navItemsLinkList,
      setNavItemsLink,
      currentColorLinksState,
      currentColorLinksTextState,
      OpacityState,
    }
) => {
    // Destructure state variables
    const [currentColorLinks, setCurrentColorLinks] = currentColorLinksState;
    const [currentColorLinksText, setCurrentColorLinksText] = currentColorLinksTextState;
    const [opacity, setOpacity] = OpacityState;

      // Handle change in text fields
  const handleTextFieldChange = (updatedValue, id, field) => {
    console.log('Updated Value:', updatedValue);
    setNavItemsLink((prevNavItems) =>
      prevNavItems.map((item) =>
        item.id === id ? { ...item, [field]: updatedValue } : item
      )
    );
  };

  // Handle opacity change
  const handleOpacityChange = (event, newValue) => {
    setOpacity(newValue);
  };

  // Handle color select for background color
  const handleColorSelectLinks = (color) => {
    setCurrentColorLinks(color);
  };

  // Generate a random color for background color
  const generateRandomColorLinks = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setCurrentColorLinks(randomColor);
  };

  // Apply selected background color
  const applyColorLinks = () => {
    console.log('Selected Color:', currentColorLinks);
  };

  // Handle color select for text color
  const handleColorSelectLinksText = (color) => {
    setCurrentColorLinksText(color);
  };

  // Generate a random color for text color
  const generateRandomColorLinksText = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setCurrentColorLinksText(randomColor);
  };

  // State for the new link
  const [newLink, setNewLink] = useState({ name: '', link: '' });
 // State to control the visibility of the alert
 const [alertOpen, setAlertOpen] = useState(false);
 const [alertMessage, setAlertMessage] = useState('');

  // Function to handle showing the alert
  const handleShowAlert = (message) => {
    setAlertMessage(message);
    setAlertOpen(true);
  };

   // Handle change in the new link text fields
  const handleNewLinkChange = (event, field) => {
    setNewLink((prevNewLink) => ({ ...prevNewLink, [field]: event.target.value }));
  };

    // Handle adding a new link
    const handleAddNewLink = () => {
      // Check if both name and link are not empty
      if (newLink.name.trim() === '' || newLink.link.trim() === '') {
        handleShowAlert('Name and URL cannot be empty');
        return;
      }


    // Add the new link to the list
    setNavItemsLink((prevNavItems) => [
      ...prevNavItems,
      { ...newLink, id: String(prevNavItems.length + 1), onClick: () => {}, color: 'primary' },
    ]);
   // Clear the new link state
   setNewLink({ name: '', link: '' });
    
  };
  useEffect(() => {
    // Close the alert after 5 seconds
    const timeoutId = setTimeout(() => {
      setAlertOpen(false);
    }, 5000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [alertOpen]);


  const handleDeleteLink = (selectedItemId) => {
    // Implement the logic to delete the selected item
    // You can use the item's id to filter out the selected item
    setNavItemsLink(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== selectedItemId);
      return updatedItems;
    });
  };

  return (
    <StyledLinksTabContent>
      <Box>
        {/* Heading */}
        <Typography variant='h4' sx={{display:'block' , width:'30%' , textAlign:'center' , 
                    color:'white.dark' , 
                    backgroundColor:'success.dark' , 
                    padding:'10px' ,
                    margin:'auto' , 
                    borderRadius:'10px',
                    }}>Links Of Nav</Typography>

        {/* Color buttons for background and text */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' , alignItems:'center' , marginTop:'20px' }}>
          {/* Background color button */}
          <AdminMainButton
            title='Change BackGround Color'
            icon={<ColorLensIcon />}
            type='drawer'
            putDrawerCloseButton
            appearance='primary'
            drawerAnchor='right'
            willShow={<ColorBar
              sx={{
                width: '100%',
                padding: '60px',
                borderRadius: '8px',
                justifyContent: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
              currentColor={currentColorLinks}
              applyColor={applyColorLinks}
              handleColorSelect={handleColorSelectLinks}
              handleOpacityChange={handleOpacityChange}
              generateRandomColor={generateRandomColorLinks}
            />}
            sx={{
              marginTop: '10px',
              width: '30%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white.main',
              backgroundColor: 'success.dark',
            }}
          />

          {/* Text color button */}
          <AdminMainButton
            title='Change Text Color'
            icon={<ColorLensIcon />}
            type='drawer'
            putDrawerCloseButton
            appearance='primary'
            willShow={<ColorBar
              sx={{
                width: '100%',
                padding: '60px',
                borderRadius: '8px',
                justifyContent: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
              currentColor={currentColorLinksText}
              handleColorSelect={handleColorSelectLinksText}
              generateRandomColor={generateRandomColorLinksText}
            />}
            sx={{
              marginTop: '10px',
              width: '30%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white.main',
              backgroundColor: 'success.dark',
            }}
          />
      

        {/* Map through navItemsLinkList and render text fields */}
        {navItemsLinkList.map((item) => (
          <Box key={item.id} sx={{  display: 'flex', width: '100%', flexDirection: 'row', flexWrap: 'wrap', padding: '16px', justifyContent: 'space-around' }}>
            {/* Name text field */}
            <CustomTextField
              id={`name-${item.id}`}
              label='Name'
              variant='filled'
              value={item.name}
              onChange={(event) => handleTextFieldChange(event.target.value, item.id, 'name')}
            />
            
            {/* Link text field */}
            <CustomTextField
              id={`link-${item.id}`}
              label='Link'
              variant='filled'
              value={item.link}
              onChange={(event) => handleTextFieldChange(event.target.value, item.id, 'link')}
            />
            <AdminMainButton
            title='Delete'
            icon={<DeleteIcon />}
            type='custom'
            appearance='secondary'
            onClick={() => handleDeleteLink(item.id)}
            sx={{
              marginTop: '10px',
              width: '30%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'warning.main',
            }}
          />
          </Box>
        ))}

        </Box>

            <Box sx={{borderTop:'1px solid black',  marginTop:'50px' , paddingTop:'50px' }}>
            <Typography sx={{display:'block' , width:'30%' , textAlign:'center', 
                    color:'white.dark' , 
                    backgroundColor:'success.dark' , 
                    padding:'10px' ,
                    margin:'auto' , 
                    borderRadius:'10px'
                    }} variant='h4'> New Link</Typography>
              <Box sx={{  display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'  , paddingTop:'50px' }}>
                  
                  <CustomTextField
                      id="new-link-name"
                      label='New Link Name'
                      variant='filled'
                      value={newLink.name}
                      onChange={(event) => handleNewLinkChange(event, 'name')}

                    />
                    <CustomTextField
                      id="new-link-url"
                      label='New Link URL'
                      variant='filled'
                      value={newLink.link}
                      onChange={(event) => handleNewLinkChange(event, 'link')}
                    />

                    {/* Button to add a new link */}
                    <AdminMainButton
                      title='Add New Link'
                      icon={<AddCircleOutlineIcon />}
                      type='custom'
                      putDrawerCloseButton
                      appearance='secondary'
                      onClick={handleAddNewLink}
                      sx={{
                        marginTop: '10px',
                        width: '30%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white.main',
                        backgroundColor: 'warning.dark',
                      }}
                    />

                </Box>
            </Box>
    

      </Box>
      <CustomAlert AlertOpenState={[alertOpen, setAlertOpen]} title={alertMessage} />

    </StyledLinksTabContent>
  );
};

export default LinksTabContent;

