
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

const ProductsFeaturesRoute = ADMIN_MAIN_INSTANCE_ROUTE + "/products-features";

const ProductFeaturesAxiosInstance = createSubAdminAxiosInstance({
    baseURL: ProductsFeaturesRoute,
});

//---------------------------------------
// fetch items 
export const fetchProductsFeatures = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataAdminTemplate(ProductFeaturesAxiosInstance, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addProductsFeatures = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataAdminTemplate(ProductFeaturesAxiosInstance, submission);
}

//update items
export const updateProductsFeatures = async (id, newData) => {
    return await updateDataAdminTemplate(ProductFeaturesAxiosInstance, id, newData);
};

//passive items
export const deleteProductsFeatures = async (selectedIds) => {
    return await deleteDataAdminTemplate(ProductFeaturesAxiosInstance, selectedIds);
};

//permanent Delete items
export const permanentDeleteProductsFeatures = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(ProductFeaturesAxiosInstance, selectedIds);
};

//Restore deleted items
export const restoreProductsFeatures = async (selectedIds) => {
    return await restoreDataAdminTemplate(ProductFeaturesAxiosInstance, selectedIds);
};