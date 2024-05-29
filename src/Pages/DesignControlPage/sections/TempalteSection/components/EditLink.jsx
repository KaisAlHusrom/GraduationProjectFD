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



const EditLink = ({ section_id }) => {
    return (
        <TooltipContainer>
            <Link
                // to={`/design-control/EditPage/${id}`}
                
                 to={`/empty-design/EditPage/${section_id}`}

                sx = {{
                }}
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

export default EditLink;