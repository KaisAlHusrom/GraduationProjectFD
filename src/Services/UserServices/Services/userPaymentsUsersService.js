
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

const userPaymentsUsersRoute = USERS_MAIN_INSTANCE_ROUTE + "/users-payments";

const UsersPaymentUsersAxios = createSubUsersAxiosInstance({
    baseURL: userPaymentsUsersRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserUsersPayments = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(UsersPaymentUsersAxios, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserUsersPayments = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(UsersPaymentUsersAxios, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserUsersPayments = async (id) => {
    const res = await checkIfRecordExistUserTemplate(UsersPaymentUsersAxios, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserUsersPayments = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(UsersPaymentUsersAxios, submission);
}

//update items
export const updateUserUsersPayments = async (id, newData) => {
    return await updateDataUserTemplate(UsersPaymentUsersAxios, id, newData);
};

//passive items
export const deleteUserUsersPayments = async (selectedIds) => {
    return await deleteDataUserTemplate(UsersPaymentUsersAxios, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserUsersPayments = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(UsersPaymentUsersAxios, selectedIds);
};

//Restore deleted items
export const restoreUserUsersPayments = async (selectedIds) => {
    return await restoreDataUserTemplate(UsersPaymentUsersAxios, selectedIds);
};