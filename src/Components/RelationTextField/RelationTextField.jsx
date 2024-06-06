//React
import {  useCallback, useMemo, useRef, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Autocomplete, Checkbox, Paper, TextField, CircularProgress
} from '@mui/material'


import { styled } from '@mui/system'

//icons
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

//propTypes 
import propTypes from 'prop-types'
import {  } from '@emotion/react';
import useFetchData from '../../Helpers/customHooks/useFetchData';
import ViewDataHelper from '../../Helpers/ViewDataHelper';

//Styled Components
const StyledMenu = styled(Paper)(
    () => ({
        // maxHeight: "100px",
        // overflow: "auto",
        
    })
);

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
        },
        width: "150px"
        
    })
);

const StyledAutocomplete = styled(Autocomplete)(
    () => ({
        width: "150px"
        
    })
);


const RelationTextField = (props) => {
    const {
        relationType,
        relations,
        originalData,
        handleChangeData,
        handleEnterKeyDown,
        setNewData,
        columnName,
        setShowTextField,
        row
    } = props

    const [relation, ] = useState(() => {
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

    //fetch related table data
    const [searchQuery, setSearchQuery] = useState(null)
    const search = (columnName, searchTerm) => {
        setSearchQuery(() => {
            return {
                columnName: columnName,
                searchTerm: searchTerm,
            }
        })
    }


    const [open, setOpen] = useState(false);

    

    const {
        hasMore,
        // error,
        loading,
        setPageNumber,
        data,
    } = useFetchData(relation.fetch_all_data, "all", null, null, open, searchQuery, originalData)

    // *** DOWNLOAD MORE WHEN SCROLLING BOTTOM
    const observer = useRef()
    const lastDataRowElementRef = useCallback(node => {

        if (loading || !hasMore) return;

        if(observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore) {
                setPageNumber(prev => prev + 1);
            }
        })

        if (node) observer.current.observe(node)
    }, [hasMore, loading, setPageNumber])
    


    // Assuming originalData is an array of selected objects
    
    // const selectedOptions = useMemo(() => {
    //     if(originalData){
    //         if (relationType === "many-to-many" || relationType === "one-to-many") {
    //             return data.filter(row => {
    //                 // Check if originalData contains the current row's id
    //                 return originalData.some(selectedObj => selectedObj[relation["related_table_id"]] === row[relation["related_table_id"]]);
    //             }).map(row => ({
    //                 [relation["related_table_id"]]: row[relation["related_table_id"]],
    //                 [relation["fetched_column"]]: row[relation["fetched_column"]]
    //             }));
    //         }
    //         if (relationType === "many-to-one") {
    //             return data.filter(row => row[relation["related_table_id"]] === originalData[relation["related_table_id"]])
    //             .map(row => ({
    //                 [relation["related_table_id"]]: row[relation["related_table_id"]],
    //                 [relation["fetched_column"]]: row[relation["fetched_column"]]
    //             }))[0];
    //         }
    //     } 
        
    //     return null
    // }, [originalData, data, relation, relationType]);

    const handleChangeSearchQuery = useCallback((e) => {

        // Cancel ongoing request
        // cancelfetchDataAdminTemplate();

        setPageNumber(() => 1)
        
        const name = relation["fetched_column"];
        const value = e.target.value;
        if(value === "") {
            setSearchQuery(() => null)
            return
        }
        
        search(name, value)
    }, [relation, setPageNumber])

    const defaultProps = useMemo(() => {
        return {
            options: open ? data : [],
            getOptionLabel: (option) => ViewDataHelper.getOptionLabel(option, relation),
            getOptionKey: (option) => option ? option[relation["related_table_id"]] : '',
            size: 'small', // Fixed: changed = to :
            renderInput: (params) => (
                <TextField
                    {...params}
                    value={searchQuery?.searchTerm}
                    onChange={handleChangeSearchQuery}
                    label={columnName}
                    name={columnName}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            ),
            onChange: (event, newValue) => handleChangeData(event, relationType, setNewData, columnName, newValue, row),
            onKeyDown: (event) => handleEnterKeyDown(event, relationType, row, setShowTextField),
            value: originalData,
            PaperComponent: StyledMenu,
            isOptionEqualToValue: (option, value) => option[relation["fetched_column"]] === value[relation["fetched_column"]],
            renderOption: (props, option, { index, selected }) => {
                return (
                    data.length === index + 1 ? (
                        <li {...props} ref={lastDataRowElementRef}>
                            <Checkbox
                                icon={<CheckBoxOutlineBlankIcon />}
                                checkedIcon={<CheckBoxIcon />}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {ViewDataHelper.getOptionLabel(option, relation)}
                        </li>
                    ) : (
                        <li {...props}>
                            <Checkbox
                                icon={<CheckBoxOutlineBlankIcon />}
                                checkedIcon={<CheckBoxIcon />}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {ViewDataHelper.getOptionLabel(option, relation)}
                        </li>
                    )
                );
            },
            open: open,
            onOpen: () => {
                setOpen(true);
            },
            onClose: () => {
                setOpen(false);
            },
            loading: loading,
            fullWidth: true, // or fullWidth: Boolean value,
        };
    }, [open, data, originalData, loading, relation, searchQuery?.searchTerm, handleChangeSearchQuery, columnName, handleChangeData, relationType, setNewData, row, handleEnterKeyDown, setShowTextField, lastDataRowElementRef]);
    

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
                        disableCloseOnSelect // or disableCloseOnSelect: Boolean value,
                        />
                    )
                :
                    relationType === "many-to-many"
                    ?    
                        <AutocompleteMultipleStyle
                            {...defaultProps}
                            disableClearable
                            multiple
                            id="combo-box-demo"
                            disableCloseOnSelect
                        />
                
                :
                    relationType === "many-to-one"
                ?
                    
                    <StyledAutocomplete
                        {...defaultProps}
                        disablePortal
                        id="combo-box-demo"
                        size='small'
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
    columnName: propTypes.string,
    setShowTextField: propTypes.func,
    row: propTypes.any
}

export default RelationTextField;