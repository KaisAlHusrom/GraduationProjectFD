import axios from "axios";

// -------------------------------------- 
import config from "../../Config.json";
import { addDataTemplate, checkIfRecordExistTemplate, deleteTemplate, fetchDataTemplate, fetchSpecificRecordTemplate, permanentDeleteTemplate, restoreTemplate, updateTemplate } from "./Controller";
const DesignRouter = config.ServerMainRoute + "/designs";

const DesignAPI = axios.create({
    baseURL: DesignRouter,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

//---------------------------------------
//fetch specific record from database
export const fetchSpecificDesign = async (id) => {
    const res = await fetchSpecificRecordTemplate(DesignAPI, id);
    let row;

    if (res.success) {
        row = res.data;
    } else {
        row = null;
    }

    return row;
}

//check if design is exist in the database
export const checkSpecificDesign = async (id) => {
    const res = await checkIfRecordExistTemplate(DesignAPI, id);
    let check;

    if (res.success) {
        check = res.data;
    } else {
        check = false;
    }

    return check;
}

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