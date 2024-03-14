//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components
import NavBar from './sections/NavBar/NavBar'
import Header from './sections/Header/Header'
import About from './sections/AboutUs/About'
import Gallery from './sections/Gallery/Gallery'
import Team from './sections/Team/Team'
import Carousel from './sections/Carousel/Carousel'
import Work from './sections/Work/Work'
import Counters from './sections/Counters/Counters'
import Services from './sections/Services/Services'
import Footer from './sections/Footer/Footer'

//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import './Style.css'


//Styled Components
const StyledTemplateMain = styled(Box)(() => ({}))


const TemplateMain = ({ isMobileWidth , isTabletWidth , isLaptopWidth}) => {


    // list of section
    const [sectionsOrder, setSectionsOrder] = useState([
        'NavBar',
        'Header',
        'About',
        'Gallery',
        'Team',
        'Carousel',
        'Work',
        'Counters',
        'Services',
        'Footer',
    ]);

    // change the order of sections 
    const changeOrder = (index, direction) => {
        const newOrder = [...sectionsOrder];
        const sectionToMove = newOrder.splice(index, 1)[0];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        newOrder.splice(newIndex, 0, sectionToMove);
        setSectionsOrder(newOrder);
    };


    return (
        <StyledTemplateMain className="Template"  sx={{
            width: isMobileWidth ? '500px' :  isTabletWidth ? '50%' : isLaptopWidth  ?  '100%' : '',
            padding: isMobileWidth ? '0px' :  isTabletWidth ? '0px' : ''

                , margin : '100px auto' 
            
            }}>
        {sectionsOrder.map((section, index) => (
            <div key={index}>
            {section === 'NavBar' && <NavBar moveSectionUp={() => changeOrder(index, 'up')} moveSectionDown={() => changeOrder(index, 'down')} />}
            {section === 'Header' && <Header moveSectionUp={() => changeOrder(index, 'up')} moveSectionDown={() => changeOrder(index, 'down')} />}
            {section === 'About' && <About moveSectionUp={() => changeOrder(index, 'up')} moveSectionDown={() => changeOrder(index, 'down')} />}
            {section === 'Gallery' && <Gallery moveSectionUp={() => changeOrder(index, 'up')} moveSectionDown={() => changeOrder(index, 'down')} />}
            {section === 'Team' && <Team moveSectionUp={() => changeOrder(index, 'up')} moveSectionDown={() => changeOrder(index, 'down')} />}
            {section === 'Carousel' && <Carousel moveSectionUp={() => changeOrder(index, 'up')} moveSectionDown={() => changeOrder(index, 'down')} />}
            {section === 'Work' && <Work moveSectionUp={() => changeOrder(index, 'up')} moveSectionDown={() => changeOrder(index, 'down')} />}
            {section === 'Counters' && <Counters moveSectionUp={() => changeOrder(index, 'up')} moveSectionDown={() => changeOrder(index, 'down')} />}
            {section === 'Services' && <Services moveSectionUp={() => changeOrder(index, 'up')} moveSectionDown={() => changeOrder(index, 'down')} />}
            {section === 'Footer' && <Footer />}

            </div>
        ))}
        </StyledTemplateMain>
    );
};

export default TemplateMain;

