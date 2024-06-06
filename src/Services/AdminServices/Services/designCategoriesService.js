// -------------------------------------- 
import { ADMIN_MAIN_INSTANCE_ROUTE, addDataAdminTemplate, createSubAdminAxiosInstance, deleteDataAdminTemplate, fetchDataAdminTemplate, permanentDeleteDataAdminTemplate, restoreDataAdminTemplate, updateDataAdminTemplate } from "../Controller";
const DesignCategoriesRoute = ADMIN_MAIN_INSTANCE_ROUTE+ "/design-categories";

const DesignCategoriesAPI = createSubAdminAxiosInstance({
    baseURL: DesignCategoriesRoute,
});

//---------------------------------------
// fetch items 
export const fetchDesignCategories = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=10) => {
    const res = await fetchDataAdminTemplate(DesignCategoriesAPI, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addDesignCategories = async (inputValues) => {
    const submission = {
        ...inputValues,
        // Define your input values here
    };
    return await addDataAdminTemplate(DesignCategoriesAPI, submission);
}

//update items
export const updateDesignCategories = async (id, newData) => {
    return await updateDataAdminTemplate(DesignCategoriesAPI, id, newData);
};

//passive items
export const deleteDesignCategories = async (selectedIds) => {
    return await deleteDataAdminTemplate(DesignCategoriesAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteDesignCategories = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(DesignCategoriesAPI, selectedIds);
};

//Restore deleted items
export const restoreDesignCategories = async (selectedIds) => {
    return await restoreDataAdminTemplate(DesignCategoriesAPI, selectedIds);
};