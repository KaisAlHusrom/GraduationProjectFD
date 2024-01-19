//React
import { useEffect, useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components

import StringHelper from '../../../../Helpers/StringsHelper'

//MUI
import {
    Box, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

//propTypes 
import propTypes from 'prop-types'


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
    })
)

const StyledFormControl = styled(FormControl)(
    () => ({
        width: "150px"
    })
);

const StyledTextField = styled(TextField)(
    () => ({
        width: "150px"
    })
);

const StyledNameBox = styled(Box)(
    () => ({
        display: "flex",
        alignItems: "center",
        width: "150px"
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
                }
            });
        }

    }, [appliedFilter, pageFilters])
    
    useEffect(() => {
        // Update the value in the parent component using the callback
        updateFilterValue(appliedFilter, process ,value, startDate, endDate, period);
    }, [period, startDate, endDate, value, process]) //TODO: find what you can do to make this warning gone


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


    
    const menuItems = getMenuItems(appliedFilter.type)
    const dateMenuItems = getDateMenuItems()

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
                appliedFilter.type === "int"
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