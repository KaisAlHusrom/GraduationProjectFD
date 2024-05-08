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
export const fetchStyleProps = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null) => {
    const res = await fetchDataTemplate(StylePropAPI, type, pageNumber, filters, sorts, searchQuery);
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
        "category_id": inputValues["category"] ,
        "is_section": inputValues["is_section"] === true ? 1 : 0,
        "is_component": inputValues["is_component"] === true ? 1: 0,
        "is_element": inputValues["is_element"] === true ? 1 : 0,
        "parent_id": inputValues["parent"],
        "is_child": inputValues["is_child"] === true ? 1 : 0,
    };


    return await addDataTemplate(StylePropAPI, submission);
}

//update items
export const updateStyleProps = async (id, newData) => {
    const submission = { 
        ...newData, 
        "is_section": newData["is_section"] === true ? 1 : 0,
        "is_component": newData["is_component"] === true ? 1: 0,
        "is_element": newData["is_element"] === true ? 1 : 0,
        "is_child": newData["is_child"] === true ? 1 : 0,
        "parent_id": newData["parent"] && newData["parent"]["id"] ? newData["parent"]["id"] : "null",
        "category_id": newData["category"]['id'] ? newData["category"]['id'] : "null",
    };
    // console.log(submission)

    return await updateTemplate(StylePropAPI, id, submission);
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