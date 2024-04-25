export const addElementToParent = (elements, parentId, newElement) => {
    
            for (const element of elements) {
                console.log(element)
                
                if (element.id === parentId) {
                    if (element.not_has_end_tag) {
                        return
                    }    
                    // If the parent element is found, add the new element to its children
                    element.children.push(newElement);
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