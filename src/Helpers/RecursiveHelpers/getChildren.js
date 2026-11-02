export const getChildren = (design, selectedElementId) => {
    for (const element of Array.isArray(design) ? design : [design]) {
        if (element?.id === selectedElementId) {
            return element.children;
        }

        if (element?.children && element?.children.length > 0) {
            const children = getChildren(element.children, selectedElementId); 
            if (children) {
                return children;
            }
        }
    }
    
    // If the selected element is not found among the children, return null
    return null;
}
