
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

const BankCardsUserRoute = USERS_MAIN_INSTANCE_ROUTE + "/bank-cards";

const BankCardsUserAxios = createSubUsersAxiosInstance({
    baseURL: BankCardsUserRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserBankCards = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(BankCardsUserAxios, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserBankCards = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(BankCardsUserAxios, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserBankCards = async (id) => {
    const res = await checkIfRecordExistUserTemplate(BankCardsUserAxios, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserBankCards = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(BankCardsUserAxios, submission);
}

//update items
export const updateUserBankCards = async (id, newData) => {
    return await updateDataUserTemplate(BankCardsUserAxios, id, newData);
};

//passive items
export const deleteUserBankCards = async (selectedIds) => {
    return await deleteDataUserTemplate(BankCardsUserAxios, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserBankCards = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(BankCardsUserAxios, selectedIds);
};

//Restore deleted items
export const restoreUserBankCards = async (selectedIds) => {
    return await restoreDataUserTemplate(BankCardsUserAxios, selectedIds);
};