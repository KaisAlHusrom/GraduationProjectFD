//React
import { useCallback, useEffect, useMemo, useState } from 'react'



//Components
import AppropriateStyleValues from '../AppropriateStyleValues/AppropriateStyleValues'
import { useTheme } from '@emotion/react'

//MUI
import {
    Box,
} from '@mui/material'


//propTypes 
import propTypes from 'prop-types'





export const GetAppropriateStyleValues = (props) => {
    const {stylePropValueType, stylePropValues, label, valueState, locateTypes, directionsState , sectionStyle} = props

    const {value, setValue, 
        // cssValue 
    }= valueState


    //for width and height properties
    const [valueType, setValueType] = useState("px")

    //for background-image type
    const [imageValueType, setImageValueType] = useState("Url")
    const [image, setImage] = useState(null)
    
    //for linear gradient value type
    const [linearGradientDirection, setLinearGradientDirection] = useState("to right")
    //for conic gradient value type
    const [conicGradientFromAngle, setConicGradientFromAngle] = useState("0")
    //for Radial gradient value type
    const [radialGradientShapeValue, setRadialGradientShapeValue] = useState("ellipse")
    //selected colors
    const [selectedColors, setSelectedColors] = useState([
        {
            color: "white",
            percentage: "1%",
        },
        {
            color: "black",
            percentage: "100%",
        },
    ])

    //selected shadows
    const [shadows, setShadows] = useState([{
        "hShadow": "0px",
        "vShadow": "0px",
        "blurRadius": "0px",
        "shadowColor": "black",
    }])

    
    
    //set the value as null when the value type changes
    useEffect(() => {
        if(valueType) {
            setValue(() => null)
        } 
    }, [setValue, valueType])
    

    const handleChangeStylePropValue = useCallback((e, newValue) => {
        if(stylePropValueType === 'color') {
            setValue(() => newValue.hex8)
            // setValue(() => newValue)
        }

        if(stylePropValueType === "image") {
            if(e && e.target) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                    setImage(event.target.result);
                    setValue(() => `url(${event.target.result})`)
                };
                reader.readAsDataURL(file);
                setImage(file);
            }
        }

        if(stylePropValueType === "background-image") {
            if(imageValueType === "Url") {
                if(e && e.target) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        setImage(event.target.result);
                        setValue(() => `url(${event.target.result})`)
                    };
                    reader.readAsDataURL(file);
                    setImage(file);
                }
                
            }

            if(imageValueType === "Conic Gradient") {
                const colorStops = newValue.map(color => {
                    return `${color.color} ${color.percentage}`;
                });
                const gradientString = `conic-gradient(from ${conicGradientFromAngle}deg, ${colorStops.join(', ')})`;
                setValue(gradientString);
            }
            
            if(imageValueType === "Repeating Conic Gradient") {
                const colorStops = newValue.map(color => {
                    return `${color.color} ${color.percentage}`;
                });
                const gradientString = `repeating-conic-gradient(from ${conicGradientFromAngle}deg, ${colorStops.join(', ')})`;
                setValue(gradientString);
            }

            if(imageValueType === "Linear Gradient") {
                const colorStops = newValue.map(color => {
                    return `${color.color} ${color.percentage}`;
                });
                const gradientString = `linear-gradient(${linearGradientDirection}, ${colorStops.join(', ')})`;
                setValue(gradientString);
            }

            if(imageValueType === "Repeating Linear Gradient") {
                const colorStops = newValue.map(color => {
                    return `${color.color} ${color.percentage}`;
                });
                const gradientString = `repeating-linear-gradient(${conicGradientFromAngle}deg, ${colorStops.join(', ')})`;
                setValue(gradientString);
            }


            if(imageValueType === "Radial Gradient") {
                const colorStops = newValue.map(color => {
                    return `${color.color} ${color.percentage}`;
                });
                const gradientString = `radial-gradient(${radialGradientShapeValue}, ${colorStops.join(', ')})`;
                setValue(gradientString);
            }

            if(imageValueType === "Repeating Radial Gradient") {
                const colorStops = newValue.map(color => {
                    return `${color.color} ${color.percentage}`;
                });
                const gradientString = `repeating-radial-gradient(${radialGradientShapeValue}, ${colorStops.join(', ')})`;
                setValue(gradientString);
            }
        }

        if(stylePropValueType === "shadow") {
            const modifiedShadows = newValue.map(shadow => {
                return `${shadow.hShadow} ${shadow.vShadow} ${shadow.blurRadius} ${shadow.shadowColor}`;
            });
            const gradientString = `${modifiedShadows.join(', ')}`;
            setValue(gradientString);
        }

        if(stylePropValueType  === "gridTemplateRows") {
            const gridTemplateRows = `${newValue.join(' ')}`;
            setValue(gridTemplateRows);
        }

        if(stylePropValueType  === "gridTemplateColumns") {
            const gridTemplateColumns = `${newValue.join(' ')}`;
            console.log(gridTemplateColumns);
            setValue(gridTemplateColumns);
        }

        if( 
            stylePropValueType === "px" 
            || stylePropValueType === "px;vh;%" 
            || stylePropValueType === "px;vw;%" 
            || stylePropValueType === "string" 
            || stylePropValueType === "position" 
            || stylePropValueType === "fontWeight"
            || stylePropValueType === "opacity"
            || stylePropValueType === "props"
            || stylePropValueType === "time"
        ) {
            setValue(() => newValue)
        }
        
    }, [conicGradientFromAngle, imageValueType, linearGradientDirection, radialGradientShapeValue, setValue, stylePropValueType])

    //change value when change the direction
    useEffect(() => {
        if (linearGradientDirection && typeof value === "string" && value?.includes("gradient")) {
            handleChangeStylePropValue(null, selectedColors);
        }
    }, [selectedColors, handleChangeStylePropValue, linearGradientDirection, value]);
    
    

    const defaultProps = useMemo(() => {
        return {
            value: stylePropValueType === "color" ? value === null ? {} : value : value,
            onChange:(event, newValue) => handleChangeStylePropValue(event, newValue),
            fullWidth: true,
            size:'small'
        }
    }, [handleChangeStylePropValue, stylePropValueType, value])

    //directions for css prop that can change only one or more direction
    const {mainDirections, setMainDirections, cornerDirections, setCornerDirections} = directionsState

    const directionsComponent = useMemo(() => {
        switch (locateTypes) {
            case "Normal Directions":
                return (
                    <Box mt={2} mb={2} width={100} height={50} position={"relative"}>
                        <CustomDivider value={value} directionsState={[mainDirections, setMainDirections]} anchor={"top"} />
                        <CustomDivider value={value} directionsState={[mainDirections, setMainDirections]} anchor={"right"} />
                        <CustomDivider value={value} directionsState={[mainDirections, setMainDirections]} anchor={"bottom"} />
                        <CustomDivider value={value} directionsState={[mainDirections, setMainDirections]} anchor={"left"} />
                    </Box>
                );
            case "Corner Directions":
                return (
                    <Box mt={2} mb={2} width={100} height={50} position={"relative"}>
                        <CustomCornerDivider value={value} directionsState={[cornerDirections, setCornerDirections]} anchor={"topLeft"} />
                        <CustomCornerDivider value={value} directionsState={[cornerDirections, setCornerDirections]} anchor={"topRight"} />
                        <CustomCornerDivider value={value} directionsState={[cornerDirections, setCornerDirections]} anchor={"bottomLeft"} />
                        <CustomCornerDivider value={value} directionsState={[cornerDirections, setCornerDirections]} anchor={"bottomRight"} />
                    </Box>
                );
            default:
                return null;
        }
    }, [locateTypes, value, mainDirections, setMainDirections, cornerDirections, setCornerDirections]);
    

    

    return (
        <Box width="100%" display={"flex"} flexDirection={"column"} alignItems={"center"} >
            <AppropriateStyleValues
                type={stylePropValueType}
                valueState={valueState}
                defaultProps={defaultProps}
                values={stylePropValues}
                label={label}
                shadows={shadows}
                setShadows={setShadows}
                handleChangeStylePropValue={handleChangeStylePropValue}
                imageValueType={imageValueType}
                setImageValueType={setImageValueType}
                image={image}
                setImage={setImage}
                conicGradientFromAngle={conicGradientFromAngle}
                setConicGradientFromAngle={setConicGradientFromAngle}
                linearGradientDirection={linearGradientDirection}
                setLinearGradientDirection={setLinearGradientDirection}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
                radialGradientShapeValue={radialGradientShapeValue}
                setRadialGradientShapeValue={setRadialGradientShapeValue}
                valueType={valueType}
                setValueType={setValueType}
                sectionStyle = {sectionStyle}
            />
            {
                directionsComponent && directionsComponent
            }
        </Box>
    )
}

