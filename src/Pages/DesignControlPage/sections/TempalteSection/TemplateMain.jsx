//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components
import NavBar from './sections/NavBar/NavBar'
import Header from './sections/Header/Header'
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
import { styled , css } from '@mui/system'
import './Style.css'
import SendMessage from './sections/SendMessage/SendMessage'

const StyledTemplateMain = styled(Box)(
    ({ fontFamily }) => css`
        font-family: ${fontFamily};

        h1, h2, h3, h4, h5, h6 {
            font-family: ${fontFamily};
        }
    `
);

const TemplateMain = ({ isMobileWidth, isTabletWidth, isLaptopWidth, selectedFontFamily }) => {
    // list of section
    const [sectionsOrder, setSectionsOrder] = useState([
        'Header',
        'Carousel',
        'Work',
        'Counters',
        'Services',
        'SliderSection',
        'Team',
        'Message',
    ]);

    // change the order of sections 
    const changeOrder = (index, direction) => {
        const newOrder = [...sectionsOrder];
        const sectionToMove = newOrder.splice(index, 1)[0];
        let newIndex = direction === 'up' ? index - 1 : index + 1;
    
        // Prevent moving the first section (NavBar) up
        if (direction === 'up' && index === 0) {
            return;
        }
    
        // Prevent moving the last section (Footer) down
        if (direction === 'down' && index === sectionsOrder.length - 1) {
            return;
        }
    
        // Adjust index for moving the last section down
        if (direction === 'down' && index === sectionsOrder.length - 2) {
            newIndex = sectionsOrder.length - 1;
        }
    
        newOrder.splice(newIndex, 0, sectionToMove);
        setSectionsOrder(newOrder);
    };

    return (
        <StyledTemplateMain
            fontFamily={selectedFontFamily}
            className="Template"
            sx={{
                width: isMobileWidth ? '500px' : isTabletWidth ? '50%' : isLaptopWidth ? '100%' : '',
                padding: isMobileWidth ? '0px' : isTabletWidth ? '0px' : '',
                margin: '100px auto',
            }}
        >
            <NavBar />
            {sectionsOrder.map((section, index) => (
                <div key={index}>
                    {section === 'NavBar' && <NavBar  />}
                    {section === 'Header' && <Header moveSectionUp={() => changeOrder(index, 'up')} moveSectionDown={() => changeOrder(index, 'down')} />}
                    {section === 'Carousel' && <Carousel moveSectionUp={() => changeOrder(index, 'up')} moveSectionDown={() => changeOrder(index, 'down')} />}
                    {section === 'Work' && <Work moveSectionUp={() => changeOrder(index, 'up')} moveSectionDown={() => changeOrder(index, 'down')} />}
                    {section === 'Counters' && <Counters moveSectionUp={() => changeOrder(index, 'up')} moveSectionDown={() => changeOrder(index, 'down')} />}
                    {section === 'Services' && <Services moveSectionUp={() => changeOrder(index, 'up')} moveSectionDown={() => changeOrder(index, 'down')} />}
                    {section === 'Team' && <Team moveSectionUp={() => changeOrder(index, 'up')} moveSectionDown={() => changeOrder(index, 'down')} />}
                    {section === 'Message' && <SendMessage moveSectionUp={() => changeOrder(index, 'up')} moveSectionDown={() => changeOrder(index, 'down')} />}

                </div>
            ))}
            <Footer />
        </StyledTemplateMain>
    );
};

export default TemplateMain;