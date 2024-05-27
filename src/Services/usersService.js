import axios from "axios";

// Configure axios to include credentials (cookies) with each request
// axios.defaults.withCredentials = true;

// -------------------------------------- 
import config from "../../Config.json";
import { addDataTemplate, deleteTemplate, fetchDataTemplate, permanentDeleteTemplate, restoreTemplate, updateTemplate } from "./Controller";
const UsersServiceRoute = config.ServerMainRoute + "/users";

const UserServiceAPI = axios.create({
    baseURL: UsersServiceRoute,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

//---------------------------------------
// fetch items 
export const fetchUsers = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataTemplate(UserServiceAPI, type, pageNumber, filters, sorts, searchQuery, perPage);
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
    return await addDataTemplate(UserServiceAPI, submission);
}

//update items
export const updateUsers = async (id, newData) => {
    return await updateTemplate(UserServiceAPI, id, newData);
};

//passive items
export const deleteUsers = async (selectedIds) => {
    return await deleteTemplate(UserServiceAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteUsers = async (selectedIds) => {
    return await permanentDeleteTemplate(UserServiceAPI, selectedIds);
};

//Restore deleted items
export const restoreUsers = async (selectedIds) => {
    return await restoreTemplate(UserServiceAPI, selectedIds);
};