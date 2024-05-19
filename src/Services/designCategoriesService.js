import axios from "axios";

// -------------------------------------- 
import config from "../../Config.json";
import { addDataTemplate, deleteTemplate, fetchDataTemplate, permanentDeleteTemplate, restoreTemplate, updateTemplate } from "./Controller";
const DesignCategoriesRoute = config.ServerMainRoute + "/design-categories";

const DesignCategoriesAPI = axios.create({
    baseURL: DesignCategoriesRoute,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

//---------------------------------------
// fetch items 
export const fetchDesignCategories = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataTemplate(DesignCategoriesAPI, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addDesignCategories = async (inputValues) => {
    const submission = {
        ...inputValues,
        // Define your input values here
    };
    return await addDataTemplate(DesignCategoriesAPI, submission);
}

//update items
export const updateDesignCategories = async (id, newData) => {
    return await updateTemplate(DesignCategoriesAPI, id, newData);
};

//passive items
export const deleteDesignCategories = async (selectedIds) => {
    return await deleteTemplate(DesignCategoriesAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteDesignCategories = async (selectedIds) => {
    return await permanentDeleteTemplate(DesignCategoriesAPI, selectedIds);
};

//Restore deleted items
export const restoreDesignCategories = async (selectedIds) => {
    return await restoreTemplate(DesignCategoriesAPI, selectedIds);
};