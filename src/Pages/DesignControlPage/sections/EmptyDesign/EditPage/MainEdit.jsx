//React
import { useCallback, useEffect, useMemo, useState } from 'react'

import {
    
} from 'react-redux'
import { useParams } from 'react-router-dom'

//Components
import { AdminMainButton, AdminMainButtonOutsideState, CustomDrawer } from '../../../../../Components'
import StyleBox from '../../../components/StyleBox'
import StylesCategory from './Drawers/DrawersNew/StylesCategory'
import ModalDesignCategories from '../../../components/ModalDesignCategories'
import DrawerSelectedCategoryDesigns from './Drawers/ReadyDesign/DrawerSelectedCategoryDesigns'
import AppbarCom from '../../../components/AppbarCom'
//MUI
import {
    Box,
    Alert, AlertTitle,
} from '@mui/material'
import { styled } from '@mui/system'
import ListAltIcon from '@mui/icons-material/ListAlt';
import UndoIcon from '@mui/icons-material/Undo';
import { Edit as EditIcon } from '@mui/icons-material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import SaveIcon from '@mui/icons-material/Save';

// Helpers 
import useEffectFetchData from '../../../../../Helpers/customHooks/useEffectFetchData'
import { writeFilterObject } from '../../../../../Helpers/filterData'
import { addStyleAbdullah } from '../../../../../Helpers/RecursiveHelpers/styles'
import { cleanDesignDataDesignPage } from '../../../../../Helpers/RecursiveHelpers/addNewElementToSpecificElement'
import { useColorMode, useScreenWidth } from '../StylesFunctions/SetStylesFunctions'

// Services 
import { fetchSpecificUserDesign, updateUserDesigns } from '../../../../../Services/UserServices/Services/designUsersService'
import EditPage from './EditPage'
import { fetchUserStylePropCategories } from '../../../../../Services/UserServices/Services/stylesPropsCategoriesUsersService'

//Styled Components
const StyledMainEdit = styled(Box)(
    ({ theme }) => ({
        padding: theme.spacing(8),
    minHeight :'100vh',
    position: 'relative',
    })
)


const TooltipContainer = styled(Box)({
    position: 'relative',
    top: "-20px", 
    left: 0,
    opacity: 0, // Initially set opacity to 0
    visibility: 'hidden', // Initially hide the TooltipContainer
    transition: 'opacity 1s ease', // Apply transition effect to opacity
});

const EditButtonsStyle = {
    border: '1px solid red',
    fontWeight: 'bold',
    color: 'white.main',
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: 'rgb(7, 15, 43)',
    },

}

const HoverBox = styled(Box)({
    '&:hover .action-buttons': {
        opacity: 1,
        visibility: 'visible',
    },
    '&:hover > div': {
        opacity: 1, // Show the TooltipContainers when StyledEditComponent is hovered
        visibility: 'visible',
    },
});

