import { extractStyles } from "./RecursiveHelpers/styles"

// write the style like the shape that came from database
export const writeStyleObject = (prop, value = null, status = null, breakpoint = null) => {
    return {
        style_status: status,
        style_status_id: status?.id,
        style_responsive_breakpoint: breakpoint,
        style_responsive_breakpoint_id: breakpoint?.id,
        style_prop: prop,
        style_prop_id: prop?.id,
        style_prop_value: value
    }
}


export const convertStyleToCssShape = (styles) => {
    const convertedStyles = {}
    if(styles && styles.length > 0) {
        for (const style of styles) {
            convertedStyles[style.style_prop.style_prop_css_name] = style.style_prop_value
        }
    }

    return convertedStyles
}

export const convertStyleFromObjectToJsCode = (styles, template) => {
    const convertedStyles = {}
    if(styles && styles.length > 0) {
        for (const style of styles) {
            const currentStyles = extractStyles([template], [style.design.id])
            //TODO: fix applied styles to split each element's styles from others
            convertedStyles[`${style.design.element_type.element_type_name}_${style.design.sequence_number}`] = [...currentStyles.map(style => style.stylePropValue), style.stylePropValue]
        }
    }

    return convertedStyles
}