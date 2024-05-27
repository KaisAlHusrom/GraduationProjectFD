import axios from "axios";

// -------------------------------------- 
import config from "../../Config.json";
import { addDataTemplate, deleteTemplate, fetchDataTemplate, permanentDeleteTemplate, restoreTemplate, updateTemplate } from "./Controller";
const WepProjectPages = config.ServerMainRoute + "/web-project-pages";

const API = axios.create({
    baseURL: WepProjectPages,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

//---------------------------------------
// fetch items 
export const fetchWepProjectPages = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataTemplate(API, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addWepProjectPages = async (inputValues) => {
    const submission = {
        // Define your input values here
    };
    return await addDataTemplate(API, inputValues);
}

//update items
export const updateWepProjectPages = async (id, newData) => {
    return await updateTemplate(API, id, newData);
};

//passive items
export const deleteWepProjectPages = async (selectedIds) => {
    return await deleteTemplate(API, selectedIds);
};

//permanent Delete items
export const permanentDeleteWepProjectPages = async (selectedIds) => {
    return await permanentDeleteTemplate(API, selectedIds);
};

//Restore deleted items
export const restoreWepProjectPages = async (selectedIds) => {
    return await restoreTemplate(API, selectedIds);
};