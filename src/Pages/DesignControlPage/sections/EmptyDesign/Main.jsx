//React

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

//Components
import EmptyTemplate from './EmptyTemplate'
import { EmptyTemplateSectionSet } from './UseContext/UserSetSections'
import AppbarCom from '../../components/AppbarCom'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { changeMode } from '../../../../Redux/Slices/modeSlice'
import Container from '@mui/material/Container';


//Styled Components
const StyledMain = styled(Box)(
    () => ({})
)


const Main = () => {


    const {id} = useParams()
    console.log("id" , id)

    const [EmptySection, setEmptySection] = useState(true)
    const valuesOfPages = {EmptySection, setEmptySection }
    const mode = useSelector(state => state.modeSlice.mode)
    const [isMobileWidth, setIsMobileWidth] = useState(false);
    const [isTabletWidth, setIsTabletWidth] = useState(false);
    const [isLaptopWidth, setIsLaptopWidth] = useState(true);
    const [selectedFontFamily, setSelectedFontFamily] = useState('');

    const handleFontFamilyClick = (fontFamily) => {
        setSelectedFontFamily(fontFamily);
    };
    const handleSmartphoneClick = () => {
        setIsMobileWidth(true);
        setIsTabletWidth(false);
        setIsLaptopWidth(false);};
    
    const handleTabletClick = () => {
    setIsTabletWidth(true);
    setIsMobileWidth(false);
    setIsLaptopWidth(false);
    };
    const handleLaptopClick = () => {
    setIsTabletWidth(false);
    setIsMobileWidth(false);
    setIsLaptopWidth(true);


    }

    const dispatch = useDispatch()

    const toggleColorMode = () => {
        if(mode === 'dark' ) {
            dispatch(changeMode({mode : 'light'}))
        } 
        if(mode === 'light' ) {
            dispatch(changeMode({mode : 'dark'}))
        } 
        };


    return (

        <EmptyTemplateSectionSet.Provider value={valuesOfPages}>
        <StyledMain>
                <AppbarCom mode={mode} toggleColorMode={toggleColorMode}  
                handleFontFamilyClick = {handleFontFamilyClick}
                handleSmartphoneClick = {handleSmartphoneClick}
                handleTabletClick = {handleTabletClick}
                handleLaptopClick = {handleLaptopClick}
                WepProject_id = {id}
                />
                <Container fixed>
                <EmptyTemplate  selectedFontFamily={selectedFontFamily} isMobileWidth={isMobileWidth} isTabletWidth = {isTabletWidth} isLaptopWidth = {isLaptopWidth}/>

                </Container>

        </StyledMain>
        </EmptyTemplateSectionSet.Provider>

    );
};

export default Main;