
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

const ProductsUserSkillsRoute = ADMIN_MAIN_INSTANCE_ROUTE + "/products-used-skills";

const ProductsUsedSkillsAxiosInstance = createSubAdminAxiosInstance({
    baseURL: ProductsUserSkillsRoute,
});

//---------------------------------------
// fetch items 
export const fetchProductsUsedSkills = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataAdminTemplate(ProductsUsedSkillsAxiosInstance, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addProductsUsedSkills = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataAdminTemplate(ProductsUsedSkillsAxiosInstance, submission);
}

//update items
export const updateProductsUsedSkills = async (id, newData) => {
    return await updateDataAdminTemplate(ProductsUsedSkillsAxiosInstance, id, newData);
};

//passive items
export const deleteProductsUsedSkills = async (selectedIds) => {
    return await deleteDataAdminTemplate(ProductsUsedSkillsAxiosInstance, selectedIds);
};

//permanent Delete items
export const permanentDeleteProductsUsedSkills = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(ProductsUsedSkillsAxiosInstance, selectedIds);
};

//Restore deleted items
export const restoreProductsUsedSkills = async (selectedIds) => {
    return await restoreDataAdminTemplate(ProductsUsedSkillsAxiosInstance, selectedIds);
};