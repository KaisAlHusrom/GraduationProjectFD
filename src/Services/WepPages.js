import axios from "axios";

// -------------------------------------- 
import config from "../../Config.json";
import { addDataTemplate, deleteTemplate, fetchDataTemplate, permanentDeleteTemplate, restoreTemplate, updateTemplate } from "./Controller";
const WepPages = config.ServerMainRoute + "/web-pages";

const API = axios.create({
    baseURL: WepPages,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

//---------------------------------------
// fetch items 
export const fetchWepPages = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
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
export const addWepPages = async (inputValues) => {
    const submission = {
        // Define your input values here
    };
    return await addDataTemplate(API, inputValues);
}

//update items
export const updateWepPages = async (id, newData) => {
    return await updateTemplate(API, id, newData);
};

//passive items
export const deleteWepPages = async (selectedIds) => {
    return await deleteTemplate(API, selectedIds);
};

//permanent Delete items
export const permanentDeleteWepPages = async (selectedIds) => {
    return await permanentDeleteTemplate(API, selectedIds);
};

//Restore deleted items
export const restoreWepPages = async (selectedIds) => {
    return await restoreTemplate(API, selectedIds);
};