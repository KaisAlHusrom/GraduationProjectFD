import {  useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { Test } from './StylesProp';

// Styled Components
const StyledStylesCategory = styled(Box)(
    ({ theme }) => ({
        backgroundColor : theme.palette.background.default
        
        })
);




const StylesCategory = ({ category, handleSectionStyleChange ,  sectionStyleProps}) => {
    const [selectedOption, setSelectedOption] = useState('');



    return (
        <StyledStylesCategory>
        {category.category.style_props.map((prop, key) => (
            <Test
            prop={prop}
            key={key}
            handleSectionStyleChange={handleSectionStyleChange}
            sectionStyleProps = {sectionStyleProps}

            />
        ))}
        </StyledStylesCategory>
    );
    };

export default StylesCategory;


