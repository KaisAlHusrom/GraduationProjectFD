import { fetchElementProps } from "./elementPropsService"
import axios from "axios";



const rows2 = [
    {
        element_type_id: 1,
        element_type: "TextField Strings",
        element_type_description: "to input texts",
        element_props: [
            {
                element_prop_id: 1,
                element_prop_name: "name",
                element_prop_description: "the name prop to input fields",
            },
            {
                element_prop_id: 2,
                element_prop_name: "value",
                element_prop_description: "the value prop to input fields",
            },
        ],
        is_child: false,
        children: null
    },
    {
        element_type_id: 2,
        element_type: "TextField Numbers",
        element_type_description: "to input numbers",
        element_props: [
            {
                element_prop_id: 1,
                element_prop_name: "name",
                element_prop_description: "the name prop to input fields",
            },
            {
                element_prop_id: 2,
                element_prop_name: "value",
                element_prop_description: "the value prop to input fields",
            },
        ],
        is_child: false,
        children: null,
    },
    {
        element_type_id: 3,
        element_type: "TextField files",
        element_type_description: "to upload files",
        element_props: [
            {
                element_prop_id: 1,
                element_prop_name: "name",
                element_prop_description: "the name prop to input fields",
            },
            {
                element_prop_id: 2,
                element_prop_name: "value",
                element_prop_description: "the value prop to input fields",
            },
        ],
        is_child: false,
        children: null,
    },
    {
        element_type_id: 4,
        element_type: "Heading 1",
        element_type_description: "Biggest Title",
        element_props: [
        ],
        is_child: false,
        children: null,
    },
    {
        element_type_id: 5,
        element_type: "Heading 2",
        element_type_description: "more big Title",
        element_props: [
        ],
        is_child: false,
        children: null,
    },
    {
        element_type_id: 6,
        element_type: "Heading 3",
        element_type_description: "big Title",
        element_props: [
        ],
        is_child: false,
        children: null,
    },
    {
        element_type_id: 7,
        element_type: "Heading 4",
        element_type_description: "small Title",
        element_props: [
        ],
        is_child: false,
        children: null,
    },
    {
        element_type_id: 8,
        element_type: "Heading 5",
        element_type_description: "more small Title",
        element_props: [
        ],
        is_child: false,
        children: null,
    },
    {
        element_type_id: 9,
        element_type: "Heading 6",
        element_type_description: "smallest Title",
        element_props: [
        ],
        is_child: false,
        children: null,
    },
    {
        element_type_id: 10,
        element_type: "Subtitle 1",
        element_type_description: "Big Subtitle",
        element_props: [
        ],
        is_child: false,
        children: null,
    },
    {
        element_type_id: 11,
        element_type: "Subtitle 2",
        element_type_description: "Small Subtitle",
        element_props: [
        ],
        is_child: false,
        children: null,
    },
    {
        element_type_id: 12,
        element_type: "body 1",
        element_type_description: "big text",
        element_props: [
        ],
        is_child: false,
        children: null,
    },
    {
        element_type_id: 13,
        element_type: "body 2",
        element_type_description: "small text",
        element_props: [
        ],
        is_child: false,
        children: null,
    },
    {
        element_type_id: 14,
        element_type: "Normal link",
        element_type_description: "Normal links",
        element_props: [
            {
                element_prop_id: 3,
                element_prop_name: "href",
                element_prop_description: "the href prop to <a href=''></a>",
            },
        ],
        is_child: false,
        children: null,
    },
    {
        element_type_id: 100,
        element_type: "Lazy link",
        element_type_description: "Links that download new page lazy",
        element_props: [
            {
                element_prop_id: 4,
                element_prop_name: "to",
                element_prop_description: "the to prop to <NavLink to=''></NavLink>",
            }
        ],
        is_child: false,
        children: null,
    },
    {
        element_type_id: 15,
        element_type: "list item",
        element_type_description: "the list items used in List component",
        element_props: [
        ],
        is_child: true,
        children: null,
    },
    {
        element_type_id: 16,
        element_type: "unordered list", 
        element_type_description: "the unordered list element came with ul",
        element_props: [
        ],
        is_child: false,
        children: [
            {
                element_type_id: 15,
                element_type: "list item",
                element_type_description: "the list items used in List element",
                element_props: [
                ],
                is_child: true,
                children: null,
            }
        ],
    },
    {
        element_type_id: 17,
        element_type: "ordered list", 
        element_type_description: "the ordered list element came with ol",
        element_props: [
        ],
        is_child: false,
        children: [
            {
                element_type_id: 15,
                element_type: "list item",
                element_type_description: "the list items used in List element",
                element_props: [
                ],
                is_child: true,
                children: null,
            }
        ],
    },
    {
        element_type_id: 18,
        element_type: "table head",
        element_type_description: "The header row in the table <th></th>",
        element_props: [
        ],
        is_child: true,
        children: [
            {
                element_type_id: 20,
                element_type: "table row",
                element_type_description: "The rows of tables in the table <tr></tr>",
                element_props: [
                ],
                is_child: true,
                children: [
                    {
                        element_type_id: 21,
                        element_type: "table cell",
                        element_type_description: "The cells of tables in the table <td></td>",
                        element_props: [
                        ],
                        is_child: true,
                        children: null,
                    },
                ],
            },
        ],
    },
    {
        element_type_id: 19,
        element_type: "table body",
        element_type_description: "The body rows in the table <tbody></tbody>",
        element_props: [
        ],
        is_child: true,
        children: [
            {
                element_type_id: 20,
                element_type: "table row",
                element_type_description: "The rows of tables in the table <tr></tr>",
                element_props: [
                ],
                is_child: true,
                children: [
                    {
                        element_type_id: 21,
                        element_type: "table cell",
                        element_type_description: "The cells of tables in the table <td></td>",
                        element_props: [
                        ],
                        is_child: true,
                        children: null,
                    },
                ],
            },
        ],
    },
    {
        element_type_id: 102,
        element_type: "table foot",
        element_type_description: "The footer row in the table <th></th>",
        element_props: [
        ],
        is_child: true,
        children: [
            {
                element_type_id: 20,
                element_type: "table row",
                element_type_description: "The rows of tables in the table <tr></tr>",
                element_props: [
                ],
                is_child: true,
                children: [
                    {
                        element_type_id: 21,
                        element_type: "table cell",
                        element_type_description: "The cells of tables in the table <td></td>",
                        element_props: [
                        ],
                        is_child: true,
                        children: null,
                    },
                ],
            },
        ],
    },
    {
        element_type_id: 20,
        element_type: "table row",
        element_type_description: "The rows of tables in the table <tr></tr>",
        element_props: [
        ],
        is_child: true,
        children: [
            {
                element_type_id: 21,
                element_type: "table cell",
                element_type_description: "The cells of tables in the table <td></td>",
                element_props: [
                ],
                is_child: true,
                children: null,
            },
        ],
    },
    {
        element_type_id: 21,
        element_type: "table cell",
        element_type_description: "The cells of tables in the table <td></td>",
        element_props: [
        ],
        is_child: true,
        children: null,
    },
    {
        element_type_id: 150,
        element_type: "table caption",
        element_type_description: "The caption of table <caption></caption>",
        element_props: [
        ],
        is_child: true,
        children: null,
    },
    {
        element_type_id: 22,
        element_type: "table",
        element_type_description: "Table Elements",
        element_props: [
        ],
        is_child: false,
        children: [
            {
                element_type_id: 150,
                element_type: "table caption",
                element_type_description: "The caption of table <caption></caption>",
                element_props: [
                ],
                is_child: true,
                children: null,
            },
            {
                element_type_id: 18,
                element_type: "table head",
                element_type_description: "The header row in the table <th></th>",
                element_props: [
                ],
                is_child: true,
                children: [

                    {
                        element_type_id: 20,
                        element_type: "table row",
                        element_type_description: "The rows of tables in the table <tr></tr>",
                        element_props: [
                        ],
                        is_child: true,
                        children: [
                            {
                                element_type_id: 21,
                                element_type: "table cell",
                                element_type_description: "The cells of tables in the table <td></td>",
                                element_props: [
                                ],
                                is_child: true,
                                children: null,
                            },
                        ],
                    },
                ],
            },
            {
                element_type_id: 19,
                element_type: "table body",
                element_type_description: "The body rows in the table <tbody></tbody>",
                element_props: [
                ],
                is_child: true,
                children: [
                    {
                        element_type_id: 20,
                        element_type: "table row",
                        element_type_description: "The rows of tables in the table <tr></tr>",
                        element_props: [
                        ],
                        is_child: true,
                        children: [
                            {
                                element_type_id: 21,
                                element_type: "table cell",
                                element_type_description: "The cells of tables in the table <td></td>",
                                element_props: [
                                ],
                                is_child: true,
                                children: null,
                            },
                        ],
                    },
                ],
            },
            {
                element_type_id: 102,
                element_type: "table foot",
                element_type_description: "The footer row in the table <th></th>",
                element_props: [
                ],
                is_child: true,
                children: [
                    {
                        element_type_id: 20,
                        element_type: "table row",
                        element_type_description: "The rows of tables in the table <tr></tr>",
                        element_props: [
                        ],
                        is_child: true,
                        children: [
                            {
                                element_type_id: 21,
                                element_type: "table cell",
                                element_type_description: "The cells of tables in the table <td></td>",
                                element_props: [
                                ],
                                is_child: true,
                                children: null,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        element_type_id: 23,
        element_type: "Text Area",
        element_type_description: "Represents a multiline text input control.",
        element_props: [
            {
                element_prop_id: 1,
                element_prop_name: "name",
                element_prop_description: "the name prop to input fields",
            },
            {
                element_prop_id: 2,
                element_prop_name: "value",
                element_prop_description: "the value prop to input fields",
            },
        ],
        is_child: false,
        children: null,
    },
    {
        element_type_id: 24,
        element_type: "Select Option",
        element_type_description: " Represents an option in a <select> element.",
        element_props: [
            {
                element_prop_id: 2,
                element_prop_name: "value",
                element_prop_description: "the value prop to input fields",
            },
        ],
        is_child: true,
        children: null,
    },
    {
        element_type_id: 25,
        element_type: "Select",
        element_type_description: "Represents a dropdown list.",
        element_props: [
            {
                element_prop_id: 1,
                element_prop_name: "name",
                element_prop_description: "the name prop to input fields",
            },
        ],
        is_child: false,
        children: [
            {
                element_type_id: 24,
                element_type: "Select Option",
                element_type_description: " Represents an option in a <select> element.",
                is_child: true,
                children: null,
            }
        ],
    },
    {
        element_type_id: 26,
        element_type: "Button",
        element_type_description: "Defines a clickable button.",
        element_props: [
        ],
        is_child: false,
        children: [
        ],
    },
    {
        element_type_id: 27,
        element_type: "Image",
        element_type_description: "Embeds an image",
        element_props: [
        ],
        is_child: false,
        children: [
        ],
    },
    {
        element_type_id: 28,
        element_type: "Audio",
        element_type_description: "Embeds audio content",
        element_props: [
        ],
        is_child: false,
        children: [
        ],
    },
    {
        element_type_id: 29,
        element_type: "Video",
        element_type_description: "Embeds video content",
        element_props: [
        ],
        is_child: false,
        children: [
        ],
    },
    {
        element_type_id: 30,
        element_type: "Iframe",
        element_type_description: "Embeds another HTML page in the current document.",
        element_props: [
        ],
        is_child: false,
        children: [
        ],
    },
    
]

// -------------------------------------- 
import config from "../../Config.json"
const ELEMENTS_TYPES_ROUTE = config.ServerMainRoute + "/element_types"

const ElementTypesAPI = axios.create({
    baseURL: ELEMENTS_TYPES_ROUTE,
  });

//---------------------------------------


export const fetchElementsTypes = async (type = "all") => {
    try {
        const relations = {
            manyToOne:[
                {
                    "field_name": "parent",
                    "fetched_column": "element_type_name",
                    "related_table_id": "id",
                    add_to_add_form: true,
                    fetch_all_data: fetchElementsTypes, //TODO: convert this to fetch the elements that has true value in is_child column
                }
            ],
            manyToMany:[
                {
                    "field_name": "element_props",
                    "fetched_column": "element_prop_name",
                    "related_table_id": "id",
                    add_to_add_form: true,
                    fetch_all_data: fetchElementProps,
                }
            ],
            oneToMany:[
                {
                    "field_name": "children",
                    "fetched_column": "element_type_name",
                    "related_table_id": "id",
                    add_to_add_form: false,
                    fetch_all_data: fetchElementsTypes, //TODO: convert this to fetch the elements that has true value in is_child column
                }
            ]
        }
    
        const columns = {
            id: "pk",
            element_type_name: "string",
            element_type_description: "text",
            element_props: "many-to-many",
            is_child: "bool",
            children: "one-to-many",
            parent: "many-to-one",
            created_at: "dateTime",
            updated_at: "dateTime",
        }

        let response;
        if (type === "deleted") {
            // Fetch deleted items
            response = await ElementTypesAPI.get("/fetch_deleted");
        } else {
            // Fetch regular items
            response = await ElementTypesAPI.get();
        }

        const rows = response.data.data;

        // Return data including relations, columns, and rows
        return { relations, columns, rows };

    } catch (error) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }

}


export const addElementType = async ({request}) => {
    try {
        const data = await request.formData();

        const submission = {
            "element_type_name": data.get("element_type_name"),
            "element_type_description": data.get("element_type_description"),
            "is_child": data.get("is_child") === "on" ? true : false,
            "parent_id": data.get("parent") === "" ? null : data.get("parent"),
            "element_props": JSON.parse(data.get("element_props")),
        };


        const response = await ElementTypesAPI.post('', submission);
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        return error.response.data;
    }
}

export const updateElementType = async (id, newData) => {
    try {
        // Assuming id is included in the newData object and you're updating a specific resource identified by its id
        const response = await ElementTypesAPI.patch(`/${id}`, newData, { method: "_PATCH" });
        console.log(response);
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        return error.response.data;
    }
};

export const deleteElementType = async (id) => {
    try {
        // Assuming id is included in the newData object and you're updating a specific resource identified by its id
        const response = await ElementTypesAPI.delete(`/${id}`);
        console.log(response);
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        return error.response.data;
    }
};

//Restore deleted items
export const restoreElementType = async (id) => {
    try {
        // Assuming id is included in the newData object and you're updating a specific resource identified by its id
        const response = await ElementTypesAPI.put(`/restore/${id}`);
        console.log(response);
        // Process the response data as needed
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        return error.response.data;
    }
};
