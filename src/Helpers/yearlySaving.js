/**
 * Calculate the percentage savings when paying a yearly price instead of monthly.
 * @param {number} yearlyPrice - The total yearly price.
 * @param {number} monthlyPrice - The price per month.
 * @returns {number} - The percentage savings.
 */
export default function calculateYearlySavings(yearlyPrice, monthlyPrice) {
    // Total cost if paid monthly for a year
    const monthlyTotal = monthlyPrice * 12;
    
    // Difference between the yearly price and the total monthly cost
    const savings = monthlyTotal - yearlyPrice;
    
    // Calculate the percentage savings
    const percentageSavings = (savings / monthlyTotal) * 100;
    
    return percentageSavings.toFixed(2); // Return the result rounded to 2 decimal places
}

export function calculateYearlySavingsPrice(yearlyPrice, monthlyPrice) {
    // Total cost if paid monthly for a year
    const monthlyTotal = monthlyPrice * 12;
    
    // Difference between the yearly price and the total monthly cost
    const savings = monthlyTotal - yearlyPrice;
    
    
    return savings.toFixed(2); // Return the result rounded to 2 decimal places
}