
// Configure axios to include credentials (cookies) with each request
// axios.defaults.withCredentials = true;

// -------------------------------------- 
import { ADMIN_MAIN_INSTANCE_ROUTE, addDataAdminTemplate, createSubAdminAxiosInstance, deleteDataAdminTemplate, fetchDataAdminTemplate, permanentDeleteDataAdminTemplate, restoreDataAdminTemplate, updateDataAdminTemplate } from "../Controller";
const UsersServiceRoute = ADMIN_MAIN_INSTANCE_ROUTE + "/users";

export const usersProfileImagesFolderName = "UsersProfileImages"

const UserServiceAPI = createSubAdminAxiosInstance({
    baseURL: UsersServiceRoute,
});
//---------------------------------------
// fetch items 
export const fetchUsers = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataAdminTemplate(UserServiceAPI, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addUsers = async (inputValues) => {
    const submission = {
        ...inputValues
        // Define your input values here
    };
    return await addDataAdminTemplate(UserServiceAPI, submission);
}

//update items
export const updateUsers = async (id, newData) => {
    return await updateDataAdminTemplate(UserServiceAPI, id, newData);
};

//passive items
export const deleteUsers = async (selectedIds) => {
    return await deleteDataAdminTemplate(UserServiceAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteUsers = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(UserServiceAPI, selectedIds);
};

//Restore deleted items
export const restoreUsers = async (selectedIds) => {
    return await restoreDataAdminTemplate(UserServiceAPI, selectedIds);
};