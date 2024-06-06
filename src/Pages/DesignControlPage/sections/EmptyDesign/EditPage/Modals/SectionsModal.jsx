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
        if (box.id === 0) {
            createNewSection(galleryImageSection)
        }
        if (box.id === 2) {
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
                    key={boxDesign.id}
                    sx={{
                        ...boxDesign.styles.reduce(
                            (acc, cssProp) => ({
                                ...acc,
                                [cssProp.style_prop.style_prop_css_name]: cssProp.style_prop_value,
                            }),
                            {}
                        ),
                        margin: '20px', // Adjust the margin value as needed
                    }}
                    onClick={() => handleBoxClick(boxDesign)}
                    className={selectedBox === boxDesign ? 'selected' : ''}
                >
                    {/* Render component_elements inside the Box */}
                    {boxDesign.children.map((element) => (
                        <Box key={element.id}>
                            {getAppropriateTag(element.element_type.element_type_name, element.element_content, element.styles.reduce(
                                        (acc, cssProp) => ({
                                            ...acc,
                                            [cssProp.style_prop.style_prop_css_name]: cssProp.style_prop_value,
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