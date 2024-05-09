

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
    "grid",
    "block"
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


export const width = Array.from({ length: 96 }, (_, index) => index === 0 ? "auto" : `${50 + index * 10}px`);

export const height = Array.from({ length: 96 }, (_, index) => index === 0 ? "auto" : `${50 + index * 10}px`);



export const border = [
    'All', 
    "Right",
    "Left",
    "Top"

]
export const borderSize = [
    '0.5px', 
    "1px",
    "1.5px",
    "2px",
    "3px",
    "4px",
    "5px",
    "6px",
    "7px",

]
export const borderType = [
    'solid', 
    "dotted",
    "dashed",
    "double",
    "groove",
    "inset",
    "outset",
    "none",
]
export const borderColor = [
    'black', 
    "red",
    "green",

]
export const borders = {
    "border": {
        "border0": "none",
        "border1": "12px solid #ff0000",
        "border2": "2px dotted #00ff00",
        "border3": "3px dashed #0000ff",
        "border4": "1px double #ff00ff",
        "border5": "2px solid #ffff00",
        "border6": "3px dotted #ff8000",
        "border7": "1px dashed #00ff00",
        "border8": "2px double #00ffff",
        "border9": "3px solid #800080",
        "border10": "1px dotted #008080",
        "border11": "2px solid #ff0000",
        "border12": "2px dotted #00ff00",
        "border13": "3px dashed #0000ff",
        "border14": "1px double #ff00ff",
        "border15": "2px solid #ffff00"
        },
        "borderTop": {
            "border0": "none",
            "border1": "12px solid #ff0000",
            "border2": "2px dotted #00ff00",
            "border3": "3px dashed #0000ff",
            "border4": "1px double #ff00ff",
            "border5": "2px solid #ffff00",
            "border6": "3px dotted #ff8000",
            "border7": "1px dashed #00ff00",
            "border8": "2px double #00ffff",
            "border9": "3px solid #800080",
            "border10": "1px dotted #008080",
            "border11": "2px solid #ff0000",
            "border12": "2px dotted #00ff00",
            "border13": "3px dashed #0000ff",
            "border14": "1px double #ff00ff",
            "border15": "2px solid #ffff00"
        },
        "borderRight": {
            "border0": "none",
            "border1": "1px solid #ffff00",
            "border2": "2px dotted #ff00ff",
            "border3": "3px dashed #00ffff",
            "border4": "1px double #800080",
            "border5": "2px solid #808080",
            "border6": "3px dotted #800000",
            "border7": "1px dashed #008000",
            "border8": "2px double #000080",
            "border9": "3px solid #ff0000",
            "border10": "1px dotted #00ff00",
            "border11": "2px solid #ff0000",
            "border12": "2px dotted #00ff00",
            "border13": "3px dashed #0000ff",
            "border14": "1px double #ff00ff",
            "border15": "2px solid #ffff00"
        },
        "borderBottom": {
            "border0": "none",
            "border1": "1px solid #ff8000",
            "border2": "2px dotted #0080ff",
            "border3": "3px dashed #8000ff",
            "border4": "1px double #808080",
            "border5": "2px solid #ff0000",
            "border6": "3px dotted #00ff00",
            "border7": "1px dashed #ff8000",
            "border8": "2px double #0080ff",
            "border9": "3px solid #8000ff",
            "border10": "1px dotted #808080",
            "border11": "2px solid #ff0000",
            "border12": "2px dotted #00ff00",
            "border13": "3px dashed #0000ff",
            "border14": "1px double #ff00ff",
            "border15": "2px solid #ffff00"
        },
        "borderLeft": {
            "border0": "none",
            "border1": "1px solid #808080",
            "border2": "2px dotted #800000",
            "border3": "3px dashed #008000",
            "border4": "1px double #000080",
            "border5": "2px solid #ff8000",
            "border6": "3px dotted #0080ff",
            "border7": "1px dashed #8000ff",
            "border8": "2px double #808080",
            "border9": "3px solid #ff00ff",
            "border10": "1px dotted #00ffff",
            "border11": "2px solid #ff0000",
            "border12": "2px dotted #00ff00",
            "border13": "3px dashed #0000ff",
            "border14": "1px double #ff00ff",
            "border15": "2px solid #ffff00"
        }
}
export const margins = {
    "margin": Array.from({ length: 21 }, (_, index) => index === 0 ? "auto" : index === 1 ? "0px" : `${(index - 1) * 5}px`),
    "marginTop": Array.from({ length: 21 }, (_, index) => index === 0 ? "auto" : index === 1 ? "0px" : `${(index - 1) * 5}px`),
    "marginRight": Array.from({ length: 21 }, (_, index) => index === 0 ? "auto" : index === 1 ? "0px" : `${(index - 1) * 5}px`),
    "marginBottom": Array.from({ length: 21 }, (_, index) => index === 0 ? "auto" : index === 1 ? "0px" : `${(index - 1) * 5}px`),
    "marginLeft": Array.from({ length: 21 }, (_, index) => index === 0 ? "auto" : index === 1 ? "0px" : `${(index - 1) * 5}px`),
};

export const paddings = {
    "padding": Array.from({ length: 21 }, (_, index) => index === 0 ? "auto" : index === 1 ? "0px" : `${(index - 1) * 5}px`),
    "paddingTop": Array.from({ length: 21 }, (_, index) => index === 0 ? "auto" : index === 1 ? "0px" : `${(index - 1) * 5}px`),
    "paddingRight": Array.from({ length: 21 }, (_, index) => index === 0 ? "auto" : index === 1 ? "0px" : `${(index - 1) * 5}px`),
    "paddingBottom": Array.from({ length: 21 }, (_, index) => index === 0 ? "auto" : index === 1 ? "0px" : `${(index - 1) * 5}px`),
    "paddingLeft": Array.from({ length: 21 }, (_, index) => index === 0 ? "auto" : index === 1 ? "0px" : `${(index - 1) * 5}px`),
};





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



export const undo = (setComponentData, setSectionData, setHistory, history, isEditingComponent) => {
    if (history.length > 0) {
        const previousState = history[history.length - 1];
        // Eğer bir bileşen üzerindeyseniz, bileşen durumunu geri alın
        if (isEditingComponent) {
            setComponentData(previousState);
        } else {
            // EditPage bileşenindeyseniz, sayfa durumunu geri alın
            setSectionData(previousState);
        }
        // Geçmişten son işlemi kaldırın
        setHistory(prevHistory => prevHistory.slice(0, -1));
    }
};



//  edit page 

