import axios from "axios";


// -------------------------------------- 
import config from "../../Config.json"
import { addDataTemplate, deleteTemplate, fetchDataTemplate, permanentDeleteTemplate, restoreTemplate, updateTemplate } from "./Controller";
const ELEMENTS_TYPES_ROUTE = config.ServerMainRoute + "/element_types"

const ElementTypesAPI = axios.create({
    baseURL: ELEMENTS_TYPES_ROUTE,
});

//---------------------------------------
// fetch items 
export const fetchElementTypesRows = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage) => {
    const res = await fetchDataTemplate(ElementTypesAPI, type, pageNumber, filters, sorts, searchQuery, perPage)
    let rows;

    if(res.success){
        rows = res.data;
    } else {
        rows = [];
    }

    return {rows}
}

//add items
export const addElementType = async (inputValues) => {
    // const submission = {...inputValues, 'parent_id': inputValues["parent"], 'parent': null}
    console.log(inputValues)
    return await addDataTemplate(ElementTypesAPI, inputValues)
}

//update items
export const updateElementType = async (id, newData) => {
    const submission = {
        ...newData, 
    }
    console.log(submission)
 
    return await updateTemplate(ElementTypesAPI, id, submission);
};

//passive items
export const deleteElementType = async (selectedIds) => {
    return await deleteTemplate(ElementTypesAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteElementType = async (selectedIds) => {
    return await permanentDeleteTemplate(ElementTypesAPI, selectedIds);
};

//Restore deleted items
export const restoreElementType = async (selectedIds) => {
    return await restoreTemplate(ElementTypesAPI, selectedIds);
};
