//React
import { useContext, useMemo } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { EmptyTemplateSectionSet } from '../../UseContext/UserSetSections'
import UpDownButtons from '../../../TempalteSection/components/UpDownButtons'
import EditLink from '../../../TempalteSection/components/EditLink'
import EmptyComponent from './EmptyComponent'


//Styled Components
const StyledEmptySection = styled(Box)(
    ({ theme }) => ({    
    })
)







const EmptySection = ({moveSectionUp , moveSectionDown , designData}) => {
    const {EmptySection } = useContext(EmptyTemplateSectionSet)


    
        const sectionStyle = useMemo(() => {
            const styleObject = {};
                if (designData) {
                    if (designData?.styles) {
                        designData?.styles.forEach((cssProp) => {
                        const { style_prop, style_prop_value } = cssProp;
                        if (style_prop.is_section) {
                        styleObject[style_prop.style_prop_css_name] = style_prop_value;
                        }
                    });
                    }
                
                }
            
                return styleObject;
            }, [designData]);

            console.log("sectionStyle" , sectionStyle)


    return (
        EmptySection ? (
            <StyledEmptySection sx = {{position : 'relative'}}  >
            <Box sx ={{
                position: 'absolute',
                top :'0',
                zIndex: 1000,
            }}>
                <UpDownButtons moveSectionUp = {moveSectionUp} moveSectionDown = {moveSectionDown} ></UpDownButtons>
                </Box>
                            <Box sx={sectionStyle}>
                                    {designData.children && designData.children.map((component, i) => (
                                        designData.design_title === "Empty_Section" && designData.is_template === 1 ? (
                                            <Box key={i}>
                                                <Typography sx={{
                                                    fontSize: '20px',
                                                    fontWeight: 'bold',
                                                    color: 'black'
                                                }}>{component.element_content}</Typography>
                                            </Box>
                                        ) : <EmptyComponent  key= {i} 
                                            component={component} 

                                        />
                                    ))}
                                    <EditLink section_id={designData.id} />
            </Box>

            </StyledEmptySection>
            ) : null 
    );
};

export default EmptySection;


