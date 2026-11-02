
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

const AdminBankCardsRoute = ADMIN_MAIN_INSTANCE_ROUTE + "/bank-cards";

const AdminBankCardsAxios = createSubAdminAxiosInstance({
    baseURL: AdminBankCardsRoute,
});

//---------------------------------------
// fetch items 
export const fetchBankCards = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataAdminTemplate(AdminBankCardsAxios, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addBankCards = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataAdminTemplate(AdminBankCardsAxios, submission);
}

//update items
export const updateBankCards = async (id, newData) => {
    return await updateDataAdminTemplate(AdminBankCardsAxios, id, newData);
};

//passive items
export const deleteBankCards = async (selectedIds) => {
    return await deleteDataAdminTemplate(AdminBankCardsAxios, selectedIds);
};

//permanent Delete items
export const permanentDeleteBankCards = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(AdminBankCardsAxios, selectedIds);
};

//Restore deleted items
export const restoreBankCards = async (selectedIds) => {
    return await restoreDataAdminTemplate(AdminBankCardsAxios, selectedIds);
};