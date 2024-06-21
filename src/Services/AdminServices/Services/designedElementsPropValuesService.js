
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

const DesignsPropValuesRoute = ADMIN_MAIN_INSTANCE_ROUTE + "/design-prop-values";

const DesignsPropValuesAxios = createSubAdminAxiosInstance({
    baseURL: DesignsPropValuesRoute,
});

//---------------------------------------
// fetch items 
export const fetchDesignedElementsPropValues = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataAdminTemplate(DesignsPropValuesAxios, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addDesignedElementsPropValues = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataAdminTemplate(DesignsPropValuesAxios, submission);
}

//update items
export const updateDesignedElementsPropValues = async (id, newData) => {
    return await updateDataAdminTemplate(DesignsPropValuesAxios, id, newData);
};

//passive items
export const deleteDesignedElementsPropValues = async (selectedIds) => {
    return await deleteDataAdminTemplate(DesignsPropValuesAxios, selectedIds);
};

//permanent Delete items
export const permanentDeleteDesignedElementsPropValues = async (selectedIds) => {
    return await permanentDeleteDataAdminTemplate(DesignsPropValuesAxios, selectedIds);
};

//Restore deleted items
export const restoreDesignedElementsPropValues = async (selectedIds) => {
    return await restoreDataAdminTemplate(DesignsPropValuesAxios, selectedIds);
};