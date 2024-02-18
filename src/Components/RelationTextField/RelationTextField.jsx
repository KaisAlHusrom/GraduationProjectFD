//React
import { useEffect, useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Autocomplete,
    Box, Checkbox, MenuItem, Paper, TextField, Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

//propTypes 
import propTypes from 'prop-types'
import { useTheme } from '@emotion/react';

//Styled Components
const StyledRelationTextField = styled(Box)(
    ({ theme }) => ({
    
    })
)

const StyledMenu = styled(Paper)(
    ({ theme }) => ({
        maxHeight: "100px",
        overflow: "auto",
    })
);

const AutocompleteMultipleStyle = styled(Autocomplete)(
    ({ theme }) => ({
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


const RelationTextField = (props) => {
    const {
        relationType,
        relations,
        columnName,
        originalData,
        setTextField,
        handleChangeData,
        handleEnterKeyDown,
        setNewData,
        
    } = props

    const [relation, setRelation] = useState(() => {
        if(relationType === 'one-to-many'){
            return relations.oneToMany.filter(relation => relation["field_name"] === columnName)[0]
        }

        if(relationType === 'many-to-many'){
            return relations.manyToMany.filter(relation => relation["field_name"] === columnName)[0]
        }

        if(relationType === 'many-to-one'){
            return relations.manyToOne.filter(relation => relation["field_name"] === columnName)[0]
        }
    })

    const [relatedTableData, setRelatedTableData] = useState([])
    //fetch data
    useEffect(() => {
        
        if(relationType === 'many-to-many' || relationType === 'many-to-one' || relationType === 'one-to-many'){
            const fetchData = async () => {
                const data = await relation.fetch_all_data()
                setRelatedTableData(data.rows)
            }
            fetchData()
        }

    }, [relation, relationType])


    const defaultProps = useMemo(()=> {
        return {
            options: relatedTableData,
            getOptionLabel: (option) => option[relation["fetched_column"]],
            getOptionKey: (option) => option[relation["related_table_id"]],
        };
    }, [relatedTableData, relation])

    // Assuming originalData is an array of selected objects
    const selectedOptions = useMemo(() => {
        if(originalData){
            if (relationType === "many-to-many" || relationType === "one-to-many") {
                return relatedTableData.filter(row => {
                    // Check if originalData contains the current row's id
                    return originalData.some(selectedObj => selectedObj[relation["related_table_id"]] === row[relation["related_table_id"]]);
                });
            }
            if (relationType === "many-to-one") {
                if(originalData) {
                    return relatedTableData.filter(row => row[relation["related_table_id"]] === originalData[relation["related_table_id"]])[0];
                }
            }
        } else {
            if (relationType === "many-to-many" || relationType === "one-to-many") {
                return []
            }
            if (relationType === "many-to-one") {
                return {}
            }
        }

        return null; // or any default value if needed
    }, [originalData, relatedTableData, relation, relationType]);


    
    return (
        <>
        { 
                relationType === "one-to-many"
                ?
                    (
                        <AutocompleteMultipleStyle
                        {...defaultProps}
                        disableClearable
                        multiple
                        id="combo-box-demo"
                        size='small'
                        renderInput={(params) => <TextField {...params} label={columnName} name={columnName} />} // Add name prop here
                        onChange={(event, newValue) => handleChangeData(event, relationType, setNewData, columnName, newValue)}
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
                    )
                :
                    relationType === "many-to-many" && relatedTableData.length > 0
                    ?    
                        <AutocompleteMultipleStyle
                            {...defaultProps}
                            disableClearable
                            multiple
                            id="combo-box-demo"
                            size='small'
                            renderInput={(params) => <TextField {...params} label={columnName} name={columnName} />} // Add name prop here
                            onChange={(event, newValue) => handleChangeData(event, relationType, setNewData, columnName, newValue)}
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
                
                :
                    relationType === "many-to-one" && relatedTableData.length > 0
                ?
                    <Autocomplete
                        {...defaultProps}
                        disablePortal
                        
                        id="combo-box-demo"
                        size='small'
                        renderInput={(params) => <TextField {...params} label={columnName} />}
                        onChange={(event, newValue) => handleChangeData(event, relationType, setNewData, columnName, newValue)}
                        value={selectedOptions}
                        PaperComponent={StyledMenu}
                    />
                :null
        }
        </>
    );
};



RelationTextField.propTypes = {
    relationType: propTypes.string.isRequired,
    relations: propTypes.object.isRequired,
    originalData: propTypes.any,
    setTextField: propTypes.func,
    handleChangeData: propTypes.func,
    handleEnterKeyDown: propTypes.func,
    setNewData: propTypes.func,
}

export default RelationTextField;