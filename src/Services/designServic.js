import axios from "axios";

// -------------------------------------- 
import config from "../../Config.json";
import { addDataTemplate, deleteTemplate, fetchDataTemplate, permanentDeleteTemplate, restoreTemplate, updateTemplate } from "./Controller";
const DesignAPI = config.ServerMainRoute + "/designs";

const DesignRoute = axios.create({
    baseURL: DesignAPI,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

//---------------------------------------
// fetch items 
export const fetchDesign = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null) => {
    const res = await fetchDataTemplate(DesignRoute, type, pageNumber, filters, sorts, searchQuery);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addDesign = async (inputValues) => {
    const submission = {
        ...inputValues,
        "is_child": inputValues["is_child"] === true ? 1 : 0,
        "is_template": inputValues["is_template"] === true ? 1 : 0,
        // Define your input values here
    };

    console.log(submission)
    return await addDataTemplate(DesignRoute, submission);
}

//update items
export const updateDesign = async (id, newData) => {
    return await updateTemplate(DesignRoute, id, newData);
};

//passive items
export const deleteDesign = async (selectedIds) => {
    return await deleteTemplate(DesignRoute, selectedIds);
};

//permanent Delete items
export const permanentDeleteDesign = async (selectedIds) => {
    return await permanentDeleteTemplate(DesignRoute, selectedIds);
};

//Restore deleted items
export const restoreDesign = async (selectedIds) => {
    return await restoreTemplate(DesignRoute, selectedIds);
};