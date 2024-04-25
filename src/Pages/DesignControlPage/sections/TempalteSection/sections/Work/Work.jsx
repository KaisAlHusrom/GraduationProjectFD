//React
import { useContext, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import {
    
} from 'react-redux'

//Components
import WorkData from './WorkData.json'
import UpDownButtons from '../../components/UpDownButtons'
import { MainTemplateSectionSet } from '../../UseContext/UserSetSections'
import WorkComponent from './WorkComponent'
import EditLink from '../../components/EditLink'
import  '../Style.css'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'

//Styled Components
const StyledWork = styled(Box)(
    () => ({})
)


const Work = ({moveSectionUp , moveSectionDown}) => {

    const {WorkSection } = useContext(MainTemplateSectionSet)

    const sectionStyle = useMemo(() => {
        const styleObject = {};

        WorkData.section_css_props.forEach((cssProp) => {
        const { css_prop, css_prop_value } = cssProp;

        if (css_prop.is_section) {
            styleObject[css_prop.prop_name] = css_prop_value;
        }
        });

        return styleObject;
    }, []);


    const [isInView, setIsInView] = useState(false);
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            setIsInView(true);
        }
    }, [inView]);

    return (
        WorkSection ? (
            <StyledWork key={WorkData.section_id}  sx={{
                ...sectionStyle,
                opacity: isInView ? 1 : 0,
                }}
                className={isInView ? 'slide-right-animation' : ''}
                ref={ref}
            >
                
                <Box sx = {{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent:'start',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                }}>
                <UpDownButtons moveSectionUp = {moveSectionUp} moveSectionDown = {moveSectionDown} ></UpDownButtons>

                </Box>


                {WorkData &&
                WorkData.section_components.map((component, i) => {
                return (
                    <WorkComponent key={i} component={component} />
                );
                })}

                <EditLink Data = {WorkData} ></EditLink>

        </StyledWork>

        ): null
    );
};

export default Work;