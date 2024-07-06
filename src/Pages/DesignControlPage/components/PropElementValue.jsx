import{ useEffect, useMemo, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import propTypes from 'prop-types';
import { changeElementPropValuesEditPage } from '../../../Helpers/RecursiveHelpers/elementPropValuesHelpers';
import { writeFilterObject } from '../../../Helpers/filterData';
import { fetchUserPages } from '../../../Services/UserServices/Services/pagesUsersService';
import useFetchData from '../../../Helpers/customHooks/useFetchData';

const PropElementValue = ({ prop, elementDataSet, sectionDataState, propValue }) => {
    const [value, setValue] = useState(propValue || ''); // Initialize with propValue or an empty string if propValue is undefined/null
    const [elementData, setElementData] = elementDataSet;
    const [sectionData, setSectionData] = sectionDataState;
    const [buttonDisabled, setButtonDisabled] = useState(true); // State to manage button disabled/enabled

    // Memoized filter for useFetchData
    const appliedFilter = useMemo(() => {
        return [
            writeFilterObject('id', 'string', '=', sectionData['page_id']),
        ];
    }, [sectionData]);

    // Fetch user pages data
    const { data } = useFetchData(fetchUserPages, 'all', appliedFilter, null, true, null, null, 100);

    // Default text based on fetched data
    const defaultText = useMemo(() => {
        return `/Empty-design/${data[0]?.web_project_id}/`;
    }, [data]);

    // Handle text field change
    const handleTextFieldChange = (event) => {
        setValue(event.target.value);
    };

    // Update elementData when value changes
    useEffect(() => {
        let updatedValue = value;
        if (value.toLowerCase() === 'home') {
            updatedValue = defaultText; // Set defaultText if value is 'home'
        }else { 
            updatedValue = defaultText + value; // Set defaultText if value is 'home'
        }

        const updatedSelectedTemplate = JSON.parse(JSON.stringify(elementData));
        changeElementPropValuesEditPage(updatedSelectedTemplate, elementData.id, prop, updatedValue);
        setElementData(updatedSelectedTemplate);

        // Enable the button if the value is not empty
        setButtonDisabled(updatedValue === '');
    }, [value, defaultText, elementData, prop, setElementData]);

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

            <Button
                onClick={handleUpdateSectionData}
                disabled={buttonDisabled} // Disable the button if value is empty or "home"
                autoFocus
                sx={{
                    backgroundColor: '#092635',
                    color: '#eee',
                    fontWeight: 'bolder',
                    width: 'fit-content',
                    marginTop: '20px'
                }}
            >
                Save
            </Button>
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
