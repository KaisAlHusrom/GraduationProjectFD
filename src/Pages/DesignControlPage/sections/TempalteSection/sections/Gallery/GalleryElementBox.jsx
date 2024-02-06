// React
import { useMemo } from 'react'
import propTypes from 'prop-types'
import { Box } from '@mui/material'
import { styled } from '@mui/system'
import GalleryElement from './GalleryElement'

// Styled Components
const StyledGalleryElementBox = styled(Box)(
    ({ theme }) => ({
    
    })
)

const GalleryElementBox = ({ component }) => {
    
    

    return (
        <StyledGalleryElementBox>
            {/* Iterate over each section */}
            {Object.entries(component.component_elements).map(([sectionName, section]) => (
                // Check if the section has elements
                section.elements && (
                    <Box key={sectionName}>
                        {/* Iterate over elements in this section */}
                        {section.elements.map((element, i) => (
                    <Box key={`${sectionName}_${i}`}>
                        <GalleryElement element={element} />
                    </Box>
                        ))}
                    </Box>
                )
            ))}
        </StyledGalleryElementBox>
    );
};

GalleryElementBox.propTypes = {
    component: propTypes.object
}

export default GalleryElementBox;
