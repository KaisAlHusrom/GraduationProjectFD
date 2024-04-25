import { Box, Link, Typography } from "@mui/material"
import { Fragment, useCallback, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

import exampleImage from "../assets/images/exampleimage.jpg"


import propTypes from 'prop-types'


//functions
const repeat = (selectedElement) => {
    return selectedElement.children && selectedElement.children.length > 0
    ?
    selectedElement.children.map((child, key) => <Fragment key={key}>
        <GenerateTag
            key={child.id}
            // elementStyle={elementStyle}
            selectedElement={child}
        />
    </Fragment>)
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

export const GenerateTag = ({selectedElement, elementStyle}) => {
    const sortedData = Array.isArray(selectedElement) ? selectedElement.sort((a, b) => a.sequence_number - b.sequence_number) : selectedElement;
    const type = sortedData ? sortedData.element_type_name : "";
    const key = sortedData ? sortedData.id : "";
    const hasChildren = sortedData ? sortedData.children?.length > 0 ? true : false : false

    let exampleText = hasChildren ? repeat(sortedData) : `${type}`;

    const [selectedEditableElement, setSelectedEditableElement] = useState(null)

    const handleChangeSelectedEditableElement = useCallback((key) => {
        setSelectedEditableElement(() => key)

    }, [])


    //Hovering
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = useCallback(() => {
        setIsHovered(true);
    }, []);

    const handleMouseOut = useCallback(() => {
        setIsHovered(false);
    }, []);



    const defaultProps = useMemo(() => {
        return {
            type: type,
            key: key,
            placeholder:type,
            style: {
                ...elementStyle,
                ...(isHovered && { })
            },
            onClick: () => handleChangeSelectedEditableElement(key),
            onMouseOver: handleMouseOver,
            onMouseOut: handleMouseOut
        }
    }, [elementStyle, handleChangeSelectedEditableElement, handleMouseOut, handleMouseOver, isHovered, key, type])

    

    switch (type.toLowerCase()) {
        case 'text field strings':
            return <input {...defaultProps}  />;
        case 'text field numbers':
            return <input {...defaultProps}  />;
        case 'text field files':
            return <input {...defaultProps}  />;
        case 'heading 1':
            return <Typography {...defaultProps} variant="h1">{exampleText}</Typography>;
        case 'heading 2':
            return <Typography {...defaultProps} variant="h2">{exampleText}</Typography>;
        case 'heading 3':
            return <Typography {...defaultProps} variant="h3">{exampleText}</Typography>;
        case 'heading 4':
            return <Typography {...defaultProps} variant="h4">{exampleText}</Typography>;
        case 'heading 5':
            return <Typography {...defaultProps} variant="h5">{exampleText}</Typography>;
        case 'heading 6':
            return <Typography {...defaultProps} variant="h6">{exampleText}</Typography>;
        case 'subtitle 1':
            return <Typography {...defaultProps} variant="subtitle1">{exampleText}</Typography>;
        case 'subtitle 2':
            return <Typography {...defaultProps} variant="subtitle2">{exampleText}</Typography>;
        case 'body 1':
            return <Typography {...defaultProps} variant="body1">{exampleText}</Typography>;
        case 'body 2':
            return <Typography {...defaultProps} variant="body2">{exampleText}</Typography>;
        case 'normal link':
            return <Link {...defaultProps} >{exampleText}</Link>
        case 'lazy link':
            return <NavLink {...defaultProps}>{exampleText}</NavLink>
        case 'ordered list item':
        case 'unordered list item':
            return <li {...defaultProps}>{exampleText}</li>;
        case 'unordered list':
            return (
                <ul {...defaultProps}>
                    {repeat(sortedData)}
                </ul>
            );
        case 'ordered list':
            return (
                <ol {...defaultProps}>
                    {repeat(sortedData)}
                </ol>
            )
        case 'table caption':
            return <caption {...defaultProps}>
                {exampleText}
            </caption>;
        case 'table head':
            return <thead {...defaultProps}>
                {repeat(sortedData)}
            </thead>;
        case 'table body':
            return <tbody {...defaultProps}> 
                {repeat(sortedData)}
            </tbody>;
        case 'table foot':
            return <tfoot {...defaultProps}>
                {repeat(sortedData)}
            </tfoot>;
        case 'table head row':
        case 'table body row':
        case 'table foot row':
            return (
                <tr {...defaultProps}>
                    {repeat(sortedData)}
                </tr>
            );
        case 'table':
            return <table {...defaultProps}> 
                {repeat(sortedData)}
            </table>;
        case 'table head cell':
        case 'table body cell':
        case 'table foot cell':
            return <td {...defaultProps} >{repeat(sortedData)} {exampleText}</td>
        case 'text area':
            return <textarea {...defaultProps} name="" id="" cols="30" rows="10" >{exampleText}</textarea>
        case 'select input option':
            return <option {...defaultProps} >{exampleText}</option>
        case 'select input':
            return <select {...defaultProps}>
                {repeat(sortedData)}
            </select>;
        case 'button':
            return <button {...defaultProps}>{exampleText}</button>;
        case 'image':
            return <img {...defaultProps} src={exampleImage} alt="" />;
        case 'audio':
            return <audio {...defaultProps} src=""></audio>;
        case 'video':
            return <video {...defaultProps} src=""></video>;
        case 'iframe':
            return <iframe {...defaultProps} src="" frameBorder="0"></iframe>;
        case 'form':
            return <form action="" {...defaultProps}>{exampleText}</form>;
        case 'bold text':
            return <b {...defaultProps}>{exampleText}</b>;
        case 'canvas':
            return <canvas id="myCanvas" width="200" height="100">{exampleText}</canvas>;
        case 'label':
            return <label {...defaultProps}>{exampleText}</label>;
        case 'strong text':
            return <strong {...defaultProps}>{exampleText}</strong>;
        case 'code':
            exampleText = `
            int x = 10;\n
            int y = 15;\n
            print(x + y)
            `
            return <code {...defaultProps}>{exampleText}</code>;
        case 'component':
        case 'section':
            return <Box {...defaultProps}>{exampleText}</Box>;
        default:
            return null; // Return null for unsupported types or handle accordingly
    }
}

GenerateTag.propTypes = {
    selectedElement: propTypes.any, 
    elementStyle: propTypes.any
}