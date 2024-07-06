
// Components

// MUI
import { Box } from '@mui/material';
import { styled } from '@mui/system';

import PropTypes from 'prop-types';
import RecursiveEditComponent from './RecursiveEditComponent';

// Helper function to recursively generate new IDs for nested children
const StyledEditPage = styled(Box)(() => ({

}));
const EditPage = ({
    data,
    setData ,
    sectionStyle
}) => {



    return (
        <StyledEditPage sx={{...sectionStyle , 
        }}>
                {data && data.children && data.children.slice() // Diziyi mutasyona uğratmamak için slice kullanıyoruz
                    .sort((a, b) => a.sequence_number - b.sequence_number)
                    .map((component, i) => (
                        <Box key={component.id}>
                            <RecursiveEditComponent
                                key={component.id}
                                component={component}
                                sectionDataState={[data, setData]}
                                
                    />
                    </Box>
                ))}

        </StyledEditPage>
    );
};
EditPage.propTypes = {
    data: PropTypes.object,
};
export default EditPage;  