import axios from "axios";

// -------------------------------------- 
import config from "../../Config.json";
import { addDataTemplate, deleteTemplate, fetchDataTemplate, permanentDeleteTemplate, restoreTemplate, updateTemplate } from "./Controller";
const StylePropCategoryRoute = config.ServerMainRoute + "/style_props_categories";

const StylePropCategoryAPI = axios.create({
    baseURL: StylePropCategoryRoute,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});


//---------------------------------------
// fetch items 
export const fetchStylePropCategory = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage) => {
    const res = await fetchDataTemplate(StylePropCategoryAPI, type, pageNumber, filters, sorts, searchQuery, perPage);
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

    
    return await addDataTemplate(StylePropCategoryAPI, inputValues);
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