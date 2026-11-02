//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components
import { conicGradientFromValues, fontWeights, imageValueTypes, linearGradientDirections, numberValues, opacities, percentValues, pixelValues, positions, radialGradientValues, timeValues, vh, vw } from '../../../../Helpers/DefaultValues/autocompleteValues'
import { AdminMainButton, CustomLazyAutoComplete } from '../../../../Components'
import GradientValues from '../GradientValues/GradientValues'
import UploadImageButton from '../UploadImageButton/UploadImageButton'
import SetShadowValue from '../SetShadowValue/SetShadowValue'


//MUI
import {
    Autocomplete,
    ButtonGroup,
    Card,
    TextField,
} from '@mui/material'
import { MuiColorInput } from 'mui-color-input'

//propTypes 
import propTypes from 'prop-types'
import GridTemplate from '../GridTemplate/GridTemplate'
import { fetchStyleProps } from '../../../../Services/AdminServices/Services/stylePropsService'
import { writeFilterObject } from '../../../../Helpers/filterData'


//Styled Components


const AppropriateStyleValues = (props) => {
        const {
            type,
            defaultProps,
            values,
            valueState,
            label,
            shadows,
            setShadows,
            handleChangeStylePropValue,
            imageValueType,
            setImageValueType,
            image,
            setImage,
            conicGradientFromAngle, setConicGradientFromAngle,
            linearGradientDirection, setLinearGradientDirection,
            selectedColors, setSelectedColors,
            radialGradientShapeValue, setRadialGradientShapeValue, valueType, setValueType, sectionStyle
        } = props
        

        if(type  === "props") {
            return (
                <CustomLazyAutoComplete
                    handleFetchData={fetchStyleProps}
                    filters={[
                        writeFilterObject("category_id", "many-to-one", "!=", "", "", "", "", "3cf74981-0e33-4a88-89a3-d1bcb29d35f8")
                    ]}
                    label='Style Properties'
                    optionName='style_prop_normal_name'
                    optionId='id'
                    valueState={[valueState.value, valueState.setValue]}
                    customHandleChange={handleChangeStylePropValue}
                    sectionStyle={sectionStyle} // Pass sectionStyle here

                />
            )
        }

        if(type  === "time") {
            return (
                <Autocomplete
                    {...defaultProps}
                    options={timeValues}
                    renderInput={(params) => <TextField {...params} label={label} />}
                />
            )
        }

        if(type  === "gridTemplateRows") {
            return (
                <GridTemplate direction="row" handleChangeStylePropValue={handleChangeStylePropValue} />
            )
        }

        if(type  === "gridTemplateColumns") {
            return (
                <GridTemplate direction="column" handleChangeStylePropValue={handleChangeStylePropValue} />
            )
        }

        if(type  === "string") {
            return (
                <Autocomplete
                    {...defaultProps}
                    options={values}
                    getOptionLabel={option => option['style_prop_value_normal_name']}
                    getOptionKey={option => option['id']}
                    renderInput={(params) => <TextField {...params} label={label} value = {"hello"}/>}
                />
            )
        }
    
        if(type  === "color") {
            return (
                <MuiColorInput 
                    {...defaultProps}
                    format="hex"
                    isAlphaHidden
                    label={label}
                />
            )
        }
    
    
        if(type  === "px") {
            return (
                <Autocomplete
                    {...defaultProps}
                    options={pixelValues(label === "Margin" ? true : false)}
                    renderInput={(params) => <TextField {...params} label={label} />}
                />
            )
        }
    
        if(type  === "number") {
            return (
                <Autocomplete
                    {...defaultProps}
                    options={numberValues}
                    renderInput={(params) => <TextField {...params} label={label} />}
                />
            )
        }
    
        if(type  === "vh" || type === "vw"){
            return (
                <Autocomplete
                    {...defaultProps}
                    options={type === "vh" ? vh : vw}
                    renderInput={(params) => <TextField {...params} label={label} />}
                />
            )
        }
        
        if(type === "shadow"){
            return (
                <SetShadowValue 
                shadowsState={[shadows, setShadows]} 
                handleChangeStylePropValue={handleChangeStylePropValue}
                />
            )
        }
    
        if(type === "fontWeight"){
            return (
                <Autocomplete
                    {...defaultProps}
                    options={fontWeights}
                    renderInput={(params) => <TextField {...params} label={label} />}
                />
            )
        }
    
        if(type === "opacity"){
            return (
                <Autocomplete
                    {...defaultProps}
                    options={opacities}
                    renderInput={(params) => <TextField {...params} label={label} />}
                />
            )
        }
    
        if(type  === "image"){
            return <UploadImageButton 
                customOnChange={handleChangeStylePropValue} 
                imageState={[image, setImage]} 
                label="Image" 
                showImage={true} 
            />
        }
        if(type  === "background-image"){
            return (
                <Card sx={{padding: 1, display: "flex", flexDirection:"column", gap:1, overflow: "visible"}}>
            
                <Autocomplete
                    size='small'
                    options={imageValueTypes}
                    value={imageValueType}
                    onChange={(e, newValue) => setImageValueType(newValue)}
                    renderInput={(params) => <TextField {...params} label="Value Type" />}
                />
                {
                    imageValueType === "Url"
                    ?
                        <UploadImageButton 
                        customOnChange={handleChangeStylePropValue} 
                        imageState={[image, setImage]} 
                        label="Background Image" 
                        showImage={true} />
                    :
                    imageValueType === "Conic Gradient"
                    ?
                    <GradientValues 
                        firstValues={conicGradientFromValues}
                        firstValueState={[conicGradientFromAngle, setConicGradientFromAngle]}
                        colorsState={[selectedColors, setSelectedColors]}
                        handleChangeStylePropValue={handleChangeStylePropValue}
                        label={"From deg"}
                    />
                    :
                    imageValueType === "Linear Gradient"
                    ?
                    <GradientValues 
                        firstValues={linearGradientDirections}
                        firstValueState={[linearGradientDirection, setLinearGradientDirection]}
                        colorsState={[selectedColors, setSelectedColors]}
                        handleChangeStylePropValue={handleChangeStylePropValue}
                        label={"Direction"}
                    />
                    :
                    imageValueType === "Radial Gradient"
                    ?
                    <GradientValues 
                        firstValues={radialGradientValues}
                        firstValueState={[radialGradientShapeValue, setRadialGradientShapeValue]}
                        colorsState={[selectedColors, setSelectedColors]}
                        handleChangeStylePropValue={handleChangeStylePropValue}
                        label={"Shape"}
                    />
                    :
                    imageValueType === "Repeating Conic Gradient"
                    ?
                    <GradientValues 
                        firstValues={conicGradientFromValues}
                        firstValueState={[conicGradientFromAngle, setConicGradientFromAngle]}
                        colorsState={[selectedColors, setSelectedColors]}
                        handleChangeStylePropValue={handleChangeStylePropValue}
                        label={"From deg"}
                    />
                    :
                    imageValueType === "Repeating Linear Gradient"
                    ?
                    <GradientValues 
                        firstValues={conicGradientFromValues}
                        firstValueState={[conicGradientFromAngle, setConicGradientFromAngle]}
                        colorsState={[selectedColors, setSelectedColors]}
                        handleChangeStylePropValue={handleChangeStylePropValue}
                        label={"From deg"}
                    />
                    :
                    imageValueType === "Repeating Radial Gradient"
                    ?
                    <GradientValues 
                        firstValues={radialGradientValues}
                        firstValueState={[radialGradientShapeValue, setRadialGradientShapeValue]}
                        colorsState={[selectedColors, setSelectedColors]}
                        handleChangeStylePropValue={handleChangeStylePropValue}
                        label={"Shape"}
                    />
                    :
                    null
                }
                </Card>
            )
        }
    
        if(type  === "position"){
            return (
                <Autocomplete
                    {...defaultProps}
                    options={positions}
                    renderInput={(params) => <TextField {...params} label={label} />}
                />
            )
        }
    
        if(type  === "px;vw;%"){
            return (
                <>
                <ButtonGroup fullWidth sx={{mb: 2}} variant="text" aria-label="Basic button group">
                    <AdminMainButton 
                        type='custom'
                        appearance='primary'
                        title='PX'
                        onClick={() => setValueType("px")}
                        filled={valueType === "px" ? true : false}
                    />
                    <AdminMainButton 
                        type='custom'
                        appearance='primary'
                        title='%'
                        onClick={() => setValueType("%")}
                        filled={valueType === "%" ? true : false}
                    />
                    <AdminMainButton 
                        type='custom'
                        appearance='primary'
                        title='VW'
                        onClick={() => setValueType("vw")}
                        filled={valueType === "vw" ? true : false}
                    />
                </ButtonGroup>
                <Autocomplete
                    {...defaultProps}
                    options={valueType === "px" ? pixelValues() : valueType === "vw" ? vw : percentValues}
                    renderInput={(params) => <TextField {...params} label={label} />}
                />
                </>
            )
        }
    
        if(type  === "px;vh;%"){
            return (
                <>
                <ButtonGroup fullWidth sx={{mb: 2}} variant="text" aria-label="Basic button group">
                    <AdminMainButton 
                        type='custom'
                        appearance='primary'
                        title='PX'
                        onClick={() => setValueType("px")}
                        filled={valueType === "px" ? true : false}
                    />
                    <AdminMainButton 
                        type='custom'
                        appearance='primary'
                        title='%'
                        onClick={() => setValueType("%")}
                        filled={valueType === "%" ? true : false}
                    />
                    <AdminMainButton 
                        type='custom'
                        appearance='primary'
                        title='VH'
                        onClick={() => setValueType("vh")}
                        filled={valueType === "vh" ? true : false}
                    />
                </ButtonGroup>
                <Autocomplete
                    {...defaultProps}
                    options={valueType === "px" ? pixelValues() : valueType === "vh" ? vh : percentValues}
                    renderInput={(params) => <TextField {...params} label={label} />}
                />
                </>
            )
        }
}

AppropriateStyleValues.propTypes = {
    type: propTypes.string,
    defaultProps: propTypes.object,
    values: propTypes.array,
    valueState: propTypes.object,
    label: propTypes.string,
    shadows: propTypes.array,
    setShadows: propTypes.func,
    handleChangeStylePropValue: propTypes.func,
    imageValueType: propTypes.string,
    setImageValueType: propTypes.func,
    image: propTypes.object,
    setImage: propTypes.func,
    conicGradientFromAngle: propTypes.string,
    setConicGradientFromAngle: propTypes.func,
    linearGradientDirection: propTypes.string,
    setLinearGradientDirection: propTypes.func,
    selectedColors: propTypes.array,
    setSelectedColors: propTypes.func,
    radialGradientShapeValue: propTypes.string,
    setRadialGradientShapeValue: propTypes.func,
    valueType: propTypes.string, 
    setValueType: propTypes.func
}
export default AppropriateStyleValues;