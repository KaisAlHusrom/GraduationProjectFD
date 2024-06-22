
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

const DesignesElementsPropValuesRoute = USERS_MAIN_INSTANCE_ROUTE + "/design-prop-values";

const DesignedElementsPropValuesAxios = createSubUsersAxiosInstance({
    baseURL: DesignesElementsPropValuesRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserDesignedElementsPropValues = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(DesignedElementsPropValuesAxios, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserDesignedElementsPropValues = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(DesignedElementsPropValuesAxios, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserDesignedElementsPropValues = async (id) => {
    const res = await checkIfRecordExistUserTemplate(DesignedElementsPropValuesAxios, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserDesignedElementsPropValues = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(DesignedElementsPropValuesAxios, submission);
}

//update items
export const updateUserDesignedElementsPropValues = async (id, newData) => {
    return await updateDataUserTemplate(DesignedElementsPropValuesAxios, id, newData);
};

//passive items
export const deleteUserDesignedElementsPropValues = async (selectedIds) => {
    return await deleteDataUserTemplate(DesignedElementsPropValuesAxios, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserDesignedElementsPropValues = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(DesignedElementsPropValuesAxios, selectedIds);
};

//Restore deleted items
export const restoreUserDesignedElementsPropValues = async (selectedIds) => {
    return await restoreDataUserTemplate(DesignedElementsPropValuesAxios, selectedIds);
};