import cardValue from "./cardValue";
import randomCard from "./randomCard";

export default function manaCardsGenerator() {
    const randomDecimal = Math.random();

    // 18-21
    const targetScore = Math.floor(randomDecimal * 4) + 18;

    let hand = [];
    let currentScore = 0;

    while (currentScore < targetScore) {
        const newCard = randomCard();
        const cardScore = cardValue(newCard);

        if (currentScore + cardScore <= targetScore) {
            hand.push(newCard);
            currentScore += cardScore;
        }
    }

    return hand;
}
