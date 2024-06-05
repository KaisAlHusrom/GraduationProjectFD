//React
import { useMemo, } from 'react'

import {
    
} from 'react-redux'
import PropTypes from 'prop-types'; 
//Components
import { useParams } from 'react-router-dom';
import useEffectFetchData from '../../../../Helpers/customHooks/useEffectFetchData';
import { fetchSpecificWebProject } from '../../../../Services/webProjectsService';
import EmptySection from './Sections/EmptySection/EmptySection';

//MUI
import {
    Box,
} from '@mui/material'
import { styled  , css} from '@mui/system'


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

        
        const { data } = useEffectFetchData(fetchSpecificWebProject, params , true , true )

        
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
            {/* <NavBar /> */}
            { data && data.pages[0]?.designs
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