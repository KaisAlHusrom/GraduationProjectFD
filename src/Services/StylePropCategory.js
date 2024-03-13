// --------------------------------------
import config from "../../Config.json";
import axios from "axios";
const StylePropCategory_ROUTE = config.ServerMainRoute + "/style_props_categories";

//Redux 
import store from "../Redux/Store"
import { setSnackbarMessage, handleOpenSnackbar } from "../Redux/Slices/snackbarOpenSlice";


const StylePropCategoryAPI = axios.create({
    baseURL: StylePropCategory_ROUTE,
});

export const fetchStylePropCategory = async (type = "all") => {
    try {
        const relations = {
            manyToOne:[
            ],
            manyToMany:[
            ],
            oneToMany:[
                {
                    "field_name": "style_props",
                    "fetched_column": "style_prop_normal_name",
                    "related_table_id": "id",
                    fetch_all_data: null, //TODO: add fetch data
                }
            ]
        }
    
        const columns = {
            "id": "pk",
            "category_name": "string",
            "category_description": "text",
            "style_props": "one-to-many", 
        }
    
        let response;
        if (type === "deleted") {
            // Fetch deleted items
            response = await StylePropCategoryAPI.get("/fetch_deleted");
        } else {
            // Fetch regular items
            response = await StylePropCategoryAPI.get();
        }
    

        const rows = response.data.data;
        console.log(rows)
        
        return {relations, columns, rows}

    } catch (error) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

// AddStylePropCategory
export const addStylePropCategory = async ({request}) => {
    try {
        const data = await request.formData();

        const submission = {
            "category_name": data.get("category_name"),
            "category_description": data.get("category_description"),
        };

        const response = await StylePropCategoryAPI.post('', submission);
        if(response.data.success) {
            store.dispatch(setSnackbarMessage({message: "Style Prop Category added successfully"}))
            store.dispatch(handleOpenSnackbar())
        } else {
            store.dispatch(setSnackbarMessage({message: "An error occurred while attempting to add the Style Prop Category"}))
            store.dispatch(handleOpenSnackbar())
        }
        
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        return error.response.data;
    }
}

// UpdateStylePropCategory
export const updateStylePropCategory = async (id, newData) => {
    try {
        // Assuming id is included in the newData object and you're updating a specific resource identified by its id
        const response = await StylePropCategoryAPI.patch(`/` + id, newData, { method: "_PATCH" });
        console.log(response);
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        return error.response.data;
    }
};

// DeleteStylePropCategory
export const deleteStylePropCategory = async (selectedIds) => {
    try {
        // Convert selectedIds array to comma-separated string
        const idList = selectedIds.join(',');

        // Send DELETE request to the server with IDs in the URL path
        const response = await StylePropCategoryAPI.delete(`/` + idList);
        console.log(response);
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
        return error.response.data;
    }
};

// Permanent Delete Element Prop
export const permanentDeleteStylePropCategory = async (selectedIds) => {
    try {
        // Convert selectedIds array to comma-separated string
        const idList = selectedIds.join(',');

        // Send DELETE request to the server with IDs in the URL path
        const response = await StylePropCategoryAPI.delete(`permanent-delete/` + idList);
        console.log(response);
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
        return error.response.data;
    }
};

// Restore StylePropCategory
export const restoreStylePropCategory = async (selectedIds) => {
    try {
        // Convert selectedIds array to comma-separated string
        const idList = selectedIds.join(',');

        const response = await StylePropCategoryAPI.put(`/restore/` + idList);
        console.log(response);
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        return error.response.data;
    }
};