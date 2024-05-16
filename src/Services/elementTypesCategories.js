import axios from "axios";

// -------------------------------------- 
import config from "../../Config.json";
import { addDataTemplate, deleteTemplate, fetchDataTemplate, permanentDeleteTemplate, restoreTemplate, updateTemplate } from "./Controller";
const CategoryRoute = config.ServerMainRoute + "/element_types_categories";

const CategoryAPI = axios.create({
    baseURL: CategoryRoute,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

//---------------------------------------
// fetch items 
export const fetchElementTypesCategories = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataTemplate(CategoryAPI, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addElementTypesCategories = async (inputValues) => {
    console.log(inputValues)
    // const submission = {
    //     // Define your input values here
    // };
    return await addDataTemplate(CategoryAPI, inputValues);
}

//update items
export const updateElementTypesCategories = async (id, newData) => {
    return await updateTemplate(CategoryAPI, id, newData);
};

//passive items
export const deleteElementTypesCategories = async (selectedIds) => {
    return await deleteTemplate(CategoryAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteElementTypesCategories = async (selectedIds) => {
    return await permanentDeleteTemplate(CategoryAPI, selectedIds);
};

//Restore deleted items
export const restoreElementTypesCategories = async (selectedIds) => {
    return await restoreTemplate(CategoryAPI, selectedIds);
};