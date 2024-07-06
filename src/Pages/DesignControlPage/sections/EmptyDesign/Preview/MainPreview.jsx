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
import { useNavigate, useParams } from 'react-router-dom'

// Helpers
import useEffectFetchData from '../../../../../Helpers/customHooks/useEffectFetchData'

// Services
import { fetchSpecificUserWebProject } from '../../../../../Services/UserServices/Services/webProjectsUsersService'

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

    useEffect(() => {
        if (data) {
            if (data.user_id !== user.id) {
                navigate(-1);
            }
            setMainPage(() => {
                return data.pages.filter(page => page.page_path === '/')[0];
            });
        }
    }, [data, navigate, user.id]);


    return (
        <StyleMainPreview             
        className=""
            sx={{
                width: '100%',
                height : 'auto'
            }}
        >
                    {data && data.pages && mainPage?.designs && (
                        mainPage.designs
                            .sort((a, b) => a.sequence_number - b.sequence_number)
                            .map((section, index) => (
                                <div key={index} className="slide-down-animation">
                                    <PreviewSection
                                        designData={section}
                                        
                                    />
                                </div>
                            ))
            )}
        </StyleMainPreview>
    );
};

export default MainPreview;