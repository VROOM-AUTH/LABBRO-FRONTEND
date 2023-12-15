import React, { useEffect, useState } from "react";
import "./Blackjack.css";
import coin from "../../Assets/coin.png";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PlayingCard from "../../Utils/PlayingCard";
import randomCard from "../../Utils/randomCard";
import cardValue from "../../Utils/cardValue";
import manaCardsGenerator from "../../Utils/manaCardsGenerator";

export default function Blackjack({ userVroomVolts, setUserVroomVolts }) {
    const Navigate = useNavigate();
    const [playerCards, setPlayerCards] = useState([]);
    const [manaCards, setManaCards] = useState(["2B"]);
    const [playerScore, setPlayerScore] = useState(0);
    const [manaScore, setManaScore] = useState(0);
    const [bet, setBet] = useState(20);
    const [startGame, setStartGame] = useState(false);
    const [message, setMessage] = useState("If you win you gain x2 your bet!");
    const [showManaCards, setShowManaCards] = useState(false);
    const [gameOver, setGameOver] = useState(true);
    const [restartGame, setRestartGame] = useState(true); // New state for managing game restart flow

    const addCard = () => {
        setPlayerCards([...playerCards, randomCard()]);
    };

    const evaluateGame = (manaScore, playerScore) => {
        setShowManaCards(true);
        if (playerScore > 21) {
            setMessage("You lost!");
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
            setPlayerCards([randomCard(), randomCard()]);
            setRestartGame(false); // Reset restartGame to false when starting a new game
        }
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
        <div className='blackjack-container'>
            <div className='blackjack-content-container'>
                <div className='blackjack-title'>
                    <IoArrowBackCircle
                        className='return-back'
                        onClick={() => {
                            Navigate("/vroomvolts");
                        }}
                    />
                    <div className='blackjack-title-group'>
                        <h1>{userVroomVolts}</h1> <img src={coin} alt='coin'></img>
                    </div>
                </div>
                <div className='blackjack-instructions'>{message}</div>

                {showManaCards ? (
                    <div className='blackjack-mana-container'>
                        <div>
                            {manaCards.map((card, index) => (
                                <PlayingCard card={card} key={index} />
                            ))}
                        </div>
                        {gameOver ? <div className='blackjack-score'>ENEMY SCORE : {manaScore}</div> : null}
                    </div>
                ) : (
                    <div className='blackjack-mana-container'>
                        <div>
                            {/* Display the first card in manaCards separately */}
                            <PlayingCard card={manaCards[0]} />

                            {/* Display "2B" cards for the remaining elements in manaCards */}
                            {manaCards.slice(1).map((_, index) => (
                                <PlayingCard card={"2B"} key={index} />
                            ))}
                        </div>
                    </div>
                )}

                <div className='blackjack-player-container'>
                    {startGame && !gameOver ? (
                        <>
                            <div className='cards-row'>
                                {playerCards.map((card, index) => (
                                    <PlayingCard card={card} key={index} />
                                ))}
                            </div>
                            <div className='blackjack-game-buttons'>
                                <div className='blackjack-bet-button' onClick={addCard}>
                                    Hit
                                </div>
                                <div className='blackjack-bet-button' onClick={() => evaluateGame(manaScore, playerScore)}>
                                    Done
                                </div>
                            </div>
                            <div className='blackjack-score'>YOUR SCORE : {playerScore}</div>
                        </>
                    ) : (
                        <div className='blackjack-bet-container'>
                            {!restartGame ? (
                                <>
                                    <div className='cards-row'>
                                        {playerCards.map((card, index) => (
                                            <PlayingCard card={card} key={index} />
                                        ))}
                                    </div>
                                    <div className='blackjack-score'>YOUR SCORE : {playerScore}</div>

                                    <div
                                        className='blackjack-bet-button'
                                        onClick={() => {
                                            setGameOver(false);
                                            setRestartGame(true);
                                            setStartGame(false); // Set startGame to false when playing again
                                        }}
                                    >
                                        Play again
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h1>Place your bet</h1>
                                    <input
                                        defaultValue={bet}
                                        className='bet-input'
                                        type='number'
                                        placeholder='Bet'
                                        step='5'
                                        min='20'
                                        max='1000'
                                        onChange={(e) => {
                                            setBet(e.target.value);
                                        }}
                                    ></input>

                                    <div
                                        className='blackjack-bet-button'
                                        onClick={() => {
                                            if (bet >= 20 && bet <= userVroomVolts) {
                                                setStartGame(true);
                                                setGameOver(false);
                                                setUserVroomVolts(userVroomVolts - bet);
                                            }
                                        }}
                                    >
                                        Start
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
