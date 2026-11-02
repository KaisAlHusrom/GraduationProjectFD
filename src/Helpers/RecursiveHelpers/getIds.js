export const sameTypeIds = (elements, parent) => {
    const ids = [];
    
    const getIds = (elements) => {
        for (const element of elements) {
            if (element.element_type_id === parent.element_type_id) {
                ids.push(element.id);
            }
    
            if (element.children && element.children.length > 0) {
                getIds(element.children); 
            }
        }
    };

    getIds(elements); 

    return ids;
};
