
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

const ElementTypesCategoriesUsersRoute = USERS_MAIN_INSTANCE_ROUTE + "/element-types-categories";

const ElementTypesCategoriesAxiosInstance = createSubUsersAxiosInstance({
    baseURL: ElementTypesCategoriesUsersRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserElementTypesCategories = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(ElementTypesCategoriesAxiosInstance, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserElementTypesCategories = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(ElementTypesCategoriesAxiosInstance, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserElementTypesCategories = async (id) => {
    const res = await checkIfRecordExistUserTemplate(ElementTypesCategoriesAxiosInstance, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserElementTypesCategories = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(ElementTypesCategoriesAxiosInstance, submission);
}

//update items
export const updateUserElementTypesCategories = async (id, newData) => {
    return await updateDataUserTemplate(ElementTypesCategoriesAxiosInstance, id, newData);
};

//passive items
export const deleteUserElementTypesCategories = async (selectedIds) => {
    return await deleteDataUserTemplate(ElementTypesCategoriesAxiosInstance, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserElementTypesCategories = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(ElementTypesCategoriesAxiosInstance, selectedIds);
};

//Restore deleted items
export const restoreUserElementTypesCategories = async (selectedIds) => {
    return await restoreDataUserTemplate(ElementTypesCategoriesAxiosInstance, selectedIds);
};