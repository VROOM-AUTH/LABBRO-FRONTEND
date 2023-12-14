export default function cardValue(card) {
    const rank = card.slice(0, -1); // Extract the rank part of the card
    if (rank === "A") {
        return 1;
    } else if (["J", "Q", "K", "T"].includes(rank)) {
        return 10; // J, Q, and K are 10
    } else {
        return parseInt(rank, 10); // Convert the rank to an integer for 2-10
    }
}
