//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//Helpers
import ColorsHelper from "../../../../Helpers/ColorsHelper"

//MUI
import {
    Box,
    FormControl,
    InputLabel,
    List, ListItem, ListItemText, MenuItem, OutlinedInput, Select, Switch, TextField,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { useMyContext } from '../../../../Components/DatabaseView/DatabaseView'
import StringHelper from '../../../../Helpers/StringsHelper'


//Styled Components
const StyledSetViewSettings = styled(List)(
    () => ({
    
    })
)


const SetViewSettings = ({view}) => {

    const {viewsSettings, setViewsSettings} = useMyContext()
    const viewSettings = viewsSettings[view]


    //handler
    const handleSettingsChange = (e, key) => {
        const updatedViewSettings = {...viewSettings}
        const checked = e.target.checked

        updatedViewSettings[key] = checked

        setViewsSettings(() => {
            return {...viewsSettings, [view]: updatedViewSettings}
        })
    }

    // Handler for Select changes
    const handleChangeMenuItems = (e, key) => {
        const selectedValue = e.target.value;
        const updatedViewSettings = {
        ...viewSettings,
        [key]: viewSettings[key].map((item) => ({
            ...item,
            value: item.name === selectedValue,
        })),
        };

        setViewsSettings((prevViewsSettings) => ({
        ...prevViewsSettings,
        [view]: updatedViewSettings,
        }));
    };


    return (
        <StyledSetViewSettings>
            {
                Object.entries(viewSettings).map(([key, value], index) => {
                    return (
                        <ListItem key={index}>
                            <ListItemText id="switch-list-label-wifi" primary={StringHelper.camelCaseToWords(StringHelper.capitalizeEachWord(key))} />
                            {
                                !Array.isArray(value)
                                ?
                                <Switch
                                edge="end"
                                onChange={(e) => handleSettingsChange(e, key)}
                                checked={value}
                                inputProps={{
                                    'aria-labelledby': 'switch-list-label-wifi',
                                }}
                                />
                                :
                                <TextField 
                                select
                                value={value.find((item) => item.value)?.name || ''}
                                onChange={(e) => handleChangeMenuItems(e, key)}
                                sx={{
                                    width: 150
                                }}
                                size='small'
                                >
                                        {value.map((item, idx) => (
                                            <MenuItem key={idx} value={item.name}>
                                                {item.type === "color" ? ColorsHelper.rgbaToHex(item.name) : item.name}
                                                {
                                                    item.type === "color"
                                                    &&
                                                    <Box sx={{
                                                        height: "15px",
                                                        width: "15px",
                                                        backgroundColor: item.name,
                                                        position: "absolute",
                                                        borderRadius: "50%",
                                                        right: 30,
                                                        bottom: 12
                                                    }}></Box>
                                                }
                                            </MenuItem>
                                        ))}
                                </TextField>
                            }
                        </ListItem>

                    )
                })
            }
        </StyledSetViewSettings>
    );
};

SetViewSettings.propTypes = {
    view: propTypes.string
}

export default SetViewSettings;