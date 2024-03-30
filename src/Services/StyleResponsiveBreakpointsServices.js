import axios from "axios";

// -------------------------------------- 
import config from "../../Config.json";
import { addDataTemplate, deleteTemplate, fetchDataTemplate, permanentDeleteTemplate, restoreTemplate, updateTemplate } from "./Controller";
const StyleResponsiveBreakpointsRoute = config.ServerMainRoute + "/style_breakpoints";

const StyleResponsiveBreakpointsAddAPI = axios.create({
    baseURL: StyleResponsiveBreakpointsRoute,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

const StyleResponsiveBreakpointsAPI = axios.create({
    baseURL: StyleResponsiveBreakpointsRoute,

});

//---------------------------------------
// fetch items 
export const fetchStyleBreakpoints = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null) => {
    const res = await fetchDataTemplate(StyleResponsiveBreakpointsAPI, type, pageNumber, filters, sorts, searchQuery);
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

    return await addDataTemplate(StyleResponsiveBreakpointsAddAPI, inputValues);
}

//update items
export const updateStyleBreakpoints = async (id, newData) => {
    return await updateTemplate(StyleResponsiveBreakpointsAPI, id, newData);
};

//passive items
export const deleteStyleBreakpoints = async (selectedIds) => {
    return await deleteTemplate(StyleResponsiveBreakpointsAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteStyleBreakpoints = async (selectedIds) => {
    return await permanentDeleteTemplate(StyleResponsiveBreakpointsAPI, selectedIds);
};

//Restore deleted items
export const restoreStyleBreakpoints = async (selectedIds) => {
    return await restoreTemplate(StyleResponsiveBreakpointsAPI, selectedIds);
};