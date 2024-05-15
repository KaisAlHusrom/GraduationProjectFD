import axios from "axios";

// -------------------------------------- 
import config from "../../Config.json";
import { addDataTemplate, deleteTemplate, fetchDataTemplate, permanentDeleteTemplate, restoreTemplate, updateTemplate } from "./Controller";
const ROUTE = config.ServerMainRoute + "/ENDPOINT";

const API = axios.create({
    baseURL: ROUTE,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

//---------------------------------------
// fetch items 
export const fetchTITLE = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
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
export const addTITLE = async (inputValues) => {
    const submission = {
        // Define your input values here
    };
    return await addDataTemplate(API, submission);
}

//update items
export const updateTITLE = async (id, newData) => {
    return await updateTemplate(API, id, newData);
};

//passive items
export const deleteTITLE = async (selectedIds) => {
    return await deleteTemplate(API, selectedIds);
};

//permanent Delete items
export const permanentDeleteTITLE = async (selectedIds) => {
    return await permanentDeleteTemplate(API, selectedIds);
};

//Restore deleted items
export const restoreTITLE = async (selectedIds) => {
    return await restoreTemplate(API, selectedIds);
};