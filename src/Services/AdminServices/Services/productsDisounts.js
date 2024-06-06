
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

const ProductsDiscountsRoute = ADMIN_MAIN_INSTANCE_ROUTE + "/products-discounts";

const ProductsDiscountsAxiosInstance = createSubAdminAxiosInstance({
    baseURL: ProductsDiscountsRoute,
});

//---------------------------------------
// fetch items 
export const fetchProductsDiscounts = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataAdminTemplate(ProductsDiscountsAxiosInstance, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addProductsDiscounts = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataAdminTemplate(ProductsDiscountsAxiosInstance, submission);
}

//update items
export const updateProductsDiscounts = async (id, newData) => {
    return await updateDataAdminTemplate(ProductsDiscountsAxiosInstance, id, newData);
};

//passive items
export const deleteProductsDiscounts = async (selectedIds) => {
    return await deleteDataAdminTemplate(ProductsDiscountsAxiosInstance, selectedIds);
};

//permanent Delete items
export const permanentDeleteProductsDiscounts = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(ProductsDiscountsAxiosInstance, selectedIds);
};

//Restore deleted items
export const restoreProductsDiscounts = async (selectedIds) => {
    return await restoreDataAdminTemplate(ProductsDiscountsAxiosInstance, selectedIds);
};