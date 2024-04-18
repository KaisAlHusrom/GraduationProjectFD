//React
import {
  useState
} from 'react'

import {
  
} from 'react-redux'

//Components
import { AdminMainButton } from '../../../../../Components';

import {  } from 'react';

//MUI
import {
  Box,
} from '@mui/material'
import { styled } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';


//Styled Components
const StyledAccordionComponent = styled(Box)(() => ({}))

const ButtonStyle = {
  margin: "10px",
  display: 'flex',
  width: '250px',
  padding: '10px',
  transition: 'all 0.5s ease',
  borderRadius: '10px',
  fontWeight: 'bold',
  color: "#eee",
  backgroundColor: "#B80000",
  cursor: 'pointer',
  '&:hover': {
      backgroundColor: "#7D0A0A",
      boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
  },
  boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",

}
const BoxStyle = {
  transition : '0.5s all ease',

  '&:hover': {
    backgroundColor: '#7D0A0A',
    cursor: 'pointer',
  },
};
const css = [
  {
      "section_css_prop_id": 15,
      "section_id": null,
      "component_id": 10,
      "element_id": null,
      "css_prop": {
          "prop_id": 1,
          "prop_name": "width",
          "prop_description": "lorem ipsum ....",
          "is_section": false,
          "is_component": true,
          "is_element": false
      },
      "css_status": null,
      "css_responsive_status": null,
      "css_prop_value": "200px",
      "pivot": {
          "section_id": null,
          "component_id": 10,
          "element_id": null,
          "section_css_prop_id": 15,
          "created_at": "2022-01-01 13:00:00",
          "updated_at": "2022-01-01 13:30:00"
      }
  },
  {
      "section_css_prop_id": 15,
      "section_id": null,
      "component_id": 10,
      "element_id": null,
      "css_prop": {
          "prop_id": 1,
          "prop_name": "height",
          "prop_description": "lorem ipsum ....",
          "is_section": false,
          "is_component": true,
          "is_element": false
      },
      "css_status": null,
      "css_responsive_status": null,
      "css_prop_value": "300px",
      "pivot": {
          "section_id": null,
          "component_id": 10,
          "element_id": null,
          "section_css_prop_id": 15,
          "created_at": "2022-01-01 13:00:00",
          "updated_at": "2022-01-01 13:30:00"
      }
  }
];

const AccordionComponent = ({items , createNewElement , componentSection_component_id}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index, item) => {
    createNewElement(componentSection_component_id,  item.element_type  , item.element_content );

    setSelectedItem(index === selectedItem ? null : index);
    console.log(item.element_type)
    console.log(item.element_content)

};
  

  const handleCancel = () => {
    setSelectedItem(null);
  };


    return (
        <StyledAccordionComponent>
    <Box>
      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: ` ${index === selectedItem ? '#7D0A0A' : 'black'}`,
            marginBottom: 1,
            ...BoxStyle,

          }}
        >
          <Box
            onClick={() => handleItemClick(index , item)}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 2,
              cursor: 'pointer',
            }}
          >
          {
            item.element_type === 'Head3' ?
            <Typography sx = {ButtonStyle}>{item.header}</Typography>
            : item.element_type === 'image' ?  <img style = {item.sx} src={item.element_content} alt={item.element_content} /> 
            : null 
            
            }

            <Typography>{index === selectedItem ? '-' : '+'}</Typography>
          </Box>
        </Box>
      ))}
        <AdminMainButton
                        title="Cancel"
                        type="custom"
                        appearance="Button"
                        onClick={handleCancel}
                        putTooltip
                        
                        icon={<CloseIcon />}
                        sx = {ButtonStyle}
                    />    
    </Box>

        </StyledAccordionComponent>
    );
};

export default AccordionComponent;


