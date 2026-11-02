
// -------------------------------------- 
import { 
USERS_MAIN_INSTANCE_ROUTE,
createSubUsersAxiosInstance,
addDataUserTemplate,
deleteDataUserTemplate,
fetchDataUserTemplate,
permanentDeleteDataUserTemplate,
restoreDataUserTemplate,
updateDataUserTemplate,
fetchSpecificRecordUserTemplate,
checkIfRecordExistUserTemplate,
} from "../Controller";

const DesignCategoriesUserRoute = USERS_MAIN_INSTANCE_ROUTE + "/design-categories";

const DesignCategoriesAxiosInstance = createSubUsersAxiosInstance({
    baseURL: DesignCategoriesUserRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserDesignCategories = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(DesignCategoriesAxiosInstance, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//---------------------------------------
//fetch specific record from database
export const fetchSpecificUserDesignCategories = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(DesignCategoriesAxiosInstance, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserDesignCategories = async (id) => {
    const res = await checkIfRecordExistUserTemplate(DesignCategoriesAxiosInstance, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserDesignCategories = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(DesignCategoriesAxiosInstance, submission);
}

//update items
export const updateUserDesignCategories = async (id, newData) => {
    return await updateDataUserTemplate(DesignCategoriesAxiosInstance, id, newData);
};

//passive items
export const deleteUserDesignCategories = async (selectedIds) => {
    return await deleteDataUserTemplate(DesignCategoriesAxiosInstance, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserDesignCategories = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(DesignCategoriesAxiosInstance, selectedIds);
};

//Restore deleted items
export const restoreUserDesignCategories = async (selectedIds) => {
    return await restoreDataUserTemplate(DesignCategoriesAxiosInstance, selectedIds);
};