import { v4 as uuidv4 } from 'uuid'; // UUID oluşturmak için





export const createEmptyComponent = (section_css_props) => {
    return {
        section_component_id: uuidv4(), // Generate a random integer between 0 and 999999
        "component_title": "About Header",
        "component_description": "lorem ipsum ....",
        "is_template": true,
        "mobile_columns_count": 12,
        "tablet_columns_count": 4,
        "laptop_columns_count": 3,
        "section_css_props": section_css_props,
        "pivot": {
            "section_id": 3,
            "section_component_id": 10,
            "created_at": "2022-01-01 13:00:00",
            "updated_at": "2022-01-01 13:30:00"
        },
        "component_elements": []
    };
    
}





export const createEmptyElement = (selectedComponentId ,element_type , element_content) => {
    return {
        "component_element_id": uuidv4(),
        "element_name": "adding",
        "element_description": "lorem ipsum dolor sit amet, consectetur adip...",
        "is_element": true,
        "element": {
            "element_type_id": 4,
            "element_type": element_type,
            "type_description": "this type return Typography with variant h3 tag in codes"
        },
        "element_content": element_content,
        "section_css_props": [
            {
                "section_css_prop_id": 15,
                "section_id": null,
                "component_id": 10,
                "element_id": null,
                "css_prop": {
                    "prop_id": 1,
                    "prop_name": "textAlign",
                    "prop_description": "lorem ipsum ....",
                    "is_section": false,
                    "is_component": false,
                    "is_element": true
                },
                "css_status": null,
                "css_responsive_status": null,
                "css_prop_value": "center",
                "pivot": {
                    "section_id": null,
                    "component_id": 10,
                    "element_id": null,
                    "section_css_prop_id": 15,
                    "created_at": "2022-01-01 13:00:00",
                    "updated_at": "2022-01-01 13:30:00"
                }
            },
            {
                "section_css_prop_id": 15,
                "section_id": null,
                "component_id": 10,
                "element_id": null,
                "css_prop": {
                    "prop_id": 1,
                    "prop_name": "backgroundColor",
                    "prop_description": "lorem ipsum ....",
                    "is_section": false,
                    "is_component": false,
                    "is_element": true
                },
                "css_status": null,
                "css_responsive_status": null,
                "css_prop_value": "transparent",
                "pivot": {
                    "section_id": null,
                    "component_id": 10,
                    "element_id": null,
                    "section_css_prop_id": 15,
                    "created_at": "2022-01-01 13:00:00",
                    "updated_at": "2022-01-01 13:30:00"
                }
            },
            {
                "section_css_prop_id": 15,
                "section_id": null,
                "component_id": 10,
                "element_id": null,
                "css_prop": {
                    "prop_id": 1,
                    "prop_name": "padding",
                    "prop_description": "lorem ipsum ....",
                    "is_section": false,
                    "is_component": false,
                    "is_element": true
                },
                "css_status": null,
                "css_responsive_status": null,
                "css_prop_value": "10px",
                "pivot": {
                    "section_id": null,
                    "component_id": 10,
                    "element_id": null,
                    "section_css_prop_id": 15,
                    "created_at": "2022-01-01 13:00:00",
                    "updated_at": "2022-01-01 13:30:00"
                }
            },
            {
                "section_css_prop_id": 15,
                "section_id": null,
                "component_id": 10,
                "element_id": null,
                "css_prop": {
                    "prop_id": 1,
                    "prop_name": "color",
                    "prop_description": "lorem ipsum ....",
                    "is_section": false,
                    "is_component": false,
                    "is_element": true
                },
                "css_status": null,
                "css_responsive_status": null,
                "css_prop_value": "black",
                "pivot": {
                    "section_id": null,
                    "component_id": 10,
                    "element_id": null,
                    "section_css_prop_id": 15,
                    "created_at": "2022-01-01 13:00:00",
                    "updated_at": "2022-01-01 13:30:00"
                }
            },
            {
                "section_css_prop_id": 15,
                "section_id": null,
                "component_id": 10,
                "element_id": null,
                "css_prop": {
                    "prop_id": 1,
                    "prop_name": "borderRadius",
                    "prop_description": "lorem ipsum ....",
                    "is_section": false,
                    "is_component": false,
                    "is_element": true
                },
                "css_status": null,
                "css_responsive_status": null,
                "css_prop_value": "5px",
                "pivot": {
                    "section_id": null,
                    "component_id": 10,
                    "element_id": null,
                    "section_css_prop_id": 15,
                    "created_at": "2022-01-01 13:00:00",
                    "updated_at": "2022-01-01 13:30:00"
                }
            },
            {
                "section_css_prop_id": 15,
                "section_id": null,
                "component_id": 10,
                "element_id": null,
                "css_prop": {
                    "prop_id": 1,
                    "prop_name": "fontSize",
                    "prop_description": "lorem ipsum ....",
                    "is_section": false,
                    "is_component": false,
                    "is_element": true
                },
                "css_status": null,
                "css_responsive_status": null,
                "css_prop_value": "30px",
                "pivot": {
                    "section_id": null,
                    "component_id": 10,
                    "element_id": null,
                    "section_css_prop_id": 15,
                    "created_at": "2022-01-01 13:00:00",
                    "updated_at": "2022-01-01 13:30:00"
                }
            },
            {
                "section_css_prop_id": 15,
                "section_id": null,
                "component_id": 10,
                "element_id": null,
                "css_prop": {
                    "prop_id": 1,
                    "prop_name": "fontWeight",
                    "prop_description": "lorem ipsum ....",
                    "is_section": false,
                    "is_component": false,
                    "is_element": true
                },
                "css_status": null,
                "css_responsive_status": null,
                "css_prop_value": "700",
                "pivot": {
                    "section_id": null,
                    "component_id": 10,
                    "element_id": null,
                    "section_css_prop_id": 15,
                    "created_at": "2022-01-01 13:00:00",
                    "updated_at": "2022-01-01 13:30:00"
                }
            },
            {
                "section_css_prop_id": 15,
                "section_id": null,
                "component_id": 10,
                "element_id": null,
                "css_prop": {
                    "prop_id": 1,
                    "prop_name": "margin",
                    "prop_description": "lorem ipsum ....",
                    "is_section": false,
                    "is_component": false,
                    "is_element": true
                },
                "css_status": null,
                "css_responsive_status": null,
                "css_prop_value": "auto",
                "pivot": {
                    "section_id": null,
                    "component_id": 10,
                    "element_id": null,
                    "section_css_prop_id": 15,
                    "created_at": "2022-01-01 13:00:00",
                    "updated_at": "2022-01-01 13:30:00"
                }
            },
            {
                "section_css_prop_id": 15,
                "section_id": null,
                "component_id": 10,
                "element_id": null,
                "css_prop": {
                    "prop_id": 1,
                    "prop_name": "display",
                    "prop_description": "lorem ipsum ....",
                    "is_section": false,
                    "is_component": false,
                    "is_element": true
                },
                "css_status": null,
                "css_responsive_status": null,
                "css_prop_value": "flex",
                "pivot": {
                    "section_id": null,
                    "component_id": 10,
                    "element_id": null,
                    "section_css_prop_id": 15,
                    "created_at": "2022-01-01 13:00:00",
                    "updated_at": "2022-01-01 13:30:00"
                }
            },
            {
                "section_css_prop_id": 15,
                "section_id": null,
                "component_id": 10,
                "element_id": null,
                "css_prop": {
                    "prop_id": 1,
                    "prop_name": "justifyContent",
                    "prop_description": "lorem ipsum ....",
                    "is_section": false,
                    "is_component": false,
                    "is_element": true
                },
                "css_status": null,
                "css_responsive_status": null,
                "css_prop_value": "center",
                "pivot": {
                    "section_id": null,
                    "component_id": 10,
                    "element_id": null,
                    "section_css_prop_id": 15,
                    "created_at": "2022-01-01 13:00:00",
                    "updated_at": "2022-01-01 13:30:00"
                }
            },
    
            {
                "section_css_prop_id": 15,
                "section_id": null,
                "component_id": 10,
                "element_id": null,
                "css_prop": {
                    "prop_id": 1,
                    "prop_name": "width",
                    "prop_description": "lorem ipsum ....",
                    "is_section": false,
                    "is_component": false,
                    "is_element": true
                },
                "css_status": null,
                "css_responsive_status": null,
                "css_prop_value": "100%",
                "pivot": {
                    "section_id": null,
                    "component_id": 10,
                    "element_id": null,
                    "section_css_prop_id": 15,
                    "created_at": "2022-01-01 13:00:00",
                    "updated_at": "2022-01-01 13:30:00"
                }
            }
        ],
        "pivot": {
            "section_component_id": 10,
            "component_element_id": 3,
            "created_at": "2022-01-01 13:00:00",
            "updated_at": "2022-01-01 13:30:00"
        }
    }
}

