import {  useMemo, useState } from 'react';
import PropTypes from 'prop-types';
// HELPERS
import { writeFilterObject } from '../../../../Helpers/filterData';
import useFetchData from '../../../../Helpers/customHooks/useFetchData';
import { cleanDesignDataDesignPage, updateID2 } from '../../../../Helpers/RecursiveHelpers/addNewElementToSpecificElement';

// COMPONENT
import { ButtonStyle } from '../../sections/EmptyDesign/StylesFunctions/SetStylesFunctions';
import ModalDesignCategories from '../../components/ModalDesignCategories';
import {AdminMainButtonOutsideState, CustomDrawer } from '../../../../Components';
// SERVICES
import { addUserDesigns } from '../../../../Services/UserServices/Services/designUsersService';
import { fetchUserPages } from '../../../../Services/UserServices/Services/pagesUsersService';


import { Box, Typography  } from '@mui/material';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import DrawerSelectedCategoryDesigns from '../../sections/EmptyDesign/EditPage/Drawers/ReadyDesign/DrawerSelectedCategoryDesigns';
import { useLocation } from 'react-router-dom';

const StyledMainDrawerList = styled(Box)(({ theme }) => ({
  color: theme.palette.success.main,
  marginTop: '80px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#111111'
}));
function getPathAfterUUID(path) {
  // Split the path by '/'
  const parts = path.split('/');
  
  // Find the index of the UUID (assuming UUIDs are in UUID format)
  const uuidIndex = parts.findIndex(part => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(part));
  
  // If UUID found and there are parts after UUID, join and return them
  if (uuidIndex !== -1 && uuidIndex < parts.length - 1) {
      return '/' + parts.slice(uuidIndex + 1).join('/');
  }
  
  // If UUID not found or no parts after UUID, return empty string or original path
  return '';
}



const MainDrawerList = ({ WepProject_id  , pageId}) => {

 console.log("MainDrawerList"  , pageId)


  const appliedFilter = useMemo(() => [
    writeFilterObject('web_project_id', 'string', '=', WepProject_id),

  ], [WepProject_id]);

  const location = useLocation()
  console.log(getPathAfterUUID(location.pathname));
  const {  data, setData } = useFetchData(fetchUserPages, 'all', appliedFilter, null, true, null, null, 100);
  const page = data.filter(page => getPathAfterUUID(location.pathname) === '' ? page.page_path === "/" :  page.page_path === getPathAfterUUID(location.pathname))[0]
  console.log("page" , page)
  
    const createDesignSection = async (sectionData) => {
      console.log(sectionData)
      if (data && page && page.designs) {
        const pageToUpdate =page;

        // Determine the max sequence number
        let maxSequenceNumber = 0;
        page.designs.forEach(existingComponent => {
          if (existingComponent.sequence_number > maxSequenceNumber) {
            maxSequenceNumber = existingComponent.sequence_number;
          }
        });

        // Set the new section's sequence number
        sectionData.sequence_number = maxSequenceNumber + 1;

        updateID2(sectionData);
        cleanDesignDataDesignPage(sectionData);
        sectionData.page_id = page.id;

        const res = await addUserDesigns(sectionData);

        if (res.success) {
          // Update local state with the new design
          const updatedPage = {
            ...pageToUpdate,
            designs: [...pageToUpdate.designs, sectionData],
          };

          // Update data state with the updated page
          setData([updatedPage, ...data.slice(1)]);
          window.location.reload();

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


  const [design , setDesign] = useState(null)



  const [dialogState , setDialogState] = useState(false)


  const [drawerState , setDrawerState] = useState(false);



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
  
              <AdminMainButtonOutsideState
                title="Add New Section"
                icon={<AddIcon />}
                appearance="secondary"
                type="StyleDialog"
                drawerAnchor="left"
                sx={ButtonStyle}
                customState = {[dialogState , setDialogState]}
                willShow={
                  <ModalDesignCategories
                    customState = {[dialogState, setDialogState]}
                    drawerStates = {[drawerState , setDrawerState]}
                    createDesignedDesign={createDesignSection}
                    appliedFilter={appliedFilterForSections}
                    selected_parent_id={WepProject_id}
                    designState = {[design , setDesign]}
                    NameOfCategories="Sections Designs"
                  />
                }
              />
              <CustomDrawer
                    drawerOpenState={[drawerState , setDrawerState]}
                    title={"Sections Designs"}
                    drawerStyle={{
                      paddingTop : '80px'
                    }}
                    putDrawerCloseButton={true}
                    anchor={"left"}
            >
            <DrawerSelectedCategoryDesigns
                    design_category_id={design?.id}
                    createDesignedDesign={createDesignSection}
                    appliedFilterType={design?.design_type}
                    selected_parent_id={WepProject_id}  
                    
                    />
                                    
          </CustomDrawer>
    </StyledMainDrawerList>
  );
};

MainDrawerList.propTypes = {
  WepProject_id: PropTypes.string.isRequired,
};

export default MainDrawerList;
