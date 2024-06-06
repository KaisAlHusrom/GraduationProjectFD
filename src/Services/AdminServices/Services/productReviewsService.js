
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

const ProductsReviewsRoute = ADMIN_MAIN_INSTANCE_ROUTE + "/products-reviews";

const ProductsReviewsAxiosInstance = createSubAdminAxiosInstance({
    baseURL: ProductsReviewsRoute,
});

//---------------------------------------
// fetch items 
export const fetchProductsReviews = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataAdminTemplate(ProductsReviewsAxiosInstance, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addProductsReviews = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataAdminTemplate(ProductsReviewsAxiosInstance, submission);
}

//update items
export const updateProductsReviews = async (id, newData) => {
    return await updateDataAdminTemplate(ProductsReviewsAxiosInstance, id, newData);
};

//passive items
export const deleteProductsReviews = async (selectedIds) => {
    return await deleteDataAdminTemplate(ProductsReviewsAxiosInstance, selectedIds);
};

//permanent Delete items
export const permanentDeleteProductsReviews = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(ProductsReviewsAxiosInstance, selectedIds);
};

//Restore deleted items
export const restoreProductsReviews = async (selectedIds) => {
    return await restoreDataAdminTemplate(ProductsReviewsAxiosInstance, selectedIds);
};