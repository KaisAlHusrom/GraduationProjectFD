export function findElementById(element, id) {
    // Base case: If the current element's ID matches the target ID, return it
    if (element.id === id) {
        return element;
    }
    
    // Recursive case: If the current element has children, search through them
    if (element.children && element.children.length > 0) {
        // Iterate through the children array
        for (const child of element.children) {
            // Recursively search for the element with the target ID in each child
            const foundElement = findElementById(child, id);
            // If the element is found, return it
            if (foundElement) {
                return foundElement;
            }
        }
    }
    
    // If the element is not found in the current subtree, return null
    return null;
}

