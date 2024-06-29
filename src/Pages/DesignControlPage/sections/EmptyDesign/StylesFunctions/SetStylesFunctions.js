import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeMode } from '../../../../../Redux/Slices/modeSlice';

// Custom Hook for Screen Width Management
export const useScreenWidth = () => {
    const [isMobileWidth, setIsMobileWidth] = useState(false);
    const [isTabletWidth, setIsTabletWidth] = useState(false);
    const [isLaptopWidth, setIsLaptopWidth] = useState(true);

    const handleSmartphoneClick = () => {
        setIsMobileWidth(true);
        setIsTabletWidth(false);
        setIsLaptopWidth(false);
    };

    const handleTabletClick = () => {
        setIsTabletWidth(true);
        setIsMobileWidth(false);
        setIsLaptopWidth(false);
    };

    const handleLaptopClick = () => {
        setIsTabletWidth(false);
        setIsMobileWidth(false);
        setIsLaptopWidth(true);
    };

    return {
        isMobileWidth,
        isTabletWidth,
        isLaptopWidth,
        handleSmartphoneClick,
        handleTabletClick,
        handleLaptopClick,
    };
};

// Custom Hook for Color Mode Toggle
export const useColorMode = () => {
    const mode = useSelector(state => state.modeSlice.mode);
    const dispatch = useDispatch();

    const toggleColorMode = () => {
        if (mode === 'dark') {
            dispatch(changeMode({ mode: 'light' }));
        } else {
            dispatch(changeMode({ mode: 'dark' }));
        }
    };

    return { mode, toggleColorMode };
};

// Image Handling Functions
export const handleUploadImageClick = (e, handleImageChange) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            handleImageChange(event.target.result, file);
        };
        reader.readAsDataURL(file);
    }
};


export const handleImageChange = (fileData, setSelectedImage) => {
    if (fileData) {
        setSelectedImage(fileData);
    }
};

export const handleDeleteLogoClick = (setSelectedImage) => {
    setSelectedImage(null);
};




export const ButtonStyle = {
    marginTop: "20px",
    width: '90%',
    maxWidth: '420px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#eee',
    marginLeft:'10px',
    backgroundColor : "success.dark",
    fontWeight: 'bold',
    transition : 'all 0.5s ease-in-out',
    borderRadius : '5px',
    borderLeft : '5px solid ', 
    borderLeftColor : 'text.primary', 
    '&:hover': {
    backgroundColor: "white.main",
    color : 'black',
    boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
},
    boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
};

export const TextFiledStyle = {
    borderLeft : '5px solid ',
    borderLeftColor : 'text.default',
    borderRadius : '10px',
    marginBottom: '10px',
    marginTop : '10px',
    width :"270px",
    
}


export const ModalTitleStyle = {
    color : 'text.default',
    fontWeight: 'bold',
    alignItems: 'center', 
    fontSize : '20px',               
    margin : 'auto',
    width : '100%',
    padding : '10px',
    borderBottom: '3px solid',
    borderColor : 'success.main',
    borderWidth  :'fit-content',
    backgroundColor : '#96ac9624',
    borderRadius : '5px',
    boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px",

}



import { v4 as uuidv4 } from 'uuid';
import { addStyleAbdullah } from '../../../../../Helpers/RecursiveHelpers/styles.js';
import { cleanDesignDataDesignPage } from '../../../../../Helpers/RecursiveHelpers/addNewElementToSpecificElement.js';

export const generateNewIdsForChildren = (component) => {
    const newComponent = { ...component, id: uuidv4() };
    if (newComponent.children && newComponent.children.length > 0) {
        newComponent.children = newComponent.children.map(child => generateNewIdsForChildren(child));
    }
    return newComponent;
};

export const handleSectionStyleChange = (setData, section_id) => (cssValue, prop) => {
    setData((prevData) => {
        const updatedSectionData = { ...prevData }; // Kopya alarak güncelleme yap
        addStyleAbdullah(updatedSectionData, [section_id], prop, cssValue, null, null);
        return updatedSectionData;
    });
};

export const manageComponent = (setSectionData, setHistory, sectionData) => ({
    addComponentForComponent: (section_component_id) => {
        setSectionData((prevData) => {
            const index = prevData.children.findIndex(component => component.id === section_component_id);
            if (index !== -1) {
                const newComponent = generateNewIdsForChildren(prevData.children[index]);
                newComponent.sequence_number = prevData.children.length > 0 
                    ? Math.max(...prevData.children.map(component => component.sequence_number)) + 1 
                    : 1;
                const updatedComponents = [...prevData.children, newComponent].sort((a, b) => a.sequence_number - b.sequence_number);
                setHistory(prevHistory => [...prevHistory, prevData]);
                return { ...prevData, children: updatedComponents };
            }
            return prevData;
        });
    },

    deleteComponentForComponent: (section_component_id) => {
        setSectionData((prevData) => {
            const index = prevData.children.findIndex(component => component.id === section_component_id);
            if (index !== -1) {
                const updatedComponents = [...prevData.children];
                updatedComponents.splice(index, 1);
                const sortedComponents = updatedComponents.sort((a, b) => a.sequence_number - b.sequence_number);
                setHistory(prevHistory => [...prevHistory, prevData]);
                return { ...prevData, children: sortedComponents };
            }
            return prevData;
        });
    },

    createDesignedComponent: (component) => {
        let maxSequenceNumber = 0;
        sectionData.children.forEach(existingComponent => {
            if (existingComponent.sequence_number > maxSequenceNumber) {
                maxSequenceNumber = existingComponent.sequence_number;
            }
        });
        component.sequence_number = maxSequenceNumber + 1;
        setData((prevData) => {
            const updatedComponents = prevData && Array.isArray(prevData.children) 
                ? [...prevData.children, component] 
                : [component];
            return { ...prevData, children: updatedComponents };
        });
        setHistory(prevHistory => [...prevHistory, sectionData]);
    },

    handleAddNewElement: (setData) => (componentId, element) => {
        setData((prevData) => ({
            ...prevData,
            children: prevData.children.map((component) => {
                if (component.id === componentId) {
                    const maxSequenceNumber = component.children.length > 0 
                        ? Math.max(...component.children.map(child => child.sequence_number)) 
                        : 0;
                    const newElement = { ...element, sequence_number: maxSequenceNumber + 1 };
                    return { ...component, children: [...component.children, newElement] };
                }
                return component;
            }),
        }));
    },

    deleteSection: (setSectionData, setHistory, sectionData) => {
        setSectionData(prevData => ({ ...prevData, children: [] }));
        setHistory(prevHistory => [...prevHistory, sectionData]);
    },

    deleteComponentElements: (section_component_id) => {
        const index = sectionData.children.findIndex(component => component.id === section_component_id);
        if (index !== -1) {
            setSectionData((prevData) => {
                const updatedComponents = [...prevData.children];
                updatedComponents[index].children = [];
                return { ...prevData, children: updatedComponents };
            });
        }
    },
});

export const undo = (setData, history, setHistory) => {
    if (history.length > 0) {
        const previousState = history[history.length - 1];
        setData(previousState);
        setHistory(prevHistory => prevHistory.slice(0, -1));
    }
};

export const saveSectionData = async (section_id, sectionData, updateUserDesigns) => {
    cleanDesignDataDesignPage(sectionData);
    await updateUserDesigns(section_id, sectionData);
    window.location.reload();
};



    

