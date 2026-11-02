import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { StylesProp } from './StylesProp';

// Styled Components
const StyledStylesCategory = styled(Box)(
    ({ theme }) => ({
        backgroundColor : theme.palette.background.default
        
        })
);




const StylesCategory = ({ category, handleSectionStyleChange ,  sectionStyle }) => {

    
    return (
        <StyledStylesCategory>
        {category.category.style_props.map((prop, key) => (
            <StylesProp
                prop={prop}
                key={key}
                handleSectionStyleChange={handleSectionStyleChange}
                sectionStyle = {sectionStyle}

            />
        ))}
        </StyledStylesCategory>
    );
    };

export default StylesCategory;


