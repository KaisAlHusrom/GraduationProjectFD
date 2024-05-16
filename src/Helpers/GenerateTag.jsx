import { Link } from "@mui/material"
import { Fragment, useMemo } from "react";
import { NavLink } from "react-router-dom";

import exampleImage from "../assets/images/exampleimage.jpg"


import propTypes from 'prop-types'
import { useMyCreateElementContext } from "../Pages/Admin/Components/CreateElementTemplate/CreateElementTemplate";
import { useTheme } from "@emotion/react";

import { styled } from '@mui/system'
import {convertStyleToCssShape } from "./writeStyleObject";


//functions
const repeat = (selectedElement) => {
    return selectedElement.children && selectedElement.children.length > 0
    ?
    selectedElement.children.map((child, key) => {
        // console.log(child)
        return (
            <Fragment key={key}>
                <GenerateTag
                    key={child.id}
                    // elementStyle={elementStyle}
                    selectedTemplate={child}
                />
            </Fragment>
        )
    }
    )
    :
    null
}

// const repeatThreeTimes = (selectedElement) => {
    
//         return selectedElement.children && selectedElement.children.length > 0
//         ? (
//             Array.from({ length: 3 }, (_, index) => (
//                 <Fragment key={index}>
//                     {selectedElement.children.map((child, key) => (
//                         <Fragment key={key}>
//                             <GenerateTag
//                                 key={child.id}
//                                 // elementStyle={elementStyle}
//                                 selectedElement={child}
//                             />
//                         </Fragment>
//                     ))}
//                 </Fragment>
//             ))
//         )
//         : null 
    
// }

export const GenerateTag = ({selectedTemplate}) => {
    const { hoveredSubElementId} = useMyCreateElementContext()

    const sortedData = Array.isArray(selectedTemplate) ? selectedTemplate.sort((a, b) => a.sequence_number - b.sequence_number) : selectedTemplate;

    const type = sortedData ? sortedData.element_type?.element_type_name : "";
    const content = sortedData ? sortedData.element_content : "";
    const theme = useTheme()
    const styles = useMemo(() => {
        return convertStyleToCssShape(sortedData.styles, theme) || []
    }, [sortedData.styles, theme])



    const key = sortedData ? sortedData.id : "";
    const hasChildren = sortedData ? sortedData.children?.length > 0 ? true : false : false

    let exampleText = hasChildren ? repeat(sortedData) : content;


    // const eventListeners = useMemo(() => {
    //     return {
    //         onMouseOver: () => handleSetStyleExceptions('hover', true),
    //         onMouseOut: () => handleSetStyleExceptions('hover', false),
    //         onClick: () => handleSetStyleExceptions('click', true),
    //         onFocus: () => handleSetStyleExceptions('focus', true),
    //         onBlur: () => handleSetStyleExceptions('focus', false),
            
    //         // Add more event listeners as needed
    //     };
    // }, [handleSetStyleExceptions])


    

    const defaultProps = useMemo(() => {
        return {
            type: type,
            key: key,
            placeholder:type,
            // onClick: () => handleChangeSelectedEditableElement(key),
            // ...eventListeners,
        }
    }, [key, type])


    return (
        <>
            <Tag 
                type={type}
                defaultProps={defaultProps}
                exampleText={exampleText}
                sortedData={sortedData}
                styles={styles}
                hoveredSubElementId={hoveredSubElementId}
            />
            {/* <StyledAfterBox></StyledAfterBox> */}
        </>
    )
        

}

GenerateTag.propTypes = {
    selectedTemplate: propTypes.any, 
    elementStyle: propTypes.any
}


const Tag = (props) => {
    const {
        type,
        defaultProps,
        exampleText,
        sortedData,
        styles,
        // hoveredSubElementId
    } = props

    const {
        selectedSubElementIds
    } = useMyCreateElementContext()

    const component = useMemo(() => {
        let component = ""
        switch (type.toLowerCase()) {
            case 'text field strings':
            case 'text field numbers':
            case 'text field files':
                component = "input"
                break
            case 'paragraph':
                component = "p"
                break
            case 'heading 1':
                component = "h1"
                break
            case 'heading 2':
                component = "h2"
                break
            case 'heading 3':
                component = "h3"
                break
            case 'heading 4':
                component = "h4"
                break
            case 'heading 5':
                component = "h5"
                break
            case 'heading 6':
                component = "h6"
                break
            case 'subtitle 1':
            case 'subtitle 2':
            case 'body 1':
            case 'body 2':
                component = "p"
                break
    
            case 'normal link':
                component = Link
                break
            case 'lazy link':
                component = NavLink
                break
            case 'ordered list item':
            case 'unordered list item':
                component = "li"
                break
            case 'unordered list':
                component = "ul"
                break
            case 'ordered list':
                component = "ol"
                break
            case 'table caption':
                component = "caption"
                break
            case 'table head':
                component = "thead"
                break
            case 'table body':
                component = "tbody"
                break
            case 'table foot':
                component = "tfoot"
                break
            case 'table head row':
            case 'table body row':
            case 'table foot row':
                component = "tr"
                break
            case 'table':
                component = "table"
                break
            case 'table head cell':
            case 'table body cell':
            case 'table foot cell':
                component = "td"
                break
            case 'text area':
                component = "textarea"
                break
            case 'select input option':
                component = "option"
                break
            case 'select input':
                component = "select"
                break
            case 'button':
                component = "button"
                break
            case 'image':
                component = "img"
                break
                // return <img {...defaultProps} src={exampleText === "Blank Image" ? exampleImage : exampleText} alt="" />;
            case 'audio':
                component = "audio"
                break
            case 'video':
                component = "video"
                break
            case 'iframe':
                component = "iframe"
                break
            case 'form':
                component = "form"
                break
            case 'bold text':
                component = "b"
                break
            case 'canvas':
                component = "canvas"
                break
            case 'label':
                component = "label"
                break
            case 'strong text':
                component = "strong"
                break
            case 'code':
                component = "code"
                break
            case 'component':
            case 'section':
                component = "div"
                break;
            default:
                return null; // Return null for unsupported types or handle accordingly
        }

        return component
    }, [type])

    

    const StyledComp = useMemo(() => {
        return styled(component)(
            ({theme}) => ({
                ...styles,
                backgroundColor: selectedSubElementIds.includes(sortedData.id)  ? theme.palette.action.selected : styles ? styles['backgroundColor'] : null,
                // padding: theme.spacing()
            })
        );
    
    }, [component, selectedSubElementIds, sortedData.id, styles])

    return (
        !sortedData.element_type.not_has_end_tag ?
                <StyledComp {...defaultProps} src={sortedData.element_type.element_type_name === "image" ? exampleText === "Blank Image" ? exampleImage : exampleText : null} >
                    {exampleText}
                </StyledComp>

            :
            <StyledComp {...defaultProps} src={exampleText === "Blank Image" ? exampleImage : exampleText} placeholder={exampleText} />
        
    )
}

Tag.propTypes = {
    type: propTypes.string,
    defaultProps: propTypes.object,
    exampleText: propTypes.any,
    sortedData: propTypes.any,
    styles: propTypes.object,
    hoveredSubElementId: propTypes.string,
}