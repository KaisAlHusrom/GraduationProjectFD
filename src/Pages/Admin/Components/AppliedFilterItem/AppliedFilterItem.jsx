//React
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
    
} from 'react-redux'

//Components

import StringHelper from '../../../../Helpers/StringsHelper'

//MUI
import {
    Autocomplete,
    Box, Checkbox, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

//propTypes 
import propTypes from 'prop-types'
import { useMyContext } from '../../../../Components/DatabaseView/DatabaseView'
import useFetchData from '../../../../Helpers/customHooks/useFetchData'


//Styled Components
const StyledAppliedFilterItem = styled(Box)(
    ({ theme }) => ({
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
        padding: `${theme.spacing()} ${theme.spacing()}`,
        borderRadius: theme.spacing(2),
        [theme.breakpoints.down("xs")]: {
            flexDirection: 'column',
            gap: theme.spacing(2),
        }
    })
)

const StyledFormControl = styled(FormControl)(
    ({theme}) => ({
        width: "150px",
        [theme.breakpoints.down("xs")]: {
            width: "80%"
        }
    })
);

const StyledTextField = styled(TextField)(
    ({theme}) => ({
        width: "150px",
        [theme.breakpoints.down("xs")]: {
            width: "80%"
        }
    })
);

const StyledNameBox = styled(Box)(
    () => ({
        display: "flex",
        alignItems: "center",
        width: "150px",
    })
);

const StyledBetweenDateBox = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: theme.spacing(),
    })
);


const StyledDateBox = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        alignItems: "center",
        gap: theme.spacing()
    })
);



// --- Items ---

const getMenuItems = (type) => {
    return type === "int" || type === "decimal"
    ?
    [
        {
            name: "Equal",
            value: "="
        },
        {
            name: "More Than",
            value: ">"
        },
        {
            name: "Few Than",
            value: "<"
        },
        {
            name: "More Than or Equal",
            value: ">="
        },
        {
            name: "Few Than or Equal",
            value: "<="
        },
    ]
    :
    type === "string" || type === "email" || type === "mobileNumber" || type === "password" || type === "text" || type === "pk"
    ? 
    [
        {
            name: "Equal", 
            value: "="
        }
    ]
    :
    type === "date" || type === "dateTime"
    ?
    [
        {
            name: "Equal",
            value: "="
        },
        {
            name: "More Than",
            value: ">"
        },
        {
            name: "Few Than",
            value: "<"
        },
        {
            name: "More Than or Equal",
            value: ">="
        },
        {
            name: "Few Than or Equal",
            value: "<="
        },
        {
            name: "Between",
            value: "between"
        },
        {
            name: "Relative To Today",
            value: "relative to today"
        },
    ]
    :
    type === "bool"
    ?
    [
        {
            name: "True",
            value: true,
        },
        {
            name: "False",
            value: false,
        }
    ]
    :
    type === "one-to-many" || type === "many-to-many"
    ?
    [
        {
            name: "Contains", 
            value: "="
        }
    ]
    :
    type === "many-to-one"
    ?
    [
        {
            name: "Equal", 
            value: "="
        }
    ]
    : null

}

const getDateMenuItems = () => {
    return [
        {
            name: "This Week",
            value: "this week",
        },
        {
            name: "This Month",
            value: "this month",
        },
        {
            name: "This Year",
            value: "this year",
        },
    ]
}

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


const AppliedFilterItem = ({appliedFilter, handleDeleteFilter, updateFilterValue, title}) => {

    //States
    //Get filters from session storage
    const pageFilters = useMemo(() => {
        const storedFilters = JSON.parse(sessionStorage.getItem('filters')) || {};
        return storedFilters[title] || {};
    }, [title]);

    const [process, setProcess] = useState('');
    const [period, setPeriod] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [value, setValue] = useState('');
    //value to relationships
    const [relationValue, setRelationValue] = useState(() => {
        if(appliedFilter.type === "many-to-many" || appliedFilter.type === "one-to-many" || appliedFilter.type === "many-to-one") {
            return []
        } else {
            return null
        }
    })

    //relations
    const {relationships} = useMyContext()
    const [relation,] = useState(() => {
        if(appliedFilter.type === 'one-to-many'){
            return relationships.oneToMany.filter(relation => relation["field_name"] === appliedFilter.value)[0]
        }

        if(appliedFilter.type === 'many-to-many'){
            return relationships.manyToMany.filter(relation => relation["field_name"] === appliedFilter.value)[0]
        }

        if(appliedFilter.type === 'many-to-one'){
            return relationships.manyToOne.filter(relation => relation["field_name"] === appliedFilter.value)[0]
        }
    })

    //related table data if type is relation
    //fetch related table data
    const [open, setOpen] = useState(false);

    const {
        hasMore,
        // error,
        loading,
        setPageNumber,
        data
    } = useFetchData(relation && relation.fetch_all_data, "all", null, null, open)

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

    // const [relatedTableData, setRelatedTableData] = useState([])
    //fetch data
    // useEffect(() => {
        
    //     if(appliedFilter.type === 'many-to-many' || appliedFilter.type === 'many-to-one' || appliedFilter.type === 'one-to-many'){
    //         const fetchData = async () => {
    //             const data = await relation.fetch_all_data()
    //             const rows = data.rows;
    //             const options = rows.map(option => {
    //                 const fetched_column_key = relation["fetched_column"]
    //                 const related_table_id_key = relation["related_table_id"]

    //                 const fetched_column_value = option[relation["fetched_column"]]
    //                 const related_table_id_value = option[relation["related_table_id"]]
                    
    //                 return { [fetched_column_key]: fetched_column_value, [related_table_id_key]: related_table_id_value };
    //             });

    //             setRelatedTableData(() => options)
    //         }
    //         fetchData()
    //     }

    // }, [appliedFilter.type, relation])



    

    // Assuming originalData is an array of selected objects
    const selectedOptions = useMemo(() => {
        //TODO: I have to get already applied filters at the first
        if (appliedFilter.type === "many-to-many" && relationValue && relationValue.length > 0) {
            return data.filter(row => {
                // Check if originalData contains the current row's id
                return relationValue.some(selectedObj => selectedObj[relation["related_table_id"]] === row[relation["related_table_id"]]);
            });
        }
        if (appliedFilter.type === "many-to-one" && relationValue) {
            
            return data.filter(row => row[relation["related_table_id"]] === relationValue[relation["related_table_id"]])[0];
        }

        if (appliedFilter.type === "one-to-many" && relationValue && relationValue.length > 0) {
            return data.filter(row => {
                // Check if originalData contains the current row's id
                return relationValue.some(selectedObj => selectedObj[relation["related_table_id"]] === row[relation["related_table_id"]]);
            });
        }

        return [];
    }, [relationValue, data, relation, appliedFilter.type]);

    useEffect(() => {
        const storedFilters = pageFilters.appliedFilters || [];
        if(storedFilters.length > 0) {
            storedFilters.forEach(filterParent => {
                if (filterParent.filter.value === appliedFilter.value) {
                    setProcess(() => filterParent.process)
                    setPeriod(() => filterParent.period)
                    setStartDate(() => filterParent.startDate)
                    setEndDate(() => filterParent.endDate)
                    setValue(() => filterParent.value)
                    setRelationValue(() => filterParent.relationValue)
                }
            });
        }

    }, [appliedFilter, pageFilters])
    
    useEffect(() => {
        // Update the value in the parent component using the callback
        updateFilterValue(appliedFilter, process ,value, startDate, endDate, period, relationValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [period, startDate, endDate, value, process, relationValue]) //TODO: find what you can do to make this warning gone


    //Handlers
    const handleChangeProcess = (event) => {
        setProcess(() => {
            return event.target.value
        });
    };

    const handleChangePeriod = (event) => {
        setPeriod(() => {
            return event.target.value
        });
    };

    const handleChangeStartDate = (event) => {
        setStartDate(() => {
            return event.target.value
        });
    };

    const handleChangeEndDate = (event) => {
        setEndDate(() => {
            return event.target.value
        });
    };


    const handleChangeValue = (event) => {
        setValue(() => {
            return event.target.value
        });
        
    }

    const handleChangeRelationValue = useCallback((event, newValue) => {
        setRelationValue(() => {
            return newValue
        });
        
    }, []);


    
    const menuItems = getMenuItems(appliedFilter.type)
    const dateMenuItems = getDateMenuItems()

    //autoComplete default props
    const defaultProps = useMemo(() => {
        if (appliedFilter.type === "one-to-many" || appliedFilter.type === "many-to-many" || appliedFilter.type === "many-to-one") {
            return {
                options: data,
                getOptionLabel: (option) => option[relation["fetched_column"]],
                getOptionKey: (option) => option[relation["related_table_id"]],
                open: open,
                onOpen: () => {
                    setOpen(true);
                },
                onClose: () => {
                    setOpen(false);
                },
                loading: loading,
                size: 'small',
                renderInput: (params) => (
                    <TextField
                        {...params}
                        label={appliedFilter.value}
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
                onChange: (event, newValue) => handleChangeRelationValue(event, newValue),
                value: selectedOptions,
                sx: { width: "150px" },
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
                                {option[relation["fetched_column"]]}
                            </li>
                        ) : (
                            <li {...props}>
                                <Checkbox
                                    icon={<CheckBoxOutlineBlankIcon />}
                                    checkedIcon={<CheckBoxIcon />}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option[relation["fetched_column"]]}
                            </li>
                        )
                    );
                }
            };
        }
    }, [appliedFilter.type, data, open, loading, appliedFilter.value, handleChangeRelationValue, selectedOptions, lastDataRowElementRef, relation]);
    


    return (
        <StyledAppliedFilterItem>
            <StyledNameBox>
                <IconButton onClick={() => handleDeleteFilter(appliedFilter)}>
                        <DeleteOutlineOutlinedIcon />
                </IconButton>
                <Typography variant='subtitle1'>
                    {StringHelper.capitalizeEachWord(appliedFilter.value.split("_").join(" "))}
                </Typography>
            </StyledNameBox>
            <StyledFormControl size='small'>
                <InputLabel id="demo-simple-select-label">{appliedFilter.type === "bool" ? "True Of False" : "Select Process"}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={appliedFilter.type === "bool" ? value : process}
                    label="Select Process"
                    onChange={appliedFilter.type === "bool" ? handleChangeValue : handleChangeProcess}
                    fullWidth
                >
                    {
                        menuItems.map((item, key) => {
                            return <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                        })
                    }
                </Select>
            </StyledFormControl>
            {
                process &&
                (appliedFilter.type === "date" || appliedFilter.type === "dateTime"
                ?
                    process === "relative to today"
                    ?
                    <StyledFormControl 
                    name={appliedFilter.value}
                    size='small'
                    value={value}
                    onChange={handleChangeValue}
                    >
                        <InputLabel id="select-period">Select Period</InputLabel>
                        <Select
                            labelId="select-period"
                            id="select-period"
                            value={period}
                            label="Select Period"
                            onChange={handleChangePeriod}
                            fullWidth
                        >
                            {
                                dateMenuItems.map((item, key) => {
                                    return <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                                })
                            }
                        </Select>
                    </StyledFormControl>
                    :
                    process === "between"
                    ?
                        <StyledBetweenDateBox>
                            <StyledDateBox>
                                <InputLabel  id="start-date">Start Date</InputLabel>
                                <StyledTextField
                                size='small'
                                type="date"
                                name="start-date"
                                value={startDate}
                                onChange={handleChangeStartDate}
                                id={"start-date"}
                                />
                            </StyledDateBox>
                            <StyledDateBox>
                                <InputLabel  id="end-date">End Date</InputLabel>
                                <StyledTextField
                                size='small'
                                type="date"
                                name="end-date"
                                value={endDate}
                                onChange={handleChangeEndDate}
                                id={"end-date"}
                                />
                            </StyledDateBox>
                        </StyledBetweenDateBox>
                        
                    
                    : 
                        <StyledTextField
                        size='small'
                        label={StringHelper.capitalizeEachWord(appliedFilter.value.split("_").join(" "))}
                        type="date"
                        name={appliedFilter.value}
                        value={value}
                        onChange={handleChangeValue}
                        id={appliedFilter.value}
                        />
                : 
                appliedFilter.type === "text" || appliedFilter.type === "string" || appliedFilter.type === "email" || appliedFilter.type === "mobileNumber" || appliedFilter.type === "password"
                ?

                        <StyledTextField
                        size='small'
                        label={StringHelper.capitalizeEachWord(appliedFilter.value.split("_").join(" "))}
                        id={appliedFilter.value}
                        value={value}
                        onChange={handleChangeValue}
                        name={appliedFilter.value}
                        />
                :
                appliedFilter.type === "int" || appliedFilter.type === "pk"
                ?
                        <StyledTextField
                        size='small'
                        label={StringHelper.capitalizeEachWord(appliedFilter.value.split("_").join(" "))}
                        type="number"
                        id={appliedFilter.value}
                        name={appliedFilter.value}
                        value={value}
                        onChange={handleChangeValue}
                        />
                :
                appliedFilter.type === "decimal"
                ?
                    <FormControl
                    color="primary"
                    required
                    size="small"
                    sx={{width: "150px"}}
                    
                    >
                        <InputLabel  htmlFor="outlined-adornment-amount">
                        {StringHelper.capitalizeEachWord(appliedFilter.value.split("_").join(" "))}
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label={StringHelper.capitalizeEachWord(appliedFilter.value.split("_").join(" "))}
                            value={value}
                            onChange={handleChangeValue}
                        />
                    </FormControl>
                :
                appliedFilter.type === "many-to-one"
                ?
                    <Autocomplete
                    {...defaultProps}
                    disablePortal
                    id="combo-box-demo"
                    />
                :
                appliedFilter.type === "many-to-many" || appliedFilter.type === "one-to-many"
                ?
                    <AutocompleteMultipleStyle
                    {...defaultProps}
                    disableClearable
                    multiple
                    id="combo-box-demo"
                    disableCloseOnSelect
                />
                :
                null)
            }
            
        </StyledAppliedFilterItem>
    );
};

AppliedFilterItem.propTypes = {
    appliedFilter: propTypes.object.isRequired,
    handleDeleteFilter: propTypes.func.isRequired,
    updateFilterValue: propTypes.func.isRequired,
    title: propTypes.string,
}

export default AppliedFilterItem;