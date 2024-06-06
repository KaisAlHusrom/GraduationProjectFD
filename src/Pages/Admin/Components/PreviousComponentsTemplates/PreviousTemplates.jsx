//React
import { useCallback, useMemo, useRef } from 'react'

import { useDispatch } from 'react-redux'

import config from "../../../../../Config.json"
export const designImagesFolderName = "DesignsImages"


//Components


//MUI
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Skeleton,
    Stack,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'

//propTypes 
import propTypes from 'prop-types'
import { fetchDesigns, fetchSpecificDesign } from '../../../../Services/AdminServices/Services/designService'
import { writeFilterObject } from '../../../../Helpers/filterData'
import useFetchData from '../../../../Helpers/customHooks/useFetchData'
import { useMyCreateElementContext } from '../CreateElementTemplate/CreateElementTemplate'
import { handleOpenSnackbar, setSnackbarIsError, setSnackbarMessage } from '../../../../Redux/Slices/snackbarOpenSlice'

//Styled Components
const StyledPreviousComponentsTemplates = styled(Stack)(
    ({ theme }) => ({
        width: "100%",
        marginTop: theme.spacing(2),
        overflowY: 'auto',
        backgroundColor: theme.palette.background.paper,
    })
)


const PreviousTemplates = ({drawerState}) => {
    const [previousTemplatesDrawerOpen, setPreviousTemplatesDrawerOpen] = drawerState
    const {mode} = useMyCreateElementContext()
    const appliedFilter = useMemo(() => {
        return [
            writeFilterObject('design_type', 'string', '=', mode), 
            writeFilterObject('parent_id', 'string', '=', null),
        ]
    }, [mode])
    const { 
        loading, 
        // error, 
        hasMore, 
        setPageNumber, 
        data, 
        // setData, 
        // pageNumber, 
        // setRefetch
    } = useFetchData(fetchDesigns, 'all', appliedFilter, null, previousTemplatesDrawerOpen, null, null, 5)


    const observer = useRef()
    const lastDataRef = useCallback(node => {
        
        if (loading) return 

        if(observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore) {
                console.log("enter")
                    setPageNumber(prev => {
                        return prev + 1
                    });
            }
        })

        if (node) observer.current.observe(node)
    }, [loading, hasMore, setPageNumber])


    return (
        <StyledPreviousComponentsTemplates
            direction='column'
            gap={2}
            alignItems='center'
        >
            {
                data && data.length > 0 ?
                    data.map((design, key) => {
                        return (
                            <ComponentTemplate key={key} lastDataRef={lastDataRef} design={design} setPreviousTemplatesDrawerOpen={setPreviousTemplatesDrawerOpen} />
                        )
                    })
                :
                <>
                <Skeleton width="90%" variant='rectangular' height={150} animation="wave"></Skeleton>
                <Skeleton width="90%" variant='rectangular' height={150} animation="wave"></Skeleton>
                <Skeleton width="90%" variant='rectangular' height={150} animation="wave"></Skeleton>
                </>
            }
            

        </StyledPreviousComponentsTemplates>
    );
};

PreviousTemplates.propTypes = {
    drawerState: propTypes.array
}


export default PreviousTemplates;


//Component Template component
const StyledComponentTemplate = styled(Card)(
    ({ theme }) => ({
        width: '90%',
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        cursor: 'pointer',
        position: 'relative',
        "&:hover": {
            "& .cover": {
                opacity: "1",
            }
        },
        "& .cover": {
            backgroundColor: theme.palette.action.disabled,
            position: 'absolute',
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 500,
            fontSize: 32,
            textTransform: "capitalize",
            color: theme.palette.secondary.main,
            fontWeight: 'bold',
            opacity: 0,
            transition: [theme.transitions.create(['opacity']), {
                duration: theme.transitions.duration.standard,
            }],
            userSelect: "none",
        },
        '& .truncate': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        }
    })
);


export const ComponentTemplate = ({lastDataRef, design, setPreviousTemplatesDrawerOpen}) => {
    const stylePropRoute = `${config.ServerImageRoute}/${designImagesFolderName}/${design['design_image']}`;
    const {
        setTemplate
    } = useMyCreateElementContext()

    const dispatch = useDispatch()

    const handleSelectDesign = async () => {
        //to fetch the design with all it's children
        const selectedDesign = await fetchSpecificDesign(design?.id);
        if(selectedDesign) {
            setTemplate(() => selectedDesign)
            setPreviousTemplatesDrawerOpen(() => false)
        } else {
            dispatch(handleOpenSnackbar())
            dispatch(setSnackbarIsError({isError: true}))
            dispatch(setSnackbarMessage({message: "There is no design like this"}))
        }
    }


    return (
        <StyledComponentTemplate ref={lastDataRef} onClick={handleSelectDesign}>
                <CardMedia
                    sx={{ height: 180, objectFit: 'contain', width: 200, transform: 'translate(25%, 0)' }}
                    image={stylePropRoute}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {design.design_title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="truncate">
                    {design.design_description}
                    </Typography>
                </CardContent>
                <Box className="cover">
                    Select this
                </Box>
        </StyledComponentTemplate>
    )
}

ComponentTemplate.propTypes = {
    lastDataRef: propTypes.any,
    design: propTypes.object,
    setPreviousTemplatesDrawerOpen: propTypes.func,
}