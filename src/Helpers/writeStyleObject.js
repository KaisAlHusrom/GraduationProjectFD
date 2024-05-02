

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

export const convertStyleFromObjectToJsCode = (styles) => {
    const convertedStyles = {}
    if(styles && styles.length > 0) {
        for (const style of styles) {
            convertedStyles[style.style_prop.style_prop_css_name] = style.style_prop_value
        }
    }

    return convertedStyles
}