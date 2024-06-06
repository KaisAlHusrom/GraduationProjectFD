
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

const UsersPaymentPlans = ADMIN_MAIN_INSTANCE_ROUTE + "/users-payment-plans";

const UsersPaymentPlansAxiosInstance = createSubAdminAxiosInstance({
    baseURL: UsersPaymentPlans,
});

//---------------------------------------
// fetch items 
export const fetchUsersPaymentPlans = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataAdminTemplate(UsersPaymentPlansAxiosInstance, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addUsersPaymentPlans = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataAdminTemplate(UsersPaymentPlansAxiosInstance, submission);
}

//update items
export const updateUsersPaymentPlans = async (id, newData) => {
    return await updateDataAdminTemplate(UsersPaymentPlansAxiosInstance, id, newData);
};

//passive items
export const deleteUsersPaymentPlans = async (selectedIds) => {
    return await deleteDataAdminTemplate(UsersPaymentPlansAxiosInstance, selectedIds);
};

//permanent Delete items
export const permanentDeleteUsersPaymentPlans = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(UsersPaymentPlansAxiosInstance, selectedIds);
};

//Restore deleted items
export const restoreUsersPaymentPlans = async (selectedIds) => {
    return await restoreDataAdminTemplate(UsersPaymentPlansAxiosInstance, selectedIds);
};