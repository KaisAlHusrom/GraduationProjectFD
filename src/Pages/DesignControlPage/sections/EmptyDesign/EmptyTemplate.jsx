//React
import { useState } from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled  , css} from '@mui/system'
import NavBar from '../TempalteSection/sections/NavBar/NavBar';
import EmptySection from './Sections/EmptySection/EmptySection';

//Styled Components

const StyledEmptyTemplate = styled(Box)(
    ({ fontFamily }) => css`
        font-family: ${fontFamily};
        h1, h2, h3, h4, h5, h6 {
            font-family: ${fontFamily};
        }
    `
);

const EmptyTemplate = ({
    selectedFontFamily,
    isMobileWidth,
    isTabletWidth, 
    isLaptopWidth,
}) => {
     // list of section
        const [sectionsOrder, setSectionsOrder] = useState([
            'Header',

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
        <StyledEmptyTemplate 
        fontFamily={selectedFontFamily}
        className="Template"
        sx={{
            width: isMobileWidth ? '500px' : isTabletWidth ? '50%' : isLaptopWidth ? '100%' : '',
            padding: isMobileWidth ? '0px' : isTabletWidth ? '0px' : '',
            margin: '100px auto',
        }}
        >
            <NavBar />
            <EmptySection  />
            {sectionsOrder.map((section, index) => (
                <div key={index}>
                </div>
            ))}
        </StyledEmptyTemplate>
    );
};

export default EmptyTemplate;