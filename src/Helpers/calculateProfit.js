export default function calculateProfit(price) {
    const serviceTaxPercentage = 20 //20%  //TODO: this will change to data from db
    const newCost =  price - (price * serviceTaxPercentage / 100)
    return {newCost, serviceTaxPercentage}
}