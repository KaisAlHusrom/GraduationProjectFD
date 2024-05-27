import axios from "axios";

// -------------------------------------- 
import config from "../../Config.json";
import { addDataTemplate, deleteTemplate, fetchDataTemplate, fetchSpecificRecordTemplate, permanentDeleteTemplate, restoreTemplate, updateTemplate } from "./Controller";
const WepProjects = config.ServerMainRoute + "/web-projects";

const WepProjectsAPI = axios.create({
    baseURL: WepProjects,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

//---------------------------------------
// fetch items 
export const fetchWebProject = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataTemplate(WepProjectsAPI, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}


export const fetchSpecificWebProject = async (id) => {
    const res = await fetchSpecificRecordTemplate(WepProjectsAPI, id);
    let row;

    if (res.success) {
        row = res.data;
    } else {
        row = null;
    }

    return row;
}


//add items
export const addWebProject = async (inputValues) => {
    const submision = {
        // Define your input values here
    };
    return await addDataTemplate(WepProjectsAPI, inputValues );
}

//update items
export const updateWebProject = async (id, newData) => {
    return await updateTemplate(WepProjectsAPI, id, newData);
};

//passive items
export const deleteWebProject = async (selectedIds) => {
    return await deleteTemplate(WepProjectsAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteWebProject = async (selectedIds) => {
    return await permanentDeleteTemplate(WepProjectsAPI, selectedIds);
};

//Restore deleted items
export const restoreWebProject = async (selectedIds) => {
    return await restoreTemplate(WepProjectsAPI, selectedIds);
};