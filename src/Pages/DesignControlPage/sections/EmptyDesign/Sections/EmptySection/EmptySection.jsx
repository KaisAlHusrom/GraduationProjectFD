//React
import { useContext, useMemo } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { EmptyTemplateSectionSet } from '../../UseContext/UserSetSections'
import UpDownButtons from '../../../TempalteSection/components/UpDownButtons'
import EditLink from '../../../TempalteSection/components/EditLink'
import EmptyComponent from './EmptyComponent'
import { writeFilterObject } from '../../../../../../Helpers/filterData'
import useFetchData from '../../../../../../Helpers/customHooks/useFetchData'
import { fetchDesigns } from '../../../../../../Services/designService'

//Styled Components
const StyledEmptySection = styled(Box)(
    ({ theme }) => ({    
    })
)







const EmptySection = ({moveSectionUp , moveSectionDown}) => {
    const {EmptySection } = useContext(EmptyTemplateSectionSet)

    const appliedFilter = useMemo(() => {
        return [
            writeFilterObject('design_type', 'string', '=', 'section'), 
            writeFilterObject('parent_id', 'string', '=', null),
        ]
    }, [])
    


    const {loading, hasMore, setPageNumber, data } = useFetchData(fetchDesigns, 'all', appliedFilter, null, true, null, null, 5)


    console.log(data)

        const sectionStyle = useMemo(() => {
            const styleObject = {};
                if (data) {
                data.forEach((item) => {
                    if (item.styles) {
                    item.styles.forEach((cssProp) => {
                        const { style_prop, style_prop_value } = cssProp;
                        if (style_prop.is_section) {
                        styleObject[style_prop.style_prop_css_name] = style_prop_value;
                        }
                    });
                    }
                });
                }
            
                return styleObject;
            }, [data]);
            


    return (
        EmptySection ? (
            <StyledEmptySection sx = {{position : 'relative'}}  >
            <Box sx ={{
                position: 'absolute',
                top :'0',
                zIndex: 1000,
            }}>
                <UpDownButtons moveSectionUp = {moveSectionUp} moveSectionDown = {moveSectionDown} ></UpDownButtons>
                </Box>
                {data && data.map((item, index) => (
                        <Box key={index} sx={sectionStyle}>
                            {item.children && item.children.map((component, i) => (
                            item.design_title === "Empty_Section" ? (
                                <Box key={i}>
                                <Typography sx = {{
                                    fontSize : '20px', 
                                    fontWeight : 'bold',
                                    color : 'black'
                                }}>{item.element_content}</Typography>
                                </Box>
                                
                            ) : null 
                            
                            ))}<EditLink section_id={item.id} />

                        </Box>

                        ))}
                        
            </StyledEmptySection>
            ) : null 
    );
};

export default EmptySection;


