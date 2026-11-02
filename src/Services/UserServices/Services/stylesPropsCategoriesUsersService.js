
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

const StylesPropsCategoriesUsersRoute = USERS_MAIN_INSTANCE_ROUTE + "/style-props-categories";

const StylesPropsCategoriesAxios = createSubUsersAxiosInstance({
    baseURL: StylesPropsCategoriesUsersRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserStylePropCategories = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(StylesPropsCategoriesAxios, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserStylePropCategories = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(StylesPropsCategoriesAxios, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserStylePropCategories = async (id) => {
    const res = await checkIfRecordExistUserTemplate(StylesPropsCategoriesAxios, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserStylePropCategories = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(StylesPropsCategoriesAxios, submission);
}

//update items
export const updateUserStylePropCategories = async (id, newData) => {
    return await updateDataUserTemplate(StylesPropsCategoriesAxios, id, newData);
};

//passive items
export const deleteUserStylePropCategories = async (selectedIds) => {
    return await deleteDataUserTemplate(StylesPropsCategoriesAxios, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserStylePropCategories = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(StylesPropsCategoriesAxios, selectedIds);
};

//Restore deleted items
export const restoreUserStylePropCategories = async (selectedIds) => {
    return await restoreDataUserTemplate(StylesPropsCategoriesAxios, selectedIds);
};