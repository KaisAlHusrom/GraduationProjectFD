export const isComplexValue = value => Array.isArray(value) || (typeof value === 'object' && value !== null);

export function isArraysEqual(arr1, arr2) {
    // If lengths are different, arrays are not equal
    if (arr1.length !== arr2.length) {
        return false;
    }

    // Sort both arrays
    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();

    // Check each element in the sorted arrays
    for (let i = 0; i < sortedArr1.length; i++) {
        // If any elements are different, arrays are not equal
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }

    // If all elements are equal, arrays are equal
    return true;
}

