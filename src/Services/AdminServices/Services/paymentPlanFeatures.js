
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

const PaymentPlansFeatures = ADMIN_MAIN_INSTANCE_ROUTE + "/payment-plan-features";

const PaymentPlanFeaturesAxiosInstance = createSubAdminAxiosInstance({
    baseURL: PaymentPlansFeatures,
});

export const paymentPlaneFeaturesImagesFolderName = "payment_plan_feature_images"

//---------------------------------------
// fetch items 
export const fetchPaymentPlanFeatures = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataAdminTemplate(PaymentPlanFeaturesAxiosInstance, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addPaymentPlanFeatures = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataAdminTemplate(PaymentPlanFeaturesAxiosInstance, submission);
}

//update items
export const updatePaymentPlanFeatures = async (id, newData) => {
    return await updateDataAdminTemplate(PaymentPlanFeaturesAxiosInstance, id, newData);
};

//passive items
export const deletePaymentPlanFeatures = async (selectedIds) => {
    return await deleteDataAdminTemplate(PaymentPlanFeaturesAxiosInstance, selectedIds);
};

//permanent Delete items
export const permanentDeletePaymentPlanFeatures = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(PaymentPlanFeaturesAxiosInstance, selectedIds);
};

//Restore deleted items
export const restorePaymentPlanFeatures = async (selectedIds) => {
    return await restoreDataAdminTemplate(PaymentPlanFeaturesAxiosInstance, selectedIds);
};