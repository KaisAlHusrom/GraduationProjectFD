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

        component.styles.forEach((cssProp) => {
        const { style_prop, style_prop_value } = cssProp;

        if (style_prop.is_component) {
            styleObject[style_prop.style_prop_css_name] = style_prop_value;
        }
        });

        return styleObject;
    }, [component.styles]);




    return (
        <StyledTeamComponent  sx={componentStyle} className='component-query'>
            {
                component && component.children.map((element, i) => {
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