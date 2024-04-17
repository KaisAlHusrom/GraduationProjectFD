//React
import { useMemo, useState } from 'react'

import {
} from 'react-redux'

//Components
import { getAppropriateTag } from '../../../../sections/TempalteSection/StylesFunctions/GenerateElements.jsx';
import { AdminMainButton } from '../../../../../../Components/index.jsx';
import TapContent from '../../../TempalteSection/components/TapContent.jsx';
//MUI
import {
    Box
} from '@mui/material'
import { styled } from '@mui/system'
import { Edit as EditIcon } from '@mui/icons-material';


//propTypes 
import PropTypes from 'prop-types'; 

//Styled Components
const StyledNavBarElement = styled(Box)(
    () => ({
    
    })
)

    const TooltipContainer = styled('div')({
        position: 'absolute',
        top: '-50px',
    });

    const NavBarElement1 = ({ element }) => {

        const [title, setTitle] = useState(element.element_content);
        element.element_content = title;
        const [elementStyle, setElementStyle] = useState({}); 
    
        useMemo(() => {
            const dictionary = {};
            if (element.section_css_props) {
                element.section_css_props.forEach((cssProp) => {
                    const { css_prop, css_prop_value } = cssProp;
                    if (css_prop.is_element) {
                        dictionary[css_prop.prop_name] = css_prop_value;
                    }
                });
            }
            setElementStyle(dictionary);
        }, [element.section_css_props]);
        
        const handleElementStyleChange = (newStyle) => {
            setElementStyle(newStyle);
        };
    
        return (
            <StyledNavBarElement>
                {getAppropriateTag(element.element, element.element_content, elementStyle)}

                <TooltipContainer>
                    <AdminMainButton
                        title={element.element_content}
                        type='modal'
                        appearance='iconButton'
                        putTooltip
                        icon={<EditIcon />}
                        willShow={
                            <TapContent
                                content={[title , setTitle]}  
                                elementStyles={elementStyle} 
                                onStyleChange={handleElementStyleChange} 
                                element={element}
                            />
                        }
                        sx={{
                            border: '1px solid red',
                            padding: '10px 15px',
                            fontWeight: 'bold',
                            color: 'white.main',
                            backgroundColor: 'primary.dark',
                        }}
                    />
                </TooltipContainer>


            </StyledNavBarElement>
        );
    };
    
    NavBarElement1.propTypes = {
        element: PropTypes.object.isRequired, // Define PropTypes
    };
    
export default NavBarElement1;
