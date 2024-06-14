export const handleCheckDate = (date) => {
    // Check if the date is valid
    if (!date) {
        console.error('Invalid date provided');
        return false;
    }

    // Convert the date to a Date object if it's not already
    const inputDate = new Date(date);

    // Check if the date is valid
    if (isNaN(inputDate.getTime())) {
        console.error('Invalid date provided');
        return false;
    }

    // Get the current date
    const currentDate = new Date();


    // Compare the dates
    return inputDate > currentDate;
};

export function daysUntil(date) {
    const now = new Date();
    const targetDate = new Date(date);
    
    // Calculate the difference in milliseconds
    const diffInMs = targetDate - now;
    
    // Convert milliseconds to days
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    
    return diffInDays;
}