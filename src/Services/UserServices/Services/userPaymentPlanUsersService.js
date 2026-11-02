
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

const UsersPaymentPlansRoute = USERS_MAIN_INSTANCE_ROUTE + "/users-payment-plans";

const UsersPaymentPlansAxiosForUsers = createSubUsersAxiosInstance({
    baseURL: UsersPaymentPlansRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserUsersPaymentPlans = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(UsersPaymentPlansAxiosForUsers, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserUsersPaymentPlans = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(UsersPaymentPlansAxiosForUsers, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserUsersPaymentPlans = async (id) => {
    const res = await checkIfRecordExistUserTemplate(UsersPaymentPlansAxiosForUsers, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserUsersPaymentPlans = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(UsersPaymentPlansAxiosForUsers, submission);
}

//update items
export const updateUserUsersPaymentPlans = async (id, newData) => {
    return await updateDataUserTemplate(UsersPaymentPlansAxiosForUsers, id, newData);
};

//passive items
export const deleteUserUsersPaymentPlans = async (selectedIds) => {
    return await deleteDataUserTemplate(UsersPaymentPlansAxiosForUsers, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserUsersPaymentPlans = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(UsersPaymentPlansAxiosForUsers, selectedIds);
};

//Restore deleted items
export const restoreUserUsersPaymentPlans = async (selectedIds) => {
    return await restoreDataUserTemplate(UsersPaymentPlansAxiosForUsers, selectedIds);
};