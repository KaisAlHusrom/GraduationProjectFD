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





export const createEmptyElement = (element_type , element_content , elementCss) => {
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
        "section_css_props": elementCss,
        "pivot": {
            "section_component_id": 10,
            "component_element_id": 3,
            "created_at": "2022-01-01 13:00:00",
            "updated_at": "2022-01-01 13:30:00"
        }
    }
}

