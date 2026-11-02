import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import useEffectFetchData from '../../../../Helpers/customHooks/useEffectFetchData';
import EmptySection from './Sections/EmptySection/EmptySection';
import {
    Box,

} from '@mui/material';
import { styled, css } from '@mui/system';
import { fetchSpecificUserWebProject } from '../../../../Services/UserServices/Services/webProjectsUsersService';
import {  updateUserSorting } from '../../../../Services/UserServices/Services/designUsersService';
import  './Style.css' 

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageRouter from '../../components/PageRouter';


const StyledEmptyTemplate = styled(Box)(
    ({ fontFamily }) => css`
        font-family: ${fontFamily};
        h1, h2, h3, h4, h5, h6 {
            font-family: ${fontFamily};
        }
            .section-transition {
                transition: all 300ms ease-in-out;
    }
    `
);


const EmptyTemplate = ({
    selectedFontFamily,
    isMobileWidth,
    isTabletWidth,
    isLaptopWidth,
}) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const params = useMemo(() => [id], [id]);

    const { data  , } = useEffectFetchData(fetchSpecificUserWebProject, params, true, true);
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


    console.log(data)

    return (
        <StyledEmptyTemplate
            fontFamily={selectedFontFamily}
            className="Template"
            sx={{
                width: isMobileWidth ? '500px' : isTabletWidth ? '50%' : isLaptopWidth ? '100%' : '',
                padding: isMobileWidth ? '0px' : isTabletWidth ? '0px' : '',
                margin: 'auto',
                overflow: 'hidden'
            }}
        >       
        {
            
            data?.designs?.sort((a, b) => a.sequence_number - b.sequence_number)
            .map((section, index) => (
                <>
                    <EmptySection
                        designData={section}
                    />

                </>
            ))

        }

            <Routes>
                {
                    data && data.pages && data.pages.map((page , key) => {
                        return  <Route 
                        key={key}  path={page.page_path} element={<PageRouter 
                            isMobileWidth = {isMobileWidth}
                            isTabletWidth = {isTabletWidth}
                            isLaptopWidth = {isLaptopWidth}
                            pageId = {page.id}/>} />
                    })
                }
            </Routes>


        </StyledEmptyTemplate>
    );
};

EmptyTemplate.propTypes = {
    selectedFontFamily: PropTypes.string,
    isMobileWidth: PropTypes.bool,
    isTabletWidth: PropTypes.bool,
    isLaptopWidth: PropTypes.bool,
};

export default EmptyTemplate;
