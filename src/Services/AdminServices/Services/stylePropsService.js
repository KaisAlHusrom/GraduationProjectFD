

// -------------------------------------- 

import { ADMIN_MAIN_INSTANCE_ROUTE, addDataAdminTemplate, createSubAdminAxiosInstance, deleteDataAdminTemplate, fetchDataAdminTemplate, permanentDeleteDataAdminTemplate, restoreDataAdminTemplate, updateDataAdminTemplate } from "../Controller";
const stylePropRoute = ADMIN_MAIN_INSTANCE_ROUTE+ "/style-props";

const StylePropAPI = createSubAdminAxiosInstance({
    baseURL: stylePropRoute,
});

// const StylePropAPI = axios.create({
//     baseURL: stylePropRoute,
// });


//---------------------------------------
// fetch items 
export const fetchStyleProps = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null) => {
    const res = await fetchDataAdminTemplate(StylePropAPI, type, pageNumber, filters, sorts, searchQuery);
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

    return await addDataAdminTemplate(StylePropAPI, submission);
}

//update items
export const updateStyleProps = async (id, newData) => {
    return await updateDataAdminTemplate(StylePropAPI, id, newData);
};

//passive items
export const deleteStyleProps = async (selectedIds) => {
    return await deleteDataAdminTemplate(StylePropAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteStyleProps = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(StylePropAPI, selectedIds);
};

//Restore deleted items
export const restoreStyleProps = async (selectedIds) => {
    return await restoreDataAdminTemplate(StylePropAPI, selectedIds);
};