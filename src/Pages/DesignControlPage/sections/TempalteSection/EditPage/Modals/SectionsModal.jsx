//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { getAppropriateTag } from '../../StylesFunctions/GenerateElements'
import { TESTIMONIALSsection, galleryImageSection } from '../Data/ConstDataDesign'

//Styled Components
const StyledSectionsModal = styled(Box)(
    () => ({})
)


const SectionsModal = ({SectionsDesigns , createNewSection }) => {
    const [selectedCss, setSelectedCss] = useState(null);
    const [selectedBox, setSelectedBox] = useState(null);



    const handleBoxClick = (box) => {
        console.log("box",box.section_component_id);
        if (box.section_component_id === 0) {
            createNewSection(galleryImageSection)
        }
        if (box.section_component_id === 2) {
            createNewSection(TESTIMONIALSsection)
        }
    };
    
    return (
        <StyledSectionsModal>
                <Box sx={{
                display: 'flex',
                flexDirection :'row',
                alignItems :'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                boxSizing: 'border-box',
                }}>
                {SectionsDesigns.map((boxDesign) => (
                    <Box
                    key={boxDesign.section_component_id}
                    sx={{
                        ...boxDesign.section_css_props.reduce(
                            (acc, cssProp) => ({
                                ...acc,
                                [cssProp.css_prop.prop_name]: cssProp.css_prop_value,
                            }),
                            {}
                        ),
                        margin: '20px', // Adjust the margin value as needed
                    }}
                    onClick={() => handleBoxClick(boxDesign)}
                    className={selectedBox === boxDesign ? 'selected' : ''}
                >
                    {/* Render component_elements inside the Box */}
                    {boxDesign.component_elements.map((element) => (
                        <Box key={element.component_element_id}>
                            {getAppropriateTag(element.element, element.element_content, element.section_css_props.reduce(
                                        (acc, cssProp) => ({
                                            ...acc,
                                            [cssProp.css_prop.prop_name]: cssProp.css_prop_value,
                                        }),
                                        {}
                                    ))}

                        </Box>
                    ))}
                </Box>
                ))}

                </Box>
        </StyledSectionsModal>
    );
};

export default SectionsModal;