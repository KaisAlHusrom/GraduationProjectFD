
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

const UsersPaymentsRoute = ADMIN_MAIN_INSTANCE_ROUTE + "/users-payments";

const UsersPaymentsAxiosInstance = createSubAdminAxiosInstance({
    baseURL: UsersPaymentsRoute,
});

//---------------------------------------
// fetch items 
export const fetchUsersPayments = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataAdminTemplate(UsersPaymentsAxiosInstance, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addUsersPayments = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataAdminTemplate(UsersPaymentsAxiosInstance, submission);
}

//update items
export const updateUsersPayments = async (id, newData) => {
    return await updateDataAdminTemplate(UsersPaymentsAxiosInstance, id, newData);
};

//passive items
export const deleteUsersPayments = async (selectedIds) => {
    return await deleteDataAdminTemplate(UsersPaymentsAxiosInstance, selectedIds);
};

//permanent Delete items
export const permanentDeleteUsersPayments = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(UsersPaymentsAxiosInstance, selectedIds);
};

//Restore deleted items
export const restoreUsersPayments = async (selectedIds) => {
    return await restoreDataAdminTemplate(UsersPaymentsAxiosInstance, selectedIds);
};