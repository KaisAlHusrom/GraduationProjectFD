//React
import { useMemo } from 'react'

import {
    
} from 'react-redux'

//Components
import TeamElement from './TeamElement'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import  '../Style.css'


//propTypes 
import propTypes from 'prop-types'


//Styled Components
const StyledTeamComponent = styled(Box)(() => ({
    border: 'none'

}))
    


const TeamComponent = ({component}) => {

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
        <StyledTeamComponent  sx={componentStyle} className='component-query'>
            {
                component && component.component_elements.map((element, i) => {
                    return (
                        <TeamElement key={i} element={element} />
                    )
                })
            }

        </StyledTeamComponent>
    );
};

TeamComponent.propTypes = {
    component: propTypes.object
}


export default TeamComponent;