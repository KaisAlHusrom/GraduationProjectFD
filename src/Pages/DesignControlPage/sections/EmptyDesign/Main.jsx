//React

import { useEffect, useMemo, useState } from 'react'

//Components
import EmptyTemplate from './EmptyTemplate'
import { EmptyTemplateSectionSet } from './UseContext/UserSetSections'
import AppbarCom from '../../components/AppbarCom'


//MUI
import {
    Box,
    Alert, AlertTitle,
} from '@mui/material'
import { styled , } from '@mui/system'
import { useColorMode, useScreenWidth } from './StylesFunctions/SetStylesFunctions'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { writeFilterObject } from '../../../../Helpers/filterData'
import { useSelector } from 'react-redux'
import { fetchUserWebProject, updateUserWebProject } from '../../../../Services/UserServices/Services/webProjectsUsersService'
import useFetchData from '../../../../Helpers/customHooks/useFetchData'
import { useParams } from 'react-router-dom'

//Styled Components
const StyledMain = styled(Box)(
    () => ({
        marginLeft : '100px',
        marginRight : '100px',
       
    })
)
const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&::before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
            theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&::after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
            theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
        },
        '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
        },
    }));




const Main = () => {
    const [EmptySection, setEmptySection] = useState(true)
    const valuesOfPages = {EmptySection, setEmptySection }
    
    const [selectedFontFamily, setSelectedFontFamily] = useState('');

    const handleFontFamilyClick = (fontFamily) => {
        setSelectedFontFamily(fontFamily);
    };

    const {
        isMobileWidth,
        isTabletWidth,
        isLaptopWidth,
        handleSmartphoneClick,
        handleTabletClick,
        handleLaptopClick,
    } = useScreenWidth();

    
    const user = useSelector(state => state.authSlice.user)
    const { id } = useParams();

    const appliedFilter = useMemo(() => {
        return [
            writeFilterObject('user_id', 'string', '=', user.id), 
            writeFilterObject('id', 'string', '=', id), 
        ]
        
    }, [id, user.id])


    const { data } = useFetchData(fetchUserWebProject, 'all', appliedFilter, null, true, null, null, 100);


    const { mode, toggleColorMode } = useColorMode();
    const [checked, setChecked] = useState(false); 

    useEffect(() => {
        if (data && data[0]?.is_published !== undefined) {
            setChecked(data[0].is_published); 
        }
    }, [data]);



    const handleChange = async (event) => {
            const isChecked = event.target.checked;
            setChecked(isChecked); 
            // Assuming data[0] is the correct object to update
            const willUpdate = { ...data[0] }; 
            willUpdate["is_published"] = isChecked ? 1 : 0; 
            willUpdate["project_title"] = "hello"
            delete willUpdate.pages; 
            console.log("willUpdate" , willUpdate)

            // Example function to update data in the backend
            const res =  await updateUserWebProject(id, willUpdate)
                console.log(res)
        };



    return (

        <EmptyTemplateSectionSet.Provider value={valuesOfPages}>
        <StyledMain>
            <AppbarCom
                    mode={mode}
                    toggleColorMode={toggleColorMode}
                    handleFontFamilyClick={handleFontFamilyClick}
                    handleSmartphoneClick={handleSmartphoneClick}
                    handleTabletClick={handleTabletClick}
                    handleLaptopClick={handleLaptopClick}
                />
        

                <Box sx = {{
                    marginTop : '100px',
                    }}>
                    
                    <Alert severity="info" sx={{
                        marginBottom  :'20px'
                    }}>
                        <AlertTitle>info</AlertTitle>
                        If you want to share your project, you have to publish it.
                        <FormGroup >
                        <FormControlLabel
                            control={<Android12Switch  sx={{ m: 1 }}  checked={checked} onChange={handleChange}/>}
                            label="Publish"
                        />
                    </FormGroup>
                        </Alert>
                        
                        </Box>

                        
                <EmptyTemplate  
                    selectedFontFamily={selectedFontFamily} 
                    isMobileWidth={isMobileWidth} 
                    isTabletWidth = {isTabletWidth} 
                    isLaptopWidth = {isLaptopWidth}
                />


        </StyledMain>
        </EmptyTemplateSectionSet.Provider>

    );
};

export default Main;