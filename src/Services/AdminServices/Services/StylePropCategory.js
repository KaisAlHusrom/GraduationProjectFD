
// -------------------------------------- 
import { ADMIN_MAIN_INSTANCE_ROUTE, addDataAdminTemplate, createSubAdminAxiosInstance, deleteDataAdminTemplate, fetchDataAdminTemplate, permanentDeleteDataAdminTemplate, restoreDataAdminTemplate, updateDataAdminTemplate } from "../Controller";
const StylePropCategoryRoute = ADMIN_MAIN_INSTANCE_ROUTE + "/style-props-categories";

const StylePropCategoryAPI = createSubAdminAxiosInstance({
    baseURL: StylePropCategoryRoute,
});

//---------------------------------------
// fetch items 
export const fetchStylePropCategory = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage) => {
    const res = await fetchDataAdminTemplate(StylePropCategoryAPI, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addStylePropCategory = async (inputValues) => {

    
    return await addDataAdminTemplate(StylePropCategoryAPI, inputValues);
}

//update items
export const updateStylePropCategory = async (id, newData) => {
    return await updateDataAdminTemplate(StylePropCategoryAPI, id, newData);
};

//passive items
export const deleteStylePropCategory = async (selectedIds) => {
    return await deleteDataAdminTemplate(StylePropCategoryAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteStylePropCategory = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(StylePropCategoryAPI, selectedIds);
};

//Restore deleted items
export const restoreStylePropCategory = async (selectedIds) => {
    return await restoreDataAdminTemplate(StylePropCategoryAPI, selectedIds);
};