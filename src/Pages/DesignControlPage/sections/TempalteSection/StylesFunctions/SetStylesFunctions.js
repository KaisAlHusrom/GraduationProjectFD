

export const opacity = [
    "0",
    "0.1",
    "0.2",
    "0.3",
    "0.4",
    "0.5",
    "0.6",
    "0.7",
    "0.8",
    "0.9",
    "1",
]
export const borderRadius = [
    "0px",
    "5px",
    "10px",
    "15px",
    "20px",
    "25px",
    "30px",
    "30px",
    "40px",
    "50px",
    "60px",
    "80px",
    "100px",
]
export const fontSize = [
    "16px",
    "18px",
    "20px",
    "22px",
    "24px",
    "26px",
    "28px",
    "30px",
    "32px",
    "34px",
    "36px",
]
export const fontWeight = [
    "700" , 
    "900", 
    "500",
]
export const display = [
    "flex" ,
]
export const flexDirection = [
    "row" , 
    "column", 
]
export const alignItems = [
    "start" , 
    "center", 
    "end" , 
]
export const justifyContent = [
    "start" , 
    "center", 
    "end" , 
]
export const textAlign = [
    "start" , 
    "center", 
    "end" , 
]
export const width = [
    "auto",
    "25%" , 
    "30%" , 
    "50%", 
    "75%",
    "85%",
    "100%"
]
export const height = [
    'auto',
    '10vh',
    "20vh" , 
    "30vh" , 
    "40vh", 
    "50vh" , 
    "60vh" , 
    "70vh", 
    "80vh",
    "100vh"
]


export const handleOpacityChange = (setElementStyle) => (newOpacity) => {
    setElementStyle((prevDictionary) => ({
        ...prevDictionary,
        opacity: newOpacity,
    }));
};

export const handleFontSizeChange = (setElementStyle) => (newFontSize) => {
    setElementStyle((prevDictionary) => ({
        ...prevDictionary,
        fontSize: newFontSize,
    }));
};

export const handleFontWeightChange = (setElementStyle) => (newFontWeight) => {
    setElementStyle((prevDictionary) => ({
        ...prevDictionary,
        fontWeight: newFontWeight,
    }));
};


export const handleColorChange = (setElementStyle) => (newColor) => {
    setElementStyle((prevDictionary) => ({
        ...prevDictionary,
        color: newColor,
    }));
};

export const handleBackGroundColorChange = (setElementStyle) => (newColor) => {
    setElementStyle((prevDictionary) => ({
        ...prevDictionary,
        backgroundColor: newColor,
    }));
};


export const handleBorderRadiusChange = (setElementStyle) => (newBorderRadius) => {
    setElementStyle((prevDictionary) => ({
        ...prevDictionary,
        borderRadius: newBorderRadius,
    }));
};

export const handleUploadImageClick = (handleImageChange) => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*';
    inputElement.onchange = (e) => {
        const file = e.target.files[0];
        handleImageChange(file);
    };
    inputElement.click();
};

export const handleImageChange = (file, setSelectedImage) => {
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
    }
    };
export const handleDeleteLogoClick = (setSelectedImage) => {
    // Implement the logic to delete the logo, for example, set selectedImages to null
    setSelectedImage(null);
};