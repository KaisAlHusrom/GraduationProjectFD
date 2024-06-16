//React
import { useEffect, useMemo, useState, } from 'react'

import {
    
} from 'react-redux'
import PropTypes from 'prop-types'; 
//Components
import { useParams } from 'react-router-dom';
import useEffectFetchData from '../../../../Helpers/customHooks/useEffectFetchData';
import EmptySection from './Sections/EmptySection/EmptySection';

//MUI
import {
    Box,
} from '@mui/material'
import { styled  , css} from '@mui/system'
import { fetchSpecificUserWebProject } from '../../../../Services/UserServices/Services/webProjectsUsersService';


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
    
        const {id} = useParams()
        const params = useMemo(() => {
            return [
                id
            ]
        }, [id])

    

        const { data } = useEffectFetchData(fetchSpecificUserWebProject, params , true , true )

        const [mainPage , setMainPage] = useState(null) 
        useEffect  (() => {
                if(data) {
                    setMainPage(()=> {
                        return data.pages.filter(page => page.page_path === '/')[0]
                    })
                }
        } , [data]) 

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
            
            {data && data.pages  && mainPage?.designs &&
                mainPage.designs
                    .sort((a, b) => a.sequence_number - b.sequence_number)
                    .map((section, index) => (
                        <div key={index}>
                            <EmptySection designData={section} />
                        </div>
                    ))
            }

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