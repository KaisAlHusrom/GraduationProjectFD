// temporary id generation
import { v4 as uuIdv4 } from 'uuid';
import { fetchElementTypesRows } from '../Services/AdminServices/Services/elementsTypesService';
import { writeFilterObject } from './filterData';

// Function to transform the original data into the template data structure
export const transformElementTypeToDesignStructure = (data, parentElement = null, designType) => {
    const transformedElement = {
        id: uuIdv4(),
        element_type_id: data.id,
        element_type: data,
        parent_id: parentElement ? parentElement.id : null,
        // parent: parentElement,
        children: [],
        styles: [],
        design_title: null,
        design_description: null,
        design_image: null, 
        is_template: true, 
        is_child: data.is_child,
        sequence_number: data.sequence_number,
        element_content: 'Blank ' + data.element_type_name,
        design_type: designType,
    };

    if (data.children && data.children.length > 0) {
        transformedElement.children = data.children.map(child => transformElementTypeToDesignStructure(child, transformedElement, designType === "section" ? "component" : "element"));
    }

    return transformedElement;
};

export const blankNewPage = async () => {
    const emptyComponent = await fetchElementTypesRows(
        null,
        null,
        [writeFilterObject('element_type_name', 'string', '=', 'section')]
    )

    const transformedPage = {
        id: uuIdv4(),
        page_title: null,
        page_description: null,
        page_image: null, 
        is_template: true, 
        page_path: null,
        designs: [...transformElementTypeToDesignStructure(emptyComponent)]
    };

    return transformedPage
}
