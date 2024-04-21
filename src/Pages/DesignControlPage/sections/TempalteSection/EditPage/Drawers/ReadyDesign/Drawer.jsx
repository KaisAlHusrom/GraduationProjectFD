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
    ({ theme }) => ({

    })
)


const Drawer = ({createNewComponent , createDesignedComponent , BoxDesignOne , emptyDesign}) => {
    const [selectedCss, setSelectedCss] = useState(null);
    const [selectedBox, setSelectedBox] = useState(null);

    const handleEmptyBoxClick = (cssProps) => {
        setSelectedCss(cssProps);
        createNewComponent(cssProps)
        console.log(cssProps);
    };


    const handleBoxClick = (box) => {
        console.log("box",box);
        setSelectedBox(box);
        createDesignedComponent(box)
    };
    return (
        <StyledDrawer>
            <Box sx={{
                display: 'flex',
                flexDirection :'column',
                alignItems :'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                }}>
                <Box
                sx={{
                    ...emptyDesign.reduce((acc, cssProp) => ({
                        ...acc,
                        [cssProp.css_prop.prop_name]: cssProp.css_prop_value,
                    }), {}),
                    margin: '30px', // Adjust the margin value as needed
                }}
                onClick={() => handleEmptyBoxClick(emptyDesign)}
            />
                {BoxDesignOne.map((boxDesign) => (
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
        </StyledDrawer>
    );
};

export default Drawer;