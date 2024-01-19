function capitalizeEachWord(str) {
    // Check if the string is empty or not a string
    if (typeof str !== 'string' || str.length === 0) {
        return str;
    }

    // Split the string into words
    const words = str.split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Join the capitalized words back into a string
    return capitalizedWords.join(' ');
}

function removeSAtEnd(word) {
    const lowercasedWord = word.toLowerCase();
    if (lowercasedWord.endsWith('s') && word !== 'S') {
        return word.slice(0, -1).toLowerCase();
    }
    return word;
}


const StringHelper = {
    capitalizeEachWord,
    removeSAtEnd
}

export default StringHelper
