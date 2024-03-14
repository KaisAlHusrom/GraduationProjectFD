//React
import { useContext, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer';

import {
    
} from 'react-redux'

//Components
import CountersData from './CountersData.json'
import { MainTemplateSectionSet } from '../../UseContext/UserSetSections'
import UpDownButtons from '../../components/UpDownButtons'
import EditLink from '../../components/EditLink'

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import CountersComponent from './CountersComponent'


//Styled Components
const StyledCounters = styled(Box)(() => ({}))




const Counters = ({moveSectionUp , moveSectionDown}) => {
    const [isInView, setIsInView] = useState(false);
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            setIsInView(true);
        }
    }, [inView]);


    const {CounterSection } = useContext(MainTemplateSectionSet)

    const sectionStyle = useMemo(() => {
        const styleObject = {};

        CountersData.section_css_props.forEach((cssProp) => {
        const { css_prop, css_prop_value } = cssProp;

        if (css_prop.is_section) {
            styleObject[css_prop.prop_name] = css_prop_value;
        }
        });

        return styleObject;
    }, []);


    return (

        CounterSection ? (
            <StyledCounters key={CountersData.section_id}  sx={{
                ...sectionStyle,
                opacity: isInView ? 1 : 0,
            }}
            className={isInView ? 'opacity-animation' : ''}
            ref={ref}>
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
                        
            {CountersData &&
                CountersData.section_components.map((component, i) => {
                return (
                    <CountersComponent key={i} component={component} />
                );
                })}

                    <EditLink Data = {CountersData} ></EditLink>

            </StyledCounters>
        ) : null 
        
    );
};

export default Counters;