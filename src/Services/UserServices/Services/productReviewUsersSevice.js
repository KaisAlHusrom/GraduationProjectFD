
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

const productsReviewsRouteForUsers = USERS_MAIN_INSTANCE_ROUTE + "/products-reviews";

const productsReviewsUsersAxios = createSubUsersAxiosInstance({
    baseURL: productsReviewsRouteForUsers,
});

//---------------------------------------
// fetch items 
export const fetchUserProductsReviews = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(productsReviewsUsersAxios, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//fetch average of reviews
export const fetchRatesAverages = async (productId) => {
    try {
        store.dispatch(handleOpenLinearProgress())
        // Fetch regular items
        const response = await productsReviewsUsersAxios.get("/fetch-averages/" + productId);
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
export const fetchSpecificUserProductsReviews = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(productsReviewsUsersAxios, id);
    let row;
            
   if (res.success) {
        row = res.data;
    } else {
        row = null;
    }
 
    return row;
}
 
//check if record is exist in the database
export const checkSpecificUserProductsReviews = async (id) => {
    const res = await checkIfRecordExistUserTemplate(productsReviewsUsersAxios, id);
    let check;
 
    if (res.success) {
       check = res.data;
    } else {
        check = false;
    }
 
    return check;
}

//add items
export const addUserProductsReviews = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    return await addDataUserTemplate(productsReviewsUsersAxios, submission);
}

//update items
export const updateUserProductsReviews = async (id, newData) => {
    return await updateDataUserTemplate(productsReviewsUsersAxios, id, newData);
};

//passive items
export const deleteUserProductsReviews = async (selectedIds) => {
    return await deleteDataUserTemplate(productsReviewsUsersAxios, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserProductsReviews = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(productsReviewsUsersAxios, selectedIds);
};

//Restore deleted items
export const restoreUserProductsReviews = async (selectedIds) => {
    return await restoreDataUserTemplate(productsReviewsUsersAxios, selectedIds);
};