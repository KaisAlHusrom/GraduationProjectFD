
// -------------------------------------- 
import { 
ADMIN_MAIN_INSTANCE_ROUTE,
createSubAdminAxiosInstance,
addDataAdminTemplate,
deleteDataAdminTemplate,
fetchDataAdminTemplate,
permanentDeleteDataAdminTemplate,
restoreDataAdminTemplate,
updateDataAdminTemplate,
} from "../Controller";

const ProductsCategoriesRoute = ADMIN_MAIN_INSTANCE_ROUTE + "/products-categories";

const ProductsCategoriesAPI = createSubAdminAxiosInstance({
    baseURL: ProductsCategoriesRoute,
});

//---------------------------------------
// fetch items 
export const fetchProductsCategories = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataAdminTemplate(ProductsCategoriesAPI, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addProductsCategories = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataAdminTemplate(ProductsCategoriesAPI, submission);
}

//update items
export const updateProductsCategories = async (id, newData) => {
    return await updateDataAdminTemplate(ProductsCategoriesAPI, id, newData);
};

//passive items
export const deleteProductsCategories = async (selectedIds) => {
    return await deleteDataAdminTemplate(ProductsCategoriesAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteProductsCategories = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(ProductsCategoriesAPI, selectedIds);
};

//Restore deleted items
export const restoreProductsCategories = async (selectedIds) => {
    return await restoreDataAdminTemplate(ProductsCategoriesAPI, selectedIds);
};