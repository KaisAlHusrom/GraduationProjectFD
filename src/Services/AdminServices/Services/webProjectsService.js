

// -------------------------------------- 
import { ADMIN_MAIN_INSTANCE_ROUTE, addDataAdminTemplate, createSubAdminAxiosInstance, deleteDataAdminTemplate, fetchDataAdminTemplate, permanentDeleteDataAdminTemplate, restoreDataAdminTemplate, updateDataAdminTemplate } from "../Controller";
const WepProjects = ADMIN_MAIN_INSTANCE_ROUTE + "/web-projects";

const WepProjectsAPI = createSubAdminAxiosInstance({
    baseURL: WepProjects,
});

//---------------------------------------
// fetch items 
export const fetchWebProject = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataAdminTemplate(WepProjectsAPI, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addWebProject = async (inputValues) => {

    return await addDataAdminTemplate(WepProjectsAPI, inputValues );
}

//update items
export const updateWebProject = async (id, newData) => {
    return await updateDataAdminTemplate(WepProjectsAPI, id, newData);
};

//passive items
export const deleteWebProject = async (selectedIds) => {
    return await deleteDataAdminTemplate(WepProjectsAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteWebProject = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(WepProjectsAPI, selectedIds);
};

//Restore deleted items
export const restoreWebProject = async (selectedIds) => {
    return await restoreDataAdminTemplate(WepProjectsAPI, selectedIds);
};