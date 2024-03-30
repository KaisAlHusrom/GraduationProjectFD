import axios from "axios";

// -------------------------------------- 
import config from "../../Config.json";
import { addDataTemplate, deleteTemplate, fetchDataTemplate, permanentDeleteTemplate, restoreTemplate, updateTemplate } from "./Controller";
const StylePropValues = config.ServerMainRoute + "/style_prop_values";

const StylePropValuesAddAPI = axios.create({
    baseURL: StylePropValues,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

const StylePropValuesAPI = axios.create({
    baseURL: StylePropValues,
});

//---------------------------------------
// fetch items 
export const fetchStylePropValues = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null) => {
    const res = await fetchDataTemplate(StylePropValuesAPI, type, pageNumber, filters, sorts, searchQuery);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addStylePropValues = async (inputValues) => {

    const submission = { 
        ...inputValues, 
        "style_prop_id": inputValues["style_prop"],
    };

    return await addDataTemplate(StylePropValuesAddAPI, submission);
}

//update items
export const updateStylePropValues = async (id, newData) => {
    return await updateTemplate(StylePropValuesAPI, id, newData);
};

//passive items
export const deleteStylePropValues = async (selectedIds) => {
    return await deleteTemplate(StylePropValuesAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteStylePropValues = async (selectedIds) => {
    return await permanentDeleteTemplate(StylePropValuesAPI, selectedIds);
};

//Restore deleted items
export const restoreStylePropValues = async (selectedIds) => {
    return await restoreTemplate(StylePropValuesAPI, selectedIds);
};