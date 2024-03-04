

//React
import {
    useMemo, useState  
} from 'react'

import {
    
} from 'react-redux'

//Components
import TapContent from '../../components/TapContent';
import { getAppropriateTag } from '../../StylesFunctions/GenerateElements';
import { AdminMainButton } from '../../../../../../Components';

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { Edit as EditIcon } from '@mui/icons-material';

//propTypes 
import propTypes from 'prop-types'

const StyledAboutElement = styled(Box)(() => ({}));

const TooltipContainer = styled(Box)({
    position: 'relative',
    display: 'inline-block', 
});

const GalleryElement = ({ element }) => {

    
    const [title, setTitle] = useState(element.element_content);
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
        <StyledAboutElement>
            {getAppropriateTag(element.element, title, elementStyle)}

            <TooltipContainer>
                <AdminMainButton
                    title="Edit"
                    type="modal"
                    appearance="iconButton"
                    putTooltip
                    icon={<EditIcon />}
                    willShow={
                        <TapContent
                        content={[title, setTitle]}
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

        </StyledAboutElement>
    );
};

GalleryElement.propTypes = {
    element: propTypes.object,
};

export default GalleryElement;



