//React
import { useContext, useMemo } from 'react'

import {
    
} from 'react-redux'

//Components
import EmptyComponent from './EmptyComponent'
import PropTypes from 'prop-types';

//MUI
import {
    Box,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { EmptyTemplateSectionSet } from '../../UseContext/UserSetSections'
import EditLink from '../../../../components/EditLink';
import UpDownButtons from '../../../../components/UpDownButtons';



//Styled Components
const StyledEmptySection = styled(Box)(
    () => ({    
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
                                    <EditLink design_id={designData.id} />
            </Box>

            </StyledEmptySection>
            ) : null 
    );
};
EmptySection.propTypes = {
    moveSectionUp: PropTypes.func,
    moveSectionDown: PropTypes.func,
    designData: PropTypes.object,
};
export default EmptySection;


