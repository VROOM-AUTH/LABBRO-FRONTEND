import React, { useEffect, useState } from "react";
import "./Blackjack.css";
import coin from "../../Assets/coin.png";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PlayingCard from "../../Utils/PlayingCard";
import randomCard from "../../Utils/randomCard";
import cardValue from "../../Utils/cardValue";
import manaCardsGenerator from "../../Utils/manaCardsGenerator";

export default function Blackjack({
    userVroomVolts,
    setUserVroomVolts,
    userData,
}) {
    const fetchVroomvolts = () => {
        return fetch(
            `${process.env.REACT_APP_BASE_URL}users-levels?user_id=${userData.userId}`,
            {
                //Fetch for logged in user vroomvolts data
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
                },
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                setUserVroomVolts(data[0]?.vroomvolts || 0);
                // setFirstVroomvoltFetch(false);
            })
            .catch((error) => {
                console.log(`Error ${error}`);
            });
    };
    const Navigate = useNavigate();
    const [playerCards, setPlayerCards] = useState([]);
    const [manaCards, setManaCards] = useState(["2B", "2B"]);
    const [playerScore, setPlayerScore] = useState(0);
    const [manaScore, setManaScore] = useState(0);
    const [bet, setBet] = useState(20);
    const [startGame, setStartGame] = useState(false);
    const [message, setMessage] = useState("If you win, you gain x2 your bet!");
    const [showManaCards, setShowManaCards] = useState(false);
    const [gameOver, setGameOver] = useState(true);
    const [restartGame, setRestartGame] = useState(true); // New state for managing game restart flow

    const addCard = () => {
        setPlayerCards([...playerCards, randomCard(playerCards, manaCards)]);
    };

    const startGameHandler = () => {
        fetchVroomvolts().then(() => {
            if (bet >= 20 && bet <= 10000 && bet <= userVroomVolts) {
                setStartGame(true);
                setGameOver(false);
                setUserVroomVolts((prev) => prev - bet);
            } else if (bet > userVroomVolts) {
                setMessage("You don't have enough VroomVolts!");
            } else if (bet < 20) {
                setMessage("Minimum bet is 20 Vroomvolts!");
            } else if (bet > 10000) {
                setMessage("Maximum bet is 10000 Vroomvolts!");
            }
        });
    };
    const evaluateGame = (manaScore, playerScore) => {
        setShowManaCards(true);
        if (playerScore > 21) {
            setMessage("You lost!");
            setGameOver(true);
        } else if (manaScore > 21) {
            setMessage("You won!");
            setUserVroomVolts(userVroomVolts + bet * 2);
            setGameOver(true);
        } else if (manaScore > playerScore) {
            setMessage("You lost!");
            setGameOver(true);
        } else {
            setMessage("You won!");
            setUserVroomVolts(userVroomVolts + bet * 2);
            setGameOver(true);
        }
    };

    useEffect(() => {
        if (startGame && !gameOver) {
            setShowManaCards(false);
            setManaCards(manaCardsGenerator());
            setPlayerCards([randomCard(playerCards, manaCards), randomCard(playerCards, manaCards)]);
            setRestartGame(false); // Reset restartGame to false when starting a new game
        }
        //eslint-disable-next-line
    }, [startGame, gameOver]);

    useEffect(() => {
        let score = 0;
        let manaScore = 0;
        playerCards.forEach((card) => {
            score += cardValue(card, score);
        });
        manaCards.forEach((card) => {
            manaScore += cardValue(card, manaScore);
        });
        setManaScore(manaScore);
        setPlayerScore(score);
    }, [playerCards, manaCards]);

    return (
        <div className="blackjack-container">
            <div className="blackjack-content-container">
                <div className="blackjack-title">
                    <IoArrowBackCircle
                        className="return-back"
                        onClick={() => {
                            Navigate("/vroomvolts");
                        }}
                    />
                    <div className="blackjack-title-group">
                        <h1>{userVroomVolts}</h1> <img src={coin} alt="coin" />
                    </div>
                </div>
                <div className="blackjack-instructions">{message}</div>

                {showManaCards ? (
                    <div className="blackjack-mana-container">
                        <div className="cards-row">
                            {manaCards.map((card, index) => (
                                <PlayingCard card={card} key={index} />
                            ))}
                        </div>
                        {gameOver ? (
                            <div className="blackjack-score">
                                ENEMY SCORE : {manaScore}
                            </div>
                        ) : null}
                    </div>
                ) : (
                    <div className="blackjack-mana-container">
                        <div className="cards-row">
                            {/* Display the first card in manaCards separately */}
                            <PlayingCard card={manaCards[0]} />

                            {/* Display "2B" cards for the remaining elements in manaCards */}
                            {manaCards.slice(1).map((_, index) => (
                                <PlayingCard card={"2B"} key={index} />
                            ))}
                        </div>
                    </div>
                )}

                {startGame && !gameOver ? (
                    <div className="blackjack-player-container">
                        <div className="cards-row">
                            {playerCards.map((card, index) => (
                                <PlayingCard card={card} key={index} />
                            ))}
                        </div>
                        <div className="blackjack-game-buttons">
                            <div
                                className="blackjack-bet-button"
                                onClick={addCard}
                            >
                                Hit
                            </div>
                            <div
                                className="blackjack-bet-button"
                                onClick={() =>
                                    evaluateGame(manaScore, playerScore)
                                }
                            >
                                Done
                            </div>
                        </div>
                        <div className="blackjack-score">
                            YOUR SCORE : {playerScore}
                        </div>
                    </div>
                ) : !restartGame ? (
                    <div className="blackjack-results">
                        <div className="cards-row">
                            {playerCards.map((card, index) => (
                                <PlayingCard card={card} key={index} />
                            ))}
                        </div>
                        <div className="blackjack-score">
                            YOUR SCORE : {playerScore}
                        </div>

                        <div
                            className="blackjack-playagain-button"
                            onClick={() => {
                                setGameOver(false);
                                setRestartGame(true);
                                setStartGame(false); // Set startGame to false when playing again
                            }}
                        >
                            Play again
                        </div>
                    </div>
                ) : (
                    <div className="blackjack-bet-container">
                        <h1>Place your bet</h1>
                        <input
                            defaultValue={bet}
                            className="bet-input"
                            type="number"
                            placeholder="Bet"
                            step="5"
                            min="20"
                            max="10000"
                            onChange={(e) => {
                                setBet(e.target.value);
                            }}
                        />
                        <div
                            className="blackjack-bet-button"
                            onClick={startGameHandler}
                        >
                            Start
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
