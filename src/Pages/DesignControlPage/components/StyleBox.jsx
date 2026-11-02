import { useMemo, useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { AdminMainButton } from '../../../Components/index.jsx';


import BorderColorIcon from '@mui/icons-material/BorderColor';

import UploadImageButton from '../../Admin/Components/UploadImageButton/UploadImageButton.jsx';
import PropTypes from 'prop-types'; 
import { ButtonStyle, ModalTitleStyle } from '../sections/EmptyDesign/StylesFunctions/SetStylesFunctions.js';
import useEffectFetchData from '../../../Helpers/customHooks/useEffectFetchData.jsx';
import { fetchUserElementProps } from '../../../Services/UserServices/Services/elementsPropsUsersService.js';
import PropElementValue from './PropElementValue.jsx';
import { useParams } from 'react-router-dom';

const StyledStyleBox = styled(Box)(
    () => ({
        borderRadius: '10px',
        boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;",
        padding: (theme) => theme.spacing(4),
        textAlign : 'center'
        })
);

const StyleBox = ({
    name_of_design,
    type_of_design,
    styleCategories,
    handleUploadImageClickWrapper,
    title,
    handleTextFieldChange,
    customState , 
    drawerStates,
    categoryState,
    elementDataSet , 
    sectionDataState,
}) => {
    const [dialogState , setDialogState] = customState;
    const [drawerState , setDrawerState] = drawerStates;
    const [image , setImage] = useState()
    const [category, setCategory] = categoryState;


    const handleOpenDrawer =  (category) => {
        setCategory(category);
        setDrawerState(true)
        setDialogState(false);
    }
    const params = useMemo(() => {
        return [
            
        ]
    }, [])

    const {data: elementProps, download} = useEffectFetchData(fetchUserElementProps, params, true, false);

        const DataFilter = elementProps?.filter(data => data?.element_types?.some(type => type.element_type_name === type_of_design))


    return (
        <StyledStyleBox>
            <Typography color = "text.default" sx = {ModalTitleStyle}>
                {name_of_design}
            </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                    <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', marginBottom: '20px'}}>

                        { 
                        styleCategories?.map((category , key) => (
                            <Box key = {key} 
                            >
                                <AdminMainButton 
                                sx={{...ButtonStyle ,width: '320px' , height : '50px' }} 
                                title={category.category_name} 
                                type='custom' 
                                drawerZIndex = {1300}
                                drawerWidth="350px"
                                putDrawerCloseButton 
                                appearance='primary'
                                icon={<BorderColorIcon />}
                                onClick={() => handleOpenDrawer(category)}

                            />
                            </Box>
                        ))}
                    </Box>
                        {
                        type_of_design !== "Image" ? 
                            <Box>
                                <TextField
                                    id="standard-number"
                                    label="Title"
                                    type="string"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                    value={title}
                                    onChange={handleTextFieldChange}
                                    sx = {{
                                        width: '900px'
                                    }}
                                    />
                                    {
                                        DataFilter?.map((prop , key) => {
                                            return   <PropElementValue 
                                            prop={prop} 
                                            key={key}  
                                            elementDataSet = {elementDataSet}
                                            sectionDataState = {sectionDataState}
                                            />
                                        })
                                    }

                            </Box>
                        
                        : <UploadImageButton 
                            imageState={[image , setImage]}
                            label={"image"}
                            customOnChange={handleUploadImageClickWrapper}
                        >
                        </UploadImageButton>
                    }


                </Box>
                    
            
        </StyledStyleBox>
    );
};


StyleBox.propTypes = {
    name_of_design: PropTypes.string.isRequired,
    type_of_design: PropTypes.string.isRequired,
    styleCategories: PropTypes.array,
    handleUploadImageClickWrapper: PropTypes.func,
    title: PropTypes.string,
    handleTextFieldChange: PropTypes.func,
};
export default StyleBox;
