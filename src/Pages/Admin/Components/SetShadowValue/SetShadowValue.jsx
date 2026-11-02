//React
import { Fragment } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Autocomplete,
    Box,
    Card,
    Divider,
    TextField,
} from '@mui/material'
import { styled } from '@mui/system'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

//propTypes 
import propTypes from 'prop-types'
import { pixelValues } from '../../../../Helpers/DefaultValues/autocompleteValues'
import { MuiColorInput } from 'mui-color-input'
import { AdminMainButton } from '../../../../Components';
import { useTheme } from '@emotion/react';

//Styled Components
const StyledSetShadowValue = styled(Card)(
    ({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(),
        padding: theme.spacing(),
        overflow: "visible",
    })
)

const StyledShadowBox = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(),
        position: "relative",
        overflow: "visible",
        "& .deleteButton": {
            backgroundColor: theme.palette.action.selected,
            borderRadius: theme.spacing(),
            position: 'absolute',
            top: 0,
            right: -50,
            zIndex: 9999,
            opacity: 0,
            transition: theme.transitions.create(['opacity'], {
                duration: theme.transitions.duration.standard,
            }),
        },
        "&:hover": {
            "& .deleteButton": {
                opacity: 1,
            }
        }
    })
);


const SetShadowValue = ({shadowsState, handleChangeStylePropValue}) => {
    const [shadows, setShadows] = shadowsState;
    // const [hShadow, setHShadow] = useState("0px")
    // const [vShadow, setVShadow] = useState("0px")
    // const [blurRadius, setBlurRadius] = useState("0px")
    // const [shadowColor, SetShadowColor] = useState("black")

    const newShadow = () => {
        return {
            "hShadow": "0px",
            "vShadow": "0px",
            "blurRadius": "0px",
            "shadowColor": "black",
        }
    }

    //handlers
    const handleChangeShadowValue = (index, valueType, value) => {
        const updatedShadows = [...shadows];
        updatedShadows[index] = { ...updatedShadows[index], [valueType]: value};
        setShadows(updatedShadows);
        handleChangeStylePropValue(null, updatedShadows);
    };

    const handleDeleteShadow = (index) => {
        const updatedShadows = shadows.filter((_, key) => key !== index);
        setShadows(updatedShadows);
        handleChangeStylePropValue(null, updatedShadows);
    }

    return (
        <StyledSetShadowValue>
            {
                shadows && shadows.length > 0 &&
                shadows.map((shadow, index) => {
                    

                    //TODO: continue
                    return (
                        <StyledShadowBox key={index}>
                            <Autocomplete
                                size='small'
                                options={pixelValues(true)}
                                fullWidth
                                value={shadow.hShadow}
                                onChange={(e, newValue) => handleChangeShadowValue(index, "hShadow", newValue)}
                                renderInput={(params) => <TextField {...params} label="Horizontal Shadow" />}
                            />
                            <Autocomplete
                                size='small'
                                options={pixelValues(true)}
                                fullWidth
                                value={shadow.vShadow}
                                onChange={(e, newValue) => handleChangeShadowValue(index, "vShadow", newValue)}
                                renderInput={(params) => <TextField {...params} label="Vertical Shadow" />}
                            />
                            <Autocomplete
                                size='small'
                                options={pixelValues(true)}
                                fullWidth
                                value={shadow.blurRadius}
                                onChange={(e, newValue) => handleChangeShadowValue(index, "blurRadius", newValue)}
                                renderInput={(params) => <TextField {...params} label="Blur Radius" />}
                            />
                            <MuiColorInput 
                                label={"Color"}
                                fullWidth
                                size='small'
                                value={shadow.shadowColor}
                                onChange={(e, newValue) => handleChangeShadowValue(index, "shadowColor", newValue.hex8)}
                                format="hex"
                                isAlphaHidden
                            />
                            <Divider sx={{width: "100%", margin: 1}} />
                            <Box className="deleteButton"   >
                                <AdminMainButton 
                                    type='custom' 
                                    icon={<DeleteOutlineOutlinedIcon color='error' />}
                                    appearance='iconButton'
                                    title='Add Shadow'
                                    putBorder
                                    onClick={() => handleDeleteShadow(index)}
                                />
                            </Box>
                        </StyledShadowBox>
                    )
                })
            }
            <AdminMainButton 
                type='custom' 
                icon={<AddOutlinedIcon />}
                appearance='primary'
                title='Add Shadow'
                putBorder
                onClick={() => setShadows(prev => [...prev, newShadow()])}                 
            />
        </StyledSetShadowValue>
    );
};

SetShadowValue.propTypes = {
    shadowsState: propTypes.array,
    handleChangeStylePropValue: propTypes.func,
}

export default SetShadowValue;