//React
import {
    
} from 'react'

import {
    
} from 'react-redux'
import { Link } from 'react-router-dom';

//Components


//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import EditIcon from '@mui/icons-material/Edit';





const TooltipContainer = styled(Box)({
    backgroundColor:'#304D30',
    position: 'absolute',
    top: '0',
    right: '0',
    display: 'inline-block', 
    padding : '5px 10px',
    borderRadius : '5px',
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: 'rgb(7, 15, 43)',
    },
});

import PropTypes from 'prop-types';


const EditLink = ({ design_id }) => {
    return (
        <TooltipContainer>
            <Link
                // to={`/design-control/EditPage/${id}`}
                
                    to={`/Empty-design/EditPage/${design_id}`}
            >
                <EditIcon
                    sx={{
                        fontSize: '30px',
                        color: 'white.main',
                    }}
                />
            </Link>
        </TooltipContainer>
    );
};
EditLink.propTypes = {
    design_id: PropTypes.string.isRequired,
};
export default EditLink;