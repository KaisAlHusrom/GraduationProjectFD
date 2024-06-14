import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
// HELPERS
import config from '../../../.././../Config.json';
import { writeFilterObject } from '../../../../Helpers/filterData';
import useFetchData from '../../../../Helpers/customHooks/useFetchData';
import { cleanDesignDataDesignPage, updateID2 } from '../../../../Helpers/RecursiveHelpers/addNewElementToSpecificElement';

// COMPONENT
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { ButtonStyle, TextFiledStyle } from '../../sections/EmptyDesign/StylesFunctions/SetStylesFunctions';
import ModalDesignCategories from '../../components/ModalDesignCategories';
import { AdminMainButton } from '../../../../Components';
import CustomTextField from '../../../../Components/CustomTextField/CustomTextField';
import CustomizedAccordions from '../../components/AccordionComponent';
// SERVICES
import { addUserDesigns, deleteUserDesigns, updateUserDesigns } from '../../../../Services/UserServices/Services/designUsersService';
import { fetchUserPages } from '../../../../Services/UserServices/Services/pagesUsersService';

// MUI 
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Typography, Skeleton } from '@mui/material';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';

const StyledMainDrawerList = styled(Box)(({ theme }) => ({
  color: theme.palette.success.main,
  marginTop: '80px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#111111'
}));

const MainDrawerList = ({ WepProject_id }) => {

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const [uploadedImageDesign, setUploadedImageDesign] = useState(null);
  const [designData, setDesignData] = useState({});
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

  const appliedFilter = useMemo(() => [
    writeFilterObject('web_project_id', 'string', '=', WepProject_id),
  ], [WepProject_id]);

  const { loading, data, setData } = useFetchData(fetchUserPages, 'all', appliedFilter, null, true, null, null, 100);

  const createDesignSection = async (sectionData) => {
    if (data && data[0] && data[0].designs) {
      const pageToUpdate = data[0];

      // Determine the max sequence number
      let maxSequenceNumber = 0;
      data[0].designs.forEach(existingComponent => {
        if (existingComponent.sequence_number > maxSequenceNumber) {
          maxSequenceNumber = existingComponent.sequence_number;
        }
      });

      // Set the new section's sequence number
      sectionData.sequence_number = maxSequenceNumber + 1;

      updateID2(sectionData);
      cleanDesignDataDesignPage(sectionData);
      sectionData.page_id = data[0].id;

      const res = await addUserDesigns(sectionData);

      if (res.success) {
        // Update local state with the new design
        const updatedPage = {
          ...pageToUpdate,
          designs: [...pageToUpdate.designs, sectionData],
        };

        // Update data state with the updated page
        setData([updatedPage, ...data.slice(1)]);
      } else {
        console.error('Failed to add design');
      }
    } else {
      console.error('Data or designs is undefined');
    }
  };

  const appliedFilterForSections = useMemo(() => [
    writeFilterObject('design_type', 'string', '=', 'section'),
  ], []);






  useEffect(() => {
    if (data) {
      const initialDesignData = data.reduce((acc, page) => {
        page.designs.forEach(design => {
          acc[design.id] = {
            title: design.design_title,
            description: design.design_description,
            uploadedImageDesign: design.design_image, // Store initial image here
          };
        });
        return acc;
      }, {});
      setDesignData(initialDesignData);
    }
  }, [data]);

  const DeleteUserPage = async () => {
    const res = await deleteUserDesigns([selectedDesignIdToDelete]);
    if (res.success) {
      closeConfirmationDialog();
      setData((prev) =>
        prev.map((page) => {
          if (page.designs) {
            return {
              ...page,
              designs: page.designs.filter((design) => design.id !== selectedDesignIdToDelete)
            };
          }
          return page;
        })
      );
    } else {
      console.error('Failed to delete design');
    }
  };

  const panels = data ? data.map((item) => ({
    id: item.id,
    title: item.page_title + " Designs",
    content: item.designs.map((design) => (
      <Box
        key={design.id}
        sx={{
          width: '270px',
          borderTop: '1px solid',
          borderColor: 'text.primary',
          paddingTop: '20px',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h6" component="div" sx={{ marginBottom: '10px' }}>
          {design.title}
        </Typography>
        <Typography variant="h6" component="div" sx={{ marginBottom: '10px' }}>
          {designData[design.id]?.title}
        </Typography>

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          marginTop: '10px',
          marginBottom: '10px',
        }}>
       
         
          <AdminMainButton
            sx={{ ...ButtonStyle, backgroundColor: 'warning.dark', width: '50px' }}
            putTooltip
            title='Delete Design'
            type='custom'
            icon={<DeleteIcon />}
            appearance='iconButton'
            onClick={() => handleConfirmation(design.id)}
          />
        </Box>
      </Box>
    )),
  })) : [];

  return (
    <StyledMainDrawerList>
      <Typography
        variant="h5"
        component="div"
        sx={{
          color: 'text.primary',
          textAlign: 'center',
          width: 'fit-content',
          borderBottom: '1px solid',
          borderColor: 'text.primary',
          borderWidth: 'fit-content',
          marginBottom: '20px',
        }}
      >
        Control Your Page Section
      </Typography>
      {loading ? (
        Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} sx={{ width: '300px', height: '100px' }} />)
      ) : (
        <CustomizedAccordions panels={panels} />
      )}
      <AdminMainButton
        title="Add New Section"
        icon={<AddIcon />}
        appearance="secondary"
        type="StyleDialog"
        drawerAnchor="left"
        sx={ButtonStyle}
        willShow={
          <ModalDesignCategories
            createDesignedDesign={createDesignSection}
            appliedFilter={appliedFilterForSections}
            selected_parent_id={WepProject_id}
            NameOfCategories="Sections Designs"
          />
        }
      />
      <ConfirmationDialog
        open={confirmationDialogOpen}
        onClose={closeConfirmationDialog}
        onConfirm={DeleteUserPage}
      />
    </StyledMainDrawerList>
  );
};

MainDrawerList.propTypes = {
  WepProject_id: PropTypes.string.isRequired,
};

export default MainDrawerList;
