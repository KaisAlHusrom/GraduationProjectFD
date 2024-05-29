import axios from "axios";

// -------------------------------------- 
import config from "../../Config.json";
import { addDataTemplate, deleteTemplate, fetchDataTemplate, permanentDeleteTemplate, restoreTemplate, updateTemplate } from "./Controller";
const stylePropRoute = config.ServerMainRoute + "/style_props";

const StylePropAPI = axios.create({
    baseURL: stylePropRoute,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

// const StylePropAPI = axios.create({
//     baseURL: stylePropRoute,
// });


//---------------------------------------
// fetch items 
export const fetchStyleProps = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null , perPage) => {
    const res = await fetchDataTemplate(StylePropAPI, type, pageNumber, filters, sorts, searchQuery , perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addStyleProps = async (inputValues) => {
    const submission = { 
        ...inputValues, 
    };
    console.log(submission)

    return await addDataTemplate(StylePropAPI, submission);
}

//update items
export const updateStyleProps = async (id, newData) => {
    return await updateTemplate(StylePropAPI, id, newData);
};

//passive items
export const deleteStyleProps = async (selectedIds) => {
    return await deleteTemplate(StylePropAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteStyleProps = async (selectedIds) => {
    return await permanentDeleteTemplate(StylePropAPI, selectedIds);
};

//Restore deleted items
export const restoreStyleProps = async (selectedIds) => {
    return await restoreTemplate(StylePropAPI, selectedIds);
};