
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

const OrdersRoute = ADMIN_MAIN_INSTANCE_ROUTE + "/orders";

const OrdersAxiosInstance = createSubAdminAxiosInstance({
    baseURL: OrdersRoute,
});

//---------------------------------------
// fetch items 
export const fetchOrders = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataAdminTemplate(OrdersAxiosInstance, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addOrders = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataAdminTemplate(OrdersAxiosInstance, submission);
}

//update items
export const updateOrders = async (id, newData) => {
    return await updateDataAdminTemplate(OrdersAxiosInstance, id, newData);
};

//passive items
export const deleteOrders = async (selectedIds) => {
    return await deleteDataAdminTemplate(OrdersAxiosInstance, selectedIds);
};

//permanent Delete items
export const permanentDeleteOrders = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(OrdersAxiosInstance, selectedIds);
};

//Restore deleted items
export const restoreOrders = async (selectedIds) => {
    return await restoreDataAdminTemplate(OrdersAxiosInstance, selectedIds);
};