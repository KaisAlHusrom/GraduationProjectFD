
export function formatPrice(price) {
    // Convert the price to a number (in case it's a string) and then to a fixed 2 decimal places
    return Number(price).toFixed(2);
}