import { v4 as uuidv4 } from 'uuid'; // UUID oluşturmak için


import galleryImageSection  from '../Assets/images/gallerySection.png';

import  SERVICES from '../Assets/images/SERVICES.png';
import  TESTIMONIALS from '../Assets/images/TESTIMONIALS.png';


// Create an array of imported images
const galleryImages = [galleryImageSection, SERVICES , TESTIMONIALS , galleryImageSection, SERVICES , TESTIMONIALS]; // Add other images as needed

// Create SectionsDesigns dynamically based on the number of imported images
export const SectionsDesigns = galleryImages.map((image, index) => (
    {
        section_component_id: index, // Generate a random integer between 0 and 999999
        "component_title": "galleryImageSection",
        "component_description": "lorem ipsum ....",
        "is_template": true,
        "mobile_columns_count": 12,
        "tablet_columns_count": 4,
        "laptop_columns_count": 3,
        "section_css_props": [
            {
                "section_css_prop_id": 25,
                "section_id": null,
                "component_id": 20,
                "element_id": null,
                "css_prop": {
                    "prop_id": 2,
                    "prop_name": "width",
                    "prop_description": "lorem ipsum ....",
                    "is_section": false,
                    "is_component": true,
                    "is_element": false
                },
                "css_status": null,
                "css_responsive_status": null,
                "css_prop_value": "400px",
                "pivot": {
                    "section_id": null,
                    "component_id": 20,
                    "element_id": null,
                    "section_css_prop_id": 25,
                    "created_at": "2022-01-01 13:00:00",
                    "updated_at": "2022-01-01 13:30:00"
                }
            },
            {
                "section_css_prop_id": 25,
                "section_id": null,
                "component_id": 20,
                "element_id": null,
                "css_prop": {
                    "prop_id": 2,
                    "prop_name": "borderRadius",
                    "prop_description": "lorem ipsum ....",
                    "is_section": false,
                    "is_component": true,
                    "is_element": false
                },
                "css_status": null,
                "css_responsive_status": null,
                "css_prop_value": "10px",
                "pivot": {
                    "section_id": null,
                    "component_id": 20,
                    "element_id": null,
                    "section_css_prop_id": 25,
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
                    "prop_name": "position",
                    "prop_description": "lorem ipsum ....",
                    "is_section": false,
                    "is_component": true,
                    "is_element": false
                },
                "css_status": null,
                "css_responsive_status": null,
                "css_prop_value": "relative",
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
                    "prop_name": "overFlow",
                    "prop_description": "lorem ipsum ....",
                    "is_section": false,
                    "is_component": true,
                    "is_element": false
                },
                "css_status": null,
                "css_responsive_status": null,
                "css_prop_value": "hidden",
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
                    "is_component": true,
                    "is_element": false
                },
                "css_status": null,
                "css_responsive_status": null,
                "css_prop_value": "#eee",
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
                    "prop_name": "textAlign",
                    "prop_description": "lorem ipsum ....",
                    "is_section": false,
                    "is_component": true,
                    "is_element": false
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
        ],
        "pivot": {
            "section_id": 3,
            "section_component_id": 10,
            "created_at": "2022-01-01 13:00:00",
            "updated_at": "2022-01-01 13:30:00"
        },
        "component_elements": [
            {
                "component_element_id": 1,
                "element_name": "adding",
                "element_description": "lorem ipsum dolor sit amet, consectetur adip...",
                "is_element": true,
                "element": {
                    "element_type_id": 4,
                    "element_type": "image",
                    "type_description": "this type return Typography with variant h3 tag in codes"
                },
                "element_content": image,
                "section_css_props": [
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
                        "css_prop_value": "400px",
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
                            "prop_name": "height",
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
                            "prop_name": "objectFit",
                            "prop_description": "lorem ipsum ....",
                            "is_section": false,
                            "is_component": false,
                            "is_element": true
                        },
                        "css_status": null,
                        "css_responsive_status": null,
                        "css_prop_value": "cover",
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
                        "css_prop_value": "20px",
                        "pivot": {
                            "section_id": null,
                            "component_id": 10,
                            "element_id": null,
                            "section_css_prop_id": 15,
                            "created_at": "2022-01-01 13:00:00",
                            "updated_at": "2022-01-01 13:30:00"
                        }
                    },
                ],
                "pivot": {
                    "section_component_id": 10,
                    "component_element_id": 3,
                    "created_at": "2022-01-01 13:00:00",
                    "updated_at": "2022-01-01 13:30:00"
                }
            },
        ]
    }
));


