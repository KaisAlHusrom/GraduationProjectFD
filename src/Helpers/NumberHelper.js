function formatFileSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';

    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const sizeInKB = bytes / Math.pow(1024, i);
    const formattedSize = sizeInKB.toFixed(2);

    return `${formattedSize} ${sizes[i]}`;
}

const NumberHelper = {
    formatFileSize
}

export default NumberHelper;