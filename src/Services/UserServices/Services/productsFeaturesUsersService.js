
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

const productsFeaturesUserService = USERS_MAIN_INSTANCE_ROUTE + "/products-features";

const productsFeaturesUsersAxios = createSubUsersAxiosInstance({
    baseURL: productsFeaturesUserService,
});

//---------------------------------------
// fetch items 
export const fetchUserProductsFeatures = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(productsFeaturesUsersAxios, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserProductsFeatures = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(productsFeaturesUsersAxios, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserProductsFeatures = async (id) => {
    const res = await checkIfRecordExistUserTemplate(productsFeaturesUsersAxios, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserProductsFeatures = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(productsFeaturesUsersAxios, submission);
}

//update items
export const updateUserProductsFeatures = async (id, newData) => {
    return await updateDataUserTemplate(productsFeaturesUsersAxios, id, newData);
};

//passive items
export const deleteUserProductsFeatures = async (selectedIds) => {
    return await deleteDataUserTemplate(productsFeaturesUsersAxios, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserProductsFeatures = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(productsFeaturesUsersAxios, selectedIds);
};

//Restore deleted items
export const restoreUserProductsFeatures = async (selectedIds) => {
    return await restoreDataUserTemplate(productsFeaturesUsersAxios, selectedIds);
};