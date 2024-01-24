// utils.js


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
  
  export const handleOpacityChange = (event, setSelectedOpacity) => {
    const newOpacity = parseFloat(event.target.value);
    setSelectedOpacity(newOpacity);
  };
  
  export const handleRadiusChange = (event, setSelectedRadius) => {
    const newRadius = parseFloat(event.target.value);
    setSelectedRadius(newRadius);
  };
  
  export const handleFontSizeChange = (event, setSelectedFontSize) => {
    const newFontSize = parseFloat(event.target.value);
    setSelectedFontSize(newFontSize);
  };
  
  export const handleFontWeightChange = (event, setSelectedFontWeight) => {
    const newFontWeight = parseFloat(event.target.value);
    setSelectedFontWeight(newFontWeight);
  };
  

  // colorUtils.js

export const handleColorSelect = (color, setCurrentColor) => {
  setCurrentColor(color);
};


export const handleColorChange = (color, setCurrentColor) => {
  setCurrentColor(color.hex);
};

export const generateRandomColor = (setCurrentColor) => {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  setCurrentColor(randomColor);
};


// backgroundUtils.js

export const handleBackgroundColor = (color, setBackGroundColor) => {
  setBackGroundColor(color);
};

export const handleBackgroundColorDelete = (setBackGroundColor) => {
  setBackGroundColor("");
};


export const handleTextHeaderChange = (e, setTextOfHeader) => {
  setTextOfHeader(e.target.value);
};