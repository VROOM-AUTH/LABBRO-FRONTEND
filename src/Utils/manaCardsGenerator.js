import cardValue from "./cardValue";
import randomCard from "./randomCard";

export default function manaCardsGenerator() {
    const randomDecimal = Math.random();

    // 16-21
    const targetScore = Math.floor(randomDecimal * 6) + 16;

    let hand = [];
    let currentScore = 0;

    while (currentScore < targetScore) {
        const newCard = randomCard();
        const cardScore = cardValue(newCard, currentScore);

        if (currentScore + cardScore <= targetScore) {
            hand.push(newCard);
            currentScore += cardScore;
        }
    }

    return hand;
}