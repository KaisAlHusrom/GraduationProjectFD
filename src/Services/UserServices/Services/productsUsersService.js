
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
import { fetchRatesAverages } from "./productReviewUsersSevice";

const ProductsUsersRoute = USERS_MAIN_INSTANCE_ROUTE + "/products";
export const productsImagesFolderName = "ProductsImages"
export const productsFilesFolderName = "ProductsFiles"
const ProductsUsersAxios = createSubUsersAxiosInstance({
    baseURL: ProductsUsersRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserProducts = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(ProductsUsersAxios, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserProducts = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(ProductsUsersAxios, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}

export const fetchSpecificProductLoader = async ({params}) => {
    const {idx} = params
    const row = await fetchSpecificUserProducts(idx);

    // const avgs = await fetchRatesAverages(idx);

    return {product: row};
}
//check if record is exist in the database
export const checkSpecificUserProducts = async (id) => {
    const res = await checkIfRecordExistUserTemplate(ProductsUsersAxios, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserProducts = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(ProductsUsersAxios, submission);
}

//update items
export const updateUserProducts = async (id, newData) => {
    return await updateDataUserTemplate(ProductsUsersAxios, id, newData);
};

//passive items
export const deleteUserProducts = async (selectedIds) => {
    return await deleteDataUserTemplate(ProductsUsersAxios, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserProducts = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(ProductsUsersAxios, selectedIds);
};

//Restore deleted items
export const restoreUserProducts = async (selectedIds) => {
    return await restoreDataUserTemplate(ProductsUsersAxios, selectedIds);
};