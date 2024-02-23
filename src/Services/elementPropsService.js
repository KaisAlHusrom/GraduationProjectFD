import { fetchElementsTypes } from "./elementsTypesService"

export const fetchElementProps = async () => {
    const relations = {
        manyToOne:[
            
        ],
        manyToMany:[
            {
                "field_name": "element_type",
                "fetched_column": "element_type",
                "related_table_id": "element_type_id",
                fetch_all_data: fetchElementsTypes,
            }
        ],
        oneToMany:[
            
        ]
    }

    const columns = {
        element_prop_id: "pk",
        element_prop_name: "string",
        element_prop_description: "text",
        element_type: "many-to-many",
    }

    const rows = [
        {
            element_prop_id: 1,
            element_prop_name: "name",
            element_prop_description: "the name prop to input fields",
            element_type: [
                {
                    element_type_id: 1,
                    element_type: "TextField Strings",
                    element_type_description: "to input texts",
                }
            ],
        },
        {
            element_prop_id: 2,
            element_prop_name: "value",
            element_prop_description: "the value prop to input fields",
            element_type: [
                {
                    element_type_id: 1,
                    element_type: "TextField Strings",
                    element_type_description: "to input texts",
                }
            ],
        },
        {
            element_prop_id: 3,
            element_prop_name: "href",
            element_prop_description: "the href prop to <a href=''></a>",
            element_type: [
                {
                    element_type_id: 14,
                    element_type: "Normal link",
                    element_type_description: "Normal links",
                    is_child: false,
                    children: null,
                }
            ],
        },
        {
            element_prop_id: 4,
            element_prop_name: "to",
            element_prop_description: "the to prop to <NavLink to=''></NavLink>",
            element_type: [
                {
                    element_type_id: 100,
                    element_type: "Lazy link",
                    element_type_description: "Links that download new page lazy",
                    is_child: false,
                    children: null,
                }
            ],
        }
    ]

    return {relations, columns, rows}
}

export const addElementProp = async () => {
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