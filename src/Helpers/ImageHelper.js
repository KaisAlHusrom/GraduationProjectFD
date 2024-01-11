function isImageFileName(fileName) {
    // List of common image file extensions
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'];

    // Get the file extension from the provided file name
    const fileExtension = fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();

    // Check if the file extension matches any known image extensions
    return imageExtensions.includes(`.${fileExtension}`);
}


const ImageHelper = {
    isImageFileName
};

export default ImageHelper;