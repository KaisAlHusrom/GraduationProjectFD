import { useCallback, useMemo, useState, useEffect } from 'react';
import { Box, Typography , Skeleton } from '@mui/material';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import {  fetchUserPages, updateUserPages } from '../../../../Services/UserServices/Services/pagesUsersService';
import { writeFilterObject } from '../../../../Helpers/filterData';
import useFetchData from '../../../../Helpers/customHooks/useFetchData';
import CustomizedAccordions from '../../components/AccordionComponent';
import CustomTextField from '../../../../Components/CustomTextField/CustomTextField';
import { AdminMainButton } from '../../../../Components';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddNewPage from '../DrawerModals/AddNewPage';
import config from '../../../.././../Config.json'

const StyledHomeDrawerList = styled(Box)(
    ({ theme }) => ({
        color: theme.palette.success.main,
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    })
);

const ButtonStyle = {
    marginTop: "20px",
    width: '100%',
    maxWidth: '420px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#eee',
    backgroundColor : "success.dark",
    fontWeight: 'bold',
    '&:hover' : {
        backgroundColor: 'warning'
        },
    boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
};


const textFiledBoxStyle = {
    marginBottom: '10px',
    borderColor :'red',
    width :"270px",

}

const HomeDrawerList = ({ WepProject_id }) => {
    const [pageData, setPageData] = useState([]);
    const [uploadedImagePage, setUploadedImagePage] = useState(null);

    const appliedFilter = useMemo(() => [
        writeFilterObject('web_project_id', 'string', '=', WepProject_id),
    ], [WepProject_id]);

    const { loading, data } = useFetchData(fetchUserPages, 'all', appliedFilter, null, true, null, null, 100);

    useEffect(() => {
        if (data) {
            const initialPageData = {};
            data.forEach(item => {
                initialPageData[item.id] = {
                    page_id : item.id,
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
            // If empty, set the value to an empty string or any default value
            // In this case, let's set it to an empty space to ensure there's always at least one character
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


    const handleUpdatePageData = async(newPageData) => {
        try {
            if (newPageData && newPageData.hasOwnProperty('page_id')) {
                if (!newPageData.title || !newPageData.description || !newPageData.path) {
                    console.error('Error: All fields must be filled out.');
                }else {
                    const willUpadate = data?.filter((item) => {
                        return item.id === newPageData.page_id;
                    })[0]
                    willUpadate.page_title = newPageData.title;
                    willUpadate.page_description = newPageData.description;
                    willUpadate.page_path = newPageData.path;
                    willUpadate.page_image = uploadedImagePage;
                    delete willUpadate.designs
                    console.log(willUpadate)
                    console.log("newPageData.page_id",newPageData.page_id)
                    const res = await updateUserPages(newPageData.page_id , willUpadate)
                }
  
            }

        }catch(error){
            console.error('Error submitting page:', error);
        }

    }

    


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
                    required = {true}
                    value={pageData[item.id]?.title || item.page_title}
                    label="Page Title"
                    onChange={handleFieldChange(item.id, 'title')}
                    TextFiledStyle={textFiledBoxStyle}
                    labelStyle = {{
                        fontWeight: '900',
                    }}
                    inputStyle = {{
                        fontWeight: '700',
                    }}
                />
                <CustomTextField 
                    id={item.id}
                    required = {true}
                    TextFiledStyle={textFiledBoxStyle}
                    value={pageData[item.id]?.description || item.page_description}
                    label="Page Description"
                    onChange={handleFieldChange(item.id, 'description')}
                    BoxStyle={{ marginTop: '10px' , width: '100%' }}
                    labelStyle = {{
                        fontWeight: '900',
                    }}
                    inputStyle = {{
                        fontWeight: '700',
                    }}
                />
                <CustomTextField 
                    id={item.id}
                    TextFiledStyle={textFiledBoxStyle}
                    labelStyle = {{
                        fontWeight: '900',
                    }}
                    inputStyle = {{
                        fontWeight: '700',
                    }}
                    value={pageData[item.id]?.path || item.page_path}
                    required = {true}
                    label="Page Path"
                    onChange={handleFieldChange(item.id, 'path')}
                    BoxStyle={{ marginTop: '10px' }}
                />
                {item.page_image && (
                    <Box sx={{ marginTop: '10px' }}>
                            <img
                                    src={`${config.ServerImageRoute}/Web_Pages_image/${item.page_image}`}
                                    alt={`${item.page_title}`}
                                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                />
                        <AdminMainButton
                            sx={ButtonStyle}
                            title='Upload Image'
                            type='custom'
                            appearance='primary'
                            icon={<AddCircleOutlineIcon />}
                            onClick={handleUploadImageClick(item.id , setUploadedImagePage)}
                        />
                    </Box>
                )}
                <AdminMainButton
                sx={ButtonStyle}
                title='Update'
                type='custom'
                appearance='primary'
                onClick={() => handleUpdatePageData(pageData[item.id])} // Pass the specific page data and item ID
            />

            </Box>
        ),
    })) : [];



    return (
        <StyledHomeDrawerList>
            <Typography
                variant="h5"
                component="div"
                sx={{
                    paddingBottom : '5px',
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
                sx={{...ButtonStyle , 
                    backgroundColor : "success.dark",
                    borderRadius :'5px',
                    width: '200px',
                    '&:hover' : {
                        backgroundColor: 'warning'
                        },
                }}
                title='Add New Page'
                type='StyleDialog'
                appearance='primary'
                icon={<AddCircleOutlineIcon />}
                willShow={
                    <AddNewPage WepProject_id = {WepProject_id}/>
                }
                        />
        </StyledHomeDrawerList>
    );
};

HomeDrawerList.propTypes = {
    WepProject_id: PropTypes.string,
};

export default HomeDrawerList;
