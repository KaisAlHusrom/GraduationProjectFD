import { v4 as uuidv4 } from 'uuid'; // UUID oluşturmak için


import galleryImageSection  from '../Assets/images/gallerySection.png';

import  SERVICES from '../Assets/images/SERVICES.png';
import  TESTIMONIALS from '../Assets/images/TESTIMONIALS.png';


// Create an array of imported images
const galleryImages = [galleryImageSection, SERVICES , TESTIMONIALS , galleryImageSection, SERVICES , TESTIMONIALS]; // Add other images as needed

// Create SectionsDesigns dynamically based on the number of imported images




export const SectionsDesigns = galleryImages.map((image, index) => (
    {
        "id": index,
        "element_type_id": "81e40cfe-d1ec-49db-8595-952909d2351c",
        "design_type" : "Component",
        "element_type": {
            "id": "81e40cfe-d1ec-49db-8595-952909d2351c",
            "element_type_name": "Component",
            "element_type_description": "Defines a section in any place of the document",
            "is_child": false,
            "parent_id": null,
            "deleted_at": null,
            "created_at": "2024-03-31T23:25:02.000000Z",
            "updated_at": "2024-04-25T16:14:37.000000Z",
            "sequence_number": 1,
            "not_has_end_tag": false,
            "children": [],
            "element_props": [],
            "parent": null
        },
        "parent_id": null,
        "children": [
            {
                "id": uuidv4(),
                "element_type_id": "f43978cc-29ee-4793-b4c6-b41d6ef7cd79",
                "design_type" : "component",
                "element_type": {
                    "id": "f43978cc-29ee-4793-b4c6-b41d6ef7cd79",
                    "element_type_name": "image",
                    "element_type_description": "Defines important text",
                    "is_child": false,
                    "parent_id": null,
                    "deleted_at": null,
                    "created_at": "2024-03-31T23:28:41.000000Z",
                    "updated_at": "2024-04-04T12:08:10.000000Z",
                    "sequence_number": 1,
                    "not_has_end_tag": false,
                    "children": [],
                    "element_props": [],
                    "parent": null
                },
                "parent_id": "4c15ed73-5264-4d8b-8236-49c23e846a7b",
                "children": [
                ],
                "styles": [
                    {
                        "style_status": null,
                        "style_responsive_breakpoint": null,
                        "style_prop": {
                            "id": "15",
                            "category_id": null,
                            "style_prop_normal_name": "width",
                            "style_prop_css_name": "width",
                            "style_prop_image": null,
                            "style_prop_description": "lorem ipsum ....",
                            "style_prop_value_type": null,
                            "is_section": false,
                            "is_component": false,
                            "is_element": true,
                            "deleted_at": null,
                            "created_at": "2022-01-01 13:00:00",
                            "updated_at": "2022-01-01 13:30:00",
                            "is_child": null,
                            "parent_id": null,
                            "locateTypes": null,
                            "options": null
                        },
                        "style_prop_id": "15",
                        "style_prop_value": "400px"
                    },
                    {
                        "style_status": null,
                        "style_responsive_breakpoint": null,
                        "style_prop": {
                            "id": "15",
                            "category_id": null,
                            "style_prop_normal_name": "height",
                            "style_prop_css_name": "height",
                            "style_prop_image": null,
                            "style_prop_description": "lorem ipsum ....",
                            "style_prop_value_type": null,
                            "is_section": false,
                            "is_component": false,
                            "is_element": true,
                            "deleted_at": null,
                            "created_at": "2022-01-01 13:00:00",
                            "updated_at": "2022-01-01 13:30:00",
                            "is_child": null,
                            "parent_id": null,
                            "locateTypes": null,
                            "options": null
                        },
                        "style_prop_id": "15",
                        "style_prop_value": "100%"
                    },
                    {
                        "style_status": null,
                        "style_responsive_breakpoint": null,
                        "style_prop": {
                            "id": "15",
                            "category_id": null,
                            "style_prop_normal_name": "borderRadius",
                            "style_prop_css_name": "borderRadius",
                            "style_prop_image": null,
                            "style_prop_description": "lorem ipsum ....",
                            "style_prop_value_type": null,
                            "is_section": false,
                            "is_component": false,
                            "is_element": true,
                            "deleted_at": null,
                            "created_at": "2022-01-01 13:00:00",
                            "updated_at": "2022-01-01 13:30:00",
                            "is_child": null,
                            "parent_id": null,
                            "locateTypes": null,
                            "options": null
                        },
                        "style_prop_id": "15",
                        "style_prop_value": "10px"
                    },
                    {
                        "style_status": null,
                        "style_responsive_breakpoint": null,
                        "style_prop": {
                            "id": "15",
                            "category_id": null,
                            "style_prop_normal_name": "objectFit",
                            "style_prop_css_name": "objectFit",
                            "style_prop_image": null,
                            "style_prop_description": "lorem ipsum ....",
                            "style_prop_value_type": null,
                            "is_section": false,
                            "is_component": false,
                            "is_element": true,
                            "deleted_at": null,
                            "created_at": "2022-01-01 13:00:00",
                            "updated_at": "2022-01-01 13:30:00",
                            "is_child": null,
                            "parent_id": null,
                            "locateTypes": null,
                            "options": null
                        },
                        "style_prop_id": "15",
                        "style_prop_value": "cover"
                    },
                    {
                        "style_status": null,
                        "style_responsive_breakpoint": null,
                        "style_prop": {
                            "id": "15",
                            "category_id": null,
                            "style_prop_normal_name": "padding",
                            "style_prop_css_name": "padding",
                            "style_prop_image": null,
                            "style_prop_description": "lorem ipsum ....",
                            "style_prop_value_type": null,
                            "is_section": false,
                            "is_component": false,
                            "is_element": true,
                            "deleted_at": null,
                            "created_at": "2022-01-01 13:00:00",
                            "updated_at": "2022-01-01 13:30:00",
                            "is_child": null,
                            "parent_id": null,
                            "locateTypes": null,
                            "options": null
                        },
                        "style_prop_id": "15",
                        "style_prop_value": "20px"
                    }
                ]
                ,
                "design_title": null,
                "design_description": null,
                "design_image": null,
                "is_template": true,
                "is_child": false,
                "sequence_number": 1,
                "element_content": image
            },
        ],
        "styles":[
            {
                "style_status": null,
                "style_responsive_breakpoint": null,
                "style_prop": {
                    "id": "25",
                    "category_id": null,
                    "style_prop_normal_name": "width",
                    "style_prop_css_name": "width",
                    "style_prop_image": null,
                    "style_prop_description": "lorem ipsum ....",
                    "style_prop_value_type": null,
                    "is_section": false,
                    "is_component": true,
                    "is_element": false,
                    "deleted_at": null,
                    "created_at": "2022-01-01 13:00:00",
                    "updated_at": "2022-01-01 13:30:00",
                    "is_child": null,
                    "parent_id": null,
                    "locateTypes": null,
                    "options": null
                },
                "style_prop_id": "25",
                "style_prop_value": "400px"
            },
            {
                "style_status": null,
                "style_responsive_breakpoint": null,
                "style_prop": {
                    "id": "25",
                    "category_id": null,
                    "style_prop_normal_name": "borderRadius",
                    "style_prop_css_name": "borderRadius",
                    "style_prop_image": null,
                    "style_prop_description": "lorem ipsum ....",
                    "style_prop_value_type": null,
                    "is_section": false,
                    "is_component": true,
                    "is_element": false,
                    "deleted_at": null,
                    "created_at": "2022-01-01 13:00:00",
                    "updated_at": "2022-01-01 13:30:00",
                    "is_child": null,
                    "parent_id": null,
                    "locateTypes": null,
                    "options": null
                },
                "style_prop_id": "25",
                "style_prop_value": "10px"
            },
            {
                "style_status": null,
                "style_responsive_breakpoint": null,
                "style_prop": {
                    "id": "15",
                    "category_id": null,
                    "style_prop_normal_name": "position",
                    "style_prop_css_name": "position",
                    "style_prop_image": null,
                    "style_prop_description": "lorem ipsum ....",
                    "style_prop_value_type": null,
                    "is_section": false,
                    "is_component": true,
                    "is_element": false,
                    "deleted_at": null,
                    "created_at": "2022-01-01 13:00:00",
                    "updated_at": "2022-01-01 13:30:00",
                    "is_child": null,
                    "parent_id": null,
                    "locateTypes": null,
                    "options": null
                },
                "style_prop_id": "15",
                "style_prop_value": "relative"
            },

            {
                "style_status": null,
                "style_responsive_breakpoint": null,
                "style_prop": {
                    "id": "15",
                    "category_id": null,
                    "style_prop_normal_name": "backgroundColor",
                    "style_prop_css_name": "backgroundColor",
                    "style_prop_image": null,
                    "style_prop_description": "lorem ipsum ....",
                    "style_prop_value_type": null,
                    "is_section": false,
                    "is_component": true,
                    "is_element": false,
                    "deleted_at": null,
                    "created_at": "2022-01-01 13:00:00",
                    "updated_at": "2022-01-01 13:30:00",
                    "is_child": null,
                    "parent_id": null,
                    "locateTypes": null,
                    "options": null
                },
                "style_prop_id": "15",
                "style_prop_value": "#eee"
            },
            {
                "style_status": null,
                "style_responsive_breakpoint": null,
                "style_prop": {
                    "id": "15",
                    "category_id": null,
                    "style_prop_normal_name": "textAlign",
                    "style_prop_css_name": "textAlign",
                    "style_prop_image": null,
                    "style_prop_description": "lorem ipsum ....",
                    "style_prop_value_type": null,
                    "is_section": false,
                    "is_component": true,
                    "is_element": false,
                    "deleted_at": null,
                    "created_at": "2022-01-01 13:00:00",
                    "updated_at": "2022-01-01 13:30:00",
                    "is_child": null,
                    "parent_id": null,
                    "locateTypes": null,
                    "options": null
                },
                "style_prop_id": "15",
                "style_prop_value": "center"
            }
        ]
        ,
        "design_title": null,
        "design_description": null,
        "design_image": null,
        "is_template": true,
        "is_child": false,
        "sequence_number": 1,
        "element_content": "Blank Component"
    
    }
));


