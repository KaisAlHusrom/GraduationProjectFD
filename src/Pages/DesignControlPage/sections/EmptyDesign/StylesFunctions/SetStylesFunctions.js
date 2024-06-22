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

