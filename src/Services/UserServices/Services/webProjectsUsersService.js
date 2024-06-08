
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

const WebProjectsUserRoute = USERS_MAIN_INSTANCE_ROUTE + "/web-projects";

const WebProjectsUserAxiosInstance = createSubUsersAxiosInstance({
    baseURL: WebProjectsUserRoute,
});

export const logoFolderName = "web_project_Logos"

//---------------------------------------
// fetch items 
export const fetchUserWebProject = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(WebProjectsUserAxiosInstance, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserWebProject = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(WebProjectsUserAxiosInstance, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserWebProject = async (id) => {
    const res = await checkIfRecordExistUserTemplate(WebProjectsUserAxiosInstance, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserWebProject = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(WebProjectsUserAxiosInstance, submission);
}

//update items
export const updateUserWebProject = async (id, newData) => {
    return await updateDataUserTemplate(WebProjectsUserAxiosInstance, id, newData);
};

//passive items
export const deleteUserWebProject = async (selectedIds) => {
    return await deleteDataUserTemplate(WebProjectsUserAxiosInstance, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserWebProject = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(WebProjectsUserAxiosInstance, selectedIds);
};

//Restore deleted items
export const restoreUserWebProject = async (selectedIds) => {
    return await restoreDataUserTemplate(WebProjectsUserAxiosInstance, selectedIds);
};