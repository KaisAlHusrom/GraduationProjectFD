

// -------------------------------------- 
import { USERS_MAIN_INSTANCE_ROUTE, addDataUserTemplate, 
    checkIfRecordExistUserTemplate, 
    createSubUsersAxiosInstance, 
    deleteDataUserTemplate, 
    fetchDataUserTemplate, 
    fetchSpecificRecordUserTemplate, 
    permanentDeleteDataUserTemplate, 
    restoreDataUserTemplate, 
    updateDataUserTemplate 
} from "../Controller";

const DesignRouter = USERS_MAIN_INSTANCE_ROUTE + "/designs";

const DesignAPI = createSubUsersAxiosInstance({
    baseURL: DesignRouter,
});

//---------------------------------------
//fetch specific record from database
export const fetchSpecificUserDesign = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(DesignAPI, id);
    let row;

    if (res.success) {
        row = res.data;
    } else {
        row = null;
    }

    return row;
}

//check if design is exist in the database
export const checkSpecificUserDesign = async (id) => {
    const res = await checkIfRecordExistUserTemplate(DesignAPI, id);
    let check;

    if (res.success) {
        check = res.data;
    } else {
        check = false;
    }

    return check;
}

// fetch items 
export const fetchUserDesigns = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(DesignAPI, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addUserDesigns = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    console.log(submission)

    return await addDataUserTemplate(DesignAPI, submission);
}

//update items
export const updateUserDesigns = async (id, newData) => {
    return await updateDataUserTemplate(DesignAPI, id, newData);
};

//passive items
export const deleteUserDesigns = async (selectedIds) => {
    return await deleteDataUserTemplate(DesignAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserDesigns = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(DesignAPI, selectedIds);
};

//Restore deleted items
export const restoreUserDesigns = async (selectedIds) => {
    return await restoreDataUserTemplate(DesignAPI, selectedIds);
};