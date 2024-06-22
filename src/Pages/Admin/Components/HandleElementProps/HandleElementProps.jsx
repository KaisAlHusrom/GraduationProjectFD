//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Paper,
    List,
    ListItem,
    Skeleton,
    ListItemText,
    TextField
} from '@mui/material'
import { styled } from '@mui/system'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

//propTypes 
import propTypes from 'prop-types'
import useEffectFetchData from '../../../../Helpers/customHooks/useEffectFetchData'
import { fetchElementProps } from '../../../../Services/AdminServices/Services/elementPropsService'
import { AdminMainButton } from '../../../../Components'
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate';
import { changeElementPropValues, deleteElementPropValue, doesElementPropValueExist } from '../../../../Helpers/RecursiveHelpers/elementPropValuesHelpers';

//Styled Components



const HandleElementProps = ({parentElementId, handleCloseMenus}) => {
    const params = useMemo(() => {
        return [

        ]
    }, [])
    const {data: elementProps, download} = useEffectFetchData(fetchElementProps, params, true, false);

    return (
        <Paper sx={{ width: 320, maxWidth: '100%', overflow: 'visible', padding: theme=>theme.spacing(2) }}>
            <List  dense sx={{ width: '100%' }}>
                {
                    !download
                    ?
                        elementProps && elementProps.length > 0 
                        ?
                            elementProps.map((prop, key) => {
                                return (
                                    <PropListItem 
                                    key={key} 
                                    prop={prop} 
                                    parentElementId={parentElementId}
                                    handleCloseMenus={handleCloseMenus}
                                    />
                                )
                            })
                        :null
                    :
                    <ListItem>
                        <Skeleton width={'100%'} />
                    </ListItem>
                }
                
            </List>
        </Paper>
    );
};

HandleElementProps.propTypes = {
    parentElementId: propTypes.string,
    handleCloseMenus: propTypes.func
}

export default HandleElementProps;

const PropListItem = ({prop, parentElementId, handleCloseMenus}) => {
    const {template, handleTemplateChange} = useMyCreateElementContext()

    const [value, setValue] = useState("")
    
    const handleOnChange = (e) => {
        setValue(e.target.value)
    }

    const handleAddNewProp = () => {
        if(parentElementId && value) {
            // Clone the selectedElement array to avoid mutating state directly
            const updatedSelectedTemplate = JSON.parse(JSON.stringify(template));

            // Add the new element to the parent element in the selectedElement array
            const parentTemplateFound = changeElementPropValues([updatedSelectedTemplate], parentElementId, prop, value);
            
            // If the parent element is found and updated, set the new state

            if (parentTemplateFound) {
                handleCloseMenus()
                handleTemplateChange(updatedSelectedTemplate)


            } else {
                //TODO: something happen when changing not working
            }
        }
    }

    const handleDeletePropValue = () => {
        if(doesElementPropValueExist([template], parentElementId, prop)) {
                // Clone the selectedElement array to avoid mutating state directly
                const updatedSelectedTemplate = JSON.parse(JSON.stringify(template));

                // Add the new element to the parent element in the selectedElement array
                const parentTemplateFound = deleteElementPropValue([updatedSelectedTemplate], parentElementId, prop, value);
                
                // If the parent element is found and updated, set the new state
    
                if (parentTemplateFound) {
                    handleCloseMenus()
                    handleTemplateChange(updatedSelectedTemplate)
                } else {
                    //TODO: something happen when changing not working
                }
        }
    }

    return (
        <ListItem 

            secondaryAction={
                doesElementPropValueExist([template], parentElementId, prop)
                ?
                <AdminMainButton 
                    type='custom' 
                    icon={<DeleteOutlineOutlinedIcon />}
                    appearance='iconButton'
                    title='addProp'
                    filled
                    onClick={handleDeletePropValue}
                    sx={{
                        color: theme => theme.palette.error.main
                    }}
                />
                :
                <AdminMainButton 
                    type='custom' 
                    icon={<AddOutlinedIcon />}
                    appearance='iconButton'
                    title='addProp'
                    filled
                    onClick={handleAddNewProp}
                />
            }
            >
                
                <ListItemText primary={prop.element_prop_name} />
                <TextField
                    size='small'
                    label={prop.element_prop_name}
                    sx={{
                        width: "150px",
                        marginRight: 2,
                    }}
                    value={value}
                    onChange={handleOnChange}
                />
        </ListItem>
    )
}

PropListItem.propTypes = {
    prop: propTypes.object,
    parentElementId: propTypes.string,
    handleCloseMenus: propTypes.func
}