//React
import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

//Components


//icons
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

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
import StylePropValues from '../StylePropValues/StylePropValues'
import { useTheme } from '@emotion/react';

//icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate';
import { addStyle, changeStyleValues, checkIfStyleExist } from '../../../../Helpers/RecursiveHelpers/styles';
import { writeStyleObject } from '../../../../Helpers/writeStyleObject';
import { handleOpenSnackbar, setSnackbarIsError, setSnackbarMessage } from '../../../../Redux/Slices/snackbarOpenSlice';

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
    } = props


    return (
        // <StyledStyleFieldBox elevation={6}>
            <Accordion elevation={6} sx={{
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
                                        <StyledFieldValue key={key} prop={prop} />
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
}


export default StyleFieldBox;


const StyledStyleFieldValueBox = styled(Box)(
    ({ theme }) => ({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        marginLeft: theme.spacing(2),
        position: "relative",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "flex-start",
            gap: theme.spacing(2),
        }
    })
);

export const StyledFieldValue = ({prop}) => {

    const theme = useTheme()
    const dispatch = useDispatch()

    const {template, setTemplate, selectedSubElementIds} = useMyCreateElementContext()
    
    const [value, setValue] = useState(() => null)
    //extract the appropriate value from value state to cssValue
    const [cssValue, setCssValue] = useState(null)
    useEffect(() => {
        if(value) {
            console.log(value)
            if(prop.style_prop_value_type === "color") {
                setCssValue(() => value)
            }
            
            if(prop.style_prop_value_type === "string") {
                setCssValue(() => value.style_prop_value_css_name)
            }

            if(prop.style_prop_value_type !== "string") {
                setCssValue(() => value)
            } 
        }

    }, [prop.style_prop_value_type, value])

    //when change already added style prop it will be changed directly
    //TODO in applied styles there is delay in change state
    useEffect(() => {
        const updatedSelectedTemplate = JSON.parse(JSON.stringify(template));
        if(value && selectedSubElementIds.length > 0 && checkIfStyleExist(template, selectedSubElementIds, writeStyleObject(prop, cssValue)))  {
            const changed = changeStyleValues([updatedSelectedTemplate], selectedSubElementIds, writeStyleObject(prop, cssValue))
            if (changed) {
                setTemplate(() => updatedSelectedTemplate)
                console.log(updatedSelectedTemplate)
            } else {
                dispatch(setSnackbarIsError({isError: true}))
                dispatch(setSnackbarMessage({message: "This style is already added."}))
                dispatch(handleOpenSnackbar())
            }
        } 

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, setTemplate, value])

    

    const handleAddNewStyle = () => {

        if(selectedSubElementIds && selectedSubElementIds.length > 0) {
            const updatedSelectedTemplate = JSON.parse(JSON.stringify(template));
            const added = addStyle([updatedSelectedTemplate], selectedSubElementIds, writeStyleObject(prop, cssValue));
            if (added) {
                setTemplate(() => updatedSelectedTemplate)
            } else {
                dispatch(setSnackbarIsError({isError: true}))
                dispatch(setSnackbarMessage({message: "This style is already added."}))
                dispatch(handleOpenSnackbar())
            }
        } else {
            dispatch(setSnackbarIsError({isError: true}))
            dispatch(setSnackbarMessage({message: "There is no selected template"}))
            dispatch(handleOpenSnackbar())
            
        }
    }

    return (
            <StyledStyleFieldValueBox>
                <Typography variant='body2' fontSize={18}>
                    {prop.style_prop_normal_name}
                </Typography>
                <Box display="flex" alignItems="center" gap={2} >
                    <Box width={200} display="flex" alignItems="center" gap={2}>
                        {/* <Typography variant='h7'>value: </Typography> */}
                        <StylePropValues 
                            label={prop.style_prop_normal_name} 
                            stylePropValueType={prop.style_prop_value_type} 
                            stylePropValues={prop.options} 
                            valueState={{value, setValue, cssValue}}
                        />
                    </Box>
                    {/* <Box width={250} display="flex" alignItems="center" gap={2}>
                    <Typography variant='h7'>when: </Typography>
                        <StylePropValues label={stylePropName} stylePropValueType={stylePropValueType} stylePropValues={stylePropValues} />
                    </Box> */}

                </Box>
                <AdminMainButton 
                    type='custom' 
                    icon={<AddOutlinedIcon />}
                    appearance='iconButton'
                    title='addStyleProp'
                    filled
                    sx={{
                        position: "absolute",
                        right: -60,
                        [theme.breakpoints.down("sm")]: {
                            right: 0,
                        }
                    }}
                    onClick={handleAddNewStyle}
                />
            </StyledStyleFieldValueBox>
    )
}


StyledFieldValue.propTypes = {
    prop: propTypes.object.isRequired,
}