
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

const ProductsUsedSkillsUserRoute = USERS_MAIN_INSTANCE_ROUTE + "/products-used-skills";

const ProductsUserSkillsUsersAxios = createSubUsersAxiosInstance({
    baseURL: ProductsUsedSkillsUserRoute,
});

//---------------------------------------
// fetch items 
export const fetchUserProductsUsedSkills = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(ProductsUserSkillsUsersAxios, type, pageNumber, filters, sorts, searchQuery, perPage);
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
export const fetchSpecificUserProductsUsedSkills = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(ProductsUserSkillsUsersAxios, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserProductsUsedSkills = async (id) => {
    const res = await checkIfRecordExistUserTemplate(ProductsUserSkillsUsersAxios, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserProductsUsedSkills = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(ProductsUserSkillsUsersAxios, submission);
}

//update items
export const updateUserProductsUsedSkills = async (id, newData) => {
    return await updateDataUserTemplate(ProductsUserSkillsUsersAxios, id, newData);
};

//passive items
export const deleteUserProductsUsedSkills = async (selectedIds) => {
    return await deleteDataUserTemplate(ProductsUserSkillsUsersAxios, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserProductsUsedSkills = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(ProductsUserSkillsUsersAxios, selectedIds);
};

//Restore deleted items
export const restoreUserProductsUsedSkills = async (selectedIds) => {
    return await restoreDataUserTemplate(ProductsUserSkillsUsersAxios, selectedIds);
};