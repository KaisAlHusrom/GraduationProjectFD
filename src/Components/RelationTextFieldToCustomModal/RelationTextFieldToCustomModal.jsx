//React
import {  useCallback, useMemo, useRef, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Autocomplete,
    Checkbox,
    CircularProgress,
    Grid,
    Paper,
    Skeleton,
    TextField,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

//propTypes 
import propTypes from 'prop-types'
import useFetchData from '../../Helpers/customHooks/useFetchData';
import { useMyContext } from '../DatabaseView/DatabaseView';
import ViewDataHelper from '../../Helpers/ViewDataHelper';

//Styled Components
//Styled Components
const StyledMenu = styled(Paper)(
    () => ({
        maxHeight: "200px", //TODO: fix that there is more than one scroll element
        overflow: "hidden",
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
        }
    })
);


const RelationTextFieldToCustomModal = (props) => {
    const {
        columnName,
        columnType,
        error,
        errorMessage,
        handleChange,
        // response,
        // customRelationships
    } = props

    const {relationships} = useMyContext()


    //Get current relation
    
    const relation = useMemo(() => {
        if(columnType === 'one-to-many'){
            return relationships.oneToMany.filter(relation => relation["field_name"] === columnName)[0]
        }

        if(columnType === 'many-to-many'){
            return relationships.manyToMany.filter(relation => relation["field_name"] === columnName)[0]
        }

        if(columnType === 'many-to-one'){
            return relationships.manyToOne.filter(relation => relation["field_name"] === columnName)[0]
        }
    }, [columnName, columnType, relationships.manyToMany, relationships.manyToOne, relationships.oneToMany])

    

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
        data
    } = useFetchData(relation?.fetch_all_data, "all", relation?.filters, null, open, searchQuery)

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



    //Input Value
    const [autoCompleteValue, setAutoCompleteValue] = useState(() => {
        if(columnType === "many-to-many" || columnType === 'one-to-many') {
            return []
        } else {
            return null
        }
    })

    // Assuming value is an array of selected objects
    const selectedOptions = useMemo(() => {
        if (columnType === "many-to-many" || columnType === 'one-to-many') {
            return data.filter(row => {
                // Check if originalData contains the current row's id
                return autoCompleteValue.some(selectedObj => selectedObj[relation["related_table_id"]] === row[relation["related_table_id"]]);
            });
        }

        if (columnType === "many-to-one") {
            if(autoCompleteValue) {
                return data.filter(row => row[relation["related_table_id"]] === autoCompleteValue[relation["related_table_id"]])[0];
            }
        }
        return null; // or any default value if needed
    }, [columnType, data, relation, autoCompleteValue]);



    //handle change search query
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

    // const [pivotValues, setPivotValues] = useState({})
    // const pivots = useMemo(() => {
    //     return relation ? relation.pivots : null //TODO: do the pivots in many to many relations
    // }, [relation])

    // console.log(pivots)
    // const handlePivotChange = (event, column) => {
    //     const value = event?.target?.value;
    //     const name = column ? column : event?.target?.name;

    //     setPivotValues((prev) => {
    //         return {...prev, [name]: value}
    //     })

    //     handleChange(event, column)
    // }


    

    

    // console.log(data)
    // console.log(relation["fetched_column"])
    const defaultProps = useMemo(() => {
        return {
            options: open ? data : [],
            getOptionLabel: option => ViewDataHelper.getOptionLabel(option, relation),
            getOptionKey: (option) => option ? option[relation["related_table_id"]] : '',
            size: 'small', // Fixed: changed = to :
            renderInput: (params) => (
                <TextField
                    {...params}
                    error={error}
                    helperText={errorMessage}
                    value={searchQuery?.searchTerm}
                    onChange={handleChangeSearchQuery}
                    label={relation?.label ? relation?.label : columnName}
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
            onChange: (event, newValue) => handleChange(event, columnName, newValue, relation, setAutoCompleteValue),
            value: selectedOptions,
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
            PaperComponent: StyledMenu,
        };
    }, [open, data, selectedOptions, loading, relation, error, errorMessage, searchQuery?.searchTerm, handleChangeSearchQuery, columnName, handleChange, lastDataRowElementRef]);
    

    return (
        <>
            {
                relation?.add_to_add_form
                ?
                    (columnType === "many-to-many")
                    ?    
                        (
                            <Grid item xs={12}>
                                <AutocompleteMultipleStyle
                                {...defaultProps}
                                disableClearable
                                multiple
                                disableCloseOnSelect
                                />
                                {/* {
                                    pivots &&
                                    Object.entries(relation.pivots).map(([column, type], key) => {
                                        returnInputs(column, type, response, key)
                                    })
                                } */}
                            </Grid>
                        )
                
                    :
                    columnType === "many-to-one"
                    ?
                        (
                            <Grid item xs={12}>
                                <Autocomplete
                                {...defaultProps}
                                disablePortal
                                defaultValue={columnName}

                                />

                            </Grid>
                        )
                    :
                    columnType === 'one-to-many'
                    ?
                        (
                            <Typography>aaa</Typography>
                        )
                    :<Grid item xs={12}>
                        <Skeleton variant="text" sx={{fontSize: "2rem"}} />
                    </Grid>
                :null
            }
        </>
    );
};

RelationTextFieldToCustomModal.propTypes = {
    columnName: propTypes.string,
    columnType: propTypes.string,
    response: propTypes.any,
    error: propTypes.bool,
    errorMessage: propTypes.string,
    handleChange: propTypes.func,
}

export default RelationTextFieldToCustomModal;