const MainEdit = () => {

    const { section_id } = useParams();
    // for section 
    const [dialogState , setDialogState] = useState(false)
    const [drawerState , setDrawerState] = useState(false);
    const [category , setCategory] = useState(null)
    const [history, setHistory] = useState([]); // Kullanıcının yaptığı işlemleri saklayacak dizi
    const [sectionStyle, setSectionStyle] = useState({}); // using for changing the section style 

    const [dialogDesignState , setDialogDesignState] = useState(false)
    const [drawerDesignState , setDrawerDesignState] = useState(false);
    const [design , setDesign] = useState(null)
    const [styleCategories, setStyleCategories] = useState(null)





    useEffect(() => {
        const fetchStyleCategories = async () => {
            const {rows} = await fetchUserStylePropCategories(null, null, null, null, null, 100)
            setStyleCategories(() => rows)
        }

        fetchStyleCategories()
    }, [])
    const appliedFilterForComponent = useMemo(() => {
        return [
            writeFilterObject('design_type', 'string', '=', 'component'), 
        ];
    }, []);

    const params = useMemo(()=> {
        return [section_id]  
    } , [section_id])


    const { data ,setData} = useEffectFetchData(fetchSpecificUserDesign , params , true , true )

    const appliedFilterForSections = useMemo(() => {
        return [
            writeFilterObject('design_type', 'string', '=', 'section'), 
        ];
    }, []);

     // change the section style
     const handleSectionStyleChange = useCallback((cssValue, prop) => {
        setData((prevData) => {
            const updatedSectionData = { ...prevData }; // Kopya alarak güncelleme yap

            const changed = addStyleAbdullah(updatedSectionData, [section_id], prop, cssValue, null, null);

            return updatedSectionData;
        });
    }, [section_id, setData]);
    const createDesignedComponent = (component) => {
        // Yeni bileşenin sequence_number değerini belirlemek için mevcut bileşenleri kontrol et
        let maxSequenceNumber = 0;
        data.children.forEach(existingComponent => {
            if (existingComponent.sequence_number > maxSequenceNumber) {
                maxSequenceNumber = existingComponent.sequence_number;
            }
        });
    
        // Yeni bileşenin sequence_number değeri mevcut en yüksek sequence_number değerinden 1 fazla olmalı
        component.sequence_number = maxSequenceNumber + 1;
    
        // State'i güncelle ve yeni bileşeni ekle
        setData((prevData) => {
            const updatedComponents = prevData && Array.isArray(prevData.children) 
                ? [...prevData.children, component] 
                : [component];
            
            return {
                ...prevData,
                children: updatedComponents,
            };
        });
    
        setHistory(prevHistory => [...prevHistory, data]);
    };


    // delete the all component in the section 
    const deleteSection = () => {
        setData(prevData => ({
            ...prevData,
            children: [] // Set section_components to an empty array
        }));
        setHistory(prevHistory => [...prevHistory, data]);

    };

           // create new section 
    const createNewSection = (SectionsDesigns) => {
        setData(SectionsDesigns)
        if (SectionsDesigns && SectionsDesigns.styles) {
            const dictionary = {};
            SectionsDesigns.styles.forEach((cssProp) => {
                const {  style_prop, style_prop_value } = cssProp;
                if (style_prop.is_section) {
                    dictionary[style_prop.style_prop_css_name] = style_prop_value;
                }
            });
            setSectionStyle(dictionary);
        }
        setHistory(prevHistory => [...prevHistory, data]);

    };

    // undo last operation for the section 
    const undo = () => {
        if (history.length > 0) {
            // Önceki durumu alın
            const previousState = history[history.length - 1];
            // Önceki durumu geri yükle
            
            setData(previousState);
            // Son işlemi işlem geçmişinden kaldır
            setHistory(prevHistory => prevHistory.slice(0, -1));
        }
    };

    const SaveSectionData = async () => {
        cleanDesignDataDesignPage(data);
        const res = await updateUserDesigns(section_id, data);
        window.location.reload();
    };

    const {
        isMobileWidth,
        isTabletWidth,
        isLaptopWidth,
        handleSmartphoneClick,
        handleTabletClick,
        handleLaptopClick,
    } = useScreenWidth();

    const { mode, toggleColorMode } = useColorMode();

    //  get the section style
    useEffect(() => {
    if (data) {
        const dictionary = {};

        if (data.styles) {
            data.styles.forEach((cssProp) => {
            const { style_prop, style_prop_value } = cssProp;
            if (style_prop?.is_section) {
                dictionary[style_prop.style_prop_css_name] = style_prop_value;
            }
        });
        }
    setSectionStyle(dictionary);
    }
    }, [data]);

   
    return (
        <StyledMainEdit>
            <AppbarCom
                    isEditPage = {true}
                    mode={mode}
                    toggleColorMode={toggleColorMode}
                    handleSmartphoneClick={handleSmartphoneClick}
                    handleTabletClick={handleTabletClick}
                    handleLaptopClick={handleLaptopClick}
                /> 
            <AdminMainButton
                title="Save"
                type="custom"
                onClick={()=> SaveSectionData()}
                appearance="primary"
                putTooltip                                
                icon={<SaveIcon />}
                sx={{
                    fontWeight: '900',
                    borderRadius : '5pxpx',
                    color: 'rgb(25, 17, 5)',
                    backgroundColor: 'rgb(255, 221, 173)',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                        backgroundColor: 'rgb(25, 17, 5)',
                        color : 'rgb(255, 221, 173)'
                    },
                    position: 'absolute',
                    right: '100px',
                    marginTop: '20px',
                }}
            />
            <Alert severity="warning" sx={{
                marginBottom  :'20px'
            }}>
                <AlertTitle>Warning</AlertTitle>
                Don't forget to click on the Save button
                </Alert>
            
            <HoverBox key={section_id} sx={{ 
                width: isMobileWidth ? '500px' : isTabletWidth ? '50%' : isLaptopWidth ? '100%' : '',
                padding: isMobileWidth ? '0px' : isTabletWidth ? '0px' : '',
                margin: '100px auto',
            }}>

                <TooltipContainer>  
                        <Box sx = {{
                            width :'250px',
                            display : 'flex',
                            justifyContent : 'space-between',
                            alignItems : 'center',
                        }}>
                            <AdminMainButtonOutsideState
                                customState = {[dialogState , setDialogState]}
                                title="Edit Section"
                                type="StyleDialog"
                                appearance="iconButton"
                                putTooltip
                                icon={<EditIcon />}
                                willShow={
                                    <StyleBox 
                                        customState = {[dialogState, setDialogState]}
                                        drawerStates = {[drawerState , setDrawerState]}
                                        categoryState={[category, setCategory]}
                                        name_of_design="Style Section"
                                        type_of_design='section'
                                        styleCategories={styleCategories}
                                        sectionStyleProps={sectionStyle}
                                        />
                                }
                                sx={{    backgroundColor: 'success.dark',...EditButtonsStyle}}
                            />  
                            <CustomDrawer
                                    drawerOpenState={[drawerState , setDrawerState]}
                                    title={"Style Section"}
                                    drawerStyle={{
                                    paddingTop : '80px'
                                    }}
                                    putDrawerCloseButton={true}
                                    anchor={"left"}
                            >
                                <StylesCategory  
                                    customState = {[dialogState , setDialogState]}
                                    handleSectionStyleChange = {handleSectionStyleChange} 
                                    category = {{category}} 
                                    sectionStyle = {sectionStyle}
                                    />

                            </CustomDrawer>

                                <AdminMainButton
                                    title="Delete All Component"
                                    type="custom"
                                    appearance="iconButton"
                                    putTooltip
                                    onClick={() => deleteSection(section_id)}
                                    icon={<DeleteSweepIcon />}
                                    sx={{
                                        backgroundColor: 'warning.dark', ...EditButtonsStyle
                                    }}

                                />
                            <AdminMainButtonOutsideState
                                customState={[dialogDesignState , setDialogDesignState]}
                                title="Add Components"
                                type="StyleDialog"
                                appearance="iconButton"
                                putTooltip
                                icon={<AddBoxIcon />}
                                willShow={
                                    <ModalDesignCategories  
                                    customState = {[dialogDesignState, setDialogDesignState]}
                                    drawerStates = {[drawerDesignState , setDrawerDesignState]}
                                    designState={[design, setDesign]}
                                    createDesignedDesign = {createDesignedComponent}
                                    appliedFilter = {appliedFilterForComponent}
                                    selected_parent_id = {section_id} 
                                    NameOfCategories = {'Component Designs'}
                                    ></ModalDesignCategories>
                                    }
                                    sx={{ backgroundColor: 'success.dark',...EditButtonsStyle}}

                            />
                            <CustomDrawer
                                    drawerOpenState={[drawerDesignState , setDrawerDesignState]}
                                    title={"Component Designs"}
                                    drawerStyle={{
                                    paddingTop : '80px'
                                    }}
                                    putDrawerCloseButton={true}
                                    anchor={"left"}
                            >
                        <DrawerSelectedCategoryDesigns
                                design_category_id={design?.id}
                                createDesignedDesign={createDesignedComponent}
                                appliedFilterType={design?.design_type}
                                selected_parent_id={section_id}  
                                
                                />
                                            
                            </CustomDrawer>

                            
                            <AdminMainButton
                                title="Create New Section"
                                    type="StyleDialog"
                                    appearance="iconButton"
                                    putTooltip
                                    icon={<ListAltIcon />}
                                    willShow={
                                        <ModalDesignCategories  
                                        createDesignedDesign = {createNewSection} 
                                        appliedFilter = {appliedFilterForSections}
                                        NameOfCategories = {'Section Designs'}

                                        ></ModalDesignCategories>

                                    }
                                    sx={{ backgroundColor: 'success.dark',...EditButtonsStyle}}
                                    />

                            {history.length > 0 && (
                                    <AdminMainButton
                                    title="Undo"
                                    type="custom"
                                    appearance="iconButton"
                                    putTooltip
                                    icon={<UndoIcon />}
                                    onClick={undo}
                                    sx={EditButtonsStyle}
                                    
                                    />)}
                        </Box> 
                    
                </TooltipContainer>

                <EditPage 
                        data = {data}
                        setData = {setData}
                        sectionStyle = {sectionStyle}
                    />


            </HoverBox>
        </StyledMainEdit>
    );
};

export default MainEdit;