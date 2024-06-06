
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

const ElementTypesUsersRoute = USERS_MAIN_INSTANCE_ROUTE + "/element-types";

const ElementTypesUsersAxios = createSubUsersAxiosInstance({
    baseURL: ElementTypesUsersRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserElementTypes = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(ElementTypesUsersAxios, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserElementTypes = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(ElementTypesUsersAxios, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserElementTypes = async (id) => {
    const res = await checkIfRecordExistUserTemplate(ElementTypesUsersAxios, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserElementTypes = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(ElementTypesUsersAxios, submission);
}

//update items
export const updateUserElementTypes = async (id, newData) => {
    return await updateDataUserTemplate(ElementTypesUsersAxios, id, newData);
};

//passive items
export const deleteUserElementTypes = async (selectedIds) => {
    return await deleteDataUserTemplate(ElementTypesUsersAxios, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserElementTypes = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(ElementTypesUsersAxios, selectedIds);
};

//Restore deleted items
export const restoreUserElementTypes = async (selectedIds) => {
    return await restoreDataUserTemplate(ElementTypesUsersAxios, selectedIds);
};