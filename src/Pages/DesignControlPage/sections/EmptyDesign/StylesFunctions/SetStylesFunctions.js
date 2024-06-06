
export const handleUploadImageClick = (e,handleImageChange) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        handleImageChange(event.target.result);
    };
    reader.readAsDataURL(file);
    handleImageChange(file);
};

export const handleImageChange = (file, setSelectedImage) => {
    if (file) {
        setSelectedImage(file);
    }
    };
export const handleDeleteLogoClick = (setSelectedImage) => {
    // Implement the logic to delete the logo, for example, set selectedImages to null
    setSelectedImage(null);
};

