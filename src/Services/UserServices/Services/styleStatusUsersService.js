
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

const StyleStatusesUsersRoute = USERS_MAIN_INSTANCE_ROUTE + "/style-statuses";

const StyleStatusesUsersAxios = createSubUsersAxiosInstance({
    baseURL: StyleStatusesUsersRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserStyleStatuses = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(StyleStatusesUsersAxios, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserStyleStatuses = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(StyleStatusesUsersAxios, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserStyleStatuses = async (id) => {
    const res = await checkIfRecordExistUserTemplate(StyleStatusesUsersAxios, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserStyleStatuses = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(StyleStatusesUsersAxios, submission);
}

//update items
export const updateUserStyleStatuses = async (id, newData) => {
    return await updateDataUserTemplate(StyleStatusesUsersAxios, id, newData);
};

//passive items
export const deleteUserStyleStatuses = async (selectedIds) => {
    return await deleteDataUserTemplate(StyleStatusesUsersAxios, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserStyleStatuses = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(StyleStatusesUsersAxios, selectedIds);
};

//Restore deleted items
export const restoreUserStyleStatuses = async (selectedIds) => {
    return await restoreDataUserTemplate(StyleStatusesUsersAxios, selectedIds);
};