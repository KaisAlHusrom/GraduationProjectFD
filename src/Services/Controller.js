import axios from "axios";

//Redux 
import store from "../Redux/Store"
import { setSnackbarMessage, handleOpenSnackbar, setSnackbarIsError } from "../Redux/Slices/snackbarOpenSlice";



// --- FETCH DATA TEMPLATE 


export const fetchDataTemplate = async (axiosAPI, type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null) => {
    try {


        let response;
        if (type === "deleted") {
            // Fetch deleted items
            response = await axiosAPI.get("/fetch_deleted", {
                params: {
                    pageNumber: pageNumber,
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
export const addDataTemplate = async (axiosAPI, data) => {
    try {

        const response = await axiosAPI.post('', data);
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

        store.dispatch(setSnackbarMessage({message: error.response.data.error}))
        store.dispatch(setSnackbarIsError({isError: true}))
        store.dispatch(handleOpenSnackbar())

        return error.response.data;
    }
}


//--- UPDATE TEMPLATE
let cancelTokenSource;
export const updateTemplate = async (axiosAPI, id, newData) => {
    try {
        // Cancel the previous request, if any
        if (cancelTokenSource) {
            cancelTokenSource.cancel('Operation canceled by the user.');
        }

        // Create a new cancel token for this request
        cancelTokenSource = axios.CancelToken.source();

        // Assuming id is included in the newData object and you're updating a specific resource identified by its id
        // Make the request with the new cancel token
        const response = await axiosAPI.post(
            `/${id}`, 
            {
                ...newData,
                _method: "PATCH",
            }, 
            { 
                cancelToken: cancelTokenSource.token,
                
        });
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

            store.dispatch(setSnackbarMessage({message: error.response.data.message}))
            store.dispatch(setSnackbarIsError({isError: true}))
            store.dispatch(handleOpenSnackbar())

            return error.response.data;
        }
    }
}

// --- DELETE TEMPLATE
export const deleteTemplate = async (axiosAPI, ids) => {
    try {
        // Convert ids array to comma-separated string
        const idList = ids.join(',');

        const response = await axiosAPI.delete(`/${idList}`);
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

        return error.response.data;
    }
}

// --- RESTORE TEMPLATE
export const restoreTemplate = async (axiosAPI, ids) => {
    try {
        // Convert ids array to comma-separated string
        const idList = ids.join(',');

        const response = await axiosAPI.put(`/restore/${idList}`);
        if(response.status === 200) {
            store.dispatch(setSnackbarMessage({message: "Items have been successfully restored."}))
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

        return error.response.data;
    }
}

// --- PERMANENT DELETE TEMPLATE
export const permanentDeleteTemplate = async (axiosAPI, ids) => {
    try {
        // Convert ids array to comma-separated string
        const idList = ids.join(',');

        const response = await axiosAPI.delete(`permanent-delete/${idList}`);
        if(response.status === 200) {
            store.dispatch(setSnackbarMessage({message: "Items have been successfully deleted permanently"}))
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
        
        return error.response.data;
    }
}