export const changeElementPropValues = (elements, parentId, prop, propValue) => {
    for (const element of Array.isArray(elements) ? elements : [elements]) {
        if(element.id === parentId) {
            //check if already exists
            if(element?.design_prop_values?.some(propValueObject => propValueObject.element_prop_id === prop.id)) {
                return false
            }

            if (element.design_prop_values && Array.isArray(element.design_prop_values)) {
                // Append new prop value object if design_prop_values is an array
                element.design_prop_values = [...element.design_prop_values, writePropValueObject(parentId, prop, propValue)];
            } else {
                // Initialize design_prop_values array with new prop value object if not an array
                element.design_prop_values = [writePropValueObject(parentId, prop, propValue)];
            }

            return true
        }
        if (element.children && element.children.length > 0) {
            if(changeElementPropValues(element.children, parentId, prop, propValue)){
                return true
            }
        }
    }

    return false
}

export const deleteElementPropValue = (elements, parentId, prop) => {
    for (const element of Array.isArray(elements) ? elements : [elements]) {
        if (element.id === parentId) {
            if (element.design_prop_values && Array.isArray(element.design_prop_values)) {
                // Filter out the prop to delete it
                element.design_prop_values = element.design_prop_values.filter(propValueObject => propValueObject.element_prop_id !== prop.id);
                return true;
            }
            return false; // design_prop_values doesn't exist or isn't an array
        }
        if (element.children && element.children.length > 0) {
            if (deleteElementPropValue(element.children, parentId, prop)) {
                return true;
            }
        }
    }
    return false;
}


export const doesElementPropValueExist = (elements, parentId, prop) => {
    for (const element of Array.isArray(elements) ? elements : [elements]) {
        if (element.id === parentId) {
            if (element.design_prop_values && Array.isArray(element.design_prop_values)) {
                // Check if the prop exists in design_prop_values
                return element.design_prop_values.some(propValueObject => propValueObject.element_prop_id === prop.id);
            }
            // If design_prop_values is not an array or doesn't exist, return false
            return false;
        }
        if (element.children && element.children.length > 0) {
            if (doesElementPropValueExist(element.children, parentId, prop)) {
                return true;
            }
        }
    }

    return false;
}

const writePropValueObject = (designId, prop, value) => {
    return {
        'design_id': designId,
        'element_prop_id': prop?.id,
        'element_prop': prop,
        'design_prop_value': value,
    }
}