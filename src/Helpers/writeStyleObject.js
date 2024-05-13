import { extractStyles } from "./RecursiveHelpers/styles"

// write the style like the shape that came from database
export const writeStyleObject = (prop, value = null, status = null, breakpoint = null) => {
    return {
        style_status: status,
        style_status_id: status?.id,
        style_responsive_breakpoint: breakpoint,
        style_responsive_breakpoint_id: breakpoint?.id,
        style_prop: prop,
        style_prop_id: prop?.id,
        style_prop_value: value
    }
}


export const convertStyleToCssShape = (styles, theme) => {
    const allStyles = {};
    const convertedStyles = {};
    const exceptionStyles = {};
    const breakpointsStyles = {};
    const mixStyles = {};

    if (styles && styles.length > 0) {
        for (const style of styles) {
            // Store all styles in an object
            allStyles[style.style_prop.style_prop_css_name] = style.style_prop_value;

            // Check if both status and breakpoint exist
            if (style.style_status && style.style_responsive_breakpoint) {
                const propName = `${style.style_status.style_status_css_name}_${style.style_responsive_breakpoint.style_responsive_break_point_css_name}`;
                mixStyles[propName] = {
                    ...mixStyles[propName],
                    [style.style_prop.style_prop_css_name]: style.style_prop_value
                };
            } 

            // Check if only status exists
            else if (style.style_status) {
                exceptionStyles[`&:${style.style_status.style_status_css_name}`] = {
                    ...exceptionStyles[style.style_status.style_status_css_name],
                    [style.style_prop.style_prop_css_name]: style.style_prop_value
                };
            } 
            // Check if only breakpoint exists
            else if (style.style_responsive_breakpoint) {
                const breakpointName = style.style_responsive_breakpoint.style_responsive_break_point_css_name;
                const breakpointKey = `[theme.breakpoints.down('${breakpointName}')]`;
                
                const breakpointStyles = {
                    ...breakpointsStyles[breakpointName],
                    [style.style_prop.style_prop_css_name]: style.style_prop_value
                };
                
                // Create a function from the breakpoint key to get the actual value
                const breakpointKeyFunction = new Function('theme', `return ${breakpointKey}`);
                
                // Get the actual key value
                const actualBreakpointKey = breakpointKeyFunction(theme);
                
                breakpointsStyles[actualBreakpointKey] = breakpointStyles;
            }
            
            // If neither status nor breakpoint exist
            else {
                convertedStyles[style.style_prop.style_prop_css_name] = style.style_prop_value;
            }
        }
    }

    // Combine all styles into a single object
    return {
        ...convertedStyles,
        ...mixStyles,
        ...exceptionStyles,
        ...breakpointsStyles
    };
};


export const convertStyleFromObjectToJsCode = (styles, template) => {
    const convertedStyles = {}
    if(styles && styles.length > 0) {
        for (const style of styles) {
            const currentStyles = extractStyles([template], [style.design.id])
            //TODO: fix applied styles to split each element's styles from others
            convertedStyles[`${style.design.element_type.element_type_name}_${style.design.sequence_number}`] = [...currentStyles.map(style => style.stylePropValue), style.stylePropValue]
        }
    }

    return convertedStyles
}