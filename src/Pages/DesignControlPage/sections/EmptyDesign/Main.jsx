//React
import { useMemo, useState } from 'react'

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
import { useParams } from 'react-router-dom'
import useEffectFetchData from '../../../../Helpers/customHooks/useEffectFetchData'
import { fetchSpecificWebProject } from '../../../../Services/webProjectsService'

//Styled Components
const StyledMain = styled(Box)(
    () => ({})
)


const Main = () => {
    const [EmptySection, setEmptySection] = useState(true)
    const valuesOfPages = {EmptySection, setEmptySection }
    const mode = useSelector(state => state.modeSlice.mode)

    const {id} = useParams()

    const params = useMemo(() => {
        return [id]
    },[id])

    const {data} = useEffectFetchData(fetchSpecificWebProject , params , true , true)


    console.log("webProjectId" , id)



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