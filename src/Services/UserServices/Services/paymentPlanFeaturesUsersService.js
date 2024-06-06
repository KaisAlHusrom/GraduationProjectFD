
// -------------------------------------- 
import { 
USERS_MAIN_INSTANCE_ROUTE,
createSubUsersAxiosInstance,
addDataUserTemplate,
deleteDataUserTemplate,
fetchDataUserTemplate,
permanentDeleteDataUserTemplate,
restoreDataUserTemplate,
updateDataUserTemplate,
fetchSpecificRecordUserTemplate,
checkIfRecordExistUserTemplate,
} from "../Controller";

const PaymentPlansFeaturesUsersRoute = USERS_MAIN_INSTANCE_ROUTE + "/payment-plan-features";

const PaymentPlansFeaturesUsersAxios = createSubUsersAxiosInstance({
    baseURL: PaymentPlansFeaturesUsersRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserPaymentPlanFeatures = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(PaymentPlansFeaturesUsersAxios, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//---------------------------------------
//fetch specific record from database
export const fetchSpecificUserPaymentPlanFeatures = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(PaymentPlansFeaturesUsersAxios, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserPaymentPlanFeatures = async (id) => {
    const res = await checkIfRecordExistUserTemplate(PaymentPlansFeaturesUsersAxios, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserPaymentPlanFeatures = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(PaymentPlansFeaturesUsersAxios, submission);
}

//update items
export const updateUserPaymentPlanFeatures = async (id, newData) => {
    return await updateDataUserTemplate(PaymentPlansFeaturesUsersAxios, id, newData);
};

//passive items
export const deleteUserPaymentPlanFeatures = async (selectedIds) => {
    return await deleteDataUserTemplate(PaymentPlansFeaturesUsersAxios, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserPaymentPlanFeatures = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(PaymentPlansFeaturesUsersAxios, selectedIds);
};

//Restore deleted items
export const restoreUserPaymentPlanFeatures = async (selectedIds) => {
    return await restoreDataUserTemplate(PaymentPlansFeaturesUsersAxios, selectedIds);
};