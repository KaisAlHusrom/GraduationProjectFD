import {
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react';
import propTypes from 'prop-types';

// Components
import * as utils from '../StylesFunctions/SetStylesFunctions.js';
import { AdminMainButton, AdminMainButtonOutsideState, CustomDrawer } from '../../../../../Components/index.jsx';
import StyleBox from '../../../components/StyleBox.jsx';
import { GenerateTagEdit } from '../../../components/GenerateTagEdit .jsx';
import StylesCategory from './Drawers/DrawersNew/StylesCategory.jsx';


// Helpers 
import { addStyleAbdullah } from '../../../../../Helpers/RecursiveHelpers/styles.js';
// MUI
import {
    Box,
} from '@mui/material';
import { styled } from '@mui/system';
import { Edit as EditIcon } from '@mui/icons-material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditComponent from './EditComponent.jsx';
import CreateComponent from './Modals/CreateComponent.jsx';



// Styled Components
const StyledEditElement = styled(Box)(({ elementstyle }) => ({
    '&:hover > div': {
        opacity: 1,
        visibility: 'visible',
    },
    ...elementstyle,
}));

const TooltipContainer = styled(Box)({
    position: 'relative',
    opacity: 0,
    transition: 'opacity 1s ease',
    zIndex: 999,
});

const buttonStyle = {
    width: '20px',
    height: '0px',
    border: '1px solid red',
    padding: '10px 15px',
    fontWeight: 'bold',
    color: 'white.main',
    backgroundColor: '#062c06',
    transition: 'background-color 0.3s',
    marginBottom: '2px',
    '&:hover': {
        backgroundColor: 'rgb(7, 15, 43)',
    },
};

const EditElement = ({ 
    element, deleteElementForComponent, componentId, handleMoveElement, componentDataState, styleCategories, sectionDataState ,
    elements , handleAddNewElement

}) => {

    const [elementData, setElementData] = useState(element);
    const [componentData, setComponentData] = componentDataState;
    const [title, setTitle] = useState(elementData.element_content);
    const [sectionData, setSectionData] = sectionDataState;
    const [elementStyle, setElementStyle] = useState({});
    const [history, setHistory] = useState([]);
    const [dialogState , setDialogState] = useState(false)
    const [drawerState , setDrawerState] = useState(false);
    const [category , setCategory] = useState(null)

    useEffect(() => {
        setElementData(element);
    }, [element]);


    useMemo(() => {
        const dictionary = {};
        if (element.styles) {
            element.styles.forEach((cssProp) => {
                const { style_prop, style_prop_value } = cssProp;
                if (style_prop?.is_element) {
                    dictionary[style_prop.style_prop_css_name] = style_prop_value;
                }
            });
        }
        setElementStyle(dictionary);
    }, [element.styles]);


    const handleSectionStyleChange = useCallback((cssValue, prop) => {
        setComponentData((prevData) => {
            const updatedSectionData = { ...prevData }; // Update with a copy
            const changed = addStyleAbdullah(updatedSectionData, [element.id], prop, cssValue, null, null);
            if (changed) {
                // Update componentStyle on style change
                const dictionary = {};
                if (element.styles) {
                    element.styles.forEach((cssProp) => {
                        const { style_prop, style_prop_value } = cssProp;
                        if (style_prop?.is_element) {
                            dictionary[style_prop.style_prop_css_name] = style_prop_value;
                        }
                    });
                }
                setElementStyle(dictionary);
            }
            return updatedSectionData;
        });
        setHistory(prevHistory => [...prevHistory, JSON.parse(JSON.stringify(sectionData))]);
    }, [element.id, element.styles, sectionData, setComponentData]);


    const handleTextFieldChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setElementData((prevData) => {
            const updatedElementData = { ...prevData, element_content: newTitle };
            return updatedElementData;
        });

        setSectionData((prevSectionData) => {
            const updatedSectionData = { ...prevSectionData };
            updatedSectionData.children = updatedSectionData.children.map(component => {
                if (component.id === componentId) {
                    return {
                        ...component,
                        children: component.children.map(child => {
                            if (child.id === elementData.id) {
                                return { ...child, element_content: newTitle };
                            }
                            return child;
                        })
                    };
                }
                return component;
            });
            return updatedSectionData;
        });
    };

    const handleImageChangeWrapper = (file) => {
        utils.handleImageChange(file, setTitle);
    };

    const handleUploadImageClickWrapper = (e) => {
        utils.handleUploadImageClick(e, handleImageChangeWrapper);
        setSectionData((prevSectionData) => {
            const updatedSectionData = { ...prevSectionData };
            updatedSectionData.children = updatedSectionData.children.map(component => {
                if (component.id === componentId) {
                    return {
                        ...component,
                        children: component.children.map(child => {
                            if (child.id === elementData.id) {
                                return { ...child, element_content: title };
                            }
                            return child;
                        })
                    };
                }
                return component;
            });
            return updatedSectionData;
        });
    };

    const handleDeleteLogoClick = () => {
        utils.handleDeleteLogoClick(setTitle);
    };

    const handleDeleteElementClick = () => {
        deleteElementForComponent(componentId, elementData.id);
    };
    const handleOrderElementClick = (event, direction, sequence_number) => {
        event.stopPropagation();
        const elementsCount = componentData.children.length;
        const currentSequenceNumber = sequence_number; // Elementin mevcut sıra numarasını kullan
        let newIndex;
    
        if (direction === 'up') {
            newIndex = Math.max(currentSequenceNumber - 1, 0); // Yukarı hareket için yeni index
        } else {
            newIndex = Math.min(currentSequenceNumber + 1, elementsCount - 1); // Aşağı hareket için yeni index
        }
    
        // Elemanların sırasını güncelle
        handleMoveElement(currentSequenceNumber, newIndex, componentId);
    };
    
    
    

    return (
        <StyledEditElement>
            {
                elementData.design_type === 'element' ? (
                    <GenerateTagEdit selectedTemplate={elementData} elementStyle={elementStyle}></GenerateTagEdit>

                ): (
                    <CreateComponent 
                    key={elementData.id} 
                    component={elementData} 
                    componentId={elementData.id}
                    handleAddNewElement={handleAddNewElement} 
                    elements={elements}
                    sectionDataState={[sectionData, setSectionData]}
                    styleCategories={styleCategories}
                />
                ) 
            }
            <TooltipContainer>
                <div style={{ position: 'absolute', height: '50px', flexWrap: 'wrap', right: '-50px', top: '0', display: 'flex', flexDirection: 'column' }}>
                    <AdminMainButtonOutsideState
                        title=""
                        type="StyleDialog"
                        appearance="iconButton"
                        putTooltip
                        icon={<EditIcon />}
                        customState = {[dialogState , setDialogState]}

                        willShow={
                            <StyleBox
                                customState = {[dialogState, setDialogState]}
                                drawerStates = {[drawerState , setDrawerState]}
                                categoryState={[category, setCategory]}
                                name_of_design={"Style Element"}
                                title={title}
                                handleTextFieldChange={handleTextFieldChange}
                                type_of_design={element?.element_type?.element_type_name}
                                handleSectionStyleChange={handleSectionStyleChange}
                                handleDeleteLogoClick={handleDeleteLogoClick}
                                handleUploadImageClickWrapper={handleUploadImageClickWrapper}
                                styleCategories={styleCategories}
                            />
                        }
                        sx={buttonStyle}
                    />
                        <CustomDrawer
                                drawerOpenState={[drawerState , setDrawerState]}
                                title={"Style Element"}
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
                                />

                        </CustomDrawer>
                    <AdminMainButton
                        title=""
                        type="custom"
                        appearance="iconButton"
                        putTooltip
                        icon={<DeleteSweepIcon />}
                        onClick={handleDeleteElementClick}
                        sx={{
                            width: '20px',
                            height: '0px',
                            border: '1px solid red',
                            padding: '10px 15px',
                            fontWeight: 'bold',
                            color: 'white.main',
                            backgroundColor: 'warning.dark',
                            transition: 'background-color 0.3s',
                            marginBottom: '2px',
                            '&:hover': {
                                backgroundColor: 'rgb(7, 15, 43)',
                            },
                        }}
                    />
                    <AdminMainButton
                        title=""
                        type="custom"
                        appearance="iconButton"
                        putTooltip
                        icon={<KeyboardArrowUpIcon />}
                        onClick={(e) => handleOrderElementClick(e, 'up', elementData.sequence_number)}
                        sx={buttonStyle}
                    />
                    <AdminMainButton
                        title=""
                        type="custom"
                        appearance="iconButton"
                        putTooltip
                        icon={<KeyboardArrowDownIcon />}
                        onClick={(e) => handleOrderElementClick(e, 'down', elementData.sequence_number )}
                        sx={buttonStyle}
                    />

                </div>
            </TooltipContainer>
        </StyledEditElement>
    );
};

EditElement.propTypes = {
    element: propTypes.object,
    deleteElementForComponent: propTypes.func,
    handleMoveElement: propTypes.func,
    componentDataState: propTypes.array,
    componentId: propTypes.string,
    styleCategories: propTypes.array,
    sectionDataState: propTypes.array,
};

export default EditElement;
