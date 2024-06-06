
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

const ProductsMediaAPI = ADMIN_MAIN_INSTANCE_ROUTE + "/products-media";

const ProductsMediaAxiosInstance = createSubAdminAxiosInstance({
    baseURL: ProductsMediaAPI,
});

export const productsMediaImagesFolderName = "ProductsMedia"
//---------------------------------------
// fetch items 
export const fetchProductsMedia = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataAdminTemplate(ProductsMediaAxiosInstance, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addProductsMedia = async (inputValues) => {
    const submission = {
        ...inputValues
    };

    return await addDataAdminTemplate(ProductsMediaAxiosInstance, submission);
}

//update items
export const updateProductsMedia = async (id, newData) => {
    return await updateDataAdminTemplate(ProductsMediaAxiosInstance, id, newData);
};

//passive items
export const deleteProductsMedia = async (selectedIds) => {
    return await deleteDataAdminTemplate(ProductsMediaAxiosInstance, selectedIds);
};

//permanent Delete items
export const permanentDeleteProductsMedia = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(ProductsMediaAxiosInstance, selectedIds);
};

//Restore deleted items
export const restoreProductsMedia = async (selectedIds) => {
    return await restoreDataAdminTemplate(ProductsMediaAxiosInstance, selectedIds);
};