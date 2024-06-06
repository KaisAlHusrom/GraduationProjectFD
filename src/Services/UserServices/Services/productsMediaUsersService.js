
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

const ProductsMediaRouteForUsers = USERS_MAIN_INSTANCE_ROUTE + "/products-media";
export const mediaFolderName = "ProductsMedia"
const ProductsMediaUsersAxios = createSubUsersAxiosInstance({
    baseURL: ProductsMediaRouteForUsers,
});

//---------------------------------------
// fetch items 
export const fetchUserProductsMedia = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(ProductsMediaUsersAxios, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserProductsMedia = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(ProductsMediaUsersAxios, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserProductsMedia = async (id) => {
    const res = await checkIfRecordExistUserTemplate(ProductsMediaUsersAxios, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserProductsMedia = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(ProductsMediaUsersAxios, submission);
}

//update items
export const updateUserProductsMedia = async (id, newData) => {
    return await updateDataUserTemplate(ProductsMediaUsersAxios, id, newData);
};

//passive items
export const deleteUserProductsMedia = async (selectedIds) => {
    return await deleteDataUserTemplate(ProductsMediaUsersAxios, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserProductsMedia = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(ProductsMediaUsersAxios, selectedIds);
};

//Restore deleted items
export const restoreUserProductsMedia = async (selectedIds) => {
    return await restoreDataUserTemplate(ProductsMediaUsersAxios, selectedIds);
};