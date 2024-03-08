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
    backgroundColor:'#ab9d9d',
    position: 'absolute',
    top: '0',
    right: '0',
    display: 'inline-block', 
    padding : '5px 10px',
    borderRadius : '5px',
});



const EditLink = ({ Data }) => {
    return (
        <TooltipContainer>
            <Link
                to={`/design-control/EditPage/${Data.section_id}`}
                sx={{
                    padding: '10px 15px',
                    fontWeight: 'bold',
                    color:  "red",
                    backgroundColor: 'primary.dark',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': { backgroundColor: 'action.hover' },
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