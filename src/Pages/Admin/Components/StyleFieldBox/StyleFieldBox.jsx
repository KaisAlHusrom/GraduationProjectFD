//React
import { useRef, useState } from 'react'

import {  } from 'react-redux'

//Components
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate';


//icons
//icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

//MUI
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { AdminMainButton } from '../../../../Components'
import { GetAppropriateStyleValues } from '../StylePropValues/StylePropValues'
import ChildStylePropField from '../ChildStylePropField/ChildStylePropField';
import useStylePropValueState from '../../../../Helpers/customHooks/useStylePropValueState';
import { checkIfStyleExist } from '../../../../Helpers/RecursiveHelpers/styles';
import { useTheme } from '@emotion/react';



//Styled Components
// const StyledStyleFieldBox = styled(Card)(
//     ({ theme }) => ({
//         display: "flex",
//         flexDirection: "column",
//         gap: theme.spacing(),
//         width: "100%",
//         marginLeft: theme.spacing(),
//         padding: theme.spacing(2),
//         borderRadius: theme.spacing(2)
//     })
// );

// const StyledStyleFieldCategoryBox = styled(Box)(
//     ({ theme }) => ({
//         marginBottom: theme.spacing()
//     })
// );





const StyleFieldBox = (props) => {
    const {
        category,
        breakpointState,
        exceptionState
    } = props


    return (
        // <StyledStyleFieldBox elevation={6}>
            <Accordion elevation={4} sx={{
                borderRadius: 1,
                marginBottom: 0,
            }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography variant='h6'>
                        {category.category_name}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box display='flex' flexDirection="column" gap={2}>
                        {
                            category.style_props.length > 0 
                            ?
                                category.style_props.map((prop, key) => {

                                    return (
                                        <StyledFieldValue key={key} prop={prop} breakpointState={breakpointState} exceptionState={exceptionState} />
                                    )
                                })
                            :null
                        }
                    </Box>
                </AccordionDetails>
            </Accordion>
            
        // </StyledStyleFieldBox>
    );
};

StyleFieldBox.propTypes = {
    category: propTypes.object.isRequired,
    breakpointState: propTypes.object,
    exceptionState: propTypes.object
}


export default StyleFieldBox;


const StyledStyleFieldValueBox = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: theme.spacing(2),
        width: "90%",
        marginLeft: theme.spacing(2),
        position: "relative",
        // [theme.breakpoints.down("sm")]: {
        //     flexDirection: "column",
        //     alignItems: "flex-start",
        //     gap: theme.spacing(2),
        // }
    })
);

export const StyledFieldValue = ({prop, breakpointState, exceptionState}) => {
    const theme = useTheme()
    const {template, handleTemplateChange, selectedSubElementIds} = useMyCreateElementContext()
    const [openChildren, setOpenChildren] = useState(false)
    //ref
    const containerRef = useRef()
    
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

    const handleOpenChildren = () => {
        setOpenChildren(prev => !prev)
    }

    return (
        
            !prop.parent_id ?
            <StyledStyleFieldValueBox>
            <Typography variant='body2' fontSize={18}>
                {prop.style_prop_normal_name}
            </Typography>
            <Box width={"100%"} display="flex" alignItems="center" gap={2} >
                <Box width={"80%"} display="flex" alignItems="center" flexDirection={'column'} gap={2} ref={containerRef} >
                    {/* <Typography variant='h7'>value: </Typography> */}
                    {
                        openChildren 
                        ?
                            prop?.children && prop.children.length > 0 
                            ?
                                prop.children.map((childProp, key) => {
                                    //TODO: fix the children style props and complete style_prop_value_type
                                    return (
                                        <ChildStylePropField 
                                            key={key} prop={childProp}
                                            valueState={{value, setValue, cssValue}}
                                            breakpointState={breakpointState}
                                            exceptionState={exceptionState}
                                        />
                                    )
                                })
                            : null
                            
                        :
                            <GetAppropriateStyleValues 
                                label={prop.style_prop_normal_name} 
                                stylePropValueType={prop.style_prop_value_type} 
                                stylePropValues={prop.options} 
                                valueState={{value, setValue, cssValue}}
                                locateTypes={prop.locateTypes}
                                directionsState={{mainDirections, setMainDirections, cornerDirections, setCornerDirections}}
                                
                            />
                    }
                </Box>
                {/* <Box width={250} display="flex" alignItems="center" gap={2}>
                <Typography variant='h7'>when: </Typography>
                    <StylePropValues label={stylePropName} stylePropValueType={stylePropValueType} stylePropValues={stylePropValues} />
                </Box> */}

            </Box>
            <Box sx={{
                    position: "absolute",
                    right: -10,
                    top: -5,
                    // [theme.breakpoints.down("sm")]: {
                    //     right: 0,
                    // }
                }}>
            {
                !openChildren
                &&
                (checkIfStyleExist(template, selectedSubElementIds, prop, cssValue, styleException, styleBreakpoint)
                ?
                    <AdminMainButton 
                        type='custom' 
                        icon={<DeleteOutlineOutlinedIcon />}
                        appearance='iconButton'
                        title='deleteStyleProp'
                        filled
                        onClick={handleDeleteStyleProp}
                        sx={{
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
                    />
                )
            }
            {
                prop?.children && prop?.children.length > 0 &&
                <AdminMainButton 
                    type='custom' 
                    icon={openChildren === true ? <KeyboardArrowUpOutlinedIcon /> :<KeyboardArrowDownOutlinedIcon />}
                    appearance='iconButton'
                    title='addStyleProp'
                    filled
                    
                    onClick={handleOpenChildren}
                    sx={{
                        ml:1,
                    }}
                />
            }
            </Box>
        </StyledStyleFieldValueBox>

            : null
        
            
    )
}


StyledFieldValue.propTypes = {
    prop: propTypes.object.isRequired,
    breakpointState: propTypes.object,
    exceptionState: propTypes.object
}