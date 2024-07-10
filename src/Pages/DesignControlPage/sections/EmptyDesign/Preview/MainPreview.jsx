//React
import { useEffect, useMemo, useState } from 'react'

import { useSelector } from 'react-redux'

//Components
import PreviewSection from './PreviewSection'


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'

// Helpers
import useEffectFetchData from '../../../../../Helpers/customHooks/useEffectFetchData'

// Services
import { fetchSpecificUserWebProject } from '../../../../../Services/UserServices/Services/webProjectsUsersService'
import PageRouter from '../../../components/PageRouter'
import MainRouter from './MainRouter'

//Styled Components
const StyleMainPreview = styled(Box)(
    ({ theme }) => ({

    
    })
)


const MainPreview = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const params = useMemo(() => [id], [id]);

    const { data } = useEffectFetchData(fetchSpecificUserWebProject, params, true, true);
    const user = useSelector(state => state.authSlice.user);

    const [mainPage, setMainPage] = useState(null);

    const is_published = useMemo( () => {
        if(data?.user_id === user.id) {
            return true
        }
        if(data?.is_published){
            return true 
        }
        return false
    } , [data?.is_published, data?.user_id, user.id])


    console.log(data)

    return (
        <StyleMainPreview             
        className=""
            sx={{
                width: '100%',
                height : 'auto'
            }}
        >
            {is_published && data && (
                <>
                    {data.designs?.sort((a, b) => a.sequence_number - b.sequence_number).map((section, index) => (
                        <PreviewSection
                            key={`design-${index}`}
                            designData={section}
                        />
                    ))}
                        <Routes>
                {
                    data && data.pages && data.pages.map((page , key) => {
                        return  <Route 
                            key={key}  
                            path={page.page_path} 
                            element={<MainRouter 
                            pageId = {page.id}/>} />
                    })
                }
            </Routes>



                </>
            )}
        </StyleMainPreview>
    );
};

export default MainPreview;