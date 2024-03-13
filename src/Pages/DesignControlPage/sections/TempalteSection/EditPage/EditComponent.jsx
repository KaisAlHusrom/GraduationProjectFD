//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components
import EditElement from './EditElement'
import { AdminMainButton } from '../../../../../Components'
import StyleBox from '../components/StyleBox.jsx';

//propTypes 
import propTypes from 'prop-types'
//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit as EditIcon } from '@mui/icons-material';

//Styled Components
const StyledEditComponent = styled(Box)(() => ({
    '&  div': {
        border: 'none'
    },    '&:hover > div': {
        opacity: 1, // Show the TooltipContainers when StyledEditComponent is hovered
        visibility: 'visible',
    },
}));

const TooltipContainer = styled(Box)({
    position: 'absolute',
    top: '0',
    left: '0',
    opacity: 0, // Initially set opacity to 0
    visibility: 'hidden', // Initially hide the TooltipContainer
    transition: 'opacity 1s ease', // Apply transition effect to opacity
});

const TooltipContainerDelete = styled(Box)({
    position: 'absolute',
    top: '0',
    right: '0',
    opacity: 0, // Initially set opacity to 0
    visibility: 'hidden', // Initially hide the TooltipContainerDelete
    transition: 'opacity 1s ease', // Apply transition effect to opacity
});


const EditComponent = ({component}) => {

    const [componentStyle, setComponentStyle] = useState({}); 

    useMemo(() => {
        const dictionary = {};
        if (component.section_css_props) {
            component.section_css_props.forEach((cssProp) => {
                const { css_prop, css_prop_value } = cssProp;
                if (css_prop.is_component) {
                    dictionary[css_prop.prop_name] = css_prop_value;
                }
            });
        }
        setComponentStyle(dictionary);
    }, [component.section_css_props]);


    const handleSectionStyleChange = (newStyle) => {
        console.log(newStyle)
        setComponentStyle((prevStyle) => ({ ...prevStyle, ...newStyle }));
    };


    return (
        <StyledEditComponent sx={componentStyle}>
            {
                component && component.component_elements.map((element, i) => {
                    return (
                        <EditElement key={i} element={element} />
                    )
                })
            }
            <TooltipContainer>
                <AdminMainButton
                    title="Edit"
                    type="StyleDialog"
                    appearance="iconButton"
                    putTooltip
                    icon={<EditIcon />}
                    willShow={
                        <StyleBox 
                        Section_Name = {"Style Component"}
                        element_Type = 'Component'
                        sectionStyle = {componentStyle}
                        handleSectionStyleChange = {handleSectionStyleChange}
                        styleProperties={['opacity', 'borderRadius', 'display', 'flexDirection', 'alignItems', 'width', 'height']}

                        />
                    }
                    sx={{
                        border: '1px solid red',
                        padding: '10px 15px',
                        fontWeight: 'bold',
                        color: 'white.main',
                        backgroundColor: 'primary.dark',
                    }}
                />
            </TooltipContainer>

            <TooltipContainerDelete>
                <AdminMainButton
                    title="Delete"
                    type="custom"
                    appearance="iconButton"
                    putTooltip
                    icon={<DeleteIcon />}
                    sx={{
                        border: '1px solid red',
                        padding: '10px 15px',
                        fontWeight: 'bold',
                        color: 'white.main',
                        backgroundColor: 'warning.dark',
                    }}
                />
            </TooltipContainerDelete>
            
        </StyledEditComponent>
    );
};

EditComponent.propTypes = {
    component: propTypes.object
}



export default EditComponent;

