export default function randomCard(playerCards, manaCards) {
    const cardValues = [
        "2S",
        "2C",
        "2D",
        "2H",
        "3S",
        "3C",
        "3D",
        "3H",
        "4S",
        "4C",
        "4D",
        "4H",
        "5S",
        "5C",
        "5D",
        "5H",
        "6S",
        "6C",
        "6D",
        "6H",
        "7S",
        "7C",
        "7D",
        "7H",
        "8S",
        "8C",
        "8D",
        "8H",
        "9S",
        "9C",
        "9D",
        "9H",
        "TS",
        "TC",
        "TD",
        "TH",
        "JS",
        "JC",
        "JD",
        "JH",
        "QS",
        "QC",
        "QD",
        "QH",
        "KS",
        "KC",
        "KD",
        "KH",
        "AS",
        "AC",
        "AD",
        "AH",
    ];
    let randomIndex = Math.floor(Math.random() * cardValues.length);
    let randomCard = cardValues[randomIndex];
    while (playerCards && manaCards && (playerCards.includes(randomCard) || manaCards.includes(randomCard))) {
        randomIndex = Math.floor(Math.random() * cardValues.length);
        randomCard = cardValues[randomIndex];
    }

    return randomCard;
}
