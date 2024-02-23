import { Link, TextField, Typography } from "@mui/material"
import { NavLink } from "react-router-dom";

export const generateTag = (selectedElement) => {
    const type = selectedElement ? selectedElement.element_type : "";
    switch (type) {
        case 'TextField Strings':

            return <TextField label={`Example of ${type}`}  />;
        case 'TextField Numbers':
            return <TextField type="number" label={`Example of ${type}`}  />;
        case 'TextField files':
            return <TextField type="file" label={`Example of ${type}`}  />;
        case 'Heading 1':
            return <Typography variant="h1">Example of {type}</Typography>;
        case 'Heading 2':
            return <Typography variant="h2">Example of {type}</Typography>;
        case 'Heading 3':
            return <Typography variant="h3">Example of {type}</Typography>;
        case 'Heading 4':
            return <Typography variant="h4">Example of {type}</Typography>;
        case 'Heading 5':
            return <Typography variant="h5">Example of {type}</Typography>;
        case 'Heading 6':
            return <Typography variant="h6">Example of {type}</Typography>;
        case 'Subtitle 1':
            return <Typography variant="subtitle1">Example of {type}</Typography>;
        case 'Subtitle 2':
            return <Typography variant="subtitle2">Example of {type}</Typography>;
        case 'body 1':
            return <Typography variant="body1">Example of {type}</Typography>;
        case 'body 2':
            return <Typography variant="body2">Example of {type}</Typography>;
        case 'Normal link':
            return <Link>Example of {type}</Link>
        case 'Lazy link':
            return <NavLink>Example of {type}</NavLink>
        case 'list item':
            return <li>Example of {type}</li>;
        case 'unordered list':
            return <ul>
                <li>Example of {type}</li>
                <li>Example of {type}</li>
            </ul>;
        case 'ordered list':
            return 'ol';
        case 'table head':
            return 'thead';
        case 'table body':
            return 'tbody';
        case 'table row':
            return 'tr';
        case 'table cell':
            return 'td';
        case 'Text Area':
            return 'textarea';
        case 'Select Option':
            return 'option';
        case 'Select':
            return 'select';
        case 'Button':
            return 'button';
        case 'Image':
            return 'img';
        case 'Audio':
            return 'audio';
        case 'Video':
            return 'video';
        case 'Iframe':
            return 'iframe';
        default:
            return null; // Return null for unsupported types or handle accordingly
    }
}
