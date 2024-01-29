// utils.js

  export const opacity = [
    0,
    0.1,
    0.2,
    0.3,
    0.4,
    0.5,
    0.6,
    0.7,
    0.8,
    0.9,
    1,
  ]
  export const Radius = [
  0,
  5,
  10,
  15,
  20,
  25,
  30,
  30,
  40,
  50,
  60,
  80,
  100,
  ]
  export const FontSize = [
  16,
  18,
  20,
  22,
  24,
  26,
  28,
  30,
  32,
  34,
  36,
  ]
  export const FontWight = [
  700 , 
  900, 
  500,
  ]


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


  // upload images 

  export const handleImagesChange = (file, setSelectedImages) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImages((prevImages) => [...prevImages, imageUrl]);
    }
  };



  export const handleUploadImagesClick = (setSelectedImages) => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*';
    inputElement.multiple = true; // Allow multiple image selection
    inputElement.onchange = (e) => {
      const files = Array.from(e.target.files);
      setSelectedImages((prevImages) => [...prevImages, ...files.map(file => URL.createObjectURL(file))]);
    };
    inputElement.click();
  };

  export const handleDeleteImagesClick = (setSelectedImages) => {
    setSelectedImages([]);
  };


