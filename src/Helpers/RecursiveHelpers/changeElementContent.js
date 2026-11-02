export const changeElementContentByParentId = (elements, parentId, newContent) => {
    for (const element of elements) {
        if(element.id === parentId) {
            element.element_content = newContent;
            return true
        }
        if (element.children && element.children.length > 0) {
            if(changeElementContentByParentId(element.children, parentId, newContent)){
                return true
            }
        }
    }

    return false
}

export const currentElementContent = (elements, parentId) => {
    for (const element of elements) {
        if (element.id === parentId) {
            return element.element_content;
        }
        if (element.children && element.children.length > 0) {
            const content = currentElementContent(element.children, parentId);
            if (content !== null) {
                return content; // Return the content if found in child elements
            }
        }
    }

    return null; // Return null if the element with parentId is not found
};
