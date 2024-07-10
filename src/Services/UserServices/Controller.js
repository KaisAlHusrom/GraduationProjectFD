import axios from "axios";
import config from "../../../Config.json"
import { updateBoolean } from "../utils/cleanData";
import store from "../../Redux/Store";
import { handleCloseLinearProgress, handleOpenLinearProgress } from "../../Redux/Slices/DownloadPageSlice";
import { handleOpenSnackbar, setSnackbarIsError, setSnackbarMessage } from "../../Redux/Slices/snackbarOpenSlice";


//ADMIN AXIOS MAIN INSTANCE
export const USERS_MAIN_INSTANCE_ROUTE = config.ServerMainRoute  + "/user";

export const USERS_MAIN_INSTANCE = axios.create({
    baseURL: USERS_MAIN_INSTANCE_ROUTE,
    headers: {
        'Content-Type': 'multipart/form-data',
        "Accept": "application/json",
        'Authorization': `Bearer ${store.getState().authSlice.auth_token}` //TODO: will change to use cookies
    },
    // withCredentials: true,
});




export function createSubUsersAxiosInstance(overrides) {
    return axios.create(Object.assign({}, USERS_MAIN_INSTANCE.defaults, overrides));
}

// --- FETCH DATA TEMPLATE 


export const fetchDataUserTemplate = async (axiosAPI, type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=10) => {
    try {

        let response;   
        if (type === "deleted") {
            // Fetch deleted items
            store.dispatch(handleOpenLinearProgress())
            response = await axiosAPI.get("/fetch_deleted", {
                params: {
                    pageNumber: pageNumber,
                    perPage: perPage,
                    filters: filters,
                    sorts: sorts,
                    searchQuery: searchQuery,
                },
            });
            store.dispatch(handleCloseLinearProgress())
        } else {
            store.dispatch(handleOpenLinearProgress())
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
            store.dispatch(handleCloseLinearProgress())
        }
        const res = response.data;
        return res;

    } catch (error) {
        store.dispatch(handleCloseLinearProgress())
            // Handle other errors
            console.error('Error Fetching Data:', error);
            return error.response.data;

    }
}




// --- ADD DATA TEMPLATE
export const addDataUserTemplate = async (axiosAPI, data) => {
    try {
        const updatedData = updateBoolean(data)
        store.dispatch(handleOpenLinearProgress())
        const response = await axiosAPI.post('', updatedData);
        console.log(response)
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

        store.dispatch(setSnackbarMessage({message: error.response.data.message}))
        store.dispatch(setSnackbarIsError({isError: true}))
        store.dispatch(handleOpenSnackbar())

        return error.response.data;
    }
}


//--- UPDATE TEMPLATE
let cancelTokenSource;
export const updateDataUserTemplate = async (axiosAPI, id, newData) => {
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
        store.dispatch(handleCloseLinearProgress())
        if (axios.isCancel(error)) {
            // Request was canceled, no need to handle the error
            return;
        } else {
            // Handle other errors
            console.error('Error updating data:', error);
            store.dispatch(setSnackbarMessage({message: error.response.data.message}))
            store.dispatch(setSnackbarIsError({isError: true}))
            store.dispatch(handleOpenSnackbar())
            return error.response.data;
        }
    }
}

// --- DELETE TEMPLATE
export const deleteDataUserTemplate = async (axiosAPI, ids) => {
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
        store.dispatch(setSnackbarMessage({message: error.response.data.message}))
        store.dispatch(setSnackbarIsError({isError: true}))
        store.dispatch(handleOpenSnackbar())

        store.dispatch(handleCloseLinearProgress())

        return error.response.data;
    }
}

// --- RESTORE TEMPLATE
export const restoreDataUserTemplate = async (axiosAPI, ids) => {
    try {
        // Convert ids array to comma-separated string
        const idList = ids.join(',');
        store.dispatch(handleOpenLinearProgress())
        const response = await axiosAPI.put(`/restore/${idList}`);
        store.dispatch(handleCloseLinearProgress())
        if(response.status === 200) {
            //TODO
        }
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        store.dispatch(handleCloseLinearProgress())
        //TODO

        return error.response.data;
    }
}

// --- PERMANENT DELETE TEMPLATE
export const permanentDeleteDataUserTemplate = async (axiosAPI, ids) => {
    try {
        // Convert ids array to comma-separated string
        const idList = ids.join(',');
        store.dispatch(handleOpenLinearProgress())
        const response = await axiosAPI.delete(`permanent-delete/${idList}`);
        store.dispatch(handleCloseLinearProgress())
        if(response.status === 200) {
            //TODO
        }
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        store.dispatch(handleCloseLinearProgress())
        //TODO
        
        return error.response.data;
    }
}

// fetch specific record
export const fetchSpecificRecordUserTemplate = async (axiosAPI, id) => {
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
        store.dispatch(handleCloseLinearProgress())
        console.error('Error updating data:', error);

        // store.dispatch(setSnackbarMessage({message: error.response.data.message}))
        // store.dispatch(setSnackbarIsError({isError: true}))
        // store.dispatch(handleOpenSnackbar())
        
        return error.response.data;
    }
}

//check if record exist 
export const checkIfRecordExistUserTemplate = async (axiosAPI, id) => {
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
        //TODO
        
        return error.response.data;
    }
}