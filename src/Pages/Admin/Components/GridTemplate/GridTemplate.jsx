//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Autocomplete,
    Box,
    TextField,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate'
import { getChildren } from '../../../../Helpers/RecursiveHelpers/getChildren'
import { pixelValues } from '../../../../Helpers/DefaultValues/autocompleteValues'

//Styled Components
const StyledGridTemplate = styled(Box)(
    ({ theme }) => ({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(),
        alignItems: "center",
    })
)


const GridTemplate = ({direction, handleChangeStylePropValue}) => {
    const {
        template,
        selectedSubElementIds
    } = useMyCreateElementContext() || {}

    //get the children to know how many text field will be added to change
    const children = useMemo(() => {
        if(selectedSubElementIds?.length === 1) {
            return getChildren(template, selectedSubElementIds[0])
        }
        return null
    }, [selectedSubElementIds, template])

    //grid values
    const [gridValues, setGridValues] = useState(Array.from({ length: children ? children.length : 0 }, () => `${2}px`))

    //handlers
    const handleChangeGridValues = (e, key, newValue) => {
        const updated = [...gridValues]
        updated[key] = newValue
        console.log(updated)
        setGridValues(() => updated)
        handleChangeStylePropValue(e, updated)
    }

    // const handleKeyDown = (e, key) => {
    //     if (e.key === 'ArrowUp') {
    //         const updated = [...gridValues]
    //         updated[key] += 2
    //         setGridValues(() => updated)
    //         handleChangeStylePropValue(e, updated)
    //     }

    //     if (e.key === 'ArrowDown') {
    //         const updated = [...gridValues]
    //         updated[key] -= 2
    //         setGridValues(() => updated)
    //         handleChangeStylePropValue(e, updated)
    //     }
    // }

    return (
        <StyledGridTemplate>
            {
                children && children.length > 0 ?
                    children.map((_, key) => {
                        return (
                            <Autocomplete
                                key={key}
                                fullWidth
                                size='small'
                                value={gridValues[key]}
                                onChange={(e, newValue) => handleChangeGridValues(e, key, newValue)}
                                options={pixelValues(false)}
                                renderInput={(params) => <TextField {...params} label={`${key + 1} child ${direction} size`} />}
                            />
                        )
                    })

                : 
                <Typography variant='h7' color="warning.main">There is no children to selected element !</Typography>
            }
        </StyledGridTemplate>
    );
};

GridTemplate.propTypes = {
    direction: propTypes.string,
    handleChangeStylePropValue: propTypes.func,
}

export default GridTemplate;