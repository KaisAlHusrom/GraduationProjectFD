import { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { AdminMainButton } from '../../../Components/index.jsx';


import BorderColorIcon from '@mui/icons-material/BorderColor';

import StylesCategory from '../sections/EmptyDesign/EditPage/Drawers/DrawersNew/StylesCategory.jsx';
import UploadImageButton from '../../Admin/Components/UploadImageButton/UploadImageButton.jsx';
import PropTypes from 'prop-types'; // Proptypes ekledik

const StyledStyleBox = styled(Box)({
    borderRadius: '10px',
    boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;",
    padding: (theme) => theme.spacing(4),
});



const CategoryButtonStyle = {
    marginTop: '20px',
    marginBottom: '20px',
    width: '300px',
    display: 'flex',
    flexWrap:'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#eee',
    backgroundColor: '#092635',

    fontWeight:'bold',
    boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
}

const StyleBox = ({
    name_of_design,
    type_of_design,
    handleSectionStyleChange,
    styleCategories,
    handleUploadImageClickWrapper,
    title,
    handleTextFieldChange,
    sectionStyleProps

}) => {
    const [image , setImage] = useState()
    return (
        <StyledStyleBox>
            <Typography component="div" variant='h3' sx={{ textAlign: 'center', padding: '10px', color: 'white.dark', fontWeight: 'bold', borderBottom: '1px solid #eee' }}>
                {name_of_design}
            </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                    <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center', }}>

                        { 
                        styleCategories.map((category , key) => (
                            <Box key = {key} 
                            >
                                <AdminMainButton 
                                sx={CategoryButtonStyle} 
                                title={category.category_name} 
                                type='drawer' 
                                drawerZIndex = {1300}
                                drawerWidth="350px"
                                putDrawerCloseButton 
                                appearance='primary'
                                icon={<BorderColorIcon />}
                                willShow={
                                <StylesCategory  
                                handleSectionStyleChange = {handleSectionStyleChange} 
                                category = {{category}} 
                                sectionStyleProps = {sectionStyleProps}
                                />
                            }
                            />
                            </Box>
                        ))}
                    </Box>
                        {
                        type_of_design !== "Image" ? 
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
    handleSectionStyleChange: PropTypes.func.isRequired,
    styleCategories: PropTypes.array,
    handleUploadImageClickWrapper: PropTypes.func,
    title: PropTypes.string,
    handleTextFieldChange: PropTypes.func,
    sectionStyleProps: PropTypes.object,
};
export default StyleBox;
