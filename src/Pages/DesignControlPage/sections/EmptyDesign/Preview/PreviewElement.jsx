//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'
import PropTypes from 'prop-types';

//Components
import { GenerateTagEditPage } from '../../../components/GenerateTageEditPage';


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledPreviewElement = styled(Box)(
    ({ theme }) => ({
    
    })
)


const PreviewElement = ({element}) => {

    const [elementStyle, setElementStyle] = useState({});
    useMemo(() => {
        const dictionary = {};
        if (element.styles) {
            element.styles.forEach((cssProp) => {
                const { style_prop, style_prop_value } = cssProp;
                if (style_prop?.is_element) {
                    dictionary[style_prop.style_prop_css_name] = style_prop_value;
                }
            });
        }
        setElementStyle(dictionary);
    }, [element.styles]);


    return (
        <StyledPreviewElement>
                <GenerateTagEditPage selectedTemplate={element} elementStyle={elementStyle}></GenerateTagEditPage>
            </StyledPreviewElement>
    );
};
PreviewElement.propTypes = {

    element: PropTypes.object,
};
export default PreviewElement;