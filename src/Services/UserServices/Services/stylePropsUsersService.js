
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

const StylePropsUsersRoute = USERS_MAIN_INSTANCE_ROUTE + "/style-props";

const StylePropsUsersAxios = createSubUsersAxiosInstance({
    baseURL: StylePropsUsersRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserStyleProps = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(StylePropsUsersAxios, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserStyleProps = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(StylePropsUsersAxios, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserStyleProps = async (id) => {
    const res = await checkIfRecordExistUserTemplate(StylePropsUsersAxios, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserStyleProps = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(StylePropsUsersAxios, submission);
}

//update items
export const updateUserStyleProps = async (id, newData) => {
    return await updateDataUserTemplate(StylePropsUsersAxios, id, newData);
};

//passive items
export const deleteUserStyleProps = async (selectedIds) => {
    return await deleteDataUserTemplate(StylePropsUsersAxios, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserStyleProps = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(StylePropsUsersAxios, selectedIds);
};

//Restore deleted items
export const restoreUserStyleProps = async (selectedIds) => {
    return await restoreDataUserTemplate(StylePropsUsersAxios, selectedIds);
};