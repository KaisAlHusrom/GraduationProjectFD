import { fetchElementsTypes } from "./elementsTypesService"

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
            "elements_types": JSON.parse(data.get("elements_types")),
        };

        
        const response = await ElementPropsAPI.post('', submission);
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
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

export const deleteElementProp= async (id) => {
    try {
        // Assuming id is included in the newData object and you're updating a specific resource identified by its id
        const response = await ElementPropsAPI.delete(`/${id}`);
        console.log(response);
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        return error.response.data;
    }
};

//Restore deleted items
export const restoreElementProp = async (id) => {
    try {
        // Assuming id is included in the newData object and you're updating a specific resource identified by its id
        const response = await ElementPropsAPI.put(`/restore/${id}`);
        console.log(response);
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        return error.response.data;
    }
};