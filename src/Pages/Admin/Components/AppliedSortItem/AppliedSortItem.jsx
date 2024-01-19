//React
import { useEffect, useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components

import StringHelper from '../../../../Helpers/StringsHelper'

//MUI
import {
    Box, FormControl, IconButton, InputLabel, MenuItem, Select, Typography,
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


const StyledNameBox = styled(Box)(
    () => ({
        display: "flex",
        alignItems: "center",
        width: "150px"
    })
);




// --- Items ---

const getMenuItems = () => {
    return [
        {
            name: "Ascending",
            value: "ascending",
        },
        {
            name: "Descending",
            value: "descending",
        }
    ]

}


const AppliedSortItem = ({appliedSort, handleDeleteSort, updateSortValue, title}) => {

    //States
    //Get filters from session storage
    const pageSorts = useMemo(() => {
        const storedSorts = JSON.parse(sessionStorage.getItem('sorts')) || {};
        return storedSorts[title] || {};
    }, [title]);

    const [type, setType] = useState('');

    useEffect(() => {
        const storedSorts = pageSorts.appliedSorts || [];
        if(storedSorts.length > 0) {
            storedSorts.forEach(sortParent => {
                if (sortParent.sort.value === appliedSort.value) {
                    setType(() => sortParent.type)
                }
            });
        }

    }, [appliedSort, pageSorts])
    
    useEffect(() => {
        // Update the value in the parent component using the callback
        updateSortValue(appliedSort, type);
    }, [type]) //TODO: find what you can do to make this warning gone


    //Handlers
    const handleChangeType = (event) => {
        setType(() => {
            return event.target.value
        });
    };




    
    const menuItems = getMenuItems()

    return (
        <StyledAppliedFilterItem>
            <StyledNameBox>
                <IconButton onClick={() => handleDeleteSort(appliedSort)}>
                        <DeleteOutlineOutlinedIcon />
                </IconButton>
                <Typography variant='subtitle1'>
                    {StringHelper.capitalizeEachWord(appliedSort.value.split("_").join(" "))}
                </Typography>
            </StyledNameBox>
            <StyledFormControl size='small'>
                <InputLabel id="demo-simple-select-label">Select Sort Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Select Process"
                    onChange={handleChangeType}
                    fullWidth
                >
                    {
                        menuItems.map((item, key) => {
                            return <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                        })
                    }
                </Select>
            </StyledFormControl>
            
        </StyledAppliedFilterItem>
    );
};

AppliedSortItem.propTypes = {
    appliedSort: propTypes.object.isRequired,
    handleDeleteSort: propTypes.func.isRequired,
    updateSortValue: propTypes.func.isRequired,
    title: propTypes.string,
}

export default AppliedSortItem;