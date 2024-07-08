//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'
import PropTypes from 'prop-types';

//Components
import PreviewElement from './PreviewElement';


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import PreviewComponentRecursive from './PreviewComponentRecursive';

//Styled Components
const StyledPreviewComponent = styled(Box)(
    ({ theme }) => ({
    
    })
)


const PreviewComponent = ({component}) => {

    const [componentStyle, setComponentStyle] = useState({}); // using for control the component style 

    useMemo(() => {
        const dictionary = {};
        if (component.styles) {
            component.styles.forEach((cssProp) => {
                const { style_prop, style_prop_value } = cssProp;
                if (style_prop?.is_component) {
                    dictionary[style_prop.style_prop_css_name] = style_prop_value;
                }
            });
        }
        setComponentStyle(dictionary);
    }, [component.styles]);

    
    return (
        <StyledPreviewComponent sx={{...componentStyle , position : 'relative'}}>
                     {
                    component && component.children
                        .sort((a, b) => a.sequence_number - b.sequence_number)
                        .map((element, i) => (
                            <>
                            {element.design_type === 'component' ? (
                                <PreviewComponentRecursive
                                    component={element}
                                />
                            ) : (
                                <PreviewElement key={i} element={element}/>

                            )}
                            </>
                        ))
                }
        </StyledPreviewComponent>
    );
};
PreviewComponent.propTypes = {

    component: PropTypes.object,
};
export default PreviewComponent;