
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

const StyleResponsiveBreakpointUsersRoute = USERS_MAIN_INSTANCE_ROUTE + "/style-breakpoints";

const StyleBreakpointAxiosForUsers = createSubUsersAxiosInstance({
    baseURL: StyleResponsiveBreakpointUsersRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserStyleBreakpoints = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(StyleBreakpointAxiosForUsers, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserStyleBreakpoints = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(StyleBreakpointAxiosForUsers, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserStyleBreakpoints = async (id) => {
    const res = await checkIfRecordExistUserTemplate(StyleBreakpointAxiosForUsers, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserStyleBreakpoints = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(StyleBreakpointAxiosForUsers, submission);
}

//update items
export const updateUserStyleBreakpoints = async (id, newData) => {
    return await updateDataUserTemplate(StyleBreakpointAxiosForUsers, id, newData);
};

//passive items
export const deleteUserStyleBreakpoints = async (selectedIds) => {
    return await deleteDataUserTemplate(StyleBreakpointAxiosForUsers, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserStyleBreakpoints = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(StyleBreakpointAxiosForUsers, selectedIds);
};

//Restore deleted items
export const restoreUserStyleBreakpoints = async (selectedIds) => {
    return await restoreDataUserTemplate(StyleBreakpointAxiosForUsers, selectedIds);
};