//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//icons
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

//MUI
import {
    Box,
    Card,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { AdminMainButton } from '../../../../Components'
import StylePropValues from '../StylePropValues/StylePropValues'
import { useTheme } from '@emotion/react';

//Styled Components
const StyledStyleFieldBox = styled(Card)(
    ({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(),
        width: "100%",
        marginLeft: theme.spacing(),
        padding: theme.spacing(2),
        borderRadius: theme.spacing(2)
    })
);

const StyledStyleFieldCategoryBox = styled(Box)(
    ({ theme }) => ({
        marginBottom: theme.spacing()
    })
);

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



const StyleFieldBox = (props) => {
    const {
        category,
        stylePropName,
        stylePropValueType,
        stylePropValues
    } = props

    const theme = useTheme()
    return (
        <StyledStyleFieldBox elevation={6}>
            <StyledStyleFieldCategoryBox>
                <Typography variant='h6'>
                    {category}
                </Typography>
            </StyledStyleFieldCategoryBox>
            <StyledStyleFieldValueBox>
                <Typography variant='body2' fontSize={18}>
                    {stylePropName}
                </Typography>
                <Box width={200}>
                    <StylePropValues label={stylePropName} stylePropValueType={stylePropValueType} stylePropValues={stylePropValues} />
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
                />
            </StyledStyleFieldValueBox>
        </StyledStyleFieldBox>
    );
};

StyleFieldBox.propTypes = {
    category: propTypes.string.isRequired,
    stylePropName: propTypes.string.isRequired,
    stylePropValueType: propTypes.string.isRequired,
    stylePropValues: propTypes.array
}

export default StyleFieldBox;