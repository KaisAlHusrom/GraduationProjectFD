
// -------------------------------------- 
import { handleCloseLinearProgress, handleOpenLinearProgress } from "../../../Redux/Slices/DownloadPageSlice";
import store from "../../../Redux/Store";
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

const OrdersUsersRoute = USERS_MAIN_INSTANCE_ROUTE + "/orders";

const OrdersUsersAxios = createSubUsersAxiosInstance({
    baseURL: OrdersUsersRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserOrders = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(OrdersUsersAxios, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//fetch user coming orders
export const fetchUserComingOrders = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    try {
        store.dispatch(handleOpenLinearProgress())
        // Fetch regular items
        const response = await OrdersUsersAxios.get("/coming-orders/fetch", {
            params: {
                pageNumber: pageNumber,
                perPage: perPage,
                filters: filters,
                sorts: sorts,
                searchQuery: searchQuery,
            },
        });
        store.dispatch(handleCloseLinearProgress())

        const res = response.data;
        let rows;

        if (res.success) {
            rows = res.data;
        } else {
            rows = [];
        }

        return { rows };
    } catch (error) {
        store.dispatch(handleCloseLinearProgress())
        // Handle other errors
        console.error('Error Fetching Data:', error);
        return error.response.data;
    }
}

//fetch user coming orders
export const fetchUserComingOrdersCounts = async () => {
    try {
        store.dispatch(handleOpenLinearProgress())
        // Fetch regular items
        const response = await OrdersUsersAxios.get("/coming-orders/fetch-count");
        store.dispatch(handleCloseLinearProgress())

        const res = response.data;
        let rows;

        if (res.success) {
            rows = res.data;
        } else {
            rows = {count: 0};
        }

        return { rows };
    } catch (error) {
        store.dispatch(handleCloseLinearProgress())
        // Handle other errors
        console.error('Error Fetching Data:', error);
        return error.response.data;
    }
}

//check if user bought product and didn't review it
export const hadBuyProduct = async (productId) => {
    try {
        store.dispatch(handleOpenLinearProgress())
        // Fetch regular items
        const response = await OrdersUsersAxios.get("/had-buy-product/" + productId);
        store.dispatch(handleCloseLinearProgress())

        const res = response.data;
        let rows;

        if (res.success) {
            rows = res.data;
        } else {
            rows = {error: true};
        }

        return { rows };
    } catch (error) {
        store.dispatch(handleCloseLinearProgress())
        // Handle other errors
        console.error('Error Fetching Data:', error);
        return error.response.data;
    }
}

//---------------------------------------
//fetch specific record from database
export const fetchSpecificUserOrders = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(OrdersUsersAxios, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserOrders = async (id) => {
    const res = await checkIfRecordExistUserTemplate(OrdersUsersAxios, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserOrders = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(OrdersUsersAxios, submission);
}

//update items
export const updateUserOrders = async (id, newData) => {
    return await updateDataUserTemplate(OrdersUsersAxios, id, newData);
};

//passive items
export const deleteUserOrders = async (selectedIds) => {
    return await deleteDataUserTemplate(OrdersUsersAxios, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserOrders = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(OrdersUsersAxios, selectedIds);
};

//Restore deleted items
export const restoreUserOrders = async (selectedIds) => {
    return await restoreDataUserTemplate(OrdersUsersAxios, selectedIds);
};