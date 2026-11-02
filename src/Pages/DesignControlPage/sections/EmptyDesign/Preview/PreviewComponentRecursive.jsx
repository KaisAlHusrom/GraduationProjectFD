import  {  useMemo, useState } from 'react';
import PropTypes from 'prop-types';


import PreviewComponent from './PreviewComponent.jsx';
const PreviewComponentRecursive = ({
    component,
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
                <PreviewComponent  
                    key= {component.id} 
                    component={component} 
                />
        </>
    );
};


PreviewComponentRecursive.propTypes = {
    component: PropTypes.object
}

export default PreviewComponentRecursive;
