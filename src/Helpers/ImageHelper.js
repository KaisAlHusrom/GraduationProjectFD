function isImageFileName(fileName) {
    // List of common image file extensions
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'];

    // Get the file extension from the provided file name
    const fileExtension = fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();

    // Check if the file extension matches any known image extensions
    return imageExtensions.includes(`.${fileExtension}`);
}

export function base64ToFile(base64String, filename) {
    try {
        const regex = /^data:(.*?);base64,(.*)$/;
        const matches = base64String.match(regex);

        if (!matches) {
            throw new Error('Invalid base64 string');
        }

        const mime = matches[1];
        const b64Data = matches[2];
        const bstr = atob(b64Data);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        const blob = new Blob([u8arr], { type: mime });
        return new File([blob], filename, { type: mime });
    } catch (error) {
        console.error('Failed to convert base64 string to file:', error);
        return null;
    }
}




const ImageHelper = {
    isImageFileName,
    base64ToFile
};

export default ImageHelper;

