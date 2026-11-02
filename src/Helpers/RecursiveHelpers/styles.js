import StringHelper from "../StringsHelper";
import { writeStyleObject, writeStyleObject2 } from "../writeStyleObject";

// export const stylesTypes = ['mix', 'styles', 'exception styles', 'screen sizes styles']

export const extractStyles = (template, selectedIds) => {
    const updatedSelectedTemplate = JSON.parse(JSON.stringify(template));
    const matchingStyles = {};
    
    const normalStyles = {};
    const exceptionStyles = {};
    const breakpointsStyles = {};
    const mixStyles = {};
    const fromNormalNameToAllProps = {}

    for (const element of Array.isArray(updatedSelectedTemplate) ? updatedSelectedTemplate : [updatedSelectedTemplate]) {
        const elementKey = `${element.element_type.element_type_name}_${element.parent ? element.parent.element_type_name : 0}_${element.sequence_number}`
        if (selectedIds.includes(element.id)) {
            
            if (!matchingStyles[elementKey]) {
                matchingStyles[elementKey] = {};
            }
            for (const style of element.styles) {
                // Check if both status and breakpoint exist
                if (style.style_status && style.style_responsive_breakpoint) {
                    const propName = `${style.style_status.style_status_normal_name}_${style.style_responsive_breakpoint.style_responsive_break_point_normal_name}`;
                    mixStyles[propName] = {
                        ...mixStyles[propName],
                        [style.style_prop.style_prop_normal_name]: style.style_prop_value
                    };

                    matchingStyles[elementKey]["mix"] = {...mixStyles}
                    
                } 

                // Check if only status exists
                else if (style.style_status) {
                    exceptionStyles[`${style.style_status.style_status_normal_name}`] = {
                        ...exceptionStyles[style.style_status.style_status_normal_name],
                        [style.style_prop.style_prop_normal_name]: style.style_prop_value
                    };

                    matchingStyles[elementKey]["exception styles"] = {...exceptionStyles};
                } 
                // Check if only breakpoint exists
                else if (style.style_responsive_breakpoint) {
                    breakpointsStyles[style.style_responsive_breakpoint.style_responsive_break_point_normal_name] = {
                        ...breakpointsStyles[style.style_responsive_breakpoint.style_responsive_break_point_normal_name],
                        [style.style_prop.style_prop_normal_name]: style.style_prop_value
                    };
                    matchingStyles[elementKey]["screen sizes styles"] = {...breakpointsStyles};
                } 
                // If neither status nor breakpoint exist
                else {
                    normalStyles[style.style_prop.style_prop_normal_name] = style.style_prop_value;
                    matchingStyles[elementKey]["styles"] = {...normalStyles};
                }

                fromNormalNameToAllProps[style.style_prop.style_prop_normal_name] = style.style_prop
            }


        }

        if (element.children && element.children.length > 0) {
            const childStyles = extractStyles(element.children, selectedIds);
            for (const key in childStyles.matchingStyles) {
                if (!matchingStyles[key]) {
                    matchingStyles[key] = {};
                }
                Object.assign(matchingStyles[key], childStyles.matchingStyles[key]);
            }
        }
    }

    return {matchingStyles, fromNormalNameToAllProps};
};



export function isNewStyleAlreadyExist(element, newStyle) {
    return element?.styles?.some(style => {
        const sameResponsiveBreakpoint = style.style_responsive_breakpoint_id === newStyle.style_responsive_breakpoint_id;
        const sameStatus = style.style_status_id === newStyle.style_status_id;
        const sameProp = style.style_prop_id === newStyle.style_prop_id;

        // If all properties match, and both style_status_id and style_responsive_breakpoint_id are present,
        // and they match in the existing style and new style, return false
        if (sameResponsiveBreakpoint && sameStatus && sameProp &&
            style.style_status_id !== undefined && style.style_responsive_breakpoint_id !== undefined &&
            (newStyle.style_status_id === undefined || newStyle.style_responsive_breakpoint_id === undefined)) {
            return false;
        }

        // If only style_status_id exists in newStyle and it's different from the existing style, return false
        if (newStyle.style_status_id !== undefined && !sameStatus &&
            newStyle.style_responsive_breakpoint_id === undefined && sameProp) {
            return false;
        }

        // If only style_responsive_breakpoint_id exists in newStyle and it's different from the existing style, return false
        if (newStyle.style_responsive_breakpoint_id !== undefined && !sameResponsiveBreakpoint &&
            newStyle.style_status_id === undefined && sameProp) {
            return false;
        }

        return sameResponsiveBreakpoint && sameStatus && sameProp;
    });
}





