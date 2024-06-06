
// -------------------------------------- 

import { ADMIN_MAIN_INSTANCE_ROUTE, addDataAdminTemplate, createSubAdminAxiosInstance, deleteDataAdminTemplate, fetchDataAdminTemplate, permanentDeleteDataAdminTemplate, restoreDataAdminTemplate, updateDataAdminTemplate } from "../Controller";
const CategoryRoute = ADMIN_MAIN_INSTANCE_ROUTE + "/element-types-categories";

const CategoryAPI = createSubAdminAxiosInstance({
    baseURL: CategoryRoute,
});
//---------------------------------------
// fetch items 
export const fetchElementTypesCategories = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataAdminTemplate(CategoryAPI, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addElementTypesCategories = async (inputValues) => {
    console.log(inputValues)
    // const submission = {
    //     // Define your input values here
    // };
    return await addDataAdminTemplate(CategoryAPI, inputValues);
}

//update items
export const updateElementTypesCategories = async (id, newData) => {
    return await updateDataAdminTemplate(CategoryAPI, id, newData);
};

//passive items
export const deleteElementTypesCategories = async (selectedIds) => {
    return await deleteDataAdminTemplate(CategoryAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteElementTypesCategories = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(CategoryAPI, selectedIds);
};

//Restore deleted items
export const restoreElementTypesCategories = async (selectedIds) => {
    return await restoreDataAdminTemplate(CategoryAPI, selectedIds);
};