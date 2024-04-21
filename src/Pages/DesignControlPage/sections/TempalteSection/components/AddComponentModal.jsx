//React
import {
    
} from 'react-redux'

//Components

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import {  useState } from 'react'
import { BoxDesignOne, css_two } from '../EditPage/Data/ConstDataDesign';
import { getAppropriateTag } from '../StylesFunctions/GenerateElements';



//Styled Components
const StyledAddElementModal = styled(Box)(
    () => ({
    borderRadius: '10px',
    boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;",
    padding: (theme) => theme.spacing(4),
    })
)


const AddComponentModal = ({ createNewComponent , createDesignedComponent }) => {
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
        <StyledAddElementModal>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                <Box
                    sx={css_two.map(cssProp => ({
                        [cssProp.css_prop.prop_name]: cssProp.css_prop_value,
                    }))}
                    onClick={() => handleEmptyBoxClick(css_two)}
                />
        {BoxDesignOne.map((boxDesign) => (
            <Box
                key={boxDesign.section_component_id}
                sx={boxDesign.section_css_props.reduce(
                    (acc, cssProp) => ({
                        ...acc,
                        [cssProp.css_prop.prop_name]: cssProp.css_prop_value,
                    }),
                    {}
                )}
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
        </StyledAddElementModal>
    );
};

export default AddComponentModal;