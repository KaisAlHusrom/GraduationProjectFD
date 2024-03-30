import axios from "axios";

// -------------------------------------- 
import config from "../../Config.json";
import { addDataTemplate, deleteTemplate, fetchDataTemplate, permanentDeleteTemplate, restoreTemplate, updateTemplate } from "./Controller";
const StylePropCategoryRoute = config.ServerMainRoute + "/style_props_categories";

const StylePropCategoryAPI = axios.create({
    baseURL: StylePropCategoryRoute,
});

//---------------------------------------
// fetch items 
export const fetchStylePropCategory = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null) => {
    const res = await fetchDataTemplate(StylePropCategoryAPI, type, pageNumber, filters, sorts, searchQuery);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addStylePropCategory = async (inputValues) => {
    const submission = {
        "category_name": inputValues["category_name"],
        "category_description": inputValues["category_description"], 
    };
    
    return await addDataTemplate(StylePropCategoryAPI, submission);
}

//update items
export const updateStylePropCategory = async (id, newData) => {
    return await updateTemplate(StylePropCategoryAPI, id, newData);
};

//passive items
export const deleteStylePropCategory = async (selectedIds) => {
    return await deleteTemplate(StylePropCategoryAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteStylePropCategory = async (selectedIds) => {
    return await permanentDeleteTemplate(StylePropCategoryAPI, selectedIds);
};

//Restore deleted items
export const restoreStylePropCategory = async (selectedIds) => {
    return await restoreTemplate(StylePropCategoryAPI, selectedIds);
};