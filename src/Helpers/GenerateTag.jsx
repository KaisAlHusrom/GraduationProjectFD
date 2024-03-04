import { Link, TextField, Typography } from "@mui/material"
import { Fragment } from "react";
import { NavLink } from "react-router-dom";

import exampleImage from "../Assets/Images/exampleImage.jpg"

export const generateTag = (selectedElement, elementStyle) => {
    const type = selectedElement ? selectedElement.element_type_name : "";
    const exampleText = `Example of ${type}`;

    switch (type) {
        case 'Text Field String':

            return <input style={elementStyle} type="text" placeholder={`Example of ${type}`}  />;
        case 'Text Field Number':
            return <input style={elementStyle} type="number" placeholder={`Example of ${type}`}  />;
        case 'Text Field File':
            return <input style={elementStyle} type="file" placeholder={`Example of ${type}`}  />;
        case 'Heading 1':
            return <Typography style={elementStyle} variant="h1">{exampleText}</Typography>;
        case 'Heading 2':
            return <Typography style={elementStyle} variant="h2">{exampleText}</Typography>;
        case 'Heading 3':
            return <Typography style={elementStyle} variant="h3">{exampleText}</Typography>;
        case 'Heading 4':
            return <Typography style={elementStyle} variant="h4">{exampleText}</Typography>;
        case 'Heading 5':
            return <Typography style={elementStyle} variant="h5">{exampleText}</Typography>;
        case 'Heading 6':
            return <Typography style={elementStyle} variant="h6">{exampleText}</Typography>;
        case 'Subtitle 1':
            return <Typography style={elementStyle} variant="subtitle1">{exampleText}</Typography>;
        case 'Subtitle 2':
            return <Typography style={elementStyle} variant="subtitle2">{exampleText}</Typography>;
        case 'body 1':
            return <Typography style={elementStyle} variant="body1">{exampleText}</Typography>;
        case 'body 2':
            return <Typography style={elementStyle} variant="body2">{exampleText}</Typography>;
        case 'Normal link':
            return <Link style={elementStyle} >{exampleText}</Link>
        case 'Lazy link':
            return <NavLink style={elementStyle}>{exampleText}</NavLink>
        case 'list item':
            return <li style={elementStyle}>{exampleText}</li>;
        case 'unordered list':

            return <ul style={elementStyle}>
                {
                        selectedElement.children && selectedElement.children.length > 0
                        ? (
                            Array.from({ length: 3 }, (_, index) => (
                                <Fragment key={index}>
                                    {selectedElement.children.map((child, key) => (
                                        <Fragment key={key}>{generateTag(child)}</Fragment>
                                    ))}
                                </Fragment>
                            ))
                        )
                        : null 
                    }
            </ul>;
        case 'ordered list':
            return <ol>
                    {
                        selectedElement.children && selectedElement.children.length > 0
                        ? (
                            Array.from({ length: 3 }, (_, index) => (
                                <Fragment key={index}>
                                    {selectedElement.children.map((child, key) => (
                                        <Fragment key={key}>{generateTag(child)}</Fragment>
                                    ))}
                                </Fragment>
                            ))
                        )
                        : null 
                    }
            </ol>;
        case 'table caption':
            return <caption>
                    {exampleText}
                </caption>;
        case 'table head':
            return <thead>
                {
                    selectedElement.children && selectedElement.children.length > 0
                    ?
                    selectedElement.children.map((child, key) => <Fragment key={key}>{generateTag(child)}</Fragment>)
                    :
                    null
                }
                </thead>;
        case 'table body':
            return <tbody>
                {
                    selectedElement.children && selectedElement.children.length > 0
                    ?
                    selectedElement.children.map((child, key) => <Fragment key={key}>{generateTag(child)}</Fragment>)
                    :
                    null
                }
                </tbody>;
        case 'table foot':
            return <tfoot>
                {
                    selectedElement.children && selectedElement.children.length > 0
                    ?
                    selectedElement.children.map((child, key) => <Fragment key={key}>{generateTag(child)}</Fragment>)
                    :
                    null
                }
                </tfoot>;
        case 'table row':
            return (
                <tr>
                    {
                        // Check if selectedElement has children
                        selectedElement.children && selectedElement.children.length > 0
                        ? (
                            // If it has children, map over them and duplicate each child
                            Array.from({ length: 3 }, (_, index) => (
                                // Generate the tag for each duplicated child
                                <Fragment key={index}>
                                    {selectedElement.children.map((child, key) => (
                                        <Fragment key={key}>{generateTag(child)}</Fragment>
                                    ))}
                                </Fragment>
                            ))
                        )
                        : null // If there are no children, return null
                    }
                </tr>
            );
        
        case 'table':
            console.log(selectedElement)
            return <table style={elementStyle}> 
                
                {
                    selectedElement.children && selectedElement.children.length > 0
                    ?
                    selectedElement.children.map((child, key) => <Fragment key={key}>{generateTag(child)}</Fragment>)
                    :
                    null
                }
                </table>;
        case 'table cell':
            return <td>{exampleText}</td>
        case 'Text Area':
            return <textarea style={elementStyle} name="" id="" cols="30" rows="10">{exampleText}</textarea>
        case 'Select Option':
            return <option>{exampleText}</option>
        case 'Select':
            return <select style={elementStyle}>
                {
                    selectedElement.children && selectedElement.children.length > 0
                    ? (
                        Array.from({ length: 3 }, (_, index) => (
                            <Fragment key={index}>
                                {selectedElement.children.map((child, key) => (
                                    <Fragment key={key}>{generateTag(child)}</Fragment>
                                ))}
                            </Fragment>
                        ))
                    )
                    : null 
                };
            </select>
        case 'Button':
            return <button style={elementStyle}>{exampleText}</button>;
        case 'Image':
            return <img style={elementStyle} src={exampleImage} alt="" />;
        case 'Audio':
            return <audio style={elementStyle} src=""></audio>;
        case 'Video':
            return <video style={elementStyle} src=""></video>;
        case 'Iframe':
            return <iframe style={elementStyle} src="" frameBorder="0"></iframe>;
        default:
            return null; // Return null for unsupported types or handle accordingly
    }
}
