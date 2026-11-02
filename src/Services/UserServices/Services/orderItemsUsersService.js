
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

const OrderItemsUsersRoute = USERS_MAIN_INSTANCE_ROUTE + "/order-items";

const OrdersItemsUsersAxios = createSubUsersAxiosInstance({
    baseURL: OrderItemsUsersRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserOrderItems = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(OrdersItemsUsersAxios, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserOrderItems = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(OrdersItemsUsersAxios, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserOrderItems = async (id) => {
    const res = await checkIfRecordExistUserTemplate(OrdersItemsUsersAxios, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserOrderItems = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(OrdersItemsUsersAxios, submission);
}

//update items
export const updateUserOrderItems = async (id, newData) => {
    return await updateDataUserTemplate(OrdersItemsUsersAxios, id, newData);
};

//passive items
export const deleteUserOrderItems = async (selectedIds) => {
    return await deleteDataUserTemplate(OrdersItemsUsersAxios, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserOrderItems = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(OrdersItemsUsersAxios, selectedIds);
};

//Restore deleted items
export const restoreUserOrderItems = async (selectedIds) => {
    return await restoreDataUserTemplate(OrdersItemsUsersAxios, selectedIds);
};