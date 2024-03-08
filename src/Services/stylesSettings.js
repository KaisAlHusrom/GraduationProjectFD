export const fetchStylesPropCategories = async () => {
    const relations = {
        manyToOne:[

        ],
        manyToMany:[
            
        ],
        oneToMany:[
            {
                "field_name": "style_props",
                "fetched_column": "style_prop_normal_name",
                "related_table_id": "style_prop_id",
                fetch_all_data: fetchStylesProperties,
            }
        ]
    }

    const columns = {
        style_prop_category_id: "pk",
        style_prop_category_name: "string",
        style_prop_category_description: "text",
    }

    const rows = [
        {
            style_prop_category_id: 1,
            style_prop_category_name: "Font And Text",
            style_prop_category_description: "Font properties allow you to control the appearance of text, including its color, family, size, style, weight, spacing, alignment, and decoration.",
        },
        {
            style_prop_category_id: 2,
            style_prop_category_name: "Layout",
            style_prop_category_description: "Layout properties are used to control the positioning and arrangement of elements on the page, including their display type, position within the document flow, dimensions, margins, padding, and overflow behavior.",
        },
        {
            style_prop_category_id: 3,
            style_prop_category_name: "Box Model",
            style_prop_category_description: "The box model describes the layout of elements in terms of content area, padding, border, and margin. These properties define the space around and within an element.",
        },
        {
            style_prop_category_id: 4,
            style_prop_category_name: "Backgrounds and Borders:",
            style_prop_category_description: "Background and border properties are used to style the background and border of elements, including setting background color, image, repeat, position, size, and border width, style, and radius.",
        },
        {
            style_prop_category_id: 5,
            style_prop_category_name: "Lists",
            style_prop_category_description: "List properties are used to style lists, including specifying list type, position, and marker style.",
        },
        {
            style_prop_category_id: 6,
            style_prop_category_name: "Tables",
            style_prop_category_description: "Table properties control the layout and appearance of tables and their elements, including border collapse, spacing, caption position, and handling of empty cells.",
        },
        {
            style_prop_category_id: 7,
            style_prop_category_name: "Images",
            style_prop_category_description: "Image properties are used to control the display and behavior of images, including their size, positioning, and how they fit within their containers.",
        },
        {
            style_prop_category_id: 8,
            style_prop_category_name: "Images",
            style_prop_category_description: "Image properties are used to control the display and behavior of images, including their size, positioning, and how they fit within their containers.",
        },

    ]

    return {relations, columns, rows}
}

