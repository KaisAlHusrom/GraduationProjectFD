import  { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { getAppropriateTag } from '../StylesFunctions/GenerateElements';

//Styled Components
const StyledBoxComponent = styled(Box)(() => ({
  transition: '0.5s all ease',
}));

const ButtonStyle = {
  margin: '10px',
  display: 'flex',
  padding: '10px',
  transition: 'all 0.5s ease',
  borderRadius: '10px',
  fontWeight: 'bold',
  color: 'black',
  backgroundColor: '#b9b9b9',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(23, 50, 73, 1)',
    boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.05)',
  },
  boxShadow:
    'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',
};

const AccordionComponent = ({items, componentSection_component_id , elements , setAddElementToComponentId }) => {

  const [AddElement , setAddElement] = elements

  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const handleItemClick = (item) => {
    setAddElement({ ...item });
    setAddElementToComponentId(componentSection_component_id);
    setSelectedItemIndex(null);
  };
  


  return (
    <StyledBoxComponent>
        {items.map((item, index) => (
          <Box
            key={index}
            onClick={() => handleItemClick(item)}
            sx={{
              ...ButtonStyle,
              backgroundColor: selectedItemIndex === index ? 'rgba(23, 50, 73, 1)' : '',
            }}
          >
            {getAppropriateTag(
              item.element,
              item.element_content,
              item.section_css_props.reduce(
                (acc, cssProp) => ({
                  ...acc,
                  [cssProp.css_prop.prop_name]: cssProp.css_prop_value,
                }),
                {}
              )
            )}
          </Box>
        ))}
      
    </StyledBoxComponent>
  );
};

export default AccordionComponent;
