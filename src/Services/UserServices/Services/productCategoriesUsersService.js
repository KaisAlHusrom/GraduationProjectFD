
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

const ProductsCategoriesRoute = USERS_MAIN_INSTANCE_ROUTE + "/products-categories";

const ProductsCategoriesUsersAxios = createSubUsersAxiosInstance({
    baseURL: ProductsCategoriesRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserProductsCategories = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(ProductsCategoriesUsersAxios, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserProductsCategories = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(ProductsCategoriesUsersAxios, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserProductsCategories = async (id) => {
    const res = await checkIfRecordExistUserTemplate(ProductsCategoriesUsersAxios, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserProductsCategories = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(ProductsCategoriesUsersAxios, submission);
}

//update items
export const updateUserProductsCategories = async (id, newData) => {
    return await updateDataUserTemplate(ProductsCategoriesUsersAxios, id, newData);
};

//passive items
export const deleteUserProductsCategories = async (selectedIds) => {
    return await deleteDataUserTemplate(ProductsCategoriesUsersAxios, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserProductsCategories = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(ProductsCategoriesUsersAxios, selectedIds);
};

//Restore deleted items
export const restoreUserProductsCategories = async (selectedIds) => {
    return await restoreDataUserTemplate(ProductsCategoriesUsersAxios, selectedIds);
};