export const fetchStylesProperties = async () => {
    const relations = {
        manyToOne:[
            {
                "field_name": "style_prop_category",
                "fetched_column": "style_prop_category_name",
                "related_table_id": "style_prop_category_id",
                fetch_all_data: fetchStylesPropCategories,
            }
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
        style_prop_category: "many-to-one",
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
            style_prop_id: 101,
            
            style_prop_normal_name: "Font Color",
            style_prop_css_name: "color",
            style_prop_description: "you can set the color font of elements",
            style_prop_image: null,
            style_prop_value_type: "color",
            is_section: false,
            is_component: false,
            is_element: true,
            property_values: [
            ],
        },
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
            style_prop_css_name: "flexDirection",
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
        {
            style_prop_id: 3,
            style_prop_normal_name: "border width",
            style_prop_css_name: "borderWidth",
            style_prop_description: "the border width of element, component or section",
            style_prop_image: null,
            style_prop_value_type: "number",
            is_section: true,
            is_component: true,
            is_element: true,
            property_values: [

            ],
        },
        {
            style_prop_id: 4,
            style_prop_normal_name: "border style",
            style_prop_css_name: "borderStyle",
            style_prop_description: "the border style of element, component or section",
            style_prop_image: null,
            style_prop_value_type: "string",
            is_section: true,
            is_component: true,
            is_element: true,
            property_values: [
                {
                    style_prop_value_id: 5,
                    style_prop_value_normal_name: "Dotted",
                    style_prop_value_css_name: "dotted ",
                    style_prop_value_image: null,
                },
                {
                    style_prop_value_id: 6,
                    style_prop_value_normal_name: "Dashed",
                    style_prop_value_css_name: "dashed",
                    style_prop_value_image: null,
                },
                {
                    style_prop_value_id: 7,
                    style_prop_value_normal_name: "Solid",
                    style_prop_value_css_name: "solid",
                    style_prop_value_image: null,
                },
                {
                    style_prop_value_id: 8,
                    style_prop_value_normal_name: "Double ",
                    style_prop_value_css_name: "double ",
                    style_prop_value_image: null,
                },
                {
                    style_prop_value_id: 9,
                    style_prop_value_normal_name: "Groove",
                    style_prop_value_css_name: "groove",
                    style_prop_value_image: null,
                },
                {
                    style_prop_value_id: 10,
                    style_prop_value_normal_name: "Ridge",
                    style_prop_value_css_name: "ridge",
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
        {
            style_prop_value_id: 5,
            style_property:  {
                style_prop_id: 4,
                style_prop_normal_name: "border style",
                style_prop_css_name: "borderStyle",
                style_prop_description: "the border style of element, component or section",
                style_prop_image: null,
                style_prop_value_type: "string",
                is_section: true,
                is_component: true,
                is_element: true,
            },
            style_prop_value_normal_name: "Dotted",
            style_prop_value_css_name: "dotted ",
            style_prop_value_image: null,
        },
        {
            style_prop_value_id: 6,
            style_prop_value_normal_name: "Dashed",
            style_prop_value_css_name: "dashed",
            style_prop_value_image: null,
            style_property:  {
                style_prop_id: 4,
                style_prop_normal_name: "border style",
                style_prop_css_name: "borderStyle",
                style_prop_description: "the border style of element, component or section",
                style_prop_image: null,
                style_prop_value_type: "string",
                is_section: true,
                is_component: true,
                is_element: true,
            },
        },
        {
            style_prop_value_id: 7,
            style_prop_value_normal_name: "Solid",
            style_prop_value_css_name: "solid",
            style_prop_value_image: null,
            style_property:  {
                style_prop_id: 4,
                style_prop_normal_name: "border style",
                style_prop_css_name: "borderStyle",
                style_prop_description: "the border style of element, component or section",
                style_prop_image: null,
                style_prop_value_type: "string",
                is_section: true,
                is_component: true,
                is_element: true,
            },
        },
        {
            style_prop_value_id: 8,
            style_prop_value_normal_name: "Double ",
            style_prop_value_css_name: "double ",
            style_prop_value_image: null,
            style_property:  {
                style_prop_id: 4,
                style_prop_normal_name: "border style",
                style_prop_css_name: "borderStyle",
                style_prop_description: "the border style of element, component or section",
                style_prop_image: null,
                style_prop_value_type: "string",
                is_section: true,
                is_component: true,
                is_element: true,
            },
        },
        {
            style_prop_value_id: 9,
            style_prop_value_normal_name: "Groove",
            style_prop_value_css_name: "groove",
            style_prop_value_image: null,
            style_property:  {
                style_prop_id: 4,
                style_prop_normal_name: "border style",
                style_prop_css_name: "borderStyle",
                style_prop_description: "the border style of element, component or section",
                style_prop_image: null,
                style_prop_value_type: "string",
                is_section: true,
                is_component: true,
                is_element: true,
            },
        },
        {
            style_prop_value_id: 10,
            style_prop_value_normal_name: "Ridge",
            style_prop_value_css_name: "ridge",
            style_prop_value_image: null,
            style_property:  {
                style_prop_id: 4,
                style_prop_normal_name: "border style",
                style_prop_css_name: "borderStyle",
                style_prop_description: "the border style of element, component or section",
                style_prop_image: null,
                style_prop_value_type: "string",
                is_section: true,
                is_component: true,
                is_element: true,
            },
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
            style_status_id: 1000,
            style_status_normal_name: "Default",
            style_status_css_name: "",
            style_status_description: "",
            style_status_image: null,
        },
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
            style_breakpoint_id: 10001,
            style_breakpoint_normal_name: "Default",
            style_breakpoint_css_name: "",
            style_breakpoint_image: null,
            style_breakpoint_description: "",
        },
        {
            style_breakpoint_id: 1,
            style_breakpoint_normal_name: "Mobile Screen",
            style_breakpoint_css_name: "@media (maxWidth: 500px)",
            style_breakpoint_image: null,
            style_breakpoint_description: "the styles that will active when screen size is smaller than 500px",
        },
        {
            style_breakpoint_id: 2,
            style_breakpoint_normal_name: "Tablet Screen",
            style_breakpoint_css_name: "@media (maxWidth: 700px)",
            style_breakpoint_image: null,
            style_breakpoint_description: "the styles that will active when screen size is smaller than 700px",
        },
        {
            style_breakpoint_id: 3,
            style_breakpoint_normal_name: "Laptop Screen",
            style_breakpoint_css_name: "@media (maxWidth: 960px)",
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

//element style properties
export const fetchElementStyleProperties = async () => {
    const {rows} = await fetchStylesProperties()
    
    const elementStyleProps = rows.filter(row => row.is_element)
    return elementStyleProps;
}