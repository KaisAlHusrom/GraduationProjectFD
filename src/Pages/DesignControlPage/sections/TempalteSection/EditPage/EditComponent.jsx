//React
import { useEffect, useMemo, useState } from 'react'

import {
    
} from 'react-redux'

//Components
import EditElement from './EditElement'
import { AdminMainButton } from '../../../../../Components'
import StyleBox from '../components/StyleBox.jsx';

//propTypes 
import propTypes from 'prop-types'
//MUI
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/system'
import { Edit as EditIcon } from '@mui/icons-material';
import UndoIcon from '@mui/icons-material/Undo';


//Styled Components
const StyledEditComponent = styled(Box)(() => ({
    '&  div': {
        border: 'none'
    },    '&:hover > div': {
        opacity: 1, // Show the TooltipContainers when StyledEditComponent is hovered
        visibility: 'visible',
    },
}));

const TooltipContainer = styled(Box)({
    position: 'absolute',
    top: '0',
    left: '0',
    opacity: 0, // Initially set opacity to 0
    visibility: 'hidden', // Initially hide the TooltipContainer
    transition: 'opacity 1s ease', // Apply transition effect to opacity
});
const EditButtonsStyle = {
    border: '1px solid red',
    padding: '10px 15px',
    fontWeight: 'bold',
    color: 'white.main',
    backgroundColor: '#021402',
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: 'rgb(7, 15, 43)',
    },
}


const EditComponent = ({component , handleAddNewElement , elements ,  componentId}) => {

    const [componentStyle, setComponentStyle] = useState({});  // using for control the component style 

    const [componentData, setComponentData] = useState(component); // using for control the component data

    const [AddElement ] = elements   // using for add the elements to component when user is did 
    const [history, setHistory] = useState([]); // Kullanıcının yaptığı işlemleri saklayacak dizi

    // add element to component 
    useEffect(() => {
        if (AddElement && componentId === component.id) {
            handleAddNewElement(setComponentData)
            setHistory(prevHistory => [...prevHistory, componentData]);

        }
    }, [AddElement, handleAddNewElement])


    useEffect(() => {
        setComponentData(component)
    }, [component])

    useMemo(() => {
        const dictionary = {};
        if (component.styles) {
            component.styles.forEach((cssProp) => {
                const { style_prop, style_prop_value } = cssProp;
                if (style_prop.is_component) {
                    dictionary[style_prop.style_prop_css_name] = style_prop_value;
                }
            });
        }
        setComponentStyle(dictionary);
    }, [component.styles]);

    // to change the component style 
    const handleSectionStyleChange = (newStyle) => {
        setComponentStyle((prevStyle) => ({ ...prevStyle, ...newStyle }));
    };

    // to delete the element from component
    const deleteElementForComponent = (Component_id, element__id) => {
        setComponentData((prevData) => {
            if (prevData.id === Component_id) {
                const updatedElements = prevData.children.filter(element => element.id !== element__id);
                return {
                ...prevData,
                children: updatedElements,
                };
            } else {
                return prevData;
            }
            });
            setHistory(prevHistory => [...prevHistory, componentData]);

    };

    const reorderElements = (children, oldIndex, newIndex) => {
        const reorderedElements = [...children];
        const movedElement = reorderedElements.splice(oldIndex, 1)[0];
        reorderedElements.splice(newIndex, 0, movedElement);
        return reorderedElements;
    };
    
    const handleMoveElement = (oldIndex, newIndex) => {
        const reorderedElements = reorderElements(componentData.children, oldIndex, newIndex);
        // Yeni sıralama ile güncellenmiş öğeleri alıp, her bir öğeye sequenceNumber'ı güncelleyerek yeni diziyi oluşturuyoruz
        const updatedElements = reorderedElements.map((element, index) => ({
            ...element,
            sequenceNumber: index + 1, // Sequence number'ı 1'den başlayarak güncelliyoruz
        }));
        setComponentData((prevData) => ({
            ...prevData,
            children: updatedElements,
        }));
        setHistory(prevHistory => [...prevHistory, componentData]);

    };

    // undo last operation for the component 
    const undo = () => {
        if (history.length > 0) {
            // Önceki durumu alın
            const previousState = history[history.length - 1];
            // Önceki durumu geri yükle
            setComponentData(previousState);
            // Son işlemi işlem geçmişinden kaldır
            setHistory(prevHistory => prevHistory.slice(0, -1));
        }
    };

    return (
        <StyledEditComponent sx={componentStyle}>
            {componentData.children
                // Elemanları sequenceNumber özelliğine göre sırala
                .sort((a, b) => a.sequenceNumber - b.sequenceNumber)
                .map((element, i) => (
                    <Box key={`${component.id}-${element.id}-${i}`}>
                        <EditElement
                            element={element}
                            deleteElementForComponent={deleteElementForComponent}
                            componentId={component.id}
                            handleMoveElement={handleMoveElement} 
                            componentData={componentData}
                        />
                    </Box>
                ))}

            <TooltipContainer>
                <AdminMainButton
                    title="Edit"
                    type="StyleDialog"
                    appearance="iconButton"
                    putTooltip
                    icon={<EditIcon />}
                    willShow={
                        <StyleBox
                            Section_Name={"Style Component"}
                            element_Type='Component'
                            sectionStyle={componentStyle}
                            handleSectionStyleChange={handleSectionStyleChange}
                            styleProperties={['opacity', 'borderRadius', 'display', 'flexDirection', 'alignItems', 'width', 'height']}
                        />
                    }
                    sx={EditButtonsStyle}
                />
            </TooltipContainer>

            {history.length > 0 && (
                <AdminMainButton
                    title="Undo"
                    type="custom"
                    appearance="iconButton"
                    putTooltip
                    icon={<UndoIcon />}
                    onClick={undo}
                    sx={EditButtonsStyle}
                />
            )}
        </StyledEditComponent>
    );
    
};

EditComponent.propTypes = {
    component: propTypes.object,
    handleAddNewElement : propTypes.func,
    componentId : propTypes.object,
    elements : propTypes.array

}



export default EditComponent;

