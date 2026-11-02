
// -------------------------------------- 
import { ADMIN_MAIN_INSTANCE_ROUTE, addDataAdminTemplate, createSubAdminAxiosInstance, deleteDataAdminTemplate, fetchDataAdminTemplate, permanentDeleteDataAdminTemplate, restoreDataAdminTemplate, updateDataAdminTemplate } from "../Controller";
const StyleResponsiveBreakpointsRoute = ADMIN_MAIN_INSTANCE_ROUTE + "/style-breakpoints";

const StyleResponsiveBreakpointsAPI = createSubAdminAxiosInstance({
    baseURL: StyleResponsiveBreakpointsRoute,
});

//---------------------------------------
// fetch items 
export const fetchStyleBreakpoints = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null) => {
    const res = await fetchDataAdminTemplate(StyleResponsiveBreakpointsAPI, type, pageNumber, filters, sorts, searchQuery);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addStyleBreakpoints = async (inputValues) => {

    return await addDataAdminTemplate(StyleResponsiveBreakpointsAPI, inputValues);
}

//update items
export const updateStyleBreakpoints = async (id, newData) => {
    return await updateDataAdminTemplate(StyleResponsiveBreakpointsAPI, id, newData);
};

//passive items
export const deleteStyleBreakpoints = async (selectedIds) => {
    return await deleteDataAdminTemplate(StyleResponsiveBreakpointsAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteStyleBreakpoints = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(StyleResponsiveBreakpointsAPI, selectedIds);
};

//Restore deleted items
export const restoreStyleBreakpoints = async (selectedIds) => {
    return await restoreDataAdminTemplate(StyleResponsiveBreakpointsAPI, selectedIds);
};