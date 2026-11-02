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

const camelCaseToWords = (camelCaseString) => {
    return camelCaseString.replace(/([a-z])([A-Z])/g, '$1 $2');
  };

function camelToSnake(camelCaseString) {
    return camelCaseString.replace(/(?:^|\.?)([A-Z])/g, function (_, match) {
        return '_' + match.toLowerCase();
    });
}

function camelToKebab(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function removeSAtEnd(word) {
    const lowercasedWord = word.toLowerCase();
    if (lowercasedWord.endsWith('s') && word !== 'S') {
        return word.slice(0, -1).toLowerCase();
    }
    return word;
}

function removeHyphens(str) {
    return str.replace(/-/g, ' ');
}

const StringHelper = {
    capitalizeEachWord,
    removeSAtEnd,
    camelCaseToWords,
    removeHyphens,
    camelToSnake,
    camelToKebab
}

export default StringHelper
