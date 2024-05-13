import { writeStyleObject } from "../writeStyleObject";

// export const stylesTypes = ['mix', 'styles', 'exception styles', 'screen sizes styles']

export const extractStyles = (template, selectedIds) => {
    const updatedSelectedTemplate = JSON.parse(JSON.stringify(template));
    const matchingStyles = {};
    
    const normalStyles = {};
    const exceptionStyles = {};
    const breakpointsStyles = {};
    const mixStyles = {};

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
            }


        }

        if (element.children && element.children.length > 0) {
            const childStyles = extractStyles(element.children, selectedIds);
            for (const key in childStyles) {
                if (!matchingStyles[key]) {
                    matchingStyles[key] = {};
                }
                Object.assign(matchingStyles[key], childStyles[key]);
            }
        }
    }

    return matchingStyles;
};



function isNewStyleAlreadyExist(element, newStyle) {
    let same = false;
    for (let i = 0; i < element.styles.length; i++) {
        const style = element.styles[i];
        //if there is not style exception and responsive breakpoint
        if(newStyle.style_responsive_breakpoint_id === undefined && newStyle.style_status_id === undefined) {
            if (
                (style.style_responsive_breakpoint_id === undefined && style.style_status_id === undefined) 
                && 
                style.style_prop_id === newStyle.style_prop_id) {
                same = true;
                break
            }
        }

        //if there is only style exception
        if(newStyle.style_responsive_breakpoint_id === undefined && newStyle.style_status_id !== undefined) {
            if (
                style.style_responsive_breakpoint_id === undefined &&
                style.style_status_id !== undefined && 
                style.style_prop_id === newStyle.style_prop_id
            )
                {
                same = true;
                break
            }
        }

        //if there is only style responsive exception
        if(newStyle.style_responsive_breakpoint_id !== undefined && newStyle.style_status_id === undefined) {
            if (
                style.style_status_id === undefined &&
                style.style_responsive_breakpoint_id !== undefined && 
                style.style_prop_id === newStyle.style_prop_id
            ) {
                same = true;
                break
            }
        }

        // if there are both style exception and responsive breakpoint
        if(newStyle.style_responsive_breakpoint_id !== undefined && newStyle.style_status_id !== undefined) {
            if (style.style_responsive_breakpoint_id !== undefined && 
                style.style_status_id !== undefined && 
                style.style_prop_id === newStyle.style_prop_id) {
                same = true;
                break
            }
        }
    }
    return same;
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
                    console.log("exist");
                } else {
                    console.log("not exist");
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
            //TODO: check if work true
            if (element.styles.some(style => isStyleMatching(style, newStyle))) {
                // Check if the newStyle is already exist in the styles
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
    console.log(styleException)
    console.log(styleBreakpoint)
    const oldStyle = writeStyleObject(prop, cssValue, styleException, styleBreakpoint)
    
    for (const element of Array.isArray(template) ? template : [template]) {
        if (selectedIds.includes(element.id)) {
            for (let i = 0; i < element.styles.length; i++) {
                const style = element.styles[i];
                //if there is not style exception and responsive breakpoint
                if(oldStyle.style_responsive_breakpoint_id === undefined && oldStyle.style_status_id === undefined) {
                    if (style.style_prop_id === oldStyle.style_prop_id) {
                        element.styles.splice(i, 1);
                        styleDeleted = true;
                        break; // Exit loop once style is deleted
                    }
                }

                //if there is only style exception
                if(oldStyle.style_responsive_breakpoint_id === undefined && oldStyle.style_status_id !== undefined) {
                    if (style.style_status_id !== undefined && style.style_prop_id === oldStyle.style_prop_id) {
                        element.styles.splice(i, 1);
                        styleDeleted = true;
                        break; // Exit loop once style is deleted
                    }
                }

                //if there is only style responsive exception
                if(oldStyle.style_responsive_breakpoint_id !== undefined && oldStyle.style_status_id === undefined) {
                    if (style.style_responsive_breakpoint_id !== undefined && style.style_prop_id === oldStyle.style_prop_id) {
                        element.styles.splice(i, 1);
                        styleDeleted = true;
                        break; // Exit loop once style is deleted
                    }
                }

                // if there are both style exception and responsive breakpoint
                if(oldStyle.style_responsive_breakpoint_id !== undefined && oldStyle.style_status_id !== undefined) {
                    if (style.style_responsive_breakpoint_id !== undefined && 
                        style.style_status_id !== undefined && 
                        style.style_prop_id === oldStyle.style_prop_id) {
                        element.styles.splice(i, 1);
                        styleDeleted = true;
                        break; // Exit loop once style is deleted
                    }
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

//delete styles from appliedStyles section
export const deleteStyleWithNormalName = (template, selectedIds, propNormalName, cssValue) => {
    let styleDeleted = false;
    for (const element of Array.isArray(template) ? template : [template]) {
        if (selectedIds.includes(element.id)) {
            for (let i = 0; i < element.styles.length; i++) {
                const style = element.styles[i];
                if (style.style_prop.style_prop_normal_name === propNormalName) {
                    element.styles.splice(i, 1);
                    styleDeleted = true;
                    break; // Exit loop once style is deleted
                }
            }
        }

        if (element.children && element.children.length > 0) {
            const childStyleDeleted = deleteStyle(element.children, selectedIds, propNormalName, cssValue);
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
        if (selectedIds.includes(design.id)) {
            styles.push(...design.styles)
        }

        if (design.children && design.children.length > 0) {
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
            if(prop.style_prop_value_type === "string") {

                //if there is one value in the main directions that not null
                if (!Object.values(mainDirections).every(value => value === null)) {
                    console.log(mainDirections);
                    const directionsValue = `${mainDirections["top"]?.style_prop_value_css_name || nullValues(prop)} ${mainDirections["right"]?.style_prop_value_css_name || nullValues(prop)} ${mainDirections["bottom"]?.style_prop_value_css_name || nullValues(prop)} ${mainDirections["left"]?.style_prop_value_css_name || nullValues(prop)}`;
                    return directionsValue;
                }

                //if there is one value in the corner directions that not null
                if (!Object.values(cornerDirections).every(value => value === null)) {
                    console.log(mainDirections);
                    const directionsValue = `${cornerDirections["topLeft"]?.style_prop_value_css_name || nullValues(prop)} ${cornerDirections["topRight"]?.style_prop_value_css_name || nullValues(prop)} ${cornerDirections["bottomRight"]?.style_prop_value_css_name || nullValues(prop)} ${cornerDirections["bottomLeft"]?.style_prop_value_css_name || nullValues(prop)}`;
                    return directionsValue;
                }
                
                return value.style_prop_value_css_name
            }
            
            if (!Object.values(mainDirections).every(value => value === null)){
                console.log(mainDirections)
                const directionsValue = `${mainDirections["top"] || nullValues(prop)} ${mainDirections["right"] || nullValues(prop)} ${mainDirections["bottom"] || nullValues(prop)} ${mainDirections["left"] || nullValues(prop)}`
                return directionsValue
            }

            if (!Object.values(cornerDirections).every(value => value === null)) {
                console.log(cornerDirections)
                const directionsValue = `${cornerDirections["topLeft"] || nullValues(prop)} ${cornerDirections["topRight"] || nullValues(prop)} ${cornerDirections["bottomRight"] || nullValues(prop)} ${cornerDirections["bottomLeft"] || nullValues(prop)}`;
                return directionsValue;
            }
            return value
            
        }
    
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