
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

const UsersUsersRoute = USERS_MAIN_INSTANCE_ROUTE + "/users";

const UsersUsersAxiosInstance = createSubUsersAxiosInstance({
    baseURL: UsersUsersRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserUsers = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(UsersUsersAxiosInstance, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserUsers = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(UsersUsersAxiosInstance, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserUsers = async (id) => {
    const res = await checkIfRecordExistUserTemplate(UsersUsersAxiosInstance, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserUsers = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(UsersUsersAxiosInstance, submission);
}

//update items
export const updateUserUsers = async (id, newData) => {
    return await updateDataUserTemplate(UsersUsersAxiosInstance, id, newData);
};

//passive items
export const deleteUserUsers = async (selectedIds) => {
    return await deleteDataUserTemplate(UsersUsersAxiosInstance, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserUsers = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(UsersUsersAxiosInstance, selectedIds);
};

//Restore deleted items
export const restoreUserUsers = async (selectedIds) => {
    return await restoreDataUserTemplate(UsersUsersAxiosInstance, selectedIds);
};