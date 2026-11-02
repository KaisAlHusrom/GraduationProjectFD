import { base64ToFile } from "../ImageHelper";
import { transformElementTypeToDesignStructure } from "../transformData";
import { v4 as uuIdv4 } from 'uuid';

export const addElementToParent = (elements, parentId, newElement) => {
    
            for (const element of elements) {
                
                if (element?.id === parentId) {
                    if (element.element_type?.not_has_end_tag) {
                        return
                    }    

                    //put the correct sequence number to thi child
                    let sequenceNumber = 1
                    if (element.children.length > 0) {
                        const sequenceNumbers = element.children.map(child => child.sequence_number)
                        sequenceNumber = Math.max(...sequenceNumbers) + 1
                        
                    }

                    const newDesign = {...transformElementTypeToDesignStructure(newElement, element, newElement.element_type_name === "Component" ? "component" : "element"), sequence_number: sequenceNumber}
                    
                    // If the parent element is found, add the new element to its children
                    element.children.push(newDesign);
                    return true;
                }
                // If the current element has children, recursively search through them
                if (element.children && element.children.length > 0) {
                    if (addElementToParent(element.children, parentId, newElement)) {
                        return true;
                    }
                }
            }
            return false; // Parent element not found
};

export const duplicateElement = (elements, parentId, newElement) => {
    for (const element of elements) {
                
        if (element.children && element.children.some(child => child.id === parentId)) {
            if (element.element_type?.not_has_end_tag) {
                return
            }    

            //put the correct sequence number to thi child
            let sequenceNumber = 1
            if (element.children.length > 0) {
                const sequenceNumbers = element.children.map(child => child.sequence_number)
                sequenceNumber = Math.max(...sequenceNumbers) + 1
                
            }

            //* I should change all the id's inside the new element, not just the parent id
            updateID([newElement])
            const newDesign = {...newElement, sequence_number: sequenceNumber}
            
            // If the parent element is found, add the new element to its children
            element.children.push(newDesign);
            return true;
        }
        // If the current element has children, recursively search through them
        if (element.children && element.children.length > 0) {
            if (duplicateElement(element.children, parentId, newElement)) {
                return true;
            }
        }
    }
    return false; // Parent element not found
}



export const updateID = (elements, value = uuIdv4()) => {
    for (const element of Array.isArray(elements) ? elements : [elements]) {
        element['id'] = value === "remove" ? null : value;
        if (element.children && element.children.length > 0) {
            updateID(element.children, value);
        }
    }

    return elements;
}

export const updateID2 = (elements) => {
    for (const element of Array.isArray(elements) ? elements : [elements]) {
        element['id'] =  uuIdv4();
        if (element.children && element.children.length > 0) {
            updateID2(element.children);
        }
    }

    return elements;
}

// clear long un need objects
export const cleanDesignData = (elements) => {
    const formData = new FormData();

    const processElements = (elems, parentKey = '') => {
        for (const [index, element] of elems.entries()) {
            const elementKey = parentKey ? `${parentKey}[${index}]` : `${index}`;

            element["is_template"] = element["is_template"] ? 1 : 0;
            element["is_child"] = element["is_child"] ? 1 : 0;
            
            if (element?.element_type?.element_type_name === "Image") {
                const base64String = element.element_content;
                const filename = 'image.png'; // You can generate a unique filename if needed
                const file = base64ToFile(base64String, filename);
                if (file) {
                    element.element_content = file;
                } else {
                    console.error('Failed to convert base64 string to file for element:', element);
                }
            }

            delete element['element_type'];
            
            if (element.styles) {
                for (const [styleIndex, style] of element.styles.entries()) {
                    delete style["style_prop"];
                    delete style["style_status"];
                    delete style["style_responsive_breakpoint"];

                    // Append styles to FormData
                    for (const key in style) {
                        if (style.hasOwnProperty(key)) {
                            formData.append(`elements[${elementKey}][styles][${styleIndex}][${key}]`, style[key]);
                        }
                    }
                }
            }

            if (element.design_prop_values) {
                for (const [propIndex, prop] of element.design_prop_values.entries()) {
                    delete prop["element_prop"];

                    // Append prop values to FormData
                    for (const key in prop) {
                        if (prop.hasOwnProperty(key)) {
                            formData.append(`elements[${elementKey}][design_prop_values][${propIndex}][${key}]`, prop[key]);
                        }
                    }
                }
            }

            if (element.children && element.children.length > 0) {
                processElements(element.children, `${elementKey}[children]`);
            }

            // Append element properties to FormData
            for (const key in element) {
                if (element.hasOwnProperty(key) && key !== 'styles' && key !== 'children') {
                    formData.append(`elements[${elementKey}][${key}]`, element[key]);
                }
            }
        }
    };

    processElements(Array.isArray(elements) ? elements : [elements]);

    return formData;
};



export const cleanDesignDataDesignPage = (elements) => {
    const formData = new FormData();

    const processElements = (elems, parentKey = '' , parentId = null) => {
        for (const [index, element] of elems.entries()) {
            const elementKey = parentKey ? `${parentKey}[${index}]` : `${index}`;

            element["is_template"] = 0;
            element["is_child"] = element["is_child"] ? 1 : 0;
            element['created_at'] = null
            element['updated_at'] = null
            element['parent_id'] = parentId; 
            if (element?.element_type?.element_type_name === "Image") {
                if (!(element.element_content instanceof File ) && !(element.element_content.endsWith(".png"))) {
                    const base64String = element.element_content;
                    const filename = 'image.png'; // You can generate a unique filename if needed
                    const file = base64ToFile(base64String, filename);
                    if (file) {
                        element.element_content = file;
                    } else {
                        console.error('Failed to convert base64 string to file for element:', element);
                    }
                }
                
            }

            delete element['element_type'];
            
            if (element.styles) {
                for (const [styleIndex, style] of element.styles.entries()) {
                    delete style["style_prop"];
                    delete style["style_status"];
                    delete style["style_responsive_breakpoint"];

                    // Append styles to FormData
                    for (const key in style) {
                        if (style.hasOwnProperty(key)) {
                            formData.append(`elements[${elementKey}][styles][${styleIndex}][${key}]`, style[key]);
                        }
                    }
                }
            }

            if (element.children && element.children.length > 0) {
                processElements(element.children, `${elementKey}[children]` , element.id);
            }

            // Append element properties to FormData
            for (const key in element) {
                if (element.hasOwnProperty(key) && key !== 'styles' && key !== 'children') {
                    formData.append(`elements[${elementKey}][${key}]`, element[key]);
                }
            }
        }
    };

    processElements(Array.isArray(elements) ? elements : [elements]);

    return formData;
};