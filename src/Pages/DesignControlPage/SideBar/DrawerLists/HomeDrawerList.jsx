import { useCallback, useMemo, useState, useEffect } from 'react';

// COMPONENT
import CustomizedAccordions from '../../components/AccordionComponent';
import CustomTextField from '../../../../Components/CustomTextField/CustomTextField';
import { AdminMainButton } from '../../../../Components';
import AddNewPage from '../DrawerModals/AddNewPage';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { ButtonStyle, TextFiledStyle } from '../../sections/EmptyDesign/StylesFunctions/SetStylesFunctions';


// HELPERS
import { writeFilterObject } from '../../../../Helpers/filterData';
import useFetchData from '../../../../Helpers/customHooks/useFetchData';
import config from '../../../.././../Config.json'


// SERVICES 
import {  deleteUserPages, fetchUserPages, updateUserPages } from '../../../../Services/UserServices/Services/pagesUsersService';


// MUI 
import { Box, Typography , Skeleton } from '@mui/material';
import { styled } from '@mui/system';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const StyledHomeDrawerList = styled(Box)(({ theme }) => ({
    color: theme.palette.success.main,
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}));


function removeLeadingSlash(path) {
    if (path.startsWith('/')) {
        return path.slice(1);
    }
    return path;
}

const HomeDrawerList = ({ WepProject_id }) => {

    const navigate = useNavigate()
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [selectedPageIdToDelete, setSelectedPageIdToDelete] = useState(null);

    const [pageData, setPageData] = useState([]);
    const [uploadedImagePage, setUploadedImagePage] = useState(null);

    const handleConfirmation = (page_id) => {
        setSelectedPageIdToDelete(page_id);
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

    const handleUploadImageClick = useCallback((id, setter) => () => {
        const inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.accept = 'image/*';
        inputElement.onchange = (e) => {
            const file = e.target.files[0];
            setter(file);
        };
        inputElement.click();
    }, []);


    const handleNavigate = (pagePath) => {
        
        navigate(removeLeadingSlash(pagePath));
        window.location.reload();
    }

    
    
    useEffect(() => {
        if (data) {
            const initialPageData = {};
            data.forEach(item => {
                initialPageData[item.id] = {
                    page_id: item.id,
                    title: item.page_title,
                    description: item.page_description,
                    image: item.page_image,
                    path: item.page_path,
                };
            });
            setPageData(initialPageData);
        }
    }, [data]);

    const handleFieldChange = useCallback((id, field) => (value) => {
        if (value.trim() === '') {
            value = ' ';
        }
        setPageData((prevData) => ({
            ...prevData,
            [id]: {
                ...prevData[id],
                [field]: value,
            },
        }));
    }, []);
    
    const handleUpdatePageData = async (newPageData) => {
        try {
            if (newPageData && newPageData.hasOwnProperty('page_id')) {
                if (!newPageData.title || !newPageData.description || !newPageData.path) {
                    console.error('Error: All fields must be filled out.');
                } else {
                    const willUpdate = data?.filter((item) => item.id === newPageData.page_id)[0];
                    willUpdate.page_title = newPageData.title;
                    willUpdate.page_description = newPageData.description;
                    willUpdate.page_path = newPageData.path;
                    willUpdate.page_image = uploadedImagePage;
                    delete willUpdate.designs;
                    const res = await updateUserPages(newPageData.page_id, willUpdate);
                }
            }
        } catch (error) {
            console.error('Error submitting page:', error);
        }
    };

    const DeleteUserPage = async () => {
        const res = await deleteUserPages([selectedPageIdToDelete]);
        if (res.success) {
            closeConfirmationDialog();
            setData((prev) => prev.filter(page => page.id !== selectedPageIdToDelete));
        }
    };

    // to reset the data when user add new page 
    const handleNewPageAdded = (newPage) => {
        setData((prevData) => [...prevData, newPage]);
    };

    const panels = data ? data.map(item => ({
        id: item.id,
        title: item.page_title,
        content: (
            <Box sx={{
                width: '270px',
                borderTop: '1px solid',
                borderColor: 'text.primary',
                paddingTop: '20px',
            }}>
                <CustomTextField
                    id={item.id}
                    required={true}
                    value={pageData[item.id]?.title || item.page_title}
                    label="Page Title"
                    onChange={handleFieldChange(item.id, 'title')}
                    TextFiledStyle={TextFiledStyle}
                    labelStyle={{ fontWeight: '900' }}
                    inputStyle={{ fontWeight: '700' }}
                />
                <CustomTextField
                    id={item.id}
                    required={true}
                    TextFiledStyle={TextFiledStyle}
                    value={pageData[item.id]?.description || item.page_description}
                    label="Page Description"
                    onChange={handleFieldChange(item.id, 'description')}
                    BoxStyle={{ marginTop: '10px', width: '100%' }}
                    labelStyle={{ fontWeight: '900' }}
                    inputStyle={{ fontWeight: '700' }}
                />
                <CustomTextField
                    id={item.id}
                    TextFiledStyle={TextFiledStyle}
                    labelStyle={{ fontWeight: '900' }}
                    inputStyle={{ fontWeight: '700' }}
                    value={pageData[item.id]?.path || item.page_path}
                    required={true}
                    label="Page Path"
                    onChange={handleFieldChange(item.id, 'path')}
                    BoxStyle={{ marginTop: '10px' }}
                />
                {item.page_image && (
                    <Box sx={{ marginTop: '10px', margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <img
                            src={`${config.ServerImageRoute}/Web_Pages_image/${item.page_image}`}
                            alt={`${item.page_title}`}
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', borderRadius: '10px' }}
                        />
                        
                    </Box>
                )}
                <Box sx = {{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    marginTop: '10px',
                    marginBottom: '10px',
                }}>
                    <AdminMainButton
                    sx={{ ...ButtonStyle, width: '50px' }}
                    title='Upload Image'
                    type='custom'
                    appearance='iconButton'
                    icon={<CloudUploadIcon />}
                    putTooltip
                    onClick={handleUploadImageClick(item.id, setUploadedImagePage)}
                    />
                    <AdminMainButton
                        sx={{ ...ButtonStyle, width: '50px' }}
                        title='Update'
                        type='custom'
                        appearance='iconButton'
                        putTooltip
                        icon={<RefreshIcon />}

                        onClick={() => handleUpdatePageData(pageData[item.id])} // Pass the specific page data and item ID
                    />
                    <AdminMainButton
                        sx={{...ButtonStyle , width : '50px' , backgroundColor: 'warning.dark' }}
                        title='Delete'
                        type='custom'
                        putTooltip
                        appearance='iconButton'
                        icon={<DeleteIcon />}
                        onClick={() => handleConfirmation(item.id)}
                    />
                    <AdminMainButton
                    sx={{...ButtonStyle , width : '50px' , backgroundColor: 'success.dark' }}
                    title='Go Page'
                    type='custom'
                    putTooltip
                    appearance='iconButton'
                    icon={<ArrowForwardIcon />}
                    onClick={() => handleNavigate(item.page_path)}
                />
                {/* <AdminMainButton
                        sx={{...ButtonStyle , width : '50px' , backgroundColor: 'success.dark' }}
                        title='Add To Nav'
                        type='custom'
                        putTooltip
                        appearance='iconButton'
                        icon={<ArrowForwardIcon />}
                        onClick={() => handleNavigate(item.page_path)}
                    /> */}


            </Box>

            </Box>
        ),
    })) : [];

    return (
        <StyledHomeDrawerList>
            <Typography
                variant="h5"
                component="div"
                sx={{
                    paddingBottom: '5px',
                    color: 'text.primary',
                    textAlign: 'center',
                    width: 'fit-content',
                    borderBottom: '1px solid',
                    borderColor: 'success.dark',
                    borderWidth: 'fit-content',
                }}
            >
                Control Your Project Pages
            </Typography>
            {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} sx={{ width: '300px', height: '100px' }} />
                ))
            ) : <CustomizedAccordions panels={panels} />
            }
            <AdminMainButton
                sx={ButtonStyle}
                title='Add New Page'
                type='StyleDialog'
                appearance='primary'
                icon={<AddCircleOutlineIcon />}
                willShow={<AddNewPage WepProject_id={WepProject_id} onPageAdded={handleNewPageAdded} />}
            />
            <ConfirmationDialog
                open={confirmationDialogOpen}
                onClose={closeConfirmationDialog}
                onConfirm={DeleteUserPage}
            />
        </StyledHomeDrawerList>
    );
};

HomeDrawerList.propTypes = {
    WepProject_id: PropTypes.string.isRequired,
};

export default HomeDrawerList;