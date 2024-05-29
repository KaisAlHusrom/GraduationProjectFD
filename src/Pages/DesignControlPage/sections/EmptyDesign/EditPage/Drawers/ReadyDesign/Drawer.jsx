//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { getAppropriateTag } from '../../../StylesFunctions/GenerateElements'
import { writeFilterObject } from '../../../../../../../Helpers/filterData'
import useFetchData from '../../../../../../../Helpers/customHooks/useFetchData'
import { fetchDesign } from '../../../../../../../Services/designServic'

//Styled Components
const StyledDrawer = styled(Box)(
    ({theme}) => ({
        backgroundColor: theme.palette.background.paper
    })
)


const Drawer = ({createNewDesign , createDesignedDesign  , DesignId , appliedFilterType}) => {
    const [selectedCss, setSelectedCss] = useState(null);
    const [selectedBox, setSelectedBox] = useState(null);


    const appliedFilter = useMemo(() => {
        return [
            writeFilterObject('design_type', 'string', '=', appliedFilterType), 
            writeFilterObject('category_id', 'string', '=', DesignId), 

        ];
    }, [DesignId , appliedFilterType]);

    const { loading, hasMore, setPageNumber, data } = useFetchData(fetchDesign, 'all', appliedFilter, null, true, null, null, 10);



    const handleEmptyBoxClick = (cssProps) => {
        setSelectedCss(cssProps);
        createNewDesign(cssProps)
    };
    const handleBoxClick = (box) => {
        createDesignedDesign(box)
    };


    return (
        <StyledDrawer>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                }}>
                    {data.map((componentDesign) => (
                        <>
                        <Typography >{componentDesign.id}</Typography>
                        <Typography >{componentDesign.design_title}</Typography>
                        <Typography >{componentDesign.design_description}</Typography>
                        <Typography >{componentDesign.design_type}</Typography>
                        <Typography >{componentDesign.element_content}</Typography>
                        </>
                    ))}
    
            </Box>

        </StyledDrawer>
    );
};

export default Drawer;