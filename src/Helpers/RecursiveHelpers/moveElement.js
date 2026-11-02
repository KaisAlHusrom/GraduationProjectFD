export const moveElementUp = (elements, parentId) => {
    let parentArray = null;
    let parentIndex = -1;

    for (const element of elements) {
        if (element.children && element.children.some(child => child.id === parentId)) {
            parentArray = element.children;
            parentIndex = parentArray.findIndex(child => child.id === parentId);
            break;
        } else if (element.children && element.children.length > 0) {
            const result = moveElementUp(element.children, parentId);
            if (result) return true;
        }
    }

    // If parent element not found, return false
    if (parentArray === null || parentIndex === -1) {
        console.log("Parent element not found");
        return false;
    }

    // If parent element is already at the top, return false
    if (parentIndex === 0) {
        console.log("Parent element is already at the top");
        return false;
    }

    // Swap the parent element with the one above it
    const temp = parentArray[parentIndex];
    parentArray[parentIndex] = parentArray[parentIndex - 1];
    parentArray[parentIndex - 1] = temp;

    // Update sequence numbers
    parentArray[parentIndex].sequence_number = parentIndex + 1;
    parentArray[parentIndex - 1].sequence_number = parentIndex;

    return true;
};


export const moveElementDown = (elements, parentId) => {
    let parentArray = null;
    let parentIndex = -1;

    for (const element of elements) {
        if (element.children && element.children.some(child => child.id === parentId)) {
            parentArray = element.children;
            parentIndex = parentArray.findIndex(child => child.id === parentId);
            break;
        } else if (element.children && element.children.length > 0) {
            const result = moveElementDown(element.children, parentId);
            if (result) return true;
        }
    }

    // If parent element not found, return false
    if (parentArray === null || parentIndex === -1) {
        console.log("Parent element not found");
        return false;
    }

    // If parent element is already at the bottom, return false
    if (parentIndex === parentArray.length - 1) {
        console.log("Parent element is already at the bottom");
        return false;
    }

    // Swap the parent element with the one below it
    const temp = parentArray[parentIndex];
    parentArray[parentIndex] = parentArray[parentIndex + 1];
    parentArray[parentIndex + 1] = temp;

    // Update sequence numbers
    parentArray[parentIndex].sequence_number = parentIndex + 1;
    parentArray[parentIndex + 1].sequence_number = parentIndex + 2;

    return true;
};
