

//Redux 


// -------------------------------------- 
import config from "../../Config.json"
import axios from "axios";
import { addDataTemplate, deleteTemplate, fetchDataTemplate, permanentDeleteTemplate, restoreTemplate, updateTemplate } from "./Controller";
const ELEMENTS_PROPS_ROUTE = config.ServerMainRoute + "/element_props"

const ElementPropsAPI = axios.create({
    baseURL: ELEMENTS_PROPS_ROUTE,
  });

export const fetchElementProps = async (type = 'all', pageNumber = 1, filters = [], sorts = [], searchQuery = null) => {
    const res = await fetchDataTemplate(ElementPropsAPI, type, pageNumber, filters, sorts, searchQuery)
    let rows;
    
    if(res.success){
        rows = res.data;
    } else {
        rows = [];
    }
    
    return {rows}
}

export const addElementProp = async (inputValues) => {

    
    return await addDataTemplate(ElementPropsAPI, inputValues)


}

export const updateElementProp = async (id, newData) => {
    return await updateTemplate(ElementPropsAPI, id, newData);
};

export const deleteElementProp = async (selectedIds) => {
    return await deleteTemplate(ElementPropsAPI, selectedIds);
};

export const permanentDeleteElementProp = async (selectedIds) => {
    return await permanentDeleteTemplate(ElementPropsAPI, selectedIds);
};

//Restore deleted items
export const restoreElementProp = async (selectedIds) => {
    return await restoreTemplate(ElementPropsAPI, selectedIds);
};