//React

import { useDispatch, useSelector } from 'react-redux'

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import AppbarCom from '../../components/AppbarCom'
import { EmptyTemplateSectionSet } from './UseContext/UserSetSections'
import { changeMode } from '../../../../Redux/Slices/modeSlice'
import { useState } from 'react'


//Styled Components
const StyledMain = styled(Box)(
    () => ({})
)


const Main = () => {
    const [EmptySection, setEmptySection] = useState(true)
    const valuesOfPages = {EmptySection, setEmptySection }
    const mode = useSelector(state => state.modeSlice.mode)

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
                <AppbarCom mode={mode} toggleColorMode={toggleColorMode} />
        </StyledMain>
        </EmptyTemplateSectionSet.Provider>

    );
};

export default Main;