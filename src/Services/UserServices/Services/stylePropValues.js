
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

const StylePropValuesUsersRoute = USERS_MAIN_INSTANCE_ROUTE + "/style-prop-values";

const StylePropValuesUsersAxios = createSubUsersAxiosInstance({
    baseURL: StylePropValuesUsersRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserStylePropValues = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(StylePropValuesUsersAxios, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserStylePropValues = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(StylePropValuesUsersAxios, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserStylePropValues = async (id) => {
    const res = await checkIfRecordExistUserTemplate(StylePropValuesUsersAxios, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserStylePropValues = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(StylePropValuesUsersAxios, submission);
}

//update items
export const updateUserStylePropValues = async (id, newData) => {
    return await updateDataUserTemplate(StylePropValuesUsersAxios, id, newData);
};

//passive items
export const deleteUserStylePropValues = async (selectedIds) => {
    return await deleteDataUserTemplate(StylePropValuesUsersAxios, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserStylePropValues = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(StylePropValuesUsersAxios, selectedIds);
};

//Restore deleted items
export const restoreUserStylePropValues = async (selectedIds) => {
    return await restoreDataUserTemplate(StylePropValuesUsersAxios, selectedIds);
};