import {
  Box,
} from '@mui/material';
import { styled } from '@mui/system';
import { useMemo } from 'react';


// Helpers 

import { cleanDesignDataDesignPage, updateID2 } from '../../../../Helpers/RecursiveHelpers/addNewElementToSpecificElement';
import useFetchData from '../../../../Helpers/customHooks/useFetchData';
import { writeFilterObject } from '../../../../Helpers/filterData';


// services
import { addDesigns } from '../../../../Services/designService';
import { fetchWepPages } from '../../../../Services/WepPages';


// Component
import ModalDesignCategories from '../../components/ModalDesignCategories';
import { AdminMainButton } from '../../../../Components';



// PropTypes
import PropTypes from 'prop-types';


const StyledMainDrawerList = styled(Box)(() => ({
  marginTop : "40px"
}));

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
const MainDrawerList = ({parent_id}) => {


    const appliedFilter = useMemo(() => {
      return [
          writeFilterObject('web_project_id', 'string', '=', parent_id), 
      ]
  }, [parent_id])

    const { data } = useFetchData(fetchWepPages, 'all', appliedFilter, null, true, null, null, 10)



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

        

          const res = await addDesigns(sectionData);
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
                      selected_parent_id = {parent_id} 
                      NameOfCategories = {'component'}
                      ></ModalDesignCategories>
                    }
              />

    </StyledMainDrawerList>
  );
};

MainDrawerList.propTypes = {
  parent_id: PropTypes.string,
};


export default MainDrawerList;
