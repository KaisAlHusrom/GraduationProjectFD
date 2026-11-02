import{ useEffect, useState } from 'react';
import { Box, TextField, Button , Typography } from '@mui/material';
import propTypes from 'prop-types';
import { changeElementPropValuesEditPage } from '../../../Helpers/RecursiveHelpers/elementPropValuesHelpers';
import { useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';


const PropElementValue = ({ prop, elementDataSet, sectionDataState, propValue }) => {
    const [value, setValue] = useState(propValue || ''); // Initialize with propValue or an empty string if propValue is undefined/null
    const [elementData, setElementData] = elementDataSet;
    const [sectionData, setSectionData] = sectionDataState;
    const [buttonDisabled, setButtonDisabled] = useState(true); // State to manage button disabled/enabled


    // Handle text field change
    const handleTextFieldChange = (event) => {
        setValue(event.target.value);
    };

    const loaction = useLocation()
    console.log(loaction.pathname)
    // Update elementData when value changes
    useEffect(() => {
        let updatedValue = value;
        // if (value.toLowerCase() === '/') {
        //     updatedValue  = `http://localhost:5173/Empty-design/${sectionData['web_project_id']}`;
        // }else { 
        //     updatedValue =  value; // Set defaultText if value is 'home'
        // }

        const updatedSelectedTemplate = JSON.parse(JSON.stringify(elementData));
        changeElementPropValuesEditPage(updatedSelectedTemplate, elementData.id, prop, updatedValue);
        setElementData(updatedSelectedTemplate);

        // Enable the button if the value is not empty
        setButtonDisabled(updatedValue === '');
    }, [value, elementData, prop, setElementData, sectionData]);


   // Function to update sectionData
    const handleUpdateSectionData = () => {
    // Example update, replace with your actual logic
    setSectionData((prevSectionData) => {
        const updatedSectionData = { ...prevSectionData };
        const updateChildElements = (currentChildren) => {
            return currentChildren.map(component => {
                if (component.id === elementData.parent_id) {
                    return {
                        ...component,
                        children: component.children.map(child => {
                            return child.id === elementData.id ? elementData : child;
                        })
                    };
                } else if (component.children) {
                    return {
                        ...component,
                        children: updateChildElements(component.children)
                    };
                }
                return component;
            });
        };

        updatedSectionData.children = updateChildElements(updatedSectionData.children);
        return updatedSectionData;
    });
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'end',
        }}>
            <TextField
                label={prop.element_prop_name}
                type="string"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="filled"
                value={value} // Show whatever the user typed
                onChange={handleTextFieldChange}
                sx={{
                    width: '900px'
                }}
            />

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width : '100%'
                }}>
                <Alert severity="warning" >To Add Home Page path just write ' / ' </Alert>
                <Alert severity="warning" >To Add Sub Page path just write  ' Page Name  ' </Alert>

                <Button
                onClick={handleUpdateSectionData}
                disabled={buttonDisabled} // Disable the button if value is empty or "home"
                autoFocus
                sx={{
                    backgroundColor: '#092635',
                    color: '#eee',
                    fontWeight: 'bolder',
                    width: 'fit-content',
                }}
            >
                Save
            </Button>
                </Box>


        </Box>
    );
};

PropElementValue.propTypes = {
    prop: propTypes.object.isRequired,
    elementDataSet: propTypes.array.isRequired,
    sectionDataState: propTypes.object.isRequired,
    propValue: propTypes.string.isRequired,
};

export default PropElementValue;
