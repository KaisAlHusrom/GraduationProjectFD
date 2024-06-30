import  {  useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

import { styled } from '@mui/styles';

import EmptyComponent from './EmptyComponent.jsx';






const StyledRecursiveComponent= styled(Box)(() => ({

}));

const RecursiveComponent = ({
    component,
    componentId,
    sectionDataState,

}) => {



    const [componentStyle, setComponentStyle] = useState({});



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
        <>
                    <EmptyComponent  
                        key= {component.id} 
                        component={component} 
                    />
        </>
    );
};


RecursiveComponent.propTypes = {
    component: PropTypes.object
}

export default RecursiveComponent;
