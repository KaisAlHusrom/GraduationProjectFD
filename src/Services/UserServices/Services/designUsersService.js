

// -------------------------------------- 
import { handleCloseLinearProgress, handleOpenLinearProgress } from "../../../Redux/Slices/DownloadPageSlice";
import { handleOpenSnackbar, setSnackbarIsError, setSnackbarMessage } from "../../../Redux/Slices/snackbarOpenSlice";
import store from "../../../Redux/Store";
import { USERS_MAIN_INSTANCE_ROUTE, addDataUserTemplate, 
    checkIfRecordExistUserTemplate, 
    createSubUsersAxiosInstance, 
    deleteDataUserTemplate, 
    fetchDataUserTemplate, 
    fetchSpecificRecordUserTemplate, 
    permanentDeleteDataUserTemplate, 
    restoreDataUserTemplate, 
    updateDataUserTemplate 
} from "../Controller";

const DesignRouter = USERS_MAIN_INSTANCE_ROUTE + "/designs";

const DesignAPI = createSubUsersAxiosInstance({
    baseURL: DesignRouter,
});

//---------------------------------------
//fetch specific record from database
export const fetchSpecificUserDesign = async (id) => {
    const res = await fetchSpecificRecordUserTemplate(DesignAPI, id);
    let row;

    if (res.success) {
        row = res.data;
    } else {
        row = null;
    }

    return row;
}

//check if design is exist in the database
export const checkSpecificUserDesign = async (id) => {
    const res = await checkIfRecordExistUserTemplate(DesignAPI, id);
    let check;

    if (res.success) {
        check = res.data;
    } else {
        check = false;
    }

    return check;
}

// fetch items 
export const fetchUserDesigns = async (type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=5) => {
    const res = await fetchDataUserTemplate(DesignAPI, type, pageNumber, filters, sorts, searchQuery, perPage);
    let rows;

    if (res.success) {
        rows = res.data;
    } else {
        rows = [];
    }

    return { rows };
}

//add items
export const addUserDesigns = async (inputValues) => {
    const submission = {
        ...inputValues
    };
    console.log(submission)

    return await addDataUserTemplate(DesignAPI, submission);
}

//update items
export const updateUserDesigns = async (id, newData) => {
    return await updateDataUserTemplate(DesignAPI, id, newData);
};

export const updateUserSorting = async ( newData) => {
    try {
        // Cancel the previous request, if any

        // Create a new cancel token for this request
        // Assuming id is included in the newData object and you're updating a specific resource identified by its id
        // Make the request with the new cancel token
        store.dispatch(handleOpenLinearProgress())
        console.log(newData)
        const response = await DesignAPI.post(
            `/update-sorting`, 
            {
                
                    'designs' : newData,
            }, 
          );

        store.dispatch(handleCloseLinearProgress())

        if(response.status === 200) {
            store.dispatch(setSnackbarMessage({message: "Items have been successfully updated."}))
            store.dispatch(setSnackbarIsError({isError: false}))
            store.dispatch(handleOpenSnackbar())
        }
        // Process the response data as needed
        return response.data;
    } catch (error) {
        store.dispatch(handleCloseLinearProgress())

            // Handle other errors
            console.error('Error updating data:', error);
            store.dispatch(setSnackbarMessage({message: error.response.data.message}))
            store.dispatch(setSnackbarIsError({isError: true}))
            store.dispatch(handleOpenSnackbar())
            return error.response.data;
    }

};

//passive items
export const deleteUserDesigns = async (selectedIds) => {
    return await deleteDataUserTemplate(DesignAPI, selectedIds);
};

//permanent Delete items
export const permanentDeleteUserDesigns = async (selectedIds) => {
    return await permanentDeleteDataUserTemplate(DesignAPI, selectedIds);
};

//Restore deleted items
export const restoreUserDesigns = async (selectedIds) => {
    return await restoreDataUserTemplate(DesignAPI, selectedIds);
};