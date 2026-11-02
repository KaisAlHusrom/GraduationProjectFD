
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

const ProductsAPI = ADMIN_MAIN_INSTANCE_ROUTE + "/products";

export const productsImagesFolderName = "ProductsImages"
export const productsFilesFolderName = "ProductsFiles"
export const MAX_FILE_SIZE = 100 * 1024 * 1024 // 500 MB
const ProductsInstance = createSubAdminAxiosInstance({
    baseURL: ProductsAPI,
});

//---------------------------------------
// fetch items 
export const fetchProducts = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataAdminTemplate(ProductsInstance, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;
    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }
    console.log(rows)
    return { rows };
}

//add items
export const addProducts = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataAdminTemplate(ProductsInstance, submission);
}

//update items
export const updateProducts = async (id, newData) => {
    return await updateDataAdminTemplate(ProductsInstance, id, newData);
};

//passive items
export const deleteProducts = async (selectedIds) => {
    return await deleteDataAdminTemplate(ProductsInstance, selectedIds);
};

//permanent Delete items
export const permanentDeleteProducts = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(ProductsInstance, selectedIds);
};

//Restore deleted items
export const restoreProducts = async (selectedIds) => {
    return await restoreDataAdminTemplate(ProductsInstance, selectedIds);
};




