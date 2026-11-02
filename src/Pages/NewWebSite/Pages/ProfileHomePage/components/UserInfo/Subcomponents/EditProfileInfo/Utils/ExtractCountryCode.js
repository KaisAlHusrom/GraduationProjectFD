function extractCountryCodeAndNumber(phoneNumber) {
    // Remove any non-digit characters from the phone number
    var cleanedNumber = phoneNumber.replace(/\D/g, '');

    // Check if the number starts with a '+' sign followed by digits
    if (cleanedNumber.match(/^\+\d+/)) {
        // Extract digits after the '+' sign until the first non-digit character
        var countryCode = cleanedNumber.match(/^\+(\d+)/)[1];
        // Extract the remaining numbers after the country code
        var number = cleanedNumber.replace(/^\+\d+/, '');
        return { countryCode: countryCode, number: number };
    } else {
        // If there's no country code, return null or handle as needed
        return null;
    }
}

export default extractCountryCodeAndNumber;