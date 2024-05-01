export const removeElementByParentId = (elements, parentId) => {
    for (const [index, element] of elements.entries()) {
        if (element.id === parentId) {
            elements.splice(index, 1); // Remove the element with the given parentId
            return true; // Element removed successfully
        }
        // If the current element has children, recursively search through them
        if (element.children && element.children.length > 0) {
            if (removeElementByParentId(element.children, parentId)) {
                return true; // Element removed successfully in child
            }
        }
    }
    return false; // Parent element not found
};

export const removeChildrenByParentId = (elements, parentId) => {
    for (const element of elements) {
        if (element.id === parentId) {
            element.children = []; // Remove all children of the element with the given parentId
            return true; // Children removed successfully
        }
        // If the current element has children, recursively search through them
        if (element.children && element.children.length > 0) {
            if (removeChildrenByParentId(element.children, parentId)) {
                return true; // Children removed successfully in child
            }
        }
    }
    return false; // Parent element not found
};
