import { useMemo, useState } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import { styled } from '@mui/system';


// helpers 
import { transformElementTypeToDesignStructure } from '../../../../../../../Helpers/transformData';
import config from '../../../../../../../../Config.json'
import useFetchData from '../../../../../../../Helpers/customHooks/useFetchData';
import { writeFilterObject } from '../../../../../../../Helpers/filterData';


// services 


// component 
import CustomAlert from '../../../../../../../Components/CustomAlert/CustomAlert';



// mui

import { v4 as uuidv4 } from 'uuid';


// PropTypes
import PropTypes from 'prop-types';
import { fetchUserDesigns } from '../../../../../../../Services/UserServices/Services/designUsersService';
import { fetchUserElementTypes } from '../../../../../../../Services/UserServices/Services/elementsTypesUsersService';

const StyledDrawerSelectedCategoryDesigns = styled(Box)(
    ({ theme }) => ({
        backgroundColor: theme.palette.background.paper
    })
);


const boxStyle =  {
    padding: '10px 10px 0px',
    margin: '0px 10px',
    cursor: 'pointer',
    transition: 'all 0.5s ease',
    borderBottom: '1px solid transparent',
    '&:hover': {
        borderBottom: '1px solid',
        borderColor: 'white.main',
    },
    width: '100px'
}

const DrawerSelectedCategoryDesigns = ({ createDesignedDesign, design_category_id, appliedFilterType, selected_parent_id , isComponentInside }) => {



    const [alert, setAlert] = useState(false);

    let fetchFunction;
    let nameOfFunction ;
    if (appliedFilterType === "element" || appliedFilterType === "component" || appliedFilterType === "section" ) {
        fetchFunction = fetchUserDesigns;
        nameOfFunction = "fetchDesign";
    } else {
        fetchFunction = fetchUserElementTypes;
        nameOfFunction = "fetchElementTypesRows";

    }

    const appliedFilter = useMemo(() => {
        if (appliedFilterType === "element" || appliedFilterType === "component") {
            return [
                writeFilterObject('design_type', 'string', '=', appliedFilterType),
                writeFilterObject('category_id', 'string', '=', design_category_id),
                writeFilterObject('is_template', 'bool', '=', "true"),

            ];
        } else if (appliedFilterType === "section") {
            return [
            writeFilterObject('design_type', 'string', '=', appliedFilterType),
            writeFilterObject('category_id', 'string', '=', design_category_id),
            writeFilterObject('is_template', 'bool', '=', "true"),
        ];
        } else {
            return [
                writeFilterObject('category_id', 'string', '=', appliedFilterType),

            ];
        }
    }, [design_category_id, appliedFilterType]);


    const {  data } = useFetchData(fetchFunction, 'all', appliedFilter, null, true, null, null, 10);

    


    const handleBoxClick = (componentDesign) => {
        if (componentDesign.design_type === "element") {
            const newElement = { ...componentDesign, id: uuidv4() , is_template : 0 , is_child : 1, parent_id :selected_parent_id };
            setAlert(true);
            createDesignedDesign(selected_parent_id, newElement);
        } else if(componentDesign.design_type === "component"){
            const newComponent = { ...componentDesign, id: uuidv4(), is_template : 0 , is_child : 1  , parent_id :selected_parent_id };
            setAlert(true);
            if(isComponentInside){
                console.log("isCompoenntInside")
                createDesignedDesign(selected_parent_id, newComponent);
            }else{
                console.log("newComponent")
                createDesignedDesign(newComponent);
            }
        }else if(componentDesign.design_type === "section"){
            const newSection = { ...componentDesign, id: uuidv4(), is_template : 0 , is_child : 1 };
            setAlert(true);
            createDesignedDesign(newSection);
        }
    };

    const createDesign = (elementDesign ) => {
        const  transformedTemplateData = transformElementTypeToDesignStructure(elementDesign, null, "element"); 
        createDesignedDesign(selected_parent_id, transformedTemplateData);
    }


    return (
        <StyledDrawerSelectedCategoryDesigns>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
            }}>
                {data && data.length > 0 ? data.map((componentDesign, key) => (
                    <Box key = {key}>
                        {nameOfFunction === "fetchDesign" && (
                            <Box
                                onClick={() => handleBoxClick(componentDesign)}
                                sx={boxStyle}
                            >
                                <img
                                    src={`${config.ServerImageRoute}/DesignsImages/${componentDesign.design_image}`}
                                    alt={`${componentDesign.design_title}`}
                                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                />
                                
                                <Typography>{componentDesign.element_type_name}</Typography>
                            </Box>
                        )}
                        {nameOfFunction === "fetchElementTypesRows" && (
                            <Box 
                            onClick = {()=> createDesign(componentDesign) }
                            sx={boxStyle}

                            >

                                <img
                                    src={`${config.ServerImageRoute}/ElementTypesImages/${componentDesign.element_type_image}`}
                                    alt={`${componentDesign.design_title}`}
                                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                />

                                <Typography>{componentDesign.element_type_name}</Typography>
                            </Box>
                        )}
                    </Box>
                )) : Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} sx={{ width: '90%', height: '300px' }} />
                ))}
            </Box>
            <CustomAlert AlertOpenState={[alert, setAlert]} title={"The Component has been added successfully"} />
        </StyledDrawerSelectedCategoryDesigns>
    );
    
};

DrawerSelectedCategoryDesigns.propTypes = {
    createDesignedDesign: PropTypes.func,
    design_category_id: PropTypes.string,
    appliedFilterType: PropTypes.string,
    selected_parent_id: PropTypes.string,
};


export default DrawerSelectedCategoryDesigns;



