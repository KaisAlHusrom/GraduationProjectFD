//React
import {  useEffect, useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Autocomplete,
    Checkbox,
    TextField,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

//propTypes 
import propTypes from 'prop-types'
import { useLoaderData } from 'react-router-dom';

//Styled Components
const AutocompleteMultipleStyle = styled(Autocomplete)(
    () => ({
        "& .MuiChip-label": {
            "&:hover": {
                overflow: "visible",
                width: "auto"
            }
        },
        "& .MuiButtonBase-root.MuiChip-root": {
            "&:hover": {
                maxWidth: "fit-content", // Change maxWidth on hover
                zIndex: 1300,
            }
        }
    })
);


const RelationTextFieldToCustomModal = (props) => {
    const {
        columnName,
        columnType,
        returnedData,
    } = props

    const {relations} = useLoaderData()

    //Get current relation
    const [relation, setRelation] = useState(() => {
        if(columnType === 'one-to-many'){
            return relations.oneToMany.filter(relation => relation["field_name"] === columnName)[0]
        }

        if(columnType === 'many-to-many'){
            return relations.manyToMany.filter(relation => relation["field_name"] === columnName)[0]
        }

        if(columnType === 'many-to-one'){
            return relations.manyToOne.filter(relation => relation["field_name"] === columnName)[0]
        }
    })

    //get related table data
    const [relatedTableData, setRelatedTableData] = useState([])
    //fetch data
    useEffect(() => {
        
        if(columnType === 'many-to-many' || columnType === 'many-to-one'){
            const fetchData = async () => {
                const data = await relation.fetch_all_data()
                setRelatedTableData(data.rows)
            }
            fetchData()
        }

    }, [relation, columnType])

    const defaultProps = useMemo(()=> {
        return {
            options: relatedTableData,
            getOptionLabel: (option) => option[relation["fetched_column"]],
            getOptionKey: (option) => option[relation["related_table_id"]],
        };
    }, [relatedTableData, relation])

    



    //Input Value
    const [value, setValue] = useState(() => {
        if(columnType === "many-to-many") {
            return []
        } else {
            return null
        }
    })
    const handleChangeData = (event, newValue) => {
        setValue(() => newValue)
    }

    // Assuming value is an array of selected objects
    const selectedOptions = useMemo(() => {
        if (columnType === "many-to-many") {
            return relatedTableData.filter(row => {
                // Check if originalData contains the current row's id
                return value.some(selectedObj => selectedObj.id === row.id);
            });
        }
        if (columnType === "many-to-one") {
            if(value) {
                return relatedTableData.filter(row => row.id === value.id)[0];
            }
        }
        return null; // or any default value if needed
    }, [columnType, relatedTableData, value]);


    const [selectedIds, setSelectedIds] = useState([])
    useEffect(() => {
        if (columnType === "many-to-many") {
            if(selectedOptions && selectedOptions.length > 0) {
                const ids = selectedOptions.map(row => row[relation["related_table_id"]])
                setSelectedIds(() => ids);
            }
        }
        if (columnType === "many-to-one") {
            if(selectedOptions) {
                const id = selectedOptions[relation["related_table_id"]]
                setSelectedIds(() => id);
            }
        }
        
    }, [columnType, relation, selectedOptions])

    // console.log(JSON.parse(selectedOptions))
    return (
        <>
            {
                columnType === "many-to-many" && relatedTableData.length > 0
                ?    
                    (
                        <>
                        <AutocompleteMultipleStyle
                        {...defaultProps}
                        disableClearable
                        multiple
                        
                        id="combo-box-demo"
                        size='small'
                        renderInput={(params) => <TextField {...params} label={columnName} />} // Add name prop here
                        onChange={(event, newValue) => handleChangeData(event, newValue)}
                        value={selectedOptions}
                        disableCloseOnSelect
                        renderOption={(props, option, { selected }) => (
                            <li 
                                {...props}
                            >
                                <Checkbox
                                    icon={<CheckBoxOutlineBlankIcon />}
                                    checkedIcon={<CheckBoxIcon />}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option[relation["fetched_column"]]}
                            </li>
                            )}
                        />
                        <input
                        type='text'
                        name={columnName}
                        value={JSON.stringify(selectedIds)}
                        onChange={() => {}}
                        hidden
                    
                        />
                    </>
                    )
            
                :
                columnType === "many-to-one" && relatedTableData.length > 0
                ?
                    (
                        <>
                            <Autocomplete
                            {...defaultProps}
                            disablePortal
                            defaultValue={columnName}
                            id="combo-box-demo"
                            size='small'
                            renderInput={(params) => <TextField {...params} label={columnName} />}
                            onChange={(event, newValue) => handleChangeData(event, newValue)}
                            value={selectedOptions}
                            />
                            <input
                            type='text'
                            name={columnName}
                            value={selectedIds}
                            onChange={() => {}}
                            hidden
                            
                            />
                        </>
                    )
                :null
            }
        </>
    );
};

RelationTextFieldToCustomModal.propTypes = {
    columnName: propTypes.string,
    columnType: propTypes.string,
    returnedData: propTypes.any,
}

export default RelationTextFieldToCustomModal;