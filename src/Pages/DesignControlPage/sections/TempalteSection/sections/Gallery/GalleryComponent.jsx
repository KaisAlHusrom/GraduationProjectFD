//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { Edit as EditIcon } from '@mui/icons-material';

//propTypes 
import propTypes from 'prop-types'
import GalleryElement from './GalleryElement'
import { AdminMainButton } from '../../../../../../Components'
import CustomVerticalTabs from '../../components/CustomVerticalTabs'

//Styled Components
const StyledGalleryComponent = styled(Box)(
    ({ theme }) => ({
    
    })
)

const TooltipContainer = styled(Box)({
    position: 'absolute',
    top: '10%',
    left: '0%',
    zIndex: 100,
    transform: 'translateX(50%)',
    });



const GalleryComponent = ({component}) => {

    const componentStyle = useMemo(() => {
        const styleObject = {};

        component.section_css_props.forEach((cssProp) => {
        const { css_prop, css_prop_value } = cssProp;

        if (css_prop.is_component) {
            styleObject[css_prop.prop_name] = css_prop_value;
        }
        });

        return styleObject;
    }, [component.section_css_props]);


    return (
        <StyledGalleryComponent sx={componentStyle}>
            {
                component && component.component_elements.map((element, i) => {
                    return (
                        <GalleryElement key={i} element={element} />
                    )
                })
            }

            <TooltipContainer>
                        <AdminMainButton
                            title='Edit About us Content'
                            type='custom'
                            appearance='iconButton'
                            putTooltip
                            icon={<EditIcon />}
                            // willShow={
                            // <CustomVerticalTabs  tabLabels={tabLabels} tabContents={tabContents}/>
                            // }
                            sx={{
                                border: '1px solid red',
                                padding: '10px 15px',
                                fontWeight: 'bold',
                                color: 'white.main',
                                backgroundColor: 'primary.dark',
                            }}
                        />
                    </TooltipContainer>
        </StyledGalleryComponent>
    );
};

GalleryComponent.propTypes = {
    component: propTypes.object
}

export default GalleryComponent;