
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

const PaymentPlansUsersRoute = USERS_MAIN_INSTANCE_ROUTE + "/payment-plans";

const PaymentPlansUsersAxios = createSubUsersAxiosInstance({
    baseURL: PaymentPlansUsersRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserPaymentPlans = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(PaymentPlansUsersAxios, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserPaymentPlans = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(PaymentPlansUsersAxios, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserPaymentPlans = async (id) => {
    const res = await checkIfRecordExistUserTemplate(PaymentPlansUsersAxios, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserPaymentPlans = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(PaymentPlansUsersAxios, submission);
}

//update items
export const updateUserPaymentPlans = async (id, newData) => {
    return await updateDataUserTemplate(PaymentPlansUsersAxios, id, newData);
};

//passive items
export const deleteUserPaymentPlans = async (selectedIds) => {
    return await deleteDataUserTemplate(PaymentPlansUsersAxios, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserPaymentPlans = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(PaymentPlansUsersAxios, selectedIds);
};

//Restore deleted items
export const restoreUserPaymentPlans = async (selectedIds) => {
    return await restoreDataUserTemplate(PaymentPlansUsersAxios, selectedIds);
};