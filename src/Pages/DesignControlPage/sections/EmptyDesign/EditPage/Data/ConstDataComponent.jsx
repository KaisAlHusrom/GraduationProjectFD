import { v4 as uuidv4 } from 'uuid'; // UUID oluşturmak için





export const createEmptyComponent = (section_css_props) => {
    return {
        
            "id": uuidv4(),
            "element_type_id": "f43978cc-29ee-4793-b4c6-b41d6ef7cd79",
            "design_type" : "component",
            "element_type": {
                "id": "f43978cc-29ee-4793-b4c6-b41d6ef7cd79",
                "element_type_name": "Head3",
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
            "styles": section_css_props,
            "design_title": null,
            "design_description": null,
            "design_image": null,
            "is_template": true,
            "is_child": false,
            "sequence_number": 1,
            "element_content": "Blank Strong text up"
        }
    
}





export const createEmptyElement = (element_type , element_content , elementCss) => {
    return {
        "id": uuidv4(),
        "element_type_id": "f43978cc-29ee-4793-b4c6-b41d6ef7cd79",
        "design_type" : "element",
        "element_type": {
            "id": "f43978cc-29ee-4793-b4c6-b41d6ef7cd79",
            "element_type_name": element_type,
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
        "children": [],
        "styles": elementCss,
        "design_title": null,
        "design_description": null,
        "design_image": null,
        "is_template": true,
        "is_child": false,
        "sequence_number": 1,
        "element_content": element_content
    }
}

