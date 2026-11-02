//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'
import PropTypes from 'prop-types';

//Components
import PreviewComponent from './PreviewComponent';


//MUI
import {
    Box,
    Typography
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledPreviewSection = styled(Box)(
    ({ theme }) => ({
    
    })
)


const PreviewSection = ({designData}) => {


    const sectionStyle = useMemo(() => {
        const styleObject = {};
            if (designData) {
                if (designData?.styles) {
                    designData?.styles.forEach((cssProp) => {
                    const { style_prop, style_prop_value } = cssProp;
                    if (style_prop?.is_section) {
                    styleObject[style_prop.style_prop_css_name] = style_prop_value;
                    }
                });
                }
            
            }
        
            return styleObject;
        }, [designData]);


    return (
        <StyledPreviewSection>
            <Box sx={sectionStyle}>
                        {designData.children && designData.children.sort((a, b) => a.sequence_number - b.sequence_number).map((component, i) => (
                            designData.design_title === "Empty_Section" && designData.is_template === 1  ? (
                                <Box key={i}>
                                    <Typography sx={{
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        color: 'black'
                                    }}>{component.element_content}</Typography>
                                </Box>
                            ) : <PreviewComponent  key= {i} 
                                component={component} 

                            />
                            
                        ))}
                                    
                            
                    </Box>
        </StyledPreviewSection>
    );
};

PreviewSection.propTypes = {

    designData: PropTypes.object,
};

export default PreviewSection;