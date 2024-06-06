import { ADMIN_MAIN_INSTANCE_ROUTE, createSubAdminAxiosInstance } from "../Controller";

// -------------------------------------- 


import { addDataAdminTemplate, deleteDataAdminTemplate, fetchDataAdminTemplate, permanentDeleteDataAdminTemplate, restoreDataAdminTemplate, updateDataAdminTemplate } from "../Controller";
const ELEMENTS_TYPES_ROUTE = ADMIN_MAIN_INSTANCE_ROUTE + "/element-types"

const ElementTypesAPI = createSubAdminAxiosInstance({
    baseURL: ELEMENTS_TYPES_ROUTE,
});


//---------------------------------------
// fetch items 
export const fetchElementTypesRows = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage) => {
    const res = await fetchDataAdminTemplate(ElementTypesAPI, type, pageNumber, filters, sorts, searchQuery, perPage)
    let rows;

    if(res.success){
        rows = res.data;
    } else {
        rows = [];
    }

    return {rows}
}

//add items
export const addElementType = async (inputValues) => {
    // const submission = {...inputValues, 'parent_id': inputValues["parent"], 'parent': null}
    console.log(inputValues)
    return await addDataAdminTemplate(ElementTypesAPI, inputValues)
}

//update items
export const updateElementType = async (id, newData) => {
    const submission = {
        ...newData, 
    }
    console.log(submission)
 
    return await updateDataAdminTemplate(ElementTypesAPI, id, submission);
};

//passive items
export const deleteElementType = async (selectedIds) => {
    return await deleteDataAdminTemplate(ElementTypesAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteElementType = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(ElementTypesAPI, selectedIds);
};

//Restore deleted items
export const restoreElementType = async (selectedIds) => {
    return await restoreDataAdminTemplate(ElementTypesAPI, selectedIds);
};
