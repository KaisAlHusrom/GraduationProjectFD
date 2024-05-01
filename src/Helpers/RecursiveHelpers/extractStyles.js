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