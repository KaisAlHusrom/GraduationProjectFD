//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components
import propTypes from 'prop-types'
import { getAppropriateTag } from '../../StylesFunctions/GenerateElements'
import { AdminMainButton } from '../../../../../../Components'
import TapContent from '../../components/TapContent'

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

import { Edit as EditIcon } from '@mui/icons-material';

//Styled Components
const StyledHeaderElement = styled(Box)(() => ({}))



const TooltipContainer = styled('div')({
    position: 'absolute',
    top: '0',
    transform: 'translateX(-50%)',
});

const HeaderElement = ({element}) => {

    
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
        <StyledHeaderElement>
            {
                getAppropriateTag(element.element, element.element_content, elementStyle)
            }

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
        </StyledHeaderElement>
    );
};

HeaderElement.propTypes = {
    element: propTypes.object
}
export default HeaderElement;