//React
import { useContext, useMemo  , useState} from 'react'

import {
    
} from 'react-redux'

//Components
import PropTypes from 'prop-types';

//MUI
import {
    Box,
    Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { EmptyTemplateSectionSet } from '../../UseContext/UserSetSections'
import EditLink from '../../../../components/EditLink';
import UpDownButtons from '../../../../components/UpDownButtons';
import { AdminMainButton } from '../../../../../../Components';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonStyle } from '../../StylesFunctions/SetStylesFunctions';


import { deleteUserDesigns } from '../../../../../../Services/UserServices/Services/designUsersService';
import ConfirmationDialog from '../../../../components/ConfirmationDialog';
import RecursiveComponent from './RecursiveComponent';


//Styled Components
const StyledEmptySection = styled(Box)(() => ({

}))

const EmptySection = ({moveSectionUp , moveSectionDown , designData , updateMainPage }) => {

    const {EmptySection } = useContext(EmptyTemplateSectionSet)
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [selectedDesignIdToDelete, setSelectedDesignIdToDelete] = useState(null);

        const handleConfirmation = (page_id) => {
            setSelectedDesignIdToDelete(page_id);
            openConfirmationDialog();
        };
        
        const openConfirmationDialog = () => {
            setConfirmationDialogOpen(true);
        };
        
        const closeConfirmationDialog = () => {
            setConfirmationDialogOpen(false);
        };

        
        const DeleteUserPage = async () => {
            const res = await deleteUserDesigns([selectedDesignIdToDelete]);
            if (res.success) {
                // Update the mainPage designs in the parent component
                updateMainPage(prevMainPage => ({
                    ...prevMainPage,
                    designs: prevMainPage.designs.filter(design => design.id !== selectedDesignIdToDelete)
                }));
            } else {
                console.error('Failed to delete design');
            }
            closeConfirmationDialog();
        };



        const sectionStyle = useMemo(() => {
            const styleObject = {};
                if (designData) {
                    if (designData?.styles) {
                        designData?.styles.forEach((cssProp) => {
                        const { style_prop, style_prop_value } = cssProp;
                        if (style_prop?.is_section) {
                        styleObject[style_prop.style_prop_css_name] = style_prop_value;
                        }
                    });
                    }
                
                }
            
                return styleObject;
            }, [designData]);

            
            const handleMoveUp = () => {
                moveSectionUp(designData.id); // Yukarı taşıma işlemini gerçekleştir
            };
        
            const handleMoveDown = () => {
                moveSectionDown(designData.id); // Aşağı taşıma işlemini gerçekleştir
            };

    return (
        EmptySection ? (
            <StyledEmptySection sx = {{position : 'relative'}}  >
            <Box sx ={{
                position: 'absolute',
                top :'0',
                zIndex: 1000,
            }}>
                    {designData.sequence_number !== 1 && ( // Conditionally render UpDownButtons
                        <Box >
                            <UpDownButtons moveSectionUp={handleMoveUp} moveSectionDown={handleMoveDown} />
                        </Box>
                        
                    )}                
                    </Box>
                            <Box sx={sectionStyle}>
                                    {designData.children && designData.children.sort((a, b) => a.sequence_number - b.sequence_number).map((component, i) => (
                                        designData.design_title === "Empty_Section" && designData.is_template === 1  ? (
                                            <Box key={i}>
                                                <Typography sx={{
                                                    fontSize: '20px',
                                                    fontWeight: 'bold',
                                                    color: 'black'
                                                }}>{component.element_content}</Typography>
                                            </Box>
                                        ) : <RecursiveComponent  key= {i} 
                                            component={component} 

                                        />
                                        
                                    ))}
                                    
                                    <EditLink design_id={designData.id} />
                                    <AdminMainButton
                                        sx={{ ...ButtonStyle, backgroundColor: 'warning.dark', width: '50px' , 
                                            position: 'absolute',
                                            top: '35px',
                                            right: '0',
                                            display: 'inline-block',    
                                        }}
                                        putTooltip
                                        title='Delete Design'
                                        type='custom'
                                        icon={<DeleteIcon />}
                                        appearance='iconButton'
                                        onClick={() => handleConfirmation(designData.id)}
                                    />
                                    
                                    <ConfirmationDialog
                                        open={confirmationDialogOpen}
                                        onClose={closeConfirmationDialog}
                                        onConfirm={DeleteUserPage}
                                    />
                    </Box>

            </StyledEmptySection>
            ) : null 
    );
};
EmptySection.propTypes = {
    moveSectionUp: PropTypes.func,
    moveSectionDown: PropTypes.func,
    designData: PropTypes.object,
};
export default EmptySection;


