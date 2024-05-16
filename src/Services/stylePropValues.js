import axios from "axios";

// -------------------------------------- 
import config from "../../Config.json";
import { addDataTemplate, deleteTemplate, fetchDataTemplate, permanentDeleteTemplate, restoreTemplate, updateTemplate } from "./Controller";
const StylePropValuesRoute = config.ServerMainRoute + "/style_prop_values";

const StylePropValuesAPI = axios.create({
    baseURL: StylePropValuesRoute,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
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
    };

    console.log(submission);

    return await addDataTemplate(StylePropValuesAPI, submission);
}

//update items
export const updateStylePropValues = async (id, newData) => {
    console.log(newData)
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