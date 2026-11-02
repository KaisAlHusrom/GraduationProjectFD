/**
 * @param {string} txt - The input text to be sliced.
 * @param {number} [max=15] - The maximum length before truncation.
 * @returns {string} The sliced text, with an ellipsis (...) appended if truncated.
 */
export function titleSlicer(txt, max = 15) {
    if (txt.length >= max) return `${txt.slice(0, max)}...`;
    return txt;
}


export function ReviewCalculateSMA (reviews) {
    if (!reviews || reviews.length === 0) {
        return 0; // Return 0 if there are no reviews
      }
    
      const totalRates = reviews.reduce((acc, review) => {
        return acc + review.design_quality_rate + review.ease_of_use_rate + review.communication_rate;
      }, 0);
    
      const numberOfRates = reviews.length * 3; // Each review has three rates
    
      return totalRates / numberOfRates;
}

export function ReviewCalculateSum (review) {
    if (!review) {
        return 0; // Return 0 if there are no reviews
      }
    
      const sum = Number.parseInt(review.avg_design_quality_rate) + Number.parseInt(review.avg_communication_rate) + Number.parseInt(review.avg_ease_of_use_rate)
      return (sum / 3).toFixed(1);
}
export function calculateAverageRating (reviews, key){
    if (!reviews || reviews.length === 0) {
      return 0;
    }
    const sum = reviews.reduce((acc, review) => acc + review[key], 0);
    return sum / reviews.length;
}
