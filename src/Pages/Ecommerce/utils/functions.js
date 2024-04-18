/**
 * @param {string} txt - The input text to be sliced.
 * @param {number} [max=15] - The maximum length before truncation.
 * @returns {string} The sliced text, with an ellipsis (...) appended if truncated.
 */
export function titleSlicer(txt, max = 15) {
    if (txt.length >= max) return `${txt.slice(0, max)}...`;
    return txt;
}
