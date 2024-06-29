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

}) => {

    const [elementData, setElementData] = useState(element);
    const [componentData, setComponentData] = componentDataState;
    const [title, setTitle] = useState(elementData.element_content);
    const [sectionData, setSectionData] = sectionDataState;
    const [elementStyle, setElementStyle] = useState({});
    const [props, setProps] = useState({});

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
            const updatedSectionData = { ...componentData }; // Make a copy of componentData
            const changed = addStyleAbdullah(updatedSectionData, [element.id], prop, cssValue, null, null);
            
            if (changed) {
                const updatedElement = updatedSectionData.children.find(el => el.id === element.id);
                const dictionary = {};
                if (updatedElement.styles) {
                    updatedElement.styles.forEach((cssProp) => {
                        const { style_prop, style_prop_value } = cssProp;
                        if (style_prop?.is_element) {
                            dictionary[style_prop.style_prop_css_name] = style_prop_value;
                        }
                    });
                }
    
                // Update elementStyle state immediately after updating componentData
                setElementStyle(dictionary);
            }
    
            return updatedSectionData;
        });
    
        // Ensure sectionData history is updated correctly
        setHistory(prevHistory => [...prevHistory, JSON.parse(JSON.stringify(sectionData))]);
    
    }, [setComponentData, componentData, element.id, sectionData]);
    

    const handleTextFieldChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle); // Update the local state 'title'
    
        setSectionData((prevSectionData) => {
            const updatedSectionData = { ...prevSectionData };
            // Helper function to recursively update child elements
            const updateChildElements = (currentChildren) => {
                return currentChildren.map(component => {
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
                    } else if (component.children) {
                        // Recursively update nested children
                        return {
                            ...component,
                            children: updateChildElements(component.children)
                        };
                    }
                    return component;
                });
            };
    
            // Update the structure of updatedSectionData recursively
            updatedSectionData.children = updateChildElements(updatedSectionData.children);
    
            return updatedSectionData;
        });
    };
    


 const handleImageChangeWrapper = (fileData, file) => {
        if (fileData) {
            setTitle(fileData);
            // Additionally, you can store the file or any other necessary information
        }
    };

    const handleUploadImageClickWrapper = (e) => {
        utils.handleUploadImageClick(e, handleImageChangeWrapper);
        setSectionData((prevSectionData) => {
            const updatedSectionData = { ...prevSectionData };
            // Helper function to recursively update child elements with image content
            const updateChildContentWithImage = (currentChildren) => {
                return currentChildren.map(component => {
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
                    } else if (component.children) {
                        // Recursively update nested children
                        return {
                            ...component,
                            children: updateChildContentWithImage(component.children)
                        };
                    }
                    return component;
                });
            };

            // Update the structure of updatedSectionData recursively
            updatedSectionData.children = updateChildContentWithImage(updatedSectionData.children);

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
    



            
        // Function to generate default props based on element_prop_name
        const generateDefaultProps = (designProps) => {
            return designProps.reduce((acc, prop) => {
                if (prop.element_prop.element_prop_name === 'to') {
                    acc['to'] = prop.design_prop_value;
                }
                if (prop.element_prop.element_prop_name === 'href') {
                    acc['href'] = prop.design_prop_value;
                }
                return acc;
            }, {});
        };

        const propsValues = useMemo(() => {
            return generateDefaultProps(element.design_prop_values || []);
        }, [element.design_prop_values]);

        useEffect(() => {
            setProps(propsValues);
        }, [propsValues]);




    return (
        <StyledEditElement>
            {
                elementData.design_type === 'element' ? (
                    <GenerateTagEdit 
                    selectedTemplate={elementData} 
                    elementStyle={elementStyle} 
                    propsValues = {props}
                    ></GenerateTagEdit>

                ): (
                    null
                    // <CreateComponent 
                    // key={elementData.id} 
                    // component={elementData} 
                    // componentId={elementData.id}
                    // handleAddNewElement={handleAddNewElement} 
                    // elements={elements}
                    // sectionDataState={[sectionData, setSectionData]}
                    // styleCategories={styleCategories}
                // />
                ) 
            }
            <TooltipContainer>
                <div style={{ position: 'absolute', height: '50px', flexWrap: 'wrap', right: '-50px', top: '0', display: 'flex', flexDirection: 'column' }}>
                    <AdminMainButtonOutsideState
                        title="edİt"
                        type="StyleDialog"
                        appearance="iconButton"
                        putTooltip
                        icon={<EditIcon />}
                        customState = {[dialogState , setDialogState]}

                        willShow={
                            <StyleBox
                                elementDataSet =  { [elementData, setElementData]}
                                sectionDataState = {sectionDataState}
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
                                props={props}
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
                                sectionStyle={elementStyle}

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
