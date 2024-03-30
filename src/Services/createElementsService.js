import { fetchElementTypesRows } from "./elementsTypesService"
import { fetchElementStyleProperties, fetchStylesBreakpoints, fetchStylesStatus } from "./stylesSettings";

export const fetchCreateElementNeededData = async () => {
    const {rows} = await fetchElementTypesRows()
    const allElementTypes = rows;

    console.log(allElementTypes)

    const elementStyleProps = await fetchElementStyleProperties()

    const fetchStyleStatus = await fetchStylesStatus()
    const stylesStatus = fetchStyleStatus.rows;


    const fetchStyleBreakpoints = await fetchStylesBreakpoints()
    const stylesBreakPoints = fetchStyleBreakpoints.rows;

    return {allElementTypes, elementStyleProps, stylesStatus, stylesBreakPoints}
}