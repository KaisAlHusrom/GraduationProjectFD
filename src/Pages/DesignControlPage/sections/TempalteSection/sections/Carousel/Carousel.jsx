//React
import { useContext, useMemo } from 'react'
import {
    
} from 'react-redux'


//Components
import CarouselData from "./CarouselData.json"
import { MainTemplateSectionSet } from '../../UseContext/UserSetSections'
import CarouselComponent from './CarouselComponent'

//MUI
import {
    Box
} from '@mui/material'
import { styled } from '@mui/system'
import UpDownButtons from '../../components/UpDownButtons'
import EditLink from '../../components/EditLink'
//Styled Components
const StyledCarousel = styled(Box)(() => ({}))



const Carousel = ({ moveSectionUp , moveSectionDown }) => {

    const {CarouselSection } = useContext(MainTemplateSectionSet)

    const sectionStyle = useMemo(() => {
        const styleObject = {};

        CarouselData.styles.forEach((cssProp) => {
        const { style_prop, style_prop_value } = cssProp;

        if (style_prop.is_component) {
            styleObject[style_prop.style_prop_css_name] = style_prop_value;
        }
        });

        return styleObject;
    }, []);


    return (
        CarouselSection ? (

        <StyledCarousel key={CarouselData.id} sx={sectionStyle}>

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


            {CarouselData &&
                CarouselData.children.map((component, i) => {
                return (
                    <CarouselComponent key={i} component={component} />
                );
                })}

                <EditLink Data = {CarouselData} ></EditLink>

        </StyledCarousel>
        ) : (
            null
        )
    );
};

export default Carousel;