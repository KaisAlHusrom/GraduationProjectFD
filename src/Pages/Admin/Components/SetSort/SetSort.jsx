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
import SwapVertIcon from '@mui/icons-material/SwapVert';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
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
import AppliedSortItem from '../AppliedSortItem/AppliedSortItem';
import sortData from '../../../../Helpers/sortData';
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
        gap: theme.spacing(2)
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
            backgroundColor: theme.palette.secondary.light,
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

const SetSort = (props) => {
    const {
        // dataState,
        // rowsArrayState,
        // sortedDataState,
        title
    } = props

    //Split the columns and rows,
    // const [loaderData, ] = dataState

    // const [rowsArray, ] = rowsArrayState
    const {columns} = useMyContext();
    
    // --- States ---
    // const [, setSortedData] = sortedDataState
    
    //Get original sortMenuItems 
    const getMenuItems = useMemo(() => {
                const newItems = Object.entries(columns)
                .filter(([, type]) => type !== "image" && 
                                        type !== "file" && 
                                        type !== "text" && 
                                        type !== "bool" &&
                                        type !== "one-to-many" &&
                                        type !== "many-to-one" &&
                                        type !== "many-to-many" &&
                                        type !== "one-to-one" 
                )
                .map(([column, type]) => ({
                    value: column,
                    type: type,
                }));
        
                return newItems;
    }, [columns])

    //Get filters from session storage
    const pageSorts = useMemo(() => {
        const storedFilters = JSON.parse(sessionStorage.getItem('sorts')) || {};
        return storedFilters[title] || {};
    }, [title]);

    
    //Get filter items based on columns if there is not anything saved in session storage
    const [sortMenuItems, setSortMenuItems] = useState([]);
    useEffect(() => {
        setSortMenuItems(() => {
            const storedFilters = pageSorts.possibleSorts || [];
            if (storedFilters.length === 0) {
                return getMenuItems
            }
        
            return storedFilters;
            });
    }, [columns, getMenuItems, pageSorts]);



    //Applied Filters state
    const [appliedSorts, setAppliedSorts] = useState(() => {
        const storedSorts = pageSorts.appliedSorts || [];
        return storedSorts
    });

    // Change session storage every time filterMenuItems changes
    useEffect(() => {
        const updatedSorts = { ...JSON.parse(sessionStorage.getItem('sorts')) };
        updatedSorts[title] = { ...pageSorts, possibleSorts: sortMenuItems, appliedSorts: appliedSorts };
        sessionStorage.setItem('sorts', JSON.stringify(updatedSorts));
    }, [appliedSorts, sortMenuItems, pageSorts, title]);


    //Filters Count
    const {setSortsCount, setPageNumber, getAppliedSorts} = useMyContext()

    // --- Handlers ---

    // Callback to update filter values in SetFilter component
    // Memoize the updateFilterValue function using useCallback
    const updateSortValue = useCallback(
        (sort, type) => {
        //     // Find the index of the filter in appliedFilters
            const index = appliedSorts.findIndex((item) => item.sort === sort);

            // Update the value of the sort in appliedFilters
            const updatedAppliedFilters = [...appliedSorts];
            updatedAppliedFilters[index] = {
                sort: sort,
                type: type
            };

            // Update the state
            setAppliedSorts(updatedAppliedFilters);

        },
        [appliedSorts, setAppliedSorts]
    );

    //When add possible filter to applied filters
    const handleApplySort = (sort) => {
        // Create a new filter object with default values
        const newSort = {
            sort: sort,
            type: "", // Set default value
        };

        // Add the new filter to the appliedFilters array
        const updatedAppliedFilters = [...appliedSorts, newSort];

        // Remove the applied filter from possible filters
        const updatedFilterMenuItems = sortMenuItems.filter((existSort) => existSort !== sort);

        // Update the state
        setAppliedSorts(updatedAppliedFilters);
        setSortsCount(updatedAppliedFilters.length);
        setSortMenuItems(updatedFilterMenuItems);

        getAppliedSorts(updatedAppliedFilters);
    };

    //When delete possible filter from applied filters
    const handleDeleteSort = (sort) => {
        // Find the index of the filter in appliedFilters
        const index = appliedSorts.findIndex((item) => item.sort === sort);

        // Remove the filter from appliedFilters
        const updatedSorts = [...appliedSorts.slice(0, index), ...appliedSorts.slice(index + 1)];

        // Add the filter back to possible filters
        const updatedFilterMenuItems = [...sortMenuItems, sort];

        // Update the state
        setPageNumber(() => 1); //?? I have to make this 1 to get the data from the first page before change the sorts, because when change filters the data will be fetched again

        setAppliedSorts(updatedSorts);
        setSortsCount(updatedSorts.length);
        setSortMenuItems(updatedFilterMenuItems);
        // setData(() => sortData(rowsArray, updatedSorts))
        getAppliedSorts(updatedSorts);
    };
    

    const handleSortData = () => {
        setPageNumber(() => 1);

        getAppliedSorts(appliedSorts);
    };

    const handleGetAllData = () => {
        setPageNumber(() => 1);
        setAppliedSorts(() => [])
        setSortsCount(0);
        setSortMenuItems(() => getMenuItems);
        
        getAppliedSorts([])
        // setData(null);
    }


    
    return (
        <StyledSetFilter>
            

                
                <StyledFiltersBox>
                    <StyledTitle component="div" variant='h7'>
                            Applied Sorts
                    </StyledTitle>
                    {appliedSorts.length !== 0
                    ?
                    <>
                        <StyledAppliedFiltersBox>
                            {
                                appliedSorts.map((appliedSort, key) => {
                                    return(
                                        <AppliedSortItem 
                                        key={key} 
                                        appliedSort={appliedSort.sort} 
                                        handleDeleteSort={handleDeleteSort} 
                                        updateSortValue={updateSortValue}
                                        title={title}
                                        />
                                    )
                                })
                            }
                        </StyledAppliedFiltersBox>
                        <StyledSubmitBox>
                            <AdminMainButton 
                            icon={<SwapVertIcon />}
                            appearance='primary' 
                            title='Sort' 
                            type='custom'
                            onClick={handleSortData} 
                            putBorder
                            // filled
                            />

                            <AdminMainButton 
                            icon={<DensitySmallIcon />}
                            appearance='secondary' 
                            // filled
                            variant="filled"
                            title='Clear Sorts' 
                            type='custom'
                            onClick={handleGetAllData} 
                            putBorder
                            />
                        </StyledSubmitBox>
                    </>
                    :
                    <>
                    <Alert severity="info"variant='outlined' >This is no applied sorts</Alert>
                    <StyledSubmitBox>
                            <AdminMainButton 
                            icon={<DensitySmallIcon />}
                            appearance='secondary'
                            title='Clear Sorts' 
                            type='custom'
                            onClick={handleGetAllData} />
                    </StyledSubmitBox>
                
                    </>
                    
                    
                    
                    }        

                </StyledFiltersBox>

            <StyledAllColumnsBox>
                <StyledTitle component="div" variant='h7'>
                        All Possible Sorts
                </StyledTitle>
                <StyledAllFilters container spacing={1}>
                    {
                        sortMenuItems.map((filter, key) => {
                            return (
                                <Grid onClick={() => handleApplySort(filter)} key={key} item xs={4}>
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


SetSort.propTypes = {
    // dataState: propTypes.array.isRequired,
    // rowsArrayState: propTypes.array,
    // sortedDataState: propTypes.array.isRequired,
    title: propTypes.string.isRequired,
}

export default SetSort;