//React
import { useEffect, useMemo } from 'react'

import { useDispatch } from 'react-redux'

//Components


//MUI
import {
    Box,
    Card,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

//propTypes 
import propTypes from 'prop-types'

//prism
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate'
import { deleteStyle, extractStyles } from '../../../../Helpers/RecursiveHelpers/styles'
import { AdminMainButton } from '../../../../Components'
import { useTheme } from '@emotion/react';
import { handleOpenSnackbar, setSnackbarIsError, setSnackbarMessage } from '../../../../Redux/Slices/snackbarOpenSlice';

//Styled Components

// const StyledCopyButton = styled(Button)(
//     ({theme}) => ({
//         position: "absolute",
//         top: 2,
//         right: 2,
//         color: theme.palette.primary.contrastText,
//         backgroundColor: theme.palette.primary.main,
//         borderRadius: theme.spacing(2)
//     })
// )

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


    // const [, setCopied] = useState(false);

    const {template, selectedSubElementIds} = useMyCreateElementContext()
    // console.log(template)
    const appliedStyles = useMemo(() => {
        if(template && selectedSubElementIds.length > 0) {
            const styles = extractStyles(template, selectedSubElementIds)
            return styles
        }
        return null
    }, [selectedSubElementIds, template])


    // const handleCopyCode = () => {

    //     navigator.clipboard.writeText(writtenStyle)
    //         .then(() => {
    //             setCopied(true);
    //             setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    //         })
    //         .catch(err => console.error('Failed to copy code: ', err));
    // };
    
    return (
                    <StyledAppliedStylesBox>
                        {
                            appliedStyles &&
                            Object.entries(appliedStyles).map(([designName, styles], key) => {
                                return (
                                    <AppliedStyleBox key={key} designName={designName} styles={styles} />
                                );
                            })
                        }
                        
                        
                    </StyledAppliedStylesBox>
    )
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
        width: "100%",
        position: "relative",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "flex-start",
            gap: theme.spacing(2),
        },
        padding: theme.spacing(),

    })
);

const AppliedStyleBox = ({designName, styles}) => {
    const theme = useTheme()
    const {
        template,
        setTemplate,
        selectedSubElementIds
    } = useMyCreateElementContext()
    const dispatch = useDispatch()

    const handleDeleteStyleProp = (stylePropName, stylePropValue) => {
        const prop = {style_prop_css_name: stylePropName}

        const updatedSelectedTemplate = JSON.parse(JSON.stringify(template));
        const deleted = deleteStyle(updatedSelectedTemplate, selectedSubElementIds, prop, stylePropValue);
        if (deleted) {
            console.log("Deleted Successfully")
            setTemplate(() => updatedSelectedTemplate)
        } else {
            dispatch(setSnackbarIsError({isError: true}))
            dispatch(setSnackbarMessage({message: "This style is not exist."}))
            dispatch(handleOpenSnackbar())
        }
    }
    return (
        <StyledAppliedStyleBox elevation={6} sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1,
            width: "100%"
        }}> 
                <Typography variant='h6'>
                    {designName}
                </Typography>
                <Box display="flex" flexDirection="column" width={"100%"} gap={2} >
                    {
                        styles && Object.keys(styles).length > 0 &&
                        Object.entries(styles).map(([stylePropName, stylePropValue], key) => {
                            return (
                                <Box key={key} position={"relative"} display="flex" alignItems="center" justifyContent="space-between" width="100%" padding={"0 6px 0 6px"}>
                                        <Typography variant='h7' fontSize={"18px"}>
                                            {stylePropName}:
                                        </Typography>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Typography variant='subtitle1'>
                                                {stylePropValue}
                                            </Typography>
                                            <AdminMainButton 
                                                type='custom' 
                                                icon={<DeleteOutlineOutlinedIcon />}
                                                appearance='iconButton'
                                                title='deleteStyleProp'
                                                onClick={() => handleDeleteStyleProp(stylePropName, stylePropValue)}
                                                sx={{
                                                    color: theme.palette.error.main,
                                                    // position: 'absolute',
                                                    
                                                }}
                                            />
                                        </Box>
                                </Box>
                            )
                        })
                    }
                    

                </Box>
            </StyledAppliedStyleBox>
    )
}

AppliedStyleBox.propTypes = {
    designName: propTypes.string,
    styles: propTypes.object
}