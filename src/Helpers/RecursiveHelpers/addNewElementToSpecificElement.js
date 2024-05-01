import { transformElementTypeToDesignStructure } from "../transformData";
import { v4 as uuIdv4 } from 'uuid';

export const addElementToParent = (elements, parentId, newElement) => {
    
            for (const element of elements) {
                
                if (element.id === parentId) {
                    if (element.element_type?.not_has_end_tag) {
                        return
                    }    

                    //put the correct sequence number to thi child
                    let sequenceNumber = 1
                    if (element.children.length > 0) {
                        const sequenceNumbers = element.children.map(child => child.sequence_number)
                        sequenceNumber = Math.max(...sequenceNumbers) + 1
                        
                    }

                    const newDesign = {...transformElementTypeToDesignStructure(newElement, element), sequence_number: sequenceNumber}
                    
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

            //TODO: I should change all the id's inside the new element, not just the parent id
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

export const updateID = (elements) => {
    for (const element of elements) {
        element['id'] = uuIdv4()
        if (element.children && element.children.length > 0) {
            if (updateID(element.children)) {
                return true;
            }
        } 
    }
}