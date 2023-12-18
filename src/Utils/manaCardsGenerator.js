import cardValue from "./cardValue";
import randomCard from "./randomCard";

export default function manaCardsGenerator() {
    const randomDecimal = Math.random();

    // 16-23
    const targetScore = Math.floor(randomDecimal * 8) + 16;

    let hand = [];
    let currentScore = 0;

    while (currentScore < targetScore) {
        const newCard = randomCard(null, hand);
        const cardScore = cardValue(newCard, currentScore);

        if (currentScore + cardScore <= targetScore) {
            hand.push(newCard);
            currentScore += cardScore;
        }
    }

    return hand;
}
