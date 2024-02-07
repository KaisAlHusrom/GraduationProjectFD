//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components
import DialogCom from '../../components/DialogCom'
import ListItemCom from '../../components/ListItem'

//MUI
import {
    Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material'
import { styled } from '@mui/system'


//Styled Components
const StyledFontDrawerList = styled(Box)(
    () => ({
    width: '400px',
    })
)

  const FontDrawerList = () => {

  const [openDialog , setOpenDialog] = useState(false)
  const [selectedFont, setSelectedFont] = useState(null);
  const [fontStyles, setFontStyles] = useState({}); // Her font için ayrı stil durumu


  const handleStyleChange = (styleKey, value) => {
    setFontStyles((prevStyles) => {
      const updatedStyles = {
        ...prevStyles,
        [selectedFont?.name]: {
          ...prevStyles[selectedFont?.name],
          [styleKey]: value,
        },
      };
      return updatedStyles;
    });
  };
  
  const handleItemClick = (item) => {
    setSelectedFont(item);
    setOpenDialog(true);
  };

  const drawerItems = [
    {
      name: 'Arial, sans-serif',
      onClick: () => {
        setOpenDialog(true)
      },
      details: {
        type: 'A popular sans-serif font.',
        fontWeight: [ 'bold',
        'bolder',
        'lighter',
        '100',
        '200',
        '300',
      ],
        fontStyle: ['italic ',  'normal'],
      }
    },
    {
      name: 'Georgia, serif',
      onClick: () => {},
        details: { 
        type: 'A traditional serif font.',
        fontWeight: [ 'bold',
        'bolder',
        'lighter',
        '100',
        '200',
        '300',
      ],
      fontStyle: ['italic ',  'normal'],
    }
    },
    {
      name: 'Courier New, monospace',
      onClick: () => {},
      details: {
        type: 'A monospaced font often used for code.',
        fontWeight: [ 'bold',
        'bolder',
        'lighter',
        '100',
        '200',
        '300',
      ],
      fontStyle: ['italic ',  'normal'],
    }
    },
    {
      name: 'Comic Sans MS, cursive',
      onClick: () => {},
      details:{
      type: 'A playful and informal cursive font.',
      fontWeight: [ 'bold',
      'bolder',
      'lighter',
      '100',
      '200',
      '300',
    ],
    fontStyle: ['italic ',  'normal'],
  }
    },
    {
      name: 'Times New Roman, serif',
      onClick: () => {},
      details: {
        type: 'A classic serif font.',
        fontWeight: [ 'bold',
        'bolder',
        'lighter',
        '100',
        '200',
        '300',
      ],
      fontStyle: ['italic ',  'normal'],
    }
    },
  ];

    return (
          <StyledFontDrawerList >
            <List>
              {drawerItems.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => handleItemClick(item)}>
                    <ListItemIcon>{/* İcon eklenebilir */}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

        <Box >
          
          <DialogCom title={"Font Styles" || ''} dialogOpenState={[openDialog, setOpenDialog]}>
            <h2>{selectedFont?.name }</h2>
            {selectedFont && (  
                <List>
                {selectedFont.details.fontWeight && (
                  <ListItemCom
                  selected={fontStyles[selectedFont?.name]?.[""] || ''} // Adjusted selected prop
                  handleChange={(styleKey, value) => handleStyleChange(styleKey, value)}
                  items={selectedFont.details.fontWeight}
                  label="Font Weight"
                />
                
                )}
                {selectedFont.details.fontStyle && (
              <ListItemCom 
              selected={fontStyles[selectedFont.name] || {}}
              handleChange={(styleKey, value) => handleStyleChange(styleKey, value)}
                items={selectedFont.details.fontStyle}
                label="Font Style"
              ></ListItemCom>
                )}
              </List>
          )}
          </DialogCom>
        </Box>
      </StyledFontDrawerList>
    );
};

export default FontDrawerList;