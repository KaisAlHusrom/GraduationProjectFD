//React
import {
  useState, useEffect
} from 'react'

import {
  
} from 'react-redux'

//Components
import ColorButtons from '../../components/ColorButtons';
import LinksList from '../../components/LinksList';
import NewLinkSection from '../../components/NewLinkSection';
import  AdminMainButton  from '../../../../../../Components/AdminMainButton/AdminMainButton';
import  CustomAlert  from '../../../../../../Components/CustomAlert/CustomAlert';
import CustomSelectInput from '../../../../../../Components/CustomSelectInput/CustomSelectInput';


// icons 
import DoneAllIcon from '@mui/icons-material/DoneAll';

//MUI
import {
  Box, MenuItem, Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledLinksTabContent = styled(Box)(
    ({ theme }) => ({
  
    })
)


const LinksTabContent = (
  {
      navItemsLinkList,
      setNavItemsLink,
      currentColorLinksState,
      currentColorLinksTextState,
      OpacityState,
    
    
      FontSize,
      handleFontSizeChange,
      selectedFontSize,
    
          // FONT Wight 
      FontWight, 
      handleFontWightChange , 
      selectedFontWight,
    
    }
) => {
  const customSelectStyle = {
    display: 'block',
    width: '200px',
    padding: '5px',
    borderColor: 'red',
    transition: '0.3s all',
    borderRadius: '10px',
    cursor: 'pointer',
    // Add any additional styles or hover effects here
    '&:hover': {
      backgroundColor: "white.dark",
      boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
    },
  };


  const [currentColorLinks, setCurrentColorLinks] = currentColorLinksState;
  const [currentColorLinksText, setCurrentColorLinksText] = currentColorLinksTextState;
  const [opacity, setOpacity] = OpacityState;
  const [tempLinkList, setTempLinkList] = useState([...navItemsLinkList]);
  const [newLink, setNewLink] = useState({ name: '', link: '' });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleTempTextFieldChange = (updatedValue, id, field) => {
    setTempLinkList((prevTempList) =>
      prevTempList.map((item) =>
        item.id === id ? { ...item, [field]: updatedValue } : item
      )
    );
  };

  const handleSaveChanges = () => {
    setNavItemsLink(tempLinkList);
  };

  const handleOpacityChange = (event, newValue) => {
    setOpacity(newValue);
  };

  const handleColorSelectLinks = (color) => {
    setCurrentColorLinks(color);
  };

  const handleColorSelectLinksText = (color) => {
    setCurrentColorLinksText(color);
  };

  const generateRandomColorLinks = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setCurrentColorLinks(randomColor);
  };

  const generateRandomColorLinksText = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setCurrentColorLinksText(randomColor);
  };

  const applyColorLinks = () => {
    console.log('Selected Color:', currentColorLinks);
  };

  const handleShowAlert = (message) => {
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const handleNewLinkChange = (event, field) => {
    setNewLink((prevNewLink) => ({ ...prevNewLink, [field]: event.target.value }));
  };

  const handleAddNewLink = () => {
    if (newLink.name.trim() === '' || newLink.link.trim() === '') {
      handleShowAlert('Name and URL cannot be empty');
      return;
    }

    setNavItemsLink((prevNavItems) => [
      ...prevNavItems,
      { ...newLink, id: String(prevNavItems.length + 1), onClick: () => {}, color: 'primary' },
    ]);
    setNewLink({ name: '', link: '' });
  };

  const handleDeleteLink = (selectedItemId) => {
    setNavItemsLink(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== selectedItemId);
      return updatedItems;
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAlertOpen(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [alertOpen]);

  return (
    <StyledLinksTabContent>
      <Box>
        <Typography variant='h4' sx={{
          display: 'block', width: '30%', textAlign: 'center',
          color: 'white.dark',
          backgroundColor: 'success.dark',
          padding: '10px',
          margin: 'auto',
          borderRadius: '10px',
        }}>Links Of Nav</Typography>
        <Box 
        sx={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly',
          width:'100%'
        }}
        >
          
        <ColorButtons
        ButtonName="Change background Color"
          handleColorSelect={handleColorSelectLinks}
          handleOpacityChange={handleOpacityChange}
          generateRandomColor={generateRandomColorLinks}
          currentColor={currentColorLinks}
          applyColor={applyColorLinks}
        />
        <ColorButtons
            ButtonName="Change Text Color"
            handleColorSelect={handleColorSelectLinksText}
            handleOpacityChange={handleOpacityChange}
            generateRandomColor={generateRandomColorLinksText}
            currentColor={currentColorLinksText}
            applyColor={applyColorLinks}
          />
        </Box>
        <Box   sx={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' , alignItems: 'center',
          width:'100%' , marginTop:'30px'
        }}>
        <CustomSelectInput
                name="Font Size "
                className={customSelectStyle}
                onChange={handleFontSizeChange}
                valueSet = {selectedFontSize}
                >
                {FontSize.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
                ))}
            </CustomSelectInput>

            <CustomSelectInput
                name="Font Wight"
                className={customSelectStyle}
                onChange={handleFontWightChange}
                valueSet = {selectedFontWight}
                >
                {FontWight.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
                ))}
              </CustomSelectInput>
        </Box>
        <LinksList
            links={navItemsLinkList}
            tempLinkList={tempLinkList} 
            handleTempTextFieldChange={handleTempTextFieldChange}
            handleDeleteLink={handleDeleteLink}
        />

        <NewLinkSection
          newLink={newLink}
          handleNewLinkChange={handleNewLinkChange}
          handleAddNewLink={handleAddNewLink}
        />

        <Box sx={{
          width: '100%',
          marginTop: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <AdminMainButton
            title='Save Changes'
            type='custom'
            appearance='primary'
            icon={<DoneAllIcon />}
            onClick={handleSaveChanges}
            sx={{
              marginTop: '10px',
              width: '30%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white.main',
              backgroundColor: 'info.dark',
            }}
          />
        </Box>
      </Box>
      <CustomAlert AlertOpenState={[alertOpen, setAlertOpen]} title={alertMessage} />
    </StyledLinksTabContent>
  );
};

export default LinksTabContent;



// // LinksTabContent.js


// const StyledLinksTabContent = styled(Box)(({ theme }) => ({}));

// const LinksTabContent = () => {



// };

// export default LinksTabContent;
