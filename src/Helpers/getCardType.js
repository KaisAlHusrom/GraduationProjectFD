import visa from "../Assets/Images/visa.png"
import master from "../Assets/Images/card.png"
import jcb from "../Assets/Images/jcb.png"
import dinersClub from "../Assets/Images/diners-club.png"
import discover from "../Assets/Images/discover.png"
import american from "../Assets/Images/american-express.png"
import creditCard from "../Assets/Images/credit-card.png"


export function getCardType(cardNumber) {
    if(cardNumber) {
        const number = cardNumber.replace(/\D/g, ''); // Remove non-numeric characters

        if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(number)) {
            return 'Visa';
        } else if (/^5[1-5][0-9]{14}$/.test(number) || /^(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/.test(number)) {
            return 'MasterCard';
        } else if (/^3[47][0-9]{13}$/.test(number)) {
            return 'American Express';
        } else if (/^6(?:011|5[0-9]{2}|4[4-9][0-9])[0-9]{12}$/.test(number) || /^6(?:22[1-9]|2[3-9][0-9])[0-9]{13}$/.test(number)) {
            return 'Discover';
        } else if (/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(number)) {
            return 'Diners Club';
        } else if (/^(?:2131|1800|35\d{3})\d{11}$/.test(number)) {
            return 'JCB';
        } else {
            return 'Unknown';
        }
    }
    return null
}

export function getCardImage(cardNumber) {
    if(cardNumber) {
        // Remove non-numeric characters, but keep the asterisks for later
        const number = cardNumber.replace(/[^\d*]/g, '');
        
        // Extract the prefix of the card number before any asterisks
        const prefix = number.replace(/\*/g, '').slice(0, 6); // Considering up to 6 digits for identifying some cards

        if (/^4[0-9]{0,5}/.test(prefix)) {
            return visa;
        } else if (/^5[1-5][0-9]{0,4}/.test(prefix) || /^(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)/.test(prefix)) {
            return master;
        } else if (/^3[47][0-9]{0,3}/.test(prefix)) {
            return american;
        } else if (/^6(?:011|5[0-9]{2}|4[4-9][0-9]{0,3})/.test(prefix) || /^6(?:22[1-9]|2[3-9][0-9]{0,2})/.test(prefix)) {
            return discover;
        } else if (/^3(?:0[0-5]|[68][0-9]{0,2})/.test(prefix)) {
            return dinersClub;
        } else if (/^(?:2131|1800|35\d{0,2})/.test(prefix)) {
            return jcb;
        } else {
            return 'Unknown';
        }
    }

    return creditCard
}
