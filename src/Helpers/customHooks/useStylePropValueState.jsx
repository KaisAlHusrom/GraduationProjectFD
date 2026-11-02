import { useEffect, useMemo, useState } from "react"
import { addStyle, changeStyleValues, checkIfStyleExist, convertToCssValue, deleteStyle } from "../RecursiveHelpers/styles"
import { useDispatch } from "react-redux"
import { handleOpenSnackbar, setSnackbarIsError, setSnackbarMessage } from "../../Redux/Slices/snackbarOpenSlice"

export default function useStylePropValueState(prop, template, handleTemplateChange, selectedSubElementIds, breakpointState, exceptionState) {
    const dispatch = useDispatch()
    const {styleException} = exceptionState
    const {styleBreakpoint} = breakpointState

    // the directions of the css value if exist
    const [mainDirections, setMainDirections] = useState({
        "top": null,
        "right": null,
        "bottom": null,
        "left": null,
    })

    // the corner directions of the css value if exist
    const [cornerDirections, setCornerDirections] = useState({
        "topLeft": null,
        "topRight": null,
        "bottomRight": null,
        "bottomLeft": null,
    })

    const [value, setValue] = useState(() => null)
    

    //extract the appropriate value from value state to cssValue
    // I use cssValue because I used value state in autocomplete and they won't be appropriate as css value
    const cssValue = useMemo(() => convertToCssValue(prop, value, mainDirections, cornerDirections), [cornerDirections, mainDirections, prop, value])

    //when change style prop value for already added style prop, it will be changed directly
    useEffect(() => {
        const updatedSelectedTemplate = JSON.parse(JSON.stringify(template));
        if(value && selectedSubElementIds.length > 0 && checkIfStyleExist(updatedSelectedTemplate, selectedSubElementIds, prop, cssValue, styleException, styleBreakpoint))  {
            const changed = changeStyleValues(updatedSelectedTemplate, selectedSubElementIds, prop, cssValue,  styleException, styleBreakpoint)
            if (changed) {
                handleTemplateChange(updatedSelectedTemplate)
            } else {
                dispatch(setSnackbarIsError({isError: true}))
                dispatch(setSnackbarMessage({message: "This style is already added."}))
                dispatch(handleOpenSnackbar())
            }
        } 

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, cssValue, selectedSubElementIds])

    

    // console.log(styleException)
    // console.log(styleBreakpoint)
    useEffect(() => {
        if(value){
            setValue(null) //TODO: the init value have to be the same with the applied styles values
            // setStyleException(null) //TODO: the init value have to be the same with the applied styles values
            // setStyleBreakpoint(null) //TODO: the init value have to be the same with the applied styles values
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSubElementIds])

    const handleAddNewStyle = () => {
            if(selectedSubElementIds && selectedSubElementIds.length > 0) {
                const updatedSelectedTemplate = JSON.parse(JSON.stringify(template));
                const added = addStyle(updatedSelectedTemplate, selectedSubElementIds, prop, cssValue, styleException, styleBreakpoint);
                if (added) {
                    handleTemplateChange(updatedSelectedTemplate)
                } else {
                    dispatch(setSnackbarIsError({isError: true}))
                    dispatch(setSnackbarMessage({message: "This style is already added."}))
                    dispatch(handleOpenSnackbar())
                }
            } else {
                dispatch(setSnackbarIsError({isError: true}))
                dispatch(setSnackbarMessage({message: "There is no selected template"}))
                dispatch(handleOpenSnackbar())
                
            }
        
    }

    const handleDeleteStyleProp = () => {
        if(selectedSubElementIds && selectedSubElementIds.length > 0 && cssValue) {
            const updatedSelectedTemplate = JSON.parse(JSON.stringify(template));
            // console.log(updatedSelectedTemplate)
            // console.log(selectedSubElementIds)
            // console.log(prop)
            // console.log(cssValue)
            // console.log(styleException)
            // console.log(styleBreakpoint)
            const deleted = deleteStyle(updatedSelectedTemplate, selectedSubElementIds, prop, cssValue, styleException, styleBreakpoint);
            if (deleted) {
                handleTemplateChange(updatedSelectedTemplate)
            } else {
                dispatch(setSnackbarIsError({isError: true}))
                dispatch(setSnackbarMessage({message: "This style is not exist."}))
                dispatch(handleOpenSnackbar())
            }
        } else {
            dispatch(setSnackbarIsError({isError: true}))
            dispatch(setSnackbarMessage({message: "There is no selected template"}))
            dispatch(handleOpenSnackbar())
            
        }
    }

    return {
        value, 
        setValue,
        cssValue,
        handleAddNewStyle,
        handleDeleteStyleProp,
        mainDirections, setMainDirections,
        cornerDirections, setCornerDirections
    }
}