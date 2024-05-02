//React
import { useEffect, useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Button,
    Card,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'

//prism
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate'
import { extractStyles } from '../../../../Helpers/RecursiveHelpers/styles'
import { convertStyleFromObjectToJsCode } from '../../../../Helpers/writeStyleObject'

//Styled Components
const StyledAppliedStyles = styled(Card)(
    ({ theme }) => ({
        position: "relative"
    })
)

const StyledCopyButton = styled(Button)(
    ({theme}) => ({
        position: "absolute",
        top: 2,
        right: 2,
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.spacing(2)
    })
)

const StyledAppliedStylesBox = styled(Card)(
    ({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        width: "100%", 
        gap: theme.spacing(),
    })
);

const AppliedStyles = () => {

    useEffect(() => {
        Prism.highlightAll();
    }, []);

    const [copied, setCopied] = useState(false);

    const {template, selectedSubElementIds} = useMyCreateElementContext()
    const appliedStyles = useMemo(() => {
        if(template && selectedSubElementIds.length > 0) {
            const updatedSelectedTemplate = JSON.parse(JSON.stringify(template));
            const styles = extractStyles([updatedSelectedTemplate], selectedSubElementIds)
            return styles
        }
        return null
    }, [selectedSubElementIds, template])


    const [writtenStyle, setWrittenStyle] = useState(null)
    useEffect(() => {
        setWrittenStyle(() => convertStyleFromObjectToJsCode(appliedStyles))
    }, [appliedStyles])


    const handleCopyCode = () => {

        navigator.clipboard.writeText(writtenStyle)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
            })
            .catch(err => console.error('Failed to copy code: ', err));
    };

    return (
        <StyledAppliedStyles >
                    <StyledAppliedStylesBox>
                        {
                            writtenStyle &&
                            Object.entries(writtenStyle).map(([key, style]) => {
                                return (
                                    <AppliedStyleBox key={key} styleProp={key} styleValue={style} />
                                );
                            })
                        }
                        
                        
                    </StyledAppliedStylesBox>
                    {/* <StyledCopyButton onClick={handleCopyCode}>{copied ? 'Copied!' : 'Copy Style'}</StyledCopyButton> */}
        </StyledAppliedStyles>
    );
};

AppliedStyles.propTypes = {
    children: propTypes.array
}

export default AppliedStyles;


const StyledAppliedStyleBox = styled(Card)(
    ({ theme }) => ({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "95%",
        marginLeft: theme.spacing(2),
        position: "relative",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "flex-start",
            gap: theme.spacing(2),
        },
        padding: theme.spacing(),

    })
);

const AppliedStyleBox = ({styleProp, styleValue}) => {

    return (
        <StyledAppliedStyleBox elevation={6}> 
                <Typography variant='body2' fontSize={18}>
                    {styleProp}
                </Typography>
                <Box display="flex" alignItems="center" gap={2} >
                    <Box width={200} display="flex" alignItems="center" gap={2}>
                        <Typography variant='body2' fontSize={18}>
                            {styleValue}
                        </Typography>
                    </Box>

                </Box>
                {/* <AdminMainButton 
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
                /> */}
            </StyledAppliedStyleBox>
    )
}

AppliedStyleBox.propTypes = {
    styleProp: propTypes.string,
    styleValue: propTypes.any
}