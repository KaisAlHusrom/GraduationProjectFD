//React
import { useCallback, useEffect, useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components
import { AdminMainButton } from '../../../../Components';

//MUI
import {
    Alert,
    Box, Grid, Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//Icons
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import NumbersIcon from '@mui/icons-material/Numbers';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
//propTypes 
import propTypes from 'prop-types'
import StringHelper from '../../../../Helpers/StringsHelper';
import AppliedFilterItem from '../AppliedFilterItem/AppliedFilterItem';
import { useMyContext } from '../../../../Components/DatabaseView/DatabaseView';




//Styled Components
const StyledSetFilter = styled(Box)(
    ({ theme }) => ({
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: theme.spacing(),
    })
)

const StyledFiltersBox = styled(Box)(
    () => ({
        width: "100%",

    })
)

const StyledAllColumnsBox = styled(Box)(
    () => ({
        width: "100%",
    })
)

const StyledAllFilters = styled(Grid)(
    () => ({
        
    })
)

const StyledAppliedFiltersBox = styled(Box)(
    ({theme }) => ({
        width: '100%',
        display: "flex",
        flexDirection: 'column',
        gap: theme.spacing(2),
        
    })
)

const StyledPossibleFilterItem = styled(Box)(
    ({ theme }) => ({
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        position: "relative",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        border: "1px solid",
        borderColor: theme.palette.divider,
        borderRadius: theme.spacing(2),
        cursor: "pointer",
        transition: theme.transitions.create(['background-color'], {
            duration: theme.transitions.duration.short,
        }),
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
        },
        "&:active": {
            backgroundColor: theme.palette.primary.dark,
        },
    })
)

const StyledType = styled(Typography)(
    ({ theme }) => ({
        color: theme.palette.text.secondary,
        position: "absolute",
        right: "10px",
        bottom: "5px",
    })
)

const StyledIconBox = styled(Box)(
    ({ theme }) => ({
        marginRight: theme.spacing(),
        marginLeft: theme.spacing(),
    })
)

const StyledTitle = styled(Typography)(
    ({ theme }) => ({
        borderBottom: "1px solid",
        borderColor: theme.palette.divider,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: theme.spacing(),
        paddingTop: theme.spacing(),
        backgroundColor: theme.palette.primary.dark,
        marginBottom: theme.spacing(2),
        color: theme.palette.primary.contrastText,
        borderRadius: theme.spacing(2)
    })
)

const StyledSubmitBox = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        width: "100%",
        justifyContent: "flex-end",
        gap: theme.spacing(),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    })
);

//Get Convenient Icon
const getIcon = (dataType) => {
    if (dataType === 'image') {
        return <ImageOutlinedIcon />
    }

    if (dataType === "date" || dataType === "dateTime") {
        return <DateRangeOutlinedIcon />
    }

    if (dataType === "bool") {
        return <CheckBoxOutlinedIcon />
    }

    if (dataType === "email") {
        return <AlternateEmailOutlinedIcon />
    }

    if (dataType === "password") {
        return <KeyOutlinedIcon />
    }

    if (dataType === "int") {
        return <NumbersIcon />
    }

    if (dataType === "decimal") {
        return <AttachMoneyIcon />
    }

    return <FormatColorTextOutlinedIcon />
}

