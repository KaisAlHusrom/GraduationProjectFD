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
import { getAppropriateTag } from '../../../StylesFunctions/GenerateElements'

//Styled Components
const StyledDrawer = styled(Box)(
    () => ({

    })
)


const Drawer = ({createNewComponent , createDesignedComponent , BoxDesignOne , emptyDesign}) => {
    const [selectedCss, setSelectedCss] = useState(null);
    const [selectedBox, setSelectedBox] = useState(null);

    const handleEmptyBoxClick = (cssProps) => {
        setSelectedCss(cssProps);
        createNewComponent(cssProps)
    };
    const handleBoxClick = (box) => {
    
        createDesignedComponent(box)
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
    <Box
        sx={{
            ...emptyDesign.reduce((acc, cssProp) => ({
                ...acc,
                [cssProp.style_prop.style_prop_css_name]: cssProp.style_prop_value,
            }), {}),
            margin: '30px', // Adjust the margin value as needed
        }}
        onClick={() => handleEmptyBoxClick(emptyDesign)}
    />
    {BoxDesignOne.map((boxDesign) => (
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

            {/* Render component_elements inside the Box if boxDesign is present */}
            {boxDesign && boxDesign.children && boxDesign.children.map((element) => (
                <Box key={element.id}>
                    {getAppropriateTag(
                        element.element_type.element_type_name,
                        element.element_content,
                        element.styles.reduce(
                            (acc, cssProp) => ({
                                ...acc,
                                [cssProp.style_prop.style_prop_css_name]: cssProp.style_prop_value,
                            }),
                            {}
                        )
                    )}
                </Box>
            ))}
        </Box>
    ))}
            </Box>

        </StyledDrawer>
    );
};

export default Drawer;