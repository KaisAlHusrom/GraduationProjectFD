//React
import { useEffect, useState } from 'react'

import {
    
} from 'react-redux'



//MUI
import {

    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid, Skeleton, Typography,
} from '@mui/material'
import { styled } from '@mui/system'

// icons 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



//propTypes 
import propTypes from 'prop-types'



//services



//Components
import AppliedStyles from '../AppliedStyles/AppliedStyles.jsx'
import StyleFieldBox from '../StyleFieldBox/StyleFieldBox.jsx'
import { SelectStyleBreakpoints } from '../SelectStyleBreakpoints/SelectStyleBreakpoints.jsx'
import { fetchStylePropCategory } from '../../../../Services/AdminServices/Services/StylePropCategory.js'
import SelectStyleExceptions from '../SelectStyleExceptions/SelectStyleExceptions.jsx';


//Styled Components
const StyledTemplateElementStyleSettings = styled(Grid)(
    ({ theme }) => ({
        width: "100%",
        // border: "1px solid",
        // borderColor: theme.palette.divider,
        padding: theme.spacing(2),
        // borderRadius: theme.spacing(2),
    })
)



const TemplateElementStyleSettings = () => {
    // const {template, selectedSubElementIds} = useMyCreateElementContext()

    //style status state
    const [styleException, setStyleException] = useState(null)
    
    //style breakpoint state
    const [styleBreakpoint, setStyleBreakpoint] = useState(null)

    //style categories with style props
    const [styleCategories, setStyleCategories] = useState(null)
    useEffect(() => {
        const fetchStyleCategories = async () => {
            const {rows} = await fetchStylePropCategory(null, null, null, null, null, 20)
            setStyleCategories(() => rows)
        }

        fetchStyleCategories()
    }, [])

    
    return (
        <StyledTemplateElementStyleSettings container spacing={2}>
            <Grid container spacing={2} item xxs={12}>
                <Grid item xxs={12}>
                    <Typography variant='subtitle1' letterSpacing={2} color="text.secondary">
                        Applied Styles
                    </Typography>
                </Grid>
                <Grid item xxs={12}>
                    <AppliedStyles styleException={styleException} styleBreakpoint={styleBreakpoint} />
                </Grid>
            </Grid>
            <Grid container spacing={2} item xxs={12}>
                    
                <Grid item xxs={12}>
                    <Typography variant='subtitle1' letterSpacing={2} color="text.secondary">
                    Screen Widths
                    </Typography>
                </Grid>
                <Grid item xxs={12}>
                    <Accordion elevation={4} sx={{
                            borderRadius: 1,
                            marginBottom: 0,
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography variant='h6'>
                                Screen Widths
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SelectStyleBreakpoints state={{styleBreakpoint, setStyleBreakpoint}} />
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
            <Grid container spacing={2} item xxs={12}>
                    
                <Grid item xxs={12}>
                    <Typography variant='subtitle1' letterSpacing={2} color="text.secondary">
                    Style Exceptions
                    </Typography>
                </Grid>
                <Grid item xxs={12}>
                    <Accordion elevation={4} sx={{
                            borderRadius: 1,
                            marginBottom: 0,
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography variant='h6'>
                                Style Exceptions
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SelectStyleExceptions state={{styleException, setStyleException}} />
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
            <Grid container spacing={2} item xxs={12}>
                <Grid item xxs={12}>
                    <Typography variant='subtitle1' letterSpacing={2} color="text.secondary">
                        Properties
                    </Typography>
                </Grid>
                <Grid item xxs={12}>
                    {
                        styleCategories && styleCategories.length > 0 
                        ?
                            styleCategories.map((styleCategory, key) => {
                                return (
                                    <StyleFieldBox 
                                        key={key}
                                        category={styleCategory}
                                        breakpointState={{styleBreakpoint, setStyleBreakpoint}}
                                        exceptionState={{styleException, setStyleException}}
                                    />
                                )
                            })
                        :
                        <Skeleton width='100%'></Skeleton>
                    }
                    
                </Grid>
            </Grid>
            
        </StyledTemplateElementStyleSettings>
    );
};

TemplateElementStyleSettings.propTypes = {
    elementStyleState: propTypes.object
}

export default TemplateElementStyleSettings;


