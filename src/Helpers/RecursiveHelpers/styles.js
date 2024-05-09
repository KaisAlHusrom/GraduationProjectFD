import { writeStyleObject } from "../writeStyleObject";


export const extractStyles = (template, selectedIds) => {
    const updatedSelectedTemplate = JSON.parse(JSON.stringify(template));
    let matchingStyles = {};

    for (const element of Array.isArray(updatedSelectedTemplate) ? updatedSelectedTemplate : [updatedSelectedTemplate]) {
        const elementKey = `${element.element_type.element_type_name}_${element.parent ? element.parent.element_type_name : 0}_${element.sequence_number}`
        if (selectedIds.includes(element.id)) {
            if (!matchingStyles[elementKey]) {
                matchingStyles[elementKey] = {};
            }
            for (const style of element.styles) {
                matchingStyles[elementKey][style.style_prop.style_prop_css_name] = style.style_prop_value;
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





export const addStyle = (template, selectedIds, prop, cssValue) => {
    let styleAdded = false;
    const newStyle = writeStyleObject(prop, cssValue)

    for (const element of Array.isArray(template) ? template : [template]) {
        if (selectedIds.includes(element.id)) {
            if (element.styles.length === 0) {
                element.styles.push(newStyle);
                styleAdded = true;
            } else {
                //check if no one of the existing styles is equal to the new style
                if (element.styles.every(style => style.style_prop_id !== newStyle.style_prop_id)) {
                    element.styles.push(newStyle);
                    styleAdded = true;
                } else {
                    // the style prop is already exist
                }
            }
        } else {
            console.log("There is no selected id")
            
        }

        if (element.children && element.children.length > 0) {
            const childStyleAdded = addStyle(element.children, selectedIds, prop, cssValue);
            if (childStyleAdded) {
                styleAdded = true;
            }
        }
    }

    return styleAdded;
};

export const changeStyleValues = (template, selectedIds, prop, cssValue) => {
    let styleChanged = false;
    const newStyle = writeStyleObject(prop, cssValue)
    for (const element of Array.isArray(template) ? template : [template]) {
        if (selectedIds.includes(element.id)) {
            if (element.styles.some(style => style.style_prop_id === newStyle.style_prop_id)) {
                // check if the newStyle is already exist in the styles
                const style = element.styles.find(style => style.style_prop_id === newStyle.style_prop_id);

                // change the value
                style.style_prop_value = newStyle.style_prop_value;

                styleChanged = true;
            } else {
                element.styles.push(newStyle);
                styleChanged = true;
            }
        }

        if (element.children && element.children.length > 0) {
            const childStyleChanged = changeStyleValues(element.children, selectedIds, prop, cssValue);
            if (childStyleChanged) {
                styleChanged = true;
            }
        }
    }

    return styleChanged;
};

// delete the style from template
export const deleteStyle = (template, selectedIds, prop, cssValue) => {
    let styleDeleted = false;
    for (const element of Array.isArray(template) ? template : [template]) {
        if (selectedIds.includes(element.id)) {
            for (let i = 0; i < element.styles.length; i++) {
                const style = element.styles[i];
                if (style.style_prop.style_prop_css_name === prop.style_prop_css_name && style.style_prop_value === cssValue) {
                    element.styles.splice(i, 1);
                    styleDeleted = true;
                    break; // Exit loop once style is deleted
                }
            }
        }

        if (element.children && element.children.length > 0) {
            const childStyleDeleted = deleteStyle(element.children, selectedIds, prop, cssValue);
            if (childStyleDeleted) {
                styleDeleted = true;
            }
        }
    }

    return styleDeleted;
};



export const checkIfStyleExist = (template, selectedIds, prop, cssValue) => {
    const styles = extractStyles(template, selectedIds);
    const newStyle = writeStyleObject(prop, cssValue)

    // console.log(styles)
    for (const key in styles) {
        if (Object.prototype.hasOwnProperty.call(styles, key)) {
            if (newStyle.style_prop.style_prop_css_name in styles[key]) {
                console.log("here2")
                return true;
            }
        }
    }
    return false;
};


export const convertToCssValue = (prop, value, mainDirections, cornerDirections) => {
        if(value) {
            if(prop.style_prop_value_type === "string") {
                if (!Object.values(mainDirections).every(value => value === null)) {
                    console.log(mainDirections);
                    const directionsValue = `${mainDirections["top"]?.style_prop_value_css_name || nullValues(prop)} ${mainDirections["right"]?.style_prop_value_css_name || nullValues(prop)} ${mainDirections["bottom"]?.style_prop_value_css_name || nullValues(prop)} ${mainDirections["left"]?.style_prop_value_css_name || nullValues(prop)}`;
                    return directionsValue;
                }

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