export const isComplexValue = value => Array.isArray(value) || (typeof value === 'object' && value !== null);

export function isArraysEqual(arr1, arr2) {
    // If lengths are different, arrays are not equal
    if (arr1.length !== arr2.length) {
        return false;
    }

    // Check each element in the arrays
    for (let i = 0; i < arr1.length; i++) {
        // If any elements are different, arrays are not equal
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    // If all elements are equal, arrays are equal
    return true;
}
