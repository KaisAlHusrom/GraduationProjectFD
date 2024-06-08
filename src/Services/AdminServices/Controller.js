import axios from "axios";


// Configure axios to include credentials (cookies) with each request
// axios.defaults.withCredentials = true;

import config from "../../../Config.json"

//Redux 
import store from "../../Redux/Store"
import { setSnackbarMessage, handleOpenSnackbar, setSnackbarIsError } from "../../Redux/Slices/snackbarOpenSlice";

//clean data helpers
import { updateBoolean } from "../utils/cleanData";
import { handleCloseLinearProgress, handleOpenLinearProgress } from "../../Redux/Slices/DownloadPageSlice";


//ADMIN AXIOS MAIN INSTANCE
export const ADMIN_MAIN_INSTANCE_ROUTE = config.ServerMainRoute + "/admin";

export const ADMIN_MAIN_INSTANCE = axios.create({
    baseURL: ADMIN_MAIN_INSTANCE_ROUTE,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${store.getState().authSlice.auth_token}` //TODO: will change to use cookies
    },
    // withCredentials: true,
});

export function createSubAdminAxiosInstance(overrides) {
    return axios.create(Object.assign({}, ADMIN_MAIN_INSTANCE.defaults, overrides));
}





// --- FETCH DATA TEMPLATE 


export const fetchDataAdminTemplate = async (axiosAPI, type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=10) => {
    try {


        let response;   
        if (type === "deleted") {
            // Fetch deleted items
            response = await axiosAPI.get("/fetch_deleted", {
                params: {
                    pageNumber: pageNumber,
                    perPage: perPage,
                    filters: filters,
                    sorts: sorts,
                    searchQuery: searchQuery,
                },
            });
        } else {
            // Fetch regular items
            response = await axiosAPI.get("", {
                params: {
                    pageNumber: pageNumber,
                    perPage: perPage,
                    filters: filters,
                    sorts: sorts,
                    searchQuery: searchQuery,
                },
            });
        }
        const res = response.data;
        return res;

    } catch (error) {

            // Handle other errors
            console.error('Error Fetching Data:', error);
            return error.response.data;

    }
}




// --- ADD DATA TEMPLATE
export const addDataAdminTemplate = async (axiosAPI, data) => {
    try {
        const updatedData = updateBoolean(data)
        store.dispatch(handleOpenLinearProgress())
        const response = await axiosAPI.post('', updatedData);
        store.dispatch(handleCloseLinearProgress())
        if(response.data.success) {
            store.dispatch(setSnackbarMessage({message: response.data.message}))
            store.dispatch(setSnackbarIsError({isError: false}))
            store.dispatch(handleOpenSnackbar())
        } else {
            store.dispatch(setSnackbarMessage({message: response.data.error}))
            store.dispatch(setSnackbarIsError({isError: true}))
            store.dispatch(handleOpenSnackbar())
        }

        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        store.dispatch(handleCloseLinearProgress())
        store.dispatch(setSnackbarMessage({message: error.response.data.error}))
        store.dispatch(setSnackbarIsError({isError: true}))
        store.dispatch(handleOpenSnackbar())

        return error.response.data;
    }
}


//--- UPDATE TEMPLATE
let cancelTokenSource;
export const updateDataAdminTemplate = async (axiosAPI, id, newData) => {
    const updatedData = updateBoolean(newData)
    try {
        // Cancel the previous request, if any
        if (cancelTokenSource) {
            cancelTokenSource.cancel('Operation canceled by the user.');
        }

        // Create a new cancel token for this request
        cancelTokenSource = axios.CancelToken.source();
        // Assuming id is included in the newData object and you're updating a specific resource identified by its id
        // Make the request with the new cancel token
        store.dispatch(handleOpenLinearProgress())
        const response = await axiosAPI.post(
            `/${id}`, 
            {
                ...updatedData,
                _method: "PATCH",
            }, 
            { 
                cancelToken: cancelTokenSource.token,
                
        });
        store.dispatch(handleCloseLinearProgress())
        if(response.status === 200) {
            store.dispatch(setSnackbarMessage({message: "Items have been successfully updated."}))
            store.dispatch(setSnackbarIsError({isError: false}))
            store.dispatch(handleOpenSnackbar())
        }
        // Process the response data as needed
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            // Request was canceled, no need to handle the error
            return;
        } else {
            // Handle other errors
            console.error('Error updating data:', error);
            store.dispatch(handleCloseLinearProgress())
            store.dispatch(setSnackbarMessage({message: error.response.data.message}))
            store.dispatch(setSnackbarIsError({isError: true}))
            store.dispatch(handleOpenSnackbar())

            return error.response.data;
        }
    }
}

// --- DELETE TEMPLATE
export const deleteDataAdminTemplate = async (axiosAPI, ids) => {
    try {
        // Convert ids array to comma-separated string
        const idList = ids.join(',');
        store.dispatch(handleOpenLinearProgress())
        const response = await axiosAPI.delete(`/${idList}`);
        store.dispatch(handleCloseLinearProgress())
        if(response.status === 200) {
            store.dispatch(setSnackbarMessage({message: "Items have been successfully deleted."}))
            store.dispatch(setSnackbarIsError({isError: false}))
            store.dispatch(handleOpenSnackbar())
        }
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        store.dispatch(handleCloseLinearProgress())
        store.dispatch(setSnackbarMessage({message: error.response.data.message}))
        store.dispatch(setSnackbarIsError({isError: true}))
        store.dispatch(handleOpenSnackbar())

        return error.response.data;
    }
}

// --- RESTORE TEMPLATE
export const restoreDataAdminTemplate = async (axiosAPI, ids) => {
    try {
        // Convert ids array to comma-separated string
        const idList = ids.join(',');
        store.dispatch(handleOpenLinearProgress())
        const response = await axiosAPI.put(`/restore/${idList}`);
        store.dispatch(handleCloseLinearProgress())
        if(response.status === 200) {
            store.dispatch(setSnackbarMessage({message: "Items have been successfully restored."}))
            store.dispatch(setSnackbarIsError({isError: false}))
            store.dispatch(handleOpenSnackbar())
        }
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        store.dispatch(handleCloseLinearProgress())
        store.dispatch(setSnackbarMessage({message: error.response.data.message}))
        store.dispatch(setSnackbarIsError({isError: true}))
        store.dispatch(handleOpenSnackbar())

        return error.response.data;
    }
}

// --- PERMANENT DELETE TEMPLATE
export const permanentDeleteDataAdminTemplate = async (axiosAPI, ids) => {
    try {
        // Convert ids array to comma-separated string
        const idList = ids.join(',');
        store.dispatch(handleOpenLinearProgress())
        const response = await axiosAPI.delete(`permanent-delete/${idList}`);
        store.dispatch(handleCloseLinearProgress())
        if(response.status === 200) {
            store.dispatch(setSnackbarMessage({message: "Items have been successfully deleted permanently"}))
            store.dispatch(setSnackbarIsError({isError: false}))
            store.dispatch(handleOpenSnackbar())
        }
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        store.dispatch(handleCloseLinearProgress())
        store.dispatch(setSnackbarMessage({message: error.response.data.message}))
        store.dispatch(setSnackbarIsError({isError: true}))
        store.dispatch(handleOpenSnackbar())
        
        return error.response.data;
    }
}

// fetch specific record
export const fetchSpecificRecordAdminTemplate = async (axiosAPI, id) => {
    try {
        
        store.dispatch(handleOpenLinearProgress())
        const response = await axiosAPI.get(`fetch/${id}`);
        store.dispatch(handleCloseLinearProgress())
        // if(response.status === 200) {
        //     store.dispatch(setSnackbarMessage({message: "C"}))
        //     store.dispatch(setSnackbarIsError({isError: false}))
        //     store.dispatch(handleOpenSnackbar())
        // }
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        store.dispatch(handleCloseLinearProgress())
        // store.dispatch(setSnackbarMessage({message: error.response.data.message}))
        // store.dispatch(setSnackbarIsError({isError: true}))
        // store.dispatch(handleOpenSnackbar())
        
        return error.response.data;
    }
}

//check if record exist 
export const checkIfRecordExistAdminTemplate = async (axiosAPI, id) => {
    try {
        
        store.dispatch(handleOpenLinearProgress())
        const response = await axiosAPI.get(`check/${id}`);
        store.dispatch(handleCloseLinearProgress())
        // if(response.status === 200) {
        //     store.dispatch(setSnackbarMessage({message: "C"}))
        //     store.dispatch(setSnackbarIsError({isError: false}))
        //     store.dispatch(handleOpenSnackbar())
        // }
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        store.dispatch(handleCloseLinearProgress())
        store.dispatch(setSnackbarMessage({message: error.response.data.message}))
        store.dispatch(setSnackbarIsError({isError: true}))
        store.dispatch(handleOpenSnackbar())
        
        return error.response.data;
    }
}