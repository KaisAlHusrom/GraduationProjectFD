
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

const PaymentPlansRoute = ADMIN_MAIN_INSTANCE_ROUTE + "/payment-plans";

const PaymentPlansAxiosInstance = createSubAdminAxiosInstance({
    baseURL: PaymentPlansRoute,
});

//---------------------------------------
// fetch items 
export const fetchPaymentPlans = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataAdminTemplate(PaymentPlansAxiosInstance, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addPaymentPlans = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataAdminTemplate(PaymentPlansAxiosInstance, submission);
}

//update items
export const updatePaymentPlans = async (id, newData) => {
    return await updateDataAdminTemplate(PaymentPlansAxiosInstance, id, newData);
};

//passive items
export const deletePaymentPlans = async (selectedIds) => {
    return await deleteDataAdminTemplate(PaymentPlansAxiosInstance, selectedIds);
};

//permanent Delete items
export const permanentDeletePaymentPlans = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(PaymentPlansAxiosInstance, selectedIds);
};

//Restore deleted items
export const restorePaymentPlans = async (selectedIds) => {
    return await restoreDataAdminTemplate(PaymentPlansAxiosInstance, selectedIds);
};