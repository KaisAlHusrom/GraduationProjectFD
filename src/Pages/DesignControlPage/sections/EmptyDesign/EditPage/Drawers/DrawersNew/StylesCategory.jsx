import {  useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { Test } from './StylesProp';

// Styled Components
const StyledStylesCategory = styled(Box)({});



const StylesCategory = ({ category, handleSectionStyleChange  }) => {
    const [selectedOption, setSelectedOption] = useState('');



    return (
        <StyledStylesCategory>
        {category.category.style_props.map((prop, key) => (
            <Test
            prop={prop}
            key={key}
            handleSectionStyleChange={handleSectionStyleChange}
            />
        ))}
        </StyledStylesCategory>
    );
    };

export default StylesCategory;