export const addStyle = (template, selectedIds, prop, cssValue, styleException, styleBreakpoint) => {
    let styleAdded = false;
    const newStyle = writeStyleObject(prop, cssValue, styleException, styleBreakpoint)

    for (const element of Array.isArray(template) ? template : [template]) {
        if (selectedIds.includes(element.id)) {
            if (element.styles.length === 0) {
                element.styles.push(newStyle);
                styleAdded = true;
            } else {
                //check if no one of the existing styles is equal to the new style
                //TODO: check if work true
                if (!isNewStyleAlreadyExist(element, newStyle)) {
                    element.styles.push(newStyle);
                    styleAdded = true;
                    console.log("added successfully");
                } else {
                    console.log("can't add because it already exists");
                    // the style prop is already exist
                }
            }
        } else {
            console.log("There is no selected id")
            
        }

        if (element.children && element.children.length > 0) {
            const childStyleAdded = addStyle(element.children, selectedIds, prop, cssValue, styleException, styleBreakpoint);
            if (childStyleAdded) {
                styleAdded = true;
            }
        }
    }

    return styleAdded;
};

export const addStyleAbdullah = (template, selectedIds, prop, cssValue, styleException, styleBreakpoint) => {
    let styleAdded = false;
    const newStyle = writeStyleObject2(prop, cssValue, styleException, styleBreakpoint)
    for (const element of Array.isArray(template) ? template : [template]) {
        if (selectedIds.includes(element.id)) {
            if (element.styles.length === 0) {
                element.styles.push(newStyle);
                styleAdded = true;
            } else {
                //check if no one of the existing styles is equal to the new style
                //TODO: check if work true
                if (!isNewStyleAlreadyExist(element, newStyle)) {
                    element.styles.push(newStyle);
                    styleAdded = true;
                    console.log("added successfully");
                } else {
                    const style = element.styles.find(style => isStyleMatching(style, newStyle));
            
                    // Change the value
                    style.style_prop_value = newStyle.style_prop_value;
                    styleAdded = true;
                }
            }
        } else {
            console.log("There is no selected id")
            
        }

        if (element.children && element.children.length > 0) {
            const childStyleAdded = addStyleAbdullah(element.children, selectedIds, prop, cssValue, styleException, styleBreakpoint);
            if (childStyleAdded) {
                styleAdded = true;
            }
        }
    }

    return styleAdded;
};

function isStyleMatching(style, newStyle) {
    return (style.style_prop_id === newStyle.style_prop_id) &&
        (style.style_status_id === newStyle.style_status_id || (!style.style_status_id && !newStyle.style_status_id)) &&
        (style.style_responsive_breakpoint_id === newStyle.style_responsive_breakpoint_id || (!style.style_responsive_breakpoint_id && !newStyle.style_responsive_breakpoint_id));
}


export const changeStyleValues = (template, selectedIds, prop, cssValue, styleException, styleBreakpoint) => {
    let styleChanged = false;
    const newStyle = writeStyleObject(prop, cssValue, styleException, styleBreakpoint)
    for (const element of Array.isArray(template) ? template : [template]) {
        if (selectedIds.includes(element.id)) {
            if (isNewStyleAlreadyExist(element, newStyle)) {
                // Check if the newStyle is already exist in the styles
                //TODO: check if work true
                const style = element.styles.find(style => isStyleMatching(style, newStyle));
            
                // Change the value
                style.style_prop_value = newStyle.style_prop_value;
                styleChanged = true;
            } else {
                element.styles.push(newStyle);
                styleChanged = true;
            }
        }

        if (element.children && element.children.length > 0) {
            const childStyleChanged = changeStyleValues(element.children, selectedIds, prop, cssValue, styleException, styleBreakpoint);
            if (childStyleChanged) {
                styleChanged = true;
            }
        }
    }

    return styleChanged;
};

// delete the style from template
export const deleteStyle = (template, selectedIds, prop, cssValue, styleException, styleBreakpoint) => {
    let styleDeleted = false;
    const oldStyle = writeStyleObject(prop, cssValue, styleException, styleBreakpoint);
    for (const element of Array.isArray(template) ? template : [template]) {
        if (selectedIds.includes(element.id)) {
            for (let i = 0; i < element.styles.length; i++) {
                const style = element.styles[i];
                if (isNewStyleAlreadyExist({ styles: [style] }, oldStyle)) {
                    element.styles.splice(i, 1);
                    styleDeleted = true;
                    break; // Exit loop once style is deleted
                }
            }
        }

        if (element.children && element.children.length > 0) {
            const childStyleDeleted = deleteStyle(element.children, selectedIds, prop, cssValue, styleException, styleBreakpoint);
            if (childStyleDeleted) {
                styleDeleted = true;
            }
        }
    }

    return styleDeleted;
};




export const extractStylesWithoutChangeTheStructure = (template, selectedIds) => {
    const styles = []
    for (const design of Array.isArray(template) ? template : [template]) {
        if (selectedIds.includes(design?.id)) {
            styles.push(...design.styles)
        }

        if (design?.children && design?.children.length > 0) {
            styles.push(...extractStylesWithoutChangeTheStructure(design.children, selectedIds)); // Accumulate styles from children
        }
    }

    return styles;
}

