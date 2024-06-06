
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

const OrderItemsService = ADMIN_MAIN_INSTANCE_ROUTE + "/order-items";

const OrderItemsAxiosInstance = createSubAdminAxiosInstance({
    baseURL: OrderItemsService,
});

//---------------------------------------
// fetch items 
export const fetchOrderItems = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataAdminTemplate(OrderItemsAxiosInstance, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addOrderItems = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataAdminTemplate(OrderItemsAxiosInstance, submission);
}

//update items
export const updateOrderItems = async (id, newData) => {
    return await updateDataAdminTemplate(OrderItemsAxiosInstance, id, newData);
};

//passive items
export const deleteOrderItems = async (selectedIds) => {
    return await deleteDataAdminTemplate(OrderItemsAxiosInstance, selectedIds);
};

//permanent Delete items
export const permanentDeleteOrderItems = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(OrderItemsAxiosInstance, selectedIds);
};

//Restore deleted items
export const restoreOrderItems = async (selectedIds) => {
    return await restoreDataAdminTemplate(OrderItemsAxiosInstance, selectedIds);
};