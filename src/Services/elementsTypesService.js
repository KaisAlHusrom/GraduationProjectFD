import { fetchElementProps } from "./elementPropsService"

export const fetchElementsTypes = async () => {
    const relations = {
        manyToOne:[

        ],
        manyToMany:[
            {
                "field_name": "element_props",
                "fetched_column": "element_prop_name",
                "related_table_id": "element_prop_id",
                fetch_all_data: fetchElementProps,
            }
        ],
        oneToMany:[
            
        ]
    }

    const columns = {
        element_type_id: "pk",
        element_type: "string",
        element_type_description: "text",
        element_props: "many-to-many",
    }

    const rows = [
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
        }
    ]

    return {relations, columns, rows}
}

export const addElementType = async () => {
    // const data = await request.formData()

    const submission = {
        // email: data.get("email"),
        // full_name: data.get("full_name"),
        // password: data.get("password"),
    }
    
    console.log(submission)

    //Send Post Request To The Server,



    return {error: null}
}