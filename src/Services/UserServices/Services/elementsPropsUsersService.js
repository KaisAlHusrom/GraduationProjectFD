
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

const ElementPropsUserRoute = USERS_MAIN_INSTANCE_ROUTE + "/element-props";

const ElementPropsUserAxios = createSubUsersAxiosInstance({
    baseURL: ElementPropsUserRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserElementProps = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(ElementPropsUserAxios, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserElementProps = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(ElementPropsUserAxios, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserElementProps = async (id) => {
    const res = await checkIfRecordExistUserTemplate(ElementPropsUserAxios, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserElementProps = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(ElementPropsUserAxios, submission);
}

//update items
export const updateUserElementProps = async (id, newData) => {
    return await updateDataUserTemplate(ElementPropsUserAxios, id, newData);
};

//passive items
export const deleteUserElementProps = async (selectedIds) => {
    return await deleteDataUserTemplate(ElementPropsUserAxios, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserElementProps = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(ElementPropsUserAxios, selectedIds);
};

//Restore deleted items
export const restoreUserElementProps = async (selectedIds) => {
    return await restoreDataUserTemplate(ElementPropsUserAxios, selectedIds);
};