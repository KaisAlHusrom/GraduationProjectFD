//React
import { useMemo, } from 'react'

import {
    
} from 'react-redux'
import PropTypes from 'prop-types'; 
//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled  , css} from '@mui/system'
import EmptySection from './Sections/EmptySection/EmptySection';
import { fetchWepPages } from '../../../../Services/WepPages';
import { useParams } from 'react-router-dom';
import { writeFilterObject } from '../../../../Helpers/filterData';
import useFetchData from '../../../../Helpers/customHooks/useFetchData';

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
        const appliedFilter = useMemo(() => {
            return [
                writeFilterObject('web_project_id', 'string', '=', id), 
            ]
        }, [id])
        const { data } = useFetchData(fetchWepPages, 'all', appliedFilter, null, true, null, null, 10)

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
            {data[0]?.designs?.map((section, index) => (
                <div key={index}>
                    <EmptySection designData = {section}  />

                </div>
            ))}
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