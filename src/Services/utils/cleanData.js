//function to change bool fields to 1 and 0
export function updateBoolean(newData) {

    Object.keys(newData).forEach(key => {
        // Get the value corresponding to the key
        let value = newData[key];
    
        // Check if the key starts with "is_" or "not_"
        if (key.startsWith('is_') || key.startsWith('not_')) {
            // Convert boolean value to 1 or 0
            value = value ? 1 : 0;
        }
    
        // Update the value in the newData object
        newData[key] = value;
    });
    

    return newData;
}