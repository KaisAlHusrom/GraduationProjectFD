

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
export const Radius = [
    "0",
    "5",
    "10",
    "15",
    "20",
    "25",
    "30",
    "30",
    "40",
    "50",
    "60",
    "80",
    "100",
]
export const FontSize = [
    "16",
    "18",
    "20",
    "22",
    "24",
    "26",
    "28",
    "30",
    "32",
    "34",
    "36",
]
export const FontWight = [
    "700" , 
    "900", 
    "500",
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