import axios from "axios";

// -------------------------------------- 
import config from "../../Config.json";
import { addDataAdminTemplate, deleteDataAdminTemplate, fetchDataAdminTemplate, permanentDeleteDataAdminTemplate, restoreDataAdminTemplate, updateDataAdminTemplate } from "./Controller";
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
    const res = await fetchDataAdminTemplate(API, type, pageNumber, filters, sorts, searchQuery, perPage);
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
    return await addDataAdminTemplate(API, submission);
}

//update items
export const updateTITLE = async (id, newData) => {
    return await updateDataAdminTemplate(API, id, newData);
};

//passive items
export const deleteTITLE = async (selectedIds) => {
    return await deleteDataAdminTemplate(API, selectedIds);
};

//permanent Delete items
export const permanentDeleteTITLE = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(API, selectedIds);
};

//Restore deleted items
export const restoreTITLE = async (selectedIds) => {
    return await restoreDataAdminTemplate(API, selectedIds);
};