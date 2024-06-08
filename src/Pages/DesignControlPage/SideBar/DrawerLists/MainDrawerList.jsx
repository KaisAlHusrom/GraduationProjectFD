import {
  Box,
  Typography
} from '@mui/material';
import { styled } from '@mui/system';
import { useMemo } from 'react';


// Helpers 

import { cleanDesignDataDesignPage, updateID2 } from '../../../../Helpers/RecursiveHelpers/addNewElementToSpecificElement';
import useFetchData from '../../../../Helpers/customHooks/useFetchData';
import { writeFilterObject } from '../../../../Helpers/filterData';


// services



// Component
import ModalDesignCategories from '../../components/ModalDesignCategories';
import { AdminMainButton } from '../../../../Components';



// PropTypes
import PropTypes from 'prop-types';
import { fetchUserPages } from '../../../../Services/UserServices/Services/pagesUsersService';
import { addUserDesigns } from '../../../../Services/UserServices/Services/designUsersService';




const StyledMainDrawerList = styled(Box)(
  ({ theme }) => ({
      color: theme.palette.success.main,
      marginTop : '80px',
      display: 'flex',
      flexDirection  :'column',
      justifyContent: 'center',
      alignItems: 'center',
  })
);

const StyleButton = {
  border : 'none',
  padding: '10px 15px',
  fontWeight: 'bold',
  backgroundColor:'success.dark',
  width: '90%',
  '&:hover' : {
    backgroundColor: 'warning'
  },
  color:'white.main',
  marginLeft:'10px'

}
const MainDrawerList = ({WepProject_id}) => {


    const appliedFilter = useMemo(() => {
      return [
          writeFilterObject('web_project_id', 'string', '=', WepProject_id), 
      ]
  }, [WepProject_id])

    const { data } = useFetchData(fetchUserPages, 'all', appliedFilter, null, true, null, null, 10)



    const createDesignSection =async (sectionData) => {
      console.log("sectionData before" , sectionData)

      if (data && data[0] && data[0].designs) {
        console.log('Designs:', data[0].designs);
        console.log('Initial sectionData:', sectionData);
    
        // Determine the max sequence number
        let maxSequenceNumber = 0;
        data[0].designs.forEach(existingComponent => {
          if (existingComponent.sequence_number > maxSequenceNumber) {
            maxSequenceNumber = existingComponent.sequence_number;
          }
        });
    
        // Set the new section's sequence number
        sectionData.sequence_number = maxSequenceNumber + 1;

        updateID2(sectionData)
        cleanDesignDataDesignPage(sectionData)
        sectionData.page_id = data[0].id
         // Set the new section's sequence number

        

          const res = await addUserDesigns(sectionData);
          console.log("res" , res);
          console.log("sectionData after" , sectionData)

        
        console.log("sectionData after" , sectionData)

      } else {
        console.error('Data or designs is undefined');

      }
    };

    const appliedFilterForSections = useMemo(() => {
      return [
          writeFilterObject('design_type', 'string', '=', 'section'), 
      ];
    }, []);

  return (
    <StyledMainDrawerList>
        <Typography variant = "h5" component="div" sx = {{
                color : 'text.primary',
                textAlign : 'center',
                width: 'fit-content',
                borderBottom : '1px solid',
                borderColor : 'text.primary',
                borderWidth : 'fit-content',
                marginBottom : '20px',
            }}>
                Control You Page Section
            </Typography>
            <AdminMainButton
                    title="Add New Section"
                    // icon={<HomeIcon />}
                    appearance="secondary"
                    type='StyleDialog'
                    drawerAnchor='left'
                    sx={StyleButton}
                    willShow={
                      <ModalDesignCategories  
                      createDesignedDesign = {createDesignSection}
                      appliedFilter = {appliedFilterForSections}
                      selected_parent_id = {WepProject_id} 
                      NameOfCategories = {'component'}
                      ></ModalDesignCategories>
                    }
              />

    </StyledMainDrawerList>
  );
};

MainDrawerList.propTypes = {
  WepProject_id: PropTypes.string,
};


export default MainDrawerList;
