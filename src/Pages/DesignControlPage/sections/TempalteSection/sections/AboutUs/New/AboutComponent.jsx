//React
import { useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components
import propTypes from 'prop-types'

import { Edit as EditIcon } from '@mui/icons-material';

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import AboutElement from './AboutElement'
import { AdminMainButton } from '../../../../../../../Components'
import CustomVerticalTabs from '../../../components/CustomVerticalTabs'
import TextContentTaP from '../../../components/TextContentTaP'

//Styled Components
const StyledAboutComponent = styled(Box)(
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

const AboutComponent = ({component}) => {

    const [HeaderTexts, setHeaderTexts] = useState([
        {
                sx : {
                    color : 'black',
                    opacity: 1,
                    backgroundColor:'',
                    borderRadius:'0',
                    fontSize: "16",
                    fontWeight: '700',
                    padding:"10px"
                },
                text:"Example title 1"
            },
        ]);
    const [HeaderDescription, setHeaderDescription] = useState([
        {
                sx : {
                    color : 'black',
                    opacity: 1,
                    backgroundColor:'',
                    borderRadius:'0',
                    fontSize: "16",
                    fontWeight: '700',
                    padding:"10px"
                },
                text:"Example Description 1"
            },
    ]);


const tabLabels = [ 'Title' , 'Description'];
// Define tab contents
const tabContents = [
    () => <TextContentTaP 
    NameOfBox="Title"
    setTextOfHeader = {setHeaderTexts} 
    TextOfHeader= {HeaderTexts} 
    />,
    () => <TextContentTaP 
    NameOfBox="Description"
    setTextOfHeader = {setHeaderDescription} 
    TextOfHeader= {HeaderDescription} 
    />,
    ];




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
        <StyledAboutComponent sx={componentStyle}>
           {
                component && component.component_elements.map((element, i) => {
                    return (
                        <AboutElement key={i} element={element} />
                    )
                })
            }
                            <TooltipContainer>
                    <AdminMainButton
                        title='Edit About us Content'
                        type='modal'
                        appearance='iconButton'
                        putTooltip
                        icon={<EditIcon />}
                        willShow={
                        <CustomVerticalTabs  tabLabels={tabLabels} tabContents={tabContents}/>
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

        </StyledAboutComponent>
    );
};
AboutComponent.propTypes = {
    component: propTypes.object
}


export default AboutComponent;