GetAppropriateStyleValues.propTypes = {
    stylePropValueType: propTypes.string,
    stylePropValues: propTypes.array,
    label: propTypes.string,
    valueState: propTypes.object,
    locateTypes: propTypes.string,
    directionsState: propTypes.object
}


export const CustomDivider = ({ anchor, directionsState, value }) => {
    const [mainDirections, setMainDirections] = directionsState

    const theme = useTheme();
    const returnColor = useCallback((directionValue) => {
        if(directionValue) {
            if (typeof directionValue === 'object') {
                return theme.palette.primary.main
            }

            if(directionValue?.startsWith("#")) {
                return directionValue
            }

            return theme.palette.primary.main
        }

        return theme.palette.divider
    }, [theme.palette.divider, theme.palette.primary.main])

    const style = useMemo(() => {
        return {
            backgroundColor: returnColor(mainDirections[anchor]),
            width: anchor === "top" || anchor === "bottom" ? "100%" : 3,
            height: anchor === "right" || anchor === "left" ? "100%" : 3,
            position: "absolute",
            left: anchor === "top" || anchor === "bottom" ? 0 : undefined,
            right: anchor === "right" ? 0 : undefined,
            top: anchor === "right" || anchor === "left" || anchor === "top" ? 0 : undefined,
            bottom: anchor === "right" || anchor === "left" || anchor === "bottom" ? 0 : undefined,
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "12px",
            color: theme.palette.text.secondary
        };
    }, [anchor, mainDirections, returnColor, theme.palette.text.secondary]);
    
    const handleSetDirection = () => {
        if(mainDirections[anchor]){
            const updated = {...mainDirections, [anchor]: null}
            setMainDirections(updated)
        } else {
            console.log(value)
            const updated = {...mainDirections, [anchor]: value ? value : null}
            setMainDirections(updated)
        }
    }

    return (
        <Box onClick={handleSetDirection} sx={style}>
            {
                typeof mainDirections[anchor] === "object" ? mainDirections[anchor]?.style_prop_value_css_name :  mainDirections[anchor]
            }
        </Box>
    );
};

CustomDivider.propTypes = {
    anchor: propTypes.string,
    directionsState: propTypes.array,
    value: propTypes.any,
}

export const CustomCornerDivider = ({ anchor, directionsState, value }) => {
    const [cornerDirections, setCornerDirections] = directionsState

    const theme = useTheme();
    const returnColor = useCallback((directionValue) => {
        if(directionValue) {
            if (typeof directionValue === 'object') {
                return theme.palette.primary.main
            }

            if(directionValue?.startsWith("#")) {
                return directionValue
            }

            return theme.palette.primary.main
        }

        return theme.palette.divider
    }, [theme.palette.divider, theme.palette.primary.main])

    const style = useMemo(() => {
        return {
            width: "30%",
            height: "40%",
            position: "absolute",
            top: anchor === "topLeft" || anchor === "topRight" ? 0 : undefined,
            borderTop: anchor === "topLeft" || anchor === "topRight" ? "1px solid" : undefined,
            left: anchor === "topLeft" || anchor === "bottomLeft" ? 0 : undefined,
            borderLeft: anchor === "topLeft" || anchor === "bottomLeft" ? "1px solid" : undefined,
            right: anchor === "topRight" || anchor === "bottomRight" ? 0 : undefined,
            borderRight: anchor === "topRight" || anchor === "bottomRight" ? "1px solid" : undefined,
            bottom: anchor === "bottomRight" || anchor === "bottomLeft" ? 0 : undefined,
            borderBottom: anchor === "bottomRight" || anchor === "bottomLeft" ? "1px solid" : undefined,
            borderColor: returnColor(cornerDirections[anchor]),
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "12px",
            color: theme.palette.text.secondary
        };
    }, [anchor, cornerDirections, returnColor, theme.palette.text.secondary]);
    
    const handleSetDirection = () => {
        if(cornerDirections[anchor]){
            const updated = {...cornerDirections, [anchor]: null}
            setCornerDirections(updated)
        } else {
            console.log(value)
            const updated = {...cornerDirections, [anchor]: value ? value : null}
            setCornerDirections(updated)
        }
    }


    return (
        <Box onClick={handleSetDirection} sx={style}>
            {
                typeof cornerDirections[anchor] === "object" ? cornerDirections[anchor]?.style_prop_value_css_name :  cornerDirections[anchor]
            }
        </Box>
    );
};

CustomCornerDivider.propTypes = {
    anchor: propTypes.string,
    directionsState: propTypes.array,
    value: propTypes.any,
}

