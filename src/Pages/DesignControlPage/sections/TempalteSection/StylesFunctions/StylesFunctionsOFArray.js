// textUtils.js

export const handleTextFieldChangeArray = (index, setTemporaryText, prevText) => (e) => {
    setTemporaryText((prevText) => {
      const newText = [...prevText];
      newText[index] = { ...newText[index], text: e.target.value };
      return newText;
    });
  };
  
  export const handleOpacityChangeArray = (index, setTemporaryText, prevText) => (event) => {
    const newOpacity = parseFloat(event.target.value);
    setTemporaryText((prevText) => {
      const newText = [...prevText];
      newText[index] = { ...newText[index], sx: { ...newText[index].sx, opacity: newOpacity } };
      return newText;
    });
  };
  
  export const handleFontSizeChangeArray = (index, setTemporaryText, prevText) => (event) => {
    const newFontSize = parseFloat(event.target.value);
    setTemporaryText((prevText) => {
      const newText = [...prevText];
      newText[index] = { ...newText[index], sx: { ...newText[index].sx, fontSize: newFontSize } };
      return newText;
    });
  };
  
  export const handleBorderRadiusChangeArray = (index, setTemporaryText, prevText) => (event) => {
    const newBorderRadius = parseFloat(event.target.value);
    setTemporaryText((prevText) => {
      const newText = [...prevText];
      newText[index] = { ...newText[index], sx: { ...newText[index].sx, borderRadius: newBorderRadius } };
      return newText;
    });
  };
  
  export const handleFontWeightChangeArray = (index, setTemporaryText, prevText) => (event) => {
    const newFontWeight = parseFloat(event.target.value);
    setTemporaryText((prevText) => {
      const newText = [...prevText];
      newText[index] = { ...newText[index], sx: { ...newText[index].sx, fontWeight: newFontWeight } };
      return newText;
    });
  };
  
  export const handleColorSelectWrapperArray = (index, setTextOfHeader) => (color) => {
    setTextOfHeader((prevText) => {
      const newText = [...prevText];
      newText[index] = {
        ...newText[index],
        sx: { ...newText[index].sx, color: color },
      };
      return newText;
    });
  };
  
  export const handleBackGroundColorSelectWrapperArray = (index, setTextOfHeader) => (color) => {
    setTextOfHeader((prevText) => {
      const newText = [...prevText];
      newText[index] = {
        ...newText[index],
        sx: { ...newText[index].sx, backgroundColor: color },
      };
      return newText;
    });
  };
  
  export const handleBackgroundColorDeleteArray = (index, setTextOfHeader) => () => {
    setTextOfHeader((prevText) => {
      const newText = [...prevText];
      newText[index] = {
        ...newText[index],
        sx: { ...newText[index].sx, backgroundColor: '' },
      };
      return newText;
    });
  };
  