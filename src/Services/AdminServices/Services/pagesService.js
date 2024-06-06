
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

const PagesRoute = ADMIN_MAIN_INSTANCE_ROUTE + "/pages";

const PagesAxiosInstance = createSubAdminAxiosInstance({
    baseURL: PagesRoute,
});

//---------------------------------------
// fetch items 
export const fetchPages = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataAdminTemplate(PagesAxiosInstance, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addPages = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataAdminTemplate(PagesAxiosInstance, submission);
}

//update items
export const updatePages = async (id, newData) => {
    return await updateDataAdminTemplate(PagesAxiosInstance, id, newData);
};

//passive items
export const deletePages = async (selectedIds) => {
    return await deleteDataAdminTemplate(PagesAxiosInstance, selectedIds);
};

//permanent Delete items
export const permanentDeletePages = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(PagesAxiosInstance, selectedIds);
};

//Restore deleted items
export const restorePages = async (selectedIds) => {
    return await restoreDataAdminTemplate(PagesAxiosInstance, selectedIds);
};