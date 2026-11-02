

// -------------------------------------- 

import { ADMIN_MAIN_INSTANCE_ROUTE, addDataAdminTemplate, createSubAdminAxiosInstance, deleteDataAdminTemplate, fetchDataAdminTemplate, permanentDeleteDataAdminTemplate, restoreDataAdminTemplate, updateDataAdminTemplate } from "../Controller";
const StylePropValuesRoute = ADMIN_MAIN_INSTANCE_ROUTE + "/style-prop-values";

const StylePropValuesAPI = createSubAdminAxiosInstance({
    baseURL: StylePropValuesRoute,
});


//---------------------------------------
// fetch items 
export const fetchStylePropValues = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null) => {
    const res = await fetchDataAdminTemplate(StylePropValuesAPI, type, pageNumber, filters, sorts, searchQuery);
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

    return await addDataAdminTemplate(StylePropValuesAPI, submission);
}

//update items
export const updateStylePropValues = async (id, newData) => {
    console.log(newData)
    return await updateDataAdminTemplate(StylePropValuesAPI, id, newData);
};

//passive items
export const deleteStylePropValues = async (selectedIds) => {
    return await deleteDataAdminTemplate(StylePropValuesAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteStylePropValues = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(StylePropValuesAPI, selectedIds);
};

//Restore deleted items
export const restoreStylePropValues = async (selectedIds) => {
    return await restoreDataAdminTemplate(StylePropValuesAPI, selectedIds);
};