export const checkIfStyleExist = (template, selectedIds, prop, cssValue, exceptionStyle, breakpointStyle) => {
    const styles = extractStylesWithoutChangeTheStructure(template, selectedIds);
    const newStyle = writeStyleObject(prop, cssValue, exceptionStyle, breakpointStyle)

    for (const style of styles) {
        // Check if style properties match, handling undefined values
        if (
            style.style_prop_id === newStyle.style_prop_id &&
            (style.style_status_id === newStyle.style_status_id || 
                (style.style_status_id === undefined && newStyle.style_status_id === undefined)) &&
            (style.style_responsive_breakpoint_id === newStyle.style_responsive_breakpoint_id || 
                (style.style_responsive_breakpoint_id === undefined && newStyle.style_responsive_breakpoint_id === undefined))
        ) {
            return true;
        }
    }
    return false;
};

export const convertToCssValue = (prop, value, mainDirections, cornerDirections) => {
        if(value) {
            if(prop.style_prop_value_type === "props") {
                return StringHelper.camelToKebab(value.style_prop_css_name)
            }

            if(prop.style_prop_value_type === "string") {

                //if there is one value in the main directions that not null
                if (!Object.values(mainDirections)?.every(value => value === null)) {
                    console.log(mainDirections);
                    const directionsValue = `${mainDirections["top"]?.style_prop_value_css_name || nullValues(prop)} ${mainDirections["right"]?.style_prop_value_css_name || nullValues(prop)} ${mainDirections["bottom"]?.style_prop_value_css_name || nullValues(prop)} ${mainDirections["left"]?.style_prop_value_css_name || nullValues(prop)}`;
                    return directionsValue;
                }

                //if there is one value in the corner directions that not null
                if (!Object.values(cornerDirections)?.every(value => value === null)) {
                    console.log(mainDirections);
                    const directionsValue = `${cornerDirections["topLeft"]?.style_prop_value_css_name || nullValues(prop)} ${cornerDirections["topRight"]?.style_prop_value_css_name || nullValues(prop)} ${cornerDirections["bottomRight"]?.style_prop_value_css_name || nullValues(prop)} ${cornerDirections["bottomLeft"]?.style_prop_value_css_name || nullValues(prop)}`;
                    return directionsValue;
                }
                
                return value.style_prop_value_css_name
            }
            
            if (!Object.values(mainDirections)?.every(value => value === null)){
                console.log(mainDirections)
                const directionsValue = `${mainDirections["top"] || nullValues(prop)} ${mainDirections["right"] || nullValues(prop)} ${mainDirections["bottom"] || nullValues(prop)} ${mainDirections["left"] || nullValues(prop)}`
                return directionsValue
            }

            if (!Object.values(cornerDirections)?.every(value => value === null)) {
                console.log(cornerDirections)
                const directionsValue = `${cornerDirections["topLeft"] || nullValues(prop)} ${cornerDirections["topRight"] || nullValues(prop)} ${cornerDirections["bottomRight"] || nullValues(prop)} ${cornerDirections["bottomLeft"] || nullValues(prop)}`;
                return directionsValue;
            }
            return value
            
        }
    
}

export const convertToNormalName = (prop, cssValue, mainDirections, cornerDirections) => {
    if (cssValue) {
        if (prop.style_prop_value_type === "props") {
            // Assuming prop is an object that contains mappings from CSS names to normal names
            const normalName = Object.keys(prop).find(key => prop[key].style_prop_value_css_name === cssValue);
            return normalName || cssValue; // Return the original CSS value if no mapping found
        }

        if (prop.style_prop_value_type === "string") {
            // Handle conversions for string type properties if needed
            // This depends on how your string values are mapped back to normal names
            // Example implementation:
            // const normalName = Object.keys(prop).find(key => prop[key].style_prop_value_css_name === cssValue);
            // return normalName || cssValue;
            return cssValue; // Placeholder, adjust as per your actual mappings
        }

        // Handle other types like mainDirections and cornerDirections if necessary
        // Example implementation for mainDirections:
        // const normalName = Object.keys(mainDirections).find(key => mainDirections[key]?.style_prop_value_css_name === cssValue);
        // return normalName || cssValue;

        // Placeholder, return CSS value directly if no mapping found
        return cssValue;
    }

    return cssValue; // Return the value as-is if null or undefined
}


export const nullValues = (prop) => {
    if (prop.style_prop_value_type === "color") {
        return "white";
    }

    if (prop.style_prop_value_type === "px") {
        return "1px";
    }
    return "none";
}

export const returnDirectionsValue = (mainDirections) => {
    // when I change the main directions the value is be added to it for that I return it
    if (!Object.values(mainDirections).every(value => value === null)){
        const directionsValue = `${mainDirections["top"]} ${mainDirections["right"]} ${mainDirections["bottom"]} ${mainDirections["left"]}`
        return directionsValue
    }
}