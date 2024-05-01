export const writeStyleObject = (status, breakpoint, prop, value) => {
    return {
        style_status: status,
        style_status_id: status.id,
        style_responsive_breakpoint: breakpoint,
        style_responsive_breakpoint_id: breakpoint.id,
        style_prop: prop,
        style_prop_id: prop.id,
        style_prop_value: value
    }
}