import axios from "axios";

// -------------------------------------- 
import config from "../../Config.json";
import { addDataTemplate, deleteTemplate, fetchDataTemplate, permanentDeleteTemplate, restoreTemplate, updateTemplate } from "./Controller";
const StyleStatusServiceRoute = config.ServerMainRoute + "/style_statuses/";

const StyleStatusesAPI = axios.create({
    baseURL: StyleStatusServiceRoute,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});


//---------------------------------------
// fetch items 
export const fetchStyleStatuses = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null) => {
    const res = await fetchDataTemplate(StyleStatusesAPI, type, pageNumber, filters, sorts, searchQuery);
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

    
    return await addDataTemplate(StyleStatusesAPI, inputValues);
}

//update items
export const updateStyleStatuses = async (id, newData) => {
    return await updateTemplate(StyleStatusesAPI, id, newData);
};

//passive items
export const deleteStyleStatuses = async (selectedIds) => {
    return await deleteTemplate(StyleStatusesAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteStyleStatuses = async (selectedIds) => {
    return await permanentDeleteTemplate(StyleStatusesAPI, selectedIds);
};

//Restore deleted items
export const restoreStyleStatuses = async (selectedIds) => {
    return await restoreTemplate(StyleStatusesAPI, selectedIds);
};