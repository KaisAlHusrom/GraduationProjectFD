//React
import { useEffect, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box, Button,
} from '@mui/material'
import { styled } from '@mui/system'

//Icons
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';

//propTypes 
import propTypes from 'prop-types'

//Styled Components
const StyledSetFilter = styled(Box)(
    ({ theme }) => ({
    
    })
)

const getIcon = (dataType) => {
    if (dataType === 'image') {
        return <ImageOutlinedIcon />
    }

    if (dataType === "string") {
        return <FormatColorTextOutlinedIcon />
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

    if (dataType === "passwords") {
        return <KeyOutlinedIcon />
    }

    return <FormatColorTextOutlinedIcon />
}

const SetFilter = (props) => {
    const {
        database
    } = props

    //Split the columns and rows,
    const [loaderData, setLoaderData] = database
    const [columns, rows] = loaderData;

    //States
    //Get filter items based on columns
    const [filterMenuItems, setFilterMenuItems] = useState([]);
    useEffect(() => {
        // Use the functional form of setFilterMenuItems to update state
        setFilterMenuItems(() => {
            const newItems = []; // Create a new array for updated items

            Object.entries(columns).forEach(([column, type]) => {
                if (type !== "image") {
                    newItems.push({
                        value: column,
                        icon: getIcon(type),
                    });
                }
            });

            return [...newItems]; // Return the updated state
        });
    }, [columns]);
    //TODO: Fix handleFIlter function
    const handleFilter = () => {
        setLoaderData(
            [
                {
                    "id": "int",
                    "name": "string"
                },
                [
                    {
                        "id": 1,
                        "name": "kais",
                    }
                ]
            ]
        )
    }

    return (
        <StyledSetFilter>
            <Button onClick={handleFilter}>alo</Button>
        </StyledSetFilter>
    );
};

SetFilter.propTypes = {
    database: propTypes.array
}

export default SetFilter;