const SetFilter = (props) => {
    const {
        // dataState,
        // filteredDataState,
        title
    } = props

    //Split the columns and rows,
    // const [loaderData, ] = dataState

    // const [rowsArray, ] = rowsArrayState
    const {columns} = useMyContext();
    
    // --- States ---


    //Get original filterMenuItems 
    const getMenuItems = useMemo(() => {
        const newItems = Object.entries(columns)
        .filter(([, type]) => type !== "image" && 
                                type !== "file"
        )
        .map(([column, type]) => ({
            value: column,
            type: type,
        }));

        return newItems;
}, [columns])
    

    //Get filters from session storage
    const pageFilters = useMemo(() => {
        const storedFilters = JSON.parse(sessionStorage.getItem('filters')) || {};
        return storedFilters[title] || {};
    }, [title]);

    
    //Get filter items based on columns if there is not anything saved in session storage
    const [filterMenuItems, setFilterMenuItems] = useState([]);
    useEffect(() => {
        setFilterMenuItems(() => {
            const storedFilters = pageFilters.possibleFilters || [];
            if (storedFilters.length === 0) {
                return getMenuItems;
            }
        
            return storedFilters;
            });
    }, [columns, getMenuItems, pageFilters]);



    //Applied Filters state
    const [appliedFilters, setAppliedFilters] = useState(() => {
        const storedFilters = pageFilters.appliedFilters || [];
        return storedFilters
    });

    // Change session storage every time filterMenuItems changes
    useEffect(() => {
        const updatedFilters = { ...JSON.parse(sessionStorage.getItem('filters')) };
        updatedFilters[title] = { ...pageFilters, possibleFilters: filterMenuItems, appliedFilters: appliedFilters };
        sessionStorage.setItem('filters', JSON.stringify(updatedFilters));
    }, [appliedFilters, filterMenuItems, pageFilters, title]);


    //Filters Count
    const {setFiltersCount, setPageNumber, getAppliedFilters} = useMyContext()

    // --- Handlers ---

    // Callback to update filter values in SetFilter component
    // Memoize the updateFilterValue function using useCallback
    const updateFilterValue = useCallback(
        (filter, process, newValue, startDate, endDate, period, relationValue) => {
            // Find the index of the filter in appliedFilters
            const index = appliedFilters.findIndex((item) => item.filter === filter);

            // Update the value of the filter in appliedFilters
            const updatedAppliedFilters = [...appliedFilters];
            updatedAppliedFilters[index] = {
                filter: filter,
                process: process,
                value: newValue,
                startDate: startDate,
                endDate: endDate,
                period: period,
                relationValue: relationValue
            };

            // Update the state
            setAppliedFilters(() => updatedAppliedFilters);
            
        },
        [appliedFilters]
    );

    //When add possible filter to applied filters
    const handleApplyFilter = (filter) => {
        // Create a new filter object with default values
        const newFilter = {
            filter: filter,
            process: "", // Set default value
            value: "", // Set default value
            startDate: "", // Set default value
            endDate: "", // Set default value
            period: "",   // Set default value
            relationValue: [], // Set default value
        };

        // Add the new filter to the appliedFilters array
        const updatedAppliedFilters = [...appliedFilters, newFilter];

        // Remove the applied filter from possible filters
        const updatedFilterMenuItems = filterMenuItems.filter((existFilter) => existFilter !== filter);

        // Update the state
        setAppliedFilters(() => updatedAppliedFilters);
        
        setFiltersCount(updatedAppliedFilters.length);
        setFilterMenuItems(updatedFilterMenuItems);

        getAppliedFilters(updatedAppliedFilters);
    };

    //relations
    // const {relations} = useLoaderData()

    //When delete possible filter from applied filters
    const handleDeleteFilter = async (filter) => {
        // Find the index of the filter in appliedFilters
        const index = appliedFilters.findIndex((item) => item.filter === filter);

        // Remove the filter from appliedFilters
        const updatedFilters = [...appliedFilters.slice(0, index), ...appliedFilters.slice(index + 1)];

        // Add the filter back to possible filters
        const updatedFilterMenuItems = [...filterMenuItems, filter];

        // Update the state
        setPageNumber(() => 1); //?? I have to make this 1 to get the data from the first page before change the filters, because when change filters the data will be fetched again
        setAppliedFilters(() => updatedFilters);
        
        setFiltersCount(updatedFilters.length);
        setFilterMenuItems(updatedFilterMenuItems);


        getAppliedFilters(updatedFilters);
    };
    

    const handleFilterData = async () => {
        setPageNumber(() => 1);

        getAppliedFilters(appliedFilters);
    };

    const handleGetAllData = async () => {
        setPageNumber(() => 1);
        setAppliedFilters(() => [])
        setFiltersCount(0);
        setFilterMenuItems(()=> getMenuItems);


        getAppliedFilters([]);
    }


    
    return (
        <StyledSetFilter>
            

                
                <StyledFiltersBox>
                    <StyledTitle component="div" variant='h7'>
                            Applied Filters
                    </StyledTitle>
                    {appliedFilters.length !== 0
                    ?
                    <>
                        <StyledAppliedFiltersBox>
                            {
                                appliedFilters.map((appliedFilter, key) => {
                                    return(
                                        <AppliedFilterItem 
                                        key={key} 
                                        appliedFilter={appliedFilter.filter} 
                                        handleDeleteFilter={handleDeleteFilter} 
                                        updateFilterValue={updateFilterValue}
                                        title={title}
                                        />
                                    )
                                })
                            }
                        </StyledAppliedFiltersBox>
                        <StyledSubmitBox>
                            <AdminMainButton 
                            icon={<FilterAltOutlinedIcon />}
                            appearance='primary' 
                            title='Filter' 
                            type='custom'
                            onClick={handleFilterData}
                            putBorder
                            />

                            <AdminMainButton 
                            icon={<FilterAltOutlinedIcon />}
                            appearance='secondary' 
                            title='Get All Data' 
                            type='custom'
                            onClick={handleGetAllData} 
                            putBorder
                            />
                        </StyledSubmitBox>
                    </>
                    :
                    <>
                    <Alert severity="info"variant='outlined' >This is no applied filters</Alert>
                    <StyledSubmitBox>
                            
                            <AdminMainButton 
                            icon={<FilterAltOutlinedIcon />}
                            appearance='secondary' 
                            title='Get All Data' 
                            type='custom'
                            onClick={handleGetAllData} />
                    </StyledSubmitBox>
                
                    </>
                    
                    
                    
                    }        

                </StyledFiltersBox>

            <StyledAllColumnsBox>
                <StyledTitle component="div" variant='h7'>
                        All Possible Filters
                </StyledTitle>
                <StyledAllFilters container spacing={1}>
                    {
                        filterMenuItems.map((filter, key) => {
                            return (
                                <Grid onClick={() => handleApplyFilter(filter)} key={key} item xs={4}>
                                    <StyledPossibleFilterItem>
                                        <StyledIconBox>
                                        {
                                            getIcon(filter.type)
                                        }
                                        </StyledIconBox>
                                        <Typography variant='body1'>
                                            {
                                                filter.value === "id"
                                                ?
                                                filter.value.split('_').join(" ").toUpperCase()
                                                :
                                                StringHelper.capitalizeEachWord(filter.value.split('_').join(" "))
                                            }
                                            
                                        </Typography>
                                        <StyledType variant='body2'>
                                            {filter.type}
                                        </StyledType>
                                    </StyledPossibleFilterItem>
                                </Grid>
                            )
                        })
                    }

                </StyledAllFilters>
                
            </StyledAllColumnsBox>
        </StyledSetFilter>
    );
};

SetFilter.propTypes = {
    // dataState: propTypes.array.isRequired,
    rowsArrayState: propTypes.array,
    // filteredDataState: propTypes.array.isRequired,
    title: propTypes.string.isRequired,
}

export default SetFilter;