//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//propTypes 
import propTypes from 'prop-types'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { GenerateTagEditPage } from '../../../../components/GenerateTageEditPage'

//Styled Components

const StyledEmptyElement = styled(Box)(({ elementstyle }) => ({

}));

const EmptyElement = ({element}) => {

    const [elementData, setElementData] = useState(element);

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
        <StyledEmptyElement className='element-query'>
               {
                elementData.design_type === "element" ? (
                    <GenerateTagEditPage selectedTemplate={elementData} elementStyle={elementStyle}></GenerateTagEditPage>
                ) : null
               }
        </StyledEmptyElement>
    );
};


EmptyElement.propTypes = {
    element: propTypes.object
}


export default EmptyElement;