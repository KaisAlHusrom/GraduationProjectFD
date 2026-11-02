//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Autocomplete,
    Box,
    TextField,
} from '@mui/material'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

//propTypes 
import propTypes from 'prop-types'
import { MuiColorInput } from 'mui-color-input';
import { percentValues } from '../../../../Helpers/DefaultValues/autocompleteValues';
import { AdminMainButton } from '../../../../Components';
import { useTheme } from '@emotion/react';

//Styled Components



const GradientValues = ({firstValueState, colorsState, handleChangeStylePropValue, firstValues, label}) => {
    const theme = useTheme()

    const [selectedColors, setSelectedColors] = colorsState
    const [startValue, setStartValue] = firstValueState

    return (
        <Box sx={{position: "relative", overflow:"visible", display: "flex", flexDirection: "column", alignItems:"center", gap: 1, width: "100%"}}>
                    <Autocomplete
                        size='small'
                        fullWidth
                        options={firstValues}
                        value={startValue}
                        onChange={(e, newValue) => setStartValue(newValue)}
                        renderInput={(params) => <TextField {...params} label={label} />}
                    />
                    {
                        selectedColors && selectedColors.length > 0 &&
                        selectedColors.map((col, index) => {
                                const handleChangeColor = (value) => {
                                    const updatedColors = [...selectedColors];
                                    updatedColors[index] = { ...updatedColors[index], color: value.hex8 };
                                    setSelectedColors(updatedColors);
                                    handleChangeStylePropValue(null, updatedColors);
                                };
                                
                                const handleChangePercentage = (value) => {
                                    const updatedColors = [...selectedColors];
                                    updatedColors[index] = { ...updatedColors[index], percentage: value };
                                    setSelectedColors(updatedColors);
                                    handleChangeStylePropValue(null, updatedColors);
                                }

                                const handleDeleteColor = () => {
                                    if (selectedColors.length <= 2) {
                                        return;
                                    }
                                    const updatedColors = [...selectedColors];
                                    updatedColors.splice(index, 1);
                                    setSelectedColors(updatedColors);
                                    handleChangeStylePropValue(null, updatedColors);
                                };
                                
                                
                                
                                return (
                                    <Box key={index} position={"relative"} overflow={"visible"} display={"flex"} alignItems={"center"} gap={1} width={"100%"}>
                                        <MuiColorInput 
                                        label={"Color"}
                                        sx={{width: "60%"}}
                                        size='small'
                                        value={col.color}
                                        onChange={(e, newValue) => handleChangeColor(newValue)}
                                        format="hex"
                                        isAlphaHidden
                                        />
                                        <Autocomplete
                                            size='small'
                                            sx={{width: "40%"}}
                                            value={col.percentage}
                                            options={percentValues}
                                            onChange={(e, newValue) => handleChangePercentage(newValue)}
                                            renderInput={(params) => <TextField {...params} label={"Percentage"} />}
                                        />
                                        <Box sx={{width: "10%"}}>
                                            <AdminMainButton 
                                                    type='custom' 
                                                    icon={<DeleteOutlineOutlinedIcon />}
                                                    appearance='iconButton'
                                                    title='remove color'
                                                    filled
                                                    onClick={handleDeleteColor}
                                                    sx={{
                                                        color: theme.palette.error.main,
                                                        width: "100%"
                                                    }}

                                                />
                                        </Box>
                                    </Box>
                                )
                            })
                        
                    }
                    <AdminMainButton 
                        type='custom' 
                        icon={<AddOutlinedIcon />}
                        appearance='primary'
                        title='Add Color'
                        putBorder
                        onClick={() => setSelectedColors(prev => [...prev, {color: "white", percentage: `${parseInt(100 / (prev.length + 1))}%`}])}                 
                    />
                </Box>
    );
};

GradientValues.propTypes = {
    firstValueState: propTypes.array, 
    colorsState: propTypes.array,
    handleChangeStylePropValue: propTypes.func,
    firstValue: propTypes.any,
}

export default GradientValues;