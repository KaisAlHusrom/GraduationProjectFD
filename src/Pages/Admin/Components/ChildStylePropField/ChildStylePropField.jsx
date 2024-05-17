//React
import {} from 'react'



//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//icons
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


//propTypes 
import propTypes from 'prop-types'
import { GetAppropriateStyleValues } from '../StylePropValues/StylePropValues'
import { AdminMainButton } from '../../../../Components'
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate';
import { checkIfStyleExist } from '../../../../Helpers/RecursiveHelpers/styles';

import useStylePropValueState from '../../../../Helpers/customHooks/useStylePropValueState';
import { useTheme } from '@emotion/react';

//Styled Components
const StyledChildStylePropField = styled(Box)(
    () => ({
        width: "100%",
        position: "relative",
        overflow: "visible",
    })
)


const ChildStylePropField = ({prop, breakpointState, exceptionState}) => {
    const {
        template,
        handleTemplateChange,
        selectedSubElementIds
    } = useMyCreateElementContext()

    const theme = useTheme()

    const {
        value, 
        setValue,
        cssValue,
        handleAddNewStyle,
        handleDeleteStyleProp,
        mainDirections, setMainDirections,
        cornerDirections, setCornerDirections
    } = useStylePropValueState(prop, template, handleTemplateChange, selectedSubElementIds, breakpointState, exceptionState)
    const {styleException} = exceptionState
    const {styleBreakpoint} = breakpointState
    
    return (
        <StyledChildStylePropField>
            <GetAppropriateStyleValues 
                label={prop.style_prop_normal_name} 
                stylePropValueType={prop.style_prop_value_type} 
                stylePropValues={prop.options} 
                valueState={{value, setValue, cssValue}}
                directionsState={{mainDirections, setMainDirections, cornerDirections, setCornerDirections}}
                locateTypes={prop.locateTypes}
            />
            {
                checkIfStyleExist(template, selectedSubElementIds, prop, cssValue, styleException, styleBreakpoint)
                ?
                    <AdminMainButton 
                        type='custom' 
                        icon={<DeleteOutlineOutlinedIcon />}
                        appearance='iconButton'
                        title='deleteStyleProp'
                        filled
                        onClick={handleDeleteStyleProp}
                        sx={{
                            position: "absolute",
                            right: -50,
                            top: 0,
                            color: theme.palette.error.main
                        }}
                    />
                    
                :
                    <AdminMainButton 
                        type='custom' 
                        icon={<AddOutlinedIcon />}
                        appearance='iconButton'
                        title='addStyleProp'
                        filled
                        onClick={handleAddNewStyle}
                        sx={{
                            position: "absolute",
                            right: -50,
                            top: 0,
                            // [theme.breakpoints.down("sm")]: {
                            //     right: 0,
                            // }
                        }}
                    />
                    
            }
        </StyledChildStylePropField>
    );
};

ChildStylePropField.propTypes = {
    prop: propTypes.object,
    valueState: propTypes.object,
    breakpointState: propTypes.object,
    exceptionState: propTypes.object,
    handleAddNewStyle: propTypes.func,
}

export default ChildStylePropField;