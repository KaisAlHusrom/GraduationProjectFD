export const fetchStylesProperties = async () => {
    const relations = {
        manyToOne:[

        ],
        manyToMany:[
            
        ],
        oneToMany:[
            {
                "field_name": "property_values",
                "fetched_column": "style_prop_value_css_name",
                "related_table_id": "style_prop_value_id",
                fetch_all_data: fetchStylesPropertiesValues,
            }
        ]
    }

    const columns = {
        style_prop_id: "pk",
        style_prop_normal_name: "string",
        style_prop_css_name: "string",
        style_prop_description: "text",
        style_prop_image: "image",
        style_prop_value_type: "string",
        is_section: "bool",
        is_component: "bool",
        is_element: "bool",
        property_values: "one-to-many"
    }

    const rows = [
        {
            style_prop_id: 1,
            style_prop_normal_name: "Content Shape",
            style_prop_css_name: "display",
            style_prop_description: "you can set the shape that content will take in the section or component",
            style_prop_image: null,
            style_prop_value_type: "string",
            is_section: true,
            is_component: true,
            is_element: false,
            property_values: [
                {
                    style_prop_value_id: 1,
                    style_prop_value_normal_name: "Flexible",
                    style_prop_value_css_name: "flex",
                    style_prop_value_image: null,
                },
                {
                    style_prop_value_id: 2,
                    style_prop_value_normal_name: "Grid",
                    style_prop_value_css_name: "grid",
                    style_prop_value_image: null,
                },
            ],
        },
        {
            style_prop_id: 2,
            style_prop_normal_name: "Flex Direction",
            style_prop_css_name: "flex-direction",
            style_prop_description: "Set the direction of section or component content, work only when content shape is Flexible",
            style_prop_image: null,
            style_prop_value_type: "string",
            is_section: true,
            is_component: true,
            is_element: false,
            property_values: [
                {
                    style_prop_value_id: 3,
                    style_prop_value_normal_name: "Column",
                    style_prop_value_css_name: "column",
                    style_prop_value_image: null,
                },
                {
                    style_prop_value_id: 4,
                    style_prop_value_normal_name: "Row",
                    style_prop_value_css_name: "row",
                    style_prop_value_image: null,
                },
            ],
        },
    ]

    return {relations, columns, rows}
}

export const addStyleProperty = async () => {
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


export const fetchStylesPropertiesValues = async () => {
    const relations = {
        manyToOne:[
            {
                "field_name": "style_property",
                "fetched_column": "style_prop_css_name",
                "related_table_id": "style_prop_id",
                fetch_all_data: fetchStylesProperties,
            }
        ],
        manyToMany:[
            
        ],
        oneToMany:[
            
        ]
    }

    const columns = {
        style_prop_value_id: "pk",
        style_property: "many-to-one",
        style_prop_value_normal_name: "string",
        style_prop_value_css_name: "string",
        style_prop_value_image: "image",
    }

    const rows = [
        {
            style_prop_value_id: 1,
            style_property: {
                style_prop_id: 1,
                style_prop_normal_name: "Content Shape",
                style_prop_css_name: "display",
                style_prop_description: "you can set the shape that content will take in the section or component",
                style_prop_image: null,
                style_prop_value_type: "string",
                is_section: true,
                is_component: true,
                is_element: false,
            },
            style_prop_value_normal_name: "Flexible",
            style_prop_value_css_name: "flex",
            style_prop_value_image: null,
        },
        {
            style_prop_value_id: 2,
            style_property: {
                style_prop_id: 1,
                style_prop_normal_name: "Content Shape",
                style_prop_css_name: "display",
                style_prop_description: "you can set the shape that content will take in the section or component",
                style_prop_image: null,
                style_prop_value_type: "string",
                is_section: true,
                is_component: true,
                is_element: false,
            },
            style_prop_value_normal_name: "Grid",
            style_prop_value_css_name: "grid",
            style_prop_value_image: null,
        },
        {
            style_prop_value_id: 3,
            style_property:  {
                style_prop_id: 2,
                style_prop_normal_name: "Flex Direction",
                style_prop_css_name: "flex-direction",
                style_prop_description: "Set the direction of section or component content, work only when content shape is Flexible",
                style_prop_image: null,
                style_prop_value_type: "string",
                is_section: true,
                is_component: true,
                is_element: false,
            },
            style_prop_value_normal_name: "Column",
            style_prop_value_css_name: "column",
            style_prop_value_image: null,
        },
        {
            style_prop_value_id: 4,
            style_property:  {
                style_prop_id: 2,
                style_prop_normal_name: "Flex Direction",
                style_prop_css_name: "flex-direction",
                style_prop_description: "Set the direction of section or component content, work only when content shape is Flexible",
                style_prop_image: null,
                style_prop_value_type: "string",
                is_section: true,
                is_component: true,
                is_element: false,
            },
            style_prop_value_normal_name: "Row",
            style_prop_value_css_name: "row",
            style_prop_value_image: null,
        },
    ]

    return {relations, columns, rows}
}

export const addStylePropertyValue = async () => {
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




export const fetchStylesStatus = async () => {
    const relations = {
        manyToOne:[

        ],
        manyToMany:[
            
        ],
        oneToMany:[
        ]
    }

    const columns = {
        style_status_id: "pk",
        style_status_normal_name: "string",
        style_status_css_name: "string",
        style_status_description: "text",
        style_status_image: "image",
    }

    const rows = [
        {
            style_status_id: 1,
            style_status_normal_name: "When Mouse Over",
            style_status_css_name: "hover",
            style_status_description: "when mouse be above the element or section or component",
            style_status_image: null,
        },
        {
            style_status_id: 2,
            style_status_normal_name: "When Mouse Focus",
            style_status_css_name: "focus",
            style_status_description: "when mouse keep clicking the element or section or component",
            style_status_image: null,
        },
        {
            style_status_id: 3,
            style_status_normal_name: "when input clicked",
            style_status_css_name: "active",
            style_status_description: "when text fields are clicked",
            style_status_image: null,
        },
    ]

    return {relations, columns, rows}
}

export const addStylesStatus = async () => {
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

//Break Points
export const fetchStylesBreakpoints = async () => {
    const relations = {
        manyToOne:[

        ],
        manyToMany:[
            
        ],
        oneToMany:[
        ]
    }

    const columns = {
        style_breakpoint_id: "pk",
        style_breakpoint_normal_name: "string",
        style_breakpoint_css_name: "string",
        style_breakpoint_image: "image",
        style_breakpoint_description: "text",
    }

    const rows = [
        {
            style_breakpoint_id: 1,
            style_breakpoint_normal_name: "Mobile Screen",
            style_breakpoint_css_name: "@media (max-width:500px)",
            style_breakpoint_image: null,
            style_breakpoint_description: "the styles that will active when screen size is smaller than 500px",
        },
        {
            style_breakpoint_id: 2,
            style_breakpoint_normal_name: "Tablet Screen",
            style_breakpoint_css_name: "@media (max-width:700px)",
            style_breakpoint_image: null,
            style_breakpoint_description: "the styles that will active when screen size is smaller than 700px",
        },
        {
            style_breakpoint_id: 2,
            style_breakpoint_normal_name: "Laptop Screen",
            style_breakpoint_css_name: "@media (max-width:960px)",
            style_breakpoint_image: null,
            style_breakpoint_description: "the styles that will active when screen size is smaller than 960px",
        },
    ]

    return {relations, columns, rows}
}

export const addStylesBreakpoint = async () => {
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