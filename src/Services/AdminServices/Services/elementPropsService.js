

//Redux 


// -------------------------------------- 

import { ADMIN_MAIN_INSTANCE_ROUTE, addDataAdminTemplate, createSubAdminAxiosInstance, deleteDataAdminTemplate, fetchDataAdminTemplate, permanentDeleteDataAdminTemplate, restoreDataAdminTemplate, updateDataAdminTemplate } from "../Controller";
const ELEMENTS_PROPS_ROUTE = ADMIN_MAIN_INSTANCE_ROUTE + "/element-props"

const ElementPropsAPI = createSubAdminAxiosInstance({
    baseURL: ELEMENTS_PROPS_ROUTE,
});

export const fetchElementProps = async (type = 'all', pageNumber = 1, filters = [], sorts = [], searchQuery = null) => {
    const res = await fetchDataAdminTemplate(ElementPropsAPI, type, pageNumber, filters, sorts, searchQuery)
    let rows;
    
    if(res.success){
        rows = res.data;
    } else {
        rows = [];
    }
    
    return {rows}
}

export const addElementProp = async (inputValues) => {

    
    return await addDataAdminTemplate(ElementPropsAPI, inputValues)


}

export const updateElementProp = async (id, newData) => {
    return await updateDataAdminTemplate(ElementPropsAPI, id, newData);
};

export const deleteElementProp = async (selectedIds) => {
    return await deleteDataAdminTemplate(ElementPropsAPI, selectedIds);
};

export const permanentDeleteElementProp = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(ElementPropsAPI, selectedIds);
};

//Restore deleted items
export const restoreElementProp = async (selectedIds) => {
    return await restoreDataAdminTemplate(ElementPropsAPI, selectedIds);
};