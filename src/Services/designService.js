import axios from "axios";

// -------------------------------------- 
import config from "../../Config.json";
import { addDataTemplate, deleteTemplate, fetchDataTemplate, permanentDeleteTemplate, restoreTemplate, updateTemplate } from "./Controller";
const DesignRouter = config.ServerMainRoute + "/designs";

const DesignAPI = axios.create({
    baseURL: DesignRouter,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

//---------------------------------------
// fetch items 
export const fetchDesigns = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataTemplate(DesignAPI, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addDesigns = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    console.log(submission)

    return await addDataTemplate(DesignAPI, submission);
}

//update items
export const updateDesigns = async (id, newData) => {
    return await updateTemplate(DesignAPI, id, newData);
};

//passive items
export const deleteDesigns = async (selectedIds) => {
    return await deleteTemplate(DesignAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteDesigns = async (selectedIds) => {
    return await permanentDeleteTemplate(DesignAPI, selectedIds);
};

//Restore deleted items
export const restoreDesigns = async (selectedIds) => {
    return await restoreTemplate(DesignAPI, selectedIds);
};