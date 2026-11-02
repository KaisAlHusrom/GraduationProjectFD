

// -------------------------------------- 
import { ADMIN_MAIN_INSTANCE_ROUTE, addDataAdminTemplate, checkIfRecordExistAdminTemplate, createSubAdminAxiosInstance, deleteDataAdminTemplate, fetchDataAdminTemplate, fetchSpecificRecordAdminTemplate, permanentDeleteDataAdminTemplate, restoreDataAdminTemplate, updateDataAdminTemplate } from "../Controller";
const DesignRouter = ADMIN_MAIN_INSTANCE_ROUTE + "/designs";

const DesignAPI = createSubAdminAxiosInstance({
    baseURL: DesignRouter,
});

//---------------------------------------
//fetch specific record from database
export const fetchSpecificDesign = async (id) => {
    const res = await fetchSpecificRecordAdminTemplate(DesignAPI, id);
    let row;

    if (res.success) {
        row = res.data;
    } else {
        row = null;
    }

    return row;
}

//check if design is exist in the database
export const checkSpecificDesign = async (id) => {
    const res = await checkIfRecordExistAdminTemplate(DesignAPI, id);
    let check;

    if (res.success) {
        check = res.data;
    } else {
        check = false;
    }

    return check;
}

// fetch items 
export const fetchDesigns = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataAdminTemplate(DesignAPI, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addDesigns = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    console.log(submission)

    return await addDataAdminTemplate(DesignAPI, submission);
}

//update items
export const updateDesigns = async (id, newData) => {
    return await updateDataAdminTemplate(DesignAPI, id, newData);
};

//passive items
export const deleteDesigns = async (selectedIds) => {
    return await deleteDataAdminTemplate(DesignAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteDesigns = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(DesignAPI, selectedIds);
};

//Restore deleted items
export const restoreDesigns = async (selectedIds) => {
    return await restoreDataAdminTemplate(DesignAPI, selectedIds);
};