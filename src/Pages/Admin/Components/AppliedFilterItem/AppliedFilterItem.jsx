//React
import { useEffect, useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components

import StringHelper from '../../../../Helpers/StringsHelper'

//MUI
import {
    Autocomplete,
    Box, Checkbox, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, TextField, Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

//propTypes 
import propTypes from 'prop-types'
import { useLoaderData } from 'react-router-dom'


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
    return type === "int" || type === "decimal" || type === "pk"
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
    type === "string" || type === "email" || type === "mobileNumber" || type === "password" || type === "text"
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

const StyledMenu = styled(Paper)(
    () => ({
        maxHeight: "200px",
        overflow: "auto",
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
    const {relations} = useLoaderData()
    const [relation, setRelation] = useState(() => {
        if(appliedFilter.type === 'one-to-many'){
            return relations.oneToMany.filter(relation => relation["field_name"] === appliedFilter.value)[0]
        }

        if(appliedFilter.type === 'many-to-many'){
            return relations.manyToMany.filter(relation => relation["field_name"] === appliedFilter.value)[0]
        }

        if(appliedFilter.type === 'many-to-one'){
            return relations.manyToOne.filter(relation => relation["field_name"] === appliedFilter.value)[0]
        }
    })

    //related table data if type is relation
    const [relatedTableData, setRelatedTableData] = useState([])
    //fetch data
    useEffect(() => {
        
        if(appliedFilter.type === 'many-to-many' || appliedFilter.type === 'many-to-one' || appliedFilter.type === 'one-to-many'){
            const fetchData = async () => {
                const data = await relation.fetch_all_data()
                setRelatedTableData(data.rows)
            }
            fetchData()
        }

    }, [appliedFilter.type, relation])

    

    // Assuming originalData is an array of selected objects
    const selectedOptions = useMemo(() => {
        if (appliedFilter.type === "many-to-many" && relationValue && relationValue.length > 0) {
            return relatedTableData.filter(row => {
                // Check if originalData contains the current row's id
                return relationValue.some(selectedObj => selectedObj[relation["related_table_id"]] === row[relation["related_table_id"]]);
            });
        }
        if (appliedFilter.type === "many-to-one" && relationValue) {
            if(relationValue) {
                return relatedTableData.filter(row => row[relation["related_table_id"]] === relationValue[relation["related_table_id"]])[0];
            }
        }

        if (appliedFilter.type === "one-to-many" && relationValue && relationValue.length > 0) {
            return relatedTableData.filter(row => {
                // Check if originalData contains the current row's id
                return relationValue.some(selectedObj => selectedObj[relation["related_table_id"]] === row[relation["related_table_id"]]);
            });
        }

        return [];
    }, [relationValue, relatedTableData, relation, appliedFilter.type]);

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

    const handleChangeRelationValue = (event, newValue) => {
        setRelationValue(() => {
            return newValue
        });
        
    }


    
    const menuItems = getMenuItems(appliedFilter.type)
    const dateMenuItems = getDateMenuItems()

    //autoComplete default props
    const defaultProps = useMemo(()=> {
        if(appliedFilter.type === "one-to-many" || appliedFilter.type === "many-to-many" || appliedFilter.type === "many-to-one"){
            return {
                options: relatedTableData,
                getOptionLabel: (option) => option[relation["fetched_column"]],
                getOptionKey: (option) => option[relation["related_table_id"]],
            };
        }
    }, [appliedFilter.type, relatedTableData, relation])


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
                    sx={{width: "150px"}}
                    id="combo-box-demo"
                    size='small'
                    renderInput={(params) => <TextField {...params} label={appliedFilter.value} />}
                    onChange={(event, newValue) => handleChangeRelationValue(event, newValue)}
                    value={selectedOptions}
                    PaperComponent={StyledMenu}
                    />
                :
                appliedFilter.type === "many-to-many" || appliedFilter.type === "one-to-many"
                ?
                    <AutocompleteMultipleStyle
                    {...defaultProps}
                    disableClearable
                    multiple
                    id="combo-box-demo"
                    size='small'
                    renderInput={(params) => <TextField {...params} label={appliedFilter.value} />} // Add name prop here
                    onChange={(event, newValue) => handleChangeRelationValue(event, newValue)}
                    value={selectedOptions}
                    disableCloseOnSelect
                    sx={{width: "150px"}}
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