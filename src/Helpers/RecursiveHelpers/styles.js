

export const extractStyles = (template, selectedIds) => {
    for (const element of template) {
        if(selectedIds.includes(element.id)) {
            return element.styles;
        }

        if (element.children && element.children.length > 0) {
            const styles = extractStyles(element.children, selectedIds)
            return styles;
        }
    }
}

export const addStyle = (template, selectedIds, newStyle) => {
    for (const element of template) {
        if(selectedIds.includes(element.id)) {
            console.log(newStyle)

            if (element.styles.length === 0) {

                element.styles.push(newStyle)
                return true
            } else {
                if (element.styles.every(style => style.style_prop_id !== newStyle.style_prop_id)) {
                    element.styles.push(newStyle)
                    return true
                } else {
                    // the style prop is already exist
                    return false
                }
            }
        }

        if (element.children && element.children.length > 0) {
            if(addStyle(element.children, selectedIds, newStyle)) {
                return true
            }
        }
    }

    return false
}

export const changeStyleValues = (template, selectedIds, newStyle) => {
    for (const element of template) {
        if(selectedIds.includes(element.id)) {
            if (element.styles.some(style => style.style_prop_id === newStyle.style_prop_id)) {
                //check if the newStyle is already exist int the styles
                const style = element.styles.find(style => style.style_prop_id === newStyle.style_prop_id)

                //change the value
                style.style_prop_value = newStyle.style_prop_value

                return true
            } else {
                element.styles.push(newStyle)
                return true
            }
        }

        if (element.children && element.children.length > 0) {
            if(changeStyleValues(element.children, selectedIds, newStyle)) {
                return true
            }
        }
    }

    return false
}

export const checkIfStyleExist = (template, selectedIds, newStyle) => {
    const styles = extractStyles([template], selectedIds)
    if(styles.find(style => style.style_prop_id === newStyle.style_prop_id)) {
        return true
    }
    return false
}