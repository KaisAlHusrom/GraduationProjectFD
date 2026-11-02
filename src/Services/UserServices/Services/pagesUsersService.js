
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

const PagesRoute = USERS_MAIN_INSTANCE_ROUTE + "/pages";

const PagesUserAxiosInstance = createSubUsersAxiosInstance({
    baseURL: PagesRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserPages = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(PagesUserAxiosInstance, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserPages = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(PagesUserAxiosInstance, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserPages = async (id) => {
    const res = await checkIfRecordExistUserTemplate(PagesUserAxiosInstance, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserPages = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(PagesUserAxiosInstance, submission);
}

//update items
export const updateUserPages = async (id, newData) => {
    return await updateDataUserTemplate(PagesUserAxiosInstance, id, newData);
};






//passive items
export const deleteUserPages = async (selectedIds) => {
    return await deleteDataUserTemplate(PagesUserAxiosInstance, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserPages = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(PagesUserAxiosInstance, selectedIds);
};

//Restore deleted items
export const restoreUserPages = async (selectedIds) => {
    return await restoreDataUserTemplate(PagesUserAxiosInstance, selectedIds);
};