

// -------------------------------------- 
import { ADMIN_MAIN_INSTANCE_ROUTE, addDataAdminTemplate, createSubAdminAxiosInstance, deleteDataAdminTemplate, fetchDataAdminTemplate, permanentDeleteDataAdminTemplate, restoreDataAdminTemplate, updateDataAdminTemplate } from "../Controller";
const StyleStatusServiceRoute = ADMIN_MAIN_INSTANCE_ROUTE + "/style-statuses";

const StyleStatusesAPI = createSubAdminAxiosInstance({
    baseURL: StyleStatusServiceRoute,
});
//---------------------------------------
// fetch items 
export const fetchStyleStatuses = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataAdminTemplate(StyleStatusesAPI, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addStyleStatuses = async (inputValues) => {

    
    return await addDataAdminTemplate(StyleStatusesAPI, inputValues);
}

//update items
export const updateStyleStatuses = async (id, newData) => {
    return await updateDataAdminTemplate(StyleStatusesAPI, id, newData);
};

//passive items
export const deleteStyleStatuses = async (selectedIds) => {
    return await deleteDataAdminTemplate(StyleStatusesAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteStyleStatuses = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(StyleStatusesAPI, selectedIds);
};

//Restore deleted items
export const restoreStyleStatuses = async (selectedIds) => {
    return await restoreDataAdminTemplate(StyleStatusesAPI, selectedIds);
};