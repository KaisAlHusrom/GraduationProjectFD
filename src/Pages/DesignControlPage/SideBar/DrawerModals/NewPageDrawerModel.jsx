//React
import {
    
} from 'react'

import {
    
} from 'react-redux'

//Components


//MUI
import {
    Box, Checkbox, MenuItem,
} from '@mui/material'
import { styled } from '@mui/system'
import CustomTextFiled from '../../../../Components/CustomTextFiled/CustomTextFiled'
import CustomSelectInput from '../../../../Components/CustomSelectInput/CustomSelectInput'
import CustomCheckBox from '../../../../Components/CustomCheckBox/CustomCheckBox'
import AdminMainButton from '../../../../Components/AdminMainButton/AdminMainButton'
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
//Styled Components
const StyledNewPageDrawerModel = styled(Box)(
    ({ theme }) => ({

    })
)

const customInputStyle = {
    display:'block',
    width:'200px',
    color:'red', 
    padding: '10px'
};

const customCheckBoxStyle = {
    display:'block',
    padding: '10px'
};

const NewPageDrawerModel = () => {

    return (
        <StyledNewPageDrawerModel>
            <Box sx={{display: "flex",flexWrap: "wrap",}}>
            <CustomTextFiled id="page-name" label="Page Name" variant="filled" />
            <CustomTextFiled id="page-url" label="Page Url" variant="filled" />
            </Box>
            <CustomSelectInput name ="root" className={customInputStyle}>
            <MenuItem value={10}>root</MenuItem>
            <MenuItem value={20}>Home Page</MenuItem>
            <MenuItem value={30}>About Us</MenuItem>
            </CustomSelectInput>
        
            <CustomCheckBox label="Add page to main navigation" control={<Checkbox />}  className={customCheckBoxStyle}></CustomCheckBox>
            <CustomCheckBox label="Add page to Footer" control={<Checkbox />}  className={customCheckBoxStyle}></CustomCheckBox>

            <AdminMainButton 
                title='Add Page'
                type='custom'
                sx={{
                    marginTop: '10px',
                    width: '100%',
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    color: 'white.main',
                    backgroundColor:'success.dark'
                }}
                icon={<DownloadDoneIcon />}

            />

        </StyledNewPageDrawerModel>
    );
};

export default NewPageDrawerModel;