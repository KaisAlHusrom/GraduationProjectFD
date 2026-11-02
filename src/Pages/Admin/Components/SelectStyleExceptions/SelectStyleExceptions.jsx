//React
import { useEffect, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Grid,
    Skeleton,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { fetchStyleStatuses } from '../../../../Services/AdminServices/Services/styleStatusesService'
import { AdminMainButton } from '../../../../Components'
import { useTheme } from '@emotion/react'

//Styled Components
const StyledSelectStyleExceptions = styled(Grid)(
    ({ theme }) => ({
        width: '100%',
    })
)


const getIcon = (name) => {

}


const SelectStyleExceptions = ({state}) => {
    const {styleException, setStyleException} = state

    const theme = useTheme()

    const [styleExceptions, setStyleExceptions] = useState(null)

    
    useEffect(() => {
        const fetchBreakpoints = async () => {
            const {rows} = await fetchStyleStatuses(null, null, null, null, null, 20)
            setStyleExceptions(() => rows)
        }
        fetchBreakpoints()
    }, [])

    const handleSetStyleException = (exception) => {
        if (styleException?.id === exception.id) {
            setStyleException(() => null)
        } else {
            setStyleException(() => exception)
        }
    }

    return (
        <StyledSelectStyleExceptions container spacing={2}>
            {
            styleExceptions && styleExceptions.length > 0 
                ? 
                styleExceptions.map((exception, key) => {

                    return (
                        <Grid key={key} item xxs={6}>
                            <AdminMainButton
                                title={exception.style_status_normal_name}
                                // icon={getIcon(exception.style_responsive_break_point_normal_name)}
                                type='custom'
                                appearance='primary'
                                putBorder
                                sx={{
                                    textTransform: "capitalize",
                                    width: '100%',
                                    "&:hover": {
                                        backgroundColor: theme.palette.action.hover,
                                    },
                                    backgroundColor: exception?.id === styleException?.id && theme.palette.action.selected,
                                }}
                                onClick={() => handleSetStyleException(exception)}
                            />
                        </Grid>
                    )
                })
                :
                <Skeleton width="100%" height={100} />
        }
        </StyledSelectStyleExceptions>
    );
};

SelectStyleExceptions.propTypes = {
    state: propTypes.object
}

export default SelectStyleExceptions;