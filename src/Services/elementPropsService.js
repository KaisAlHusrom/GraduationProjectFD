import { fetchElementsTypes } from "./elementsTypesService"

//Redux 
import store from "../Redux/Store"
import { setSnackbarMessage, handleOpenSnackbar } from "../Redux/Slices/snackbarOpenSlice";

// -------------------------------------- 
import config from "../../Config.json"
import axios from "axios";
const ELEMENTS_PROPS_ROUTE = config.ServerMainRoute + "/element_props"

const ElementPropsAPI = axios.create({
    baseURL: ELEMENTS_PROPS_ROUTE,
  });

export const fetchElementProps = async (type = "all") => {
    try {
        const relations = {
            manyToOne:[
                
            ],
            manyToMany:[
                {
                    "field_name": "element_types",
                    "fetched_column": "element_type_name",
                    "related_table_id": "id",
                    add_to_add_form: true,
                    fetch_all_data: fetchElementsTypes,
                }
            ],
            oneToMany:[
                
            ]
        }
    
        const columns = {
            id: "pk",
            element_prop_name: "string",
            element_prop_description: "text",
            element_types: "many-to-many",
        }
    
        let response;
        if (type === "deleted") {
            // Fetch deleted items
            response = await ElementPropsAPI.get("/fetch_deleted");
        } else {
            // Fetch regular items
            response = await ElementPropsAPI.get();
        }
    
        const rows = response.data.data;
        console.log(rows)
    
        return {relations, columns, rows}
    } catch (error) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

export const addElementProp = async ({request}) => {
    try {
        const data = await request.formData();

        const submission = {
            "element_prop_name": data.get("element_prop_name"),
            "element_prop_description": data.get("element_prop_description"),
            "elementTypes": JSON.parse(data.get("element_types")),
        };

        console.log(submission)
        const response = await ElementPropsAPI.post('', submission);
        if(response.data.success) {
            store.dispatch(setSnackbarMessage({message: response.data.message}))
            store.dispatch(handleOpenSnackbar())
        } else {
            store.dispatch(setSnackbarMessage({message: response.data.error}))
            store.dispatch(handleOpenSnackbar())
        }

        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        
        store.dispatch(setSnackbarMessage({message: error.response.data.error}))
        store.dispatch(handleOpenSnackbar())

        return error.response.data;
    }


}

export const updateElementProp = async (id, newData) => {
    try {
        // Assuming id is included in the newData object and you're updating a specific resource identified by its id
        const response = await ElementPropsAPI.patch(`/${id}`, newData, { method: "_PATCH" });
        console.log(response);
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        return error.response.data;
    }
};

export const deleteElementProp = async (selectedIds) => {
    try {
        // Convert selectedIds array to comma-separated string
        const idList = selectedIds.join(',');

        // Send DELETE request to the server with IDs in the URL path
        const response = await ElementPropsAPI.delete(`/${idList}`);
        console.log(response);
        
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
        return error.response.data;
    }
};

export const permanentDeleteElementProp = async (selectedIds) => {
    try {
        // Convert selectedIds array to comma-separated string
        const idList = selectedIds.join(',');

        // Send DELETE request to the server with IDs in the URL path
        const response = await ElementPropsAPI.delete(`permanent-delete/${idList}`);
        console.log(response);
        
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
        return error.response.data;
    }
};


//Restore deleted items
export const restoreElementProp = async (selectedIds) => {
    try {
        // Convert selectedIds array to comma-separated string
        const idList = selectedIds.join(',');

        const response = await ElementPropsAPI.put(`/restore/${idList}`);
        console.log(response);
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        return error.response.data;
    }
};