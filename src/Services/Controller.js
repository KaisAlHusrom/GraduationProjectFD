import axios from "axios";

// Configure axios to include credentials (cookies) with each request
// axios.defaults.withCredentials = true;


//Redux 
import store from "../Redux/Store"
import { setSnackbarMessage, handleOpenSnackbar, setSnackbarIsError } from "../Redux/Slices/snackbarOpenSlice";


//function to change bool fields to 1 and 0
function updateBoolean(newData) {

    Object.keys(newData).forEach(key => {
        // Get the value corresponding to the key
        let value = newData[key];
    
        // Check if the key starts with "is_" or "not_"
        if (key.startsWith('is_') || key.startsWith('not_')) {
            // Convert boolean value to 1 or 0
            value = value ? 1 : 0;
        }
    
        // Update the value in the newData object
        newData[key] = value;
    });
    

    return newData;
}


// --- FETCH DATA TEMPLATE 


export const fetchDataTemplate = async (axiosAPI, type = "all", pageNumber = 1, filters = [], sorts = [], searchQuery = null, perPage=10) => {
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
export const addDataTemplate = async (axiosAPI, data) => {
    try {
        const updatedData = updateBoolean(data)
        const response = await axiosAPI.post('', updatedData);
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
        const response = await axiosAPI.post(
            `/${id}`, 
            {
                ...updatedData,
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

// fetch specific record
export const fetchSpecificRecordTemplate = async (axiosAPI, id) => {
    try {
        

        const response = await axiosAPI.get(`fetch/${id}`);
        // if(response.status === 200) {
        //     store.dispatch(setSnackbarMessage({message: "C"}))
        //     store.dispatch(setSnackbarIsError({isError: false}))
        //     store.dispatch(handleOpenSnackbar())
        // }
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);

        // store.dispatch(setSnackbarMessage({message: error.response.data.message}))
        // store.dispatch(setSnackbarIsError({isError: true}))
        // store.dispatch(handleOpenSnackbar())
        
        return error.response.data;
    }
}

//check if record exist 
export const checkIfRecordExistTemplate = async (axiosAPI, id) => {
    try {
        

        const response = await axiosAPI.get(`check/${id}`);
        // if(response.status === 200) {
        //     store.dispatch(setSnackbarMessage({message: "C"}))
        //     store.dispatch(setSnackbarIsError({isError: false}))
        //     store.dispatch(handleOpenSnackbar())
        // }
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