import React, { useEffect, useState } from "react";
import "./Blackjack.css";
import coin from "../../Assets/coin.png";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PlayingCard from "../../Utils/PlayingCard";
import randomCard from "../../Utils/randomCard";
import cardValue from "../../Utils/cardValue";
export default function Blackjack({ userVroomVolts, setUserVroomVolts }) {
    const Navigate = useNavigate();
    const [playerCards, setPlayerCards] = useState([]);
    const [manaCards, setManaCards] = useState(["2B", "2B"]);
    const [playerScore, setPlayerScore] = useState(0);
    const [manaScore, setManaScore] = useState(0);
    const [bet, setBet] = useState(20);
    const [startGame, setStartGame] = useState(false);

    const addCard = () => {
        setPlayerCards([...playerCards, randomCard()]);
    };

    const evaluateGame = (manaScore, playerScore) => {
        if (manaScore > playerScore) {
            alert("You lost!");
            setStartGame(false);
        } else {
            alert("You won!");
            setUserVroomVolts(userVroomVolts + bet * 2);
            setStartGame(false);
        }
    };

    useEffect(() => {
        setPlayerCards([randomCard(), randomCard()]);
    }, [startGame]);

    useEffect(() => {
        let score = 0;
        playerCards.forEach((card) => {
            score += cardValue(card);
        });
        if (score > 21) {
            alert("You lost!");
            setStartGame(false);
        }
        setPlayerScore(score);
    }, [playerCards]);
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
                <div className='blackjack-instructions'>If you win you gain x2 your bet!</div>
                <div className='blackjack-mana-container'>
                    {manaCards.map((card) => (
                        <PlayingCard card={card} />
                    ))}
                </div>
                <div className='blackjack-player-container'>
                    {startGame ? (
                        <>
                            <div className='cards-row'>
                                {playerCards.map((card) => (
                                    <PlayingCard card={card} />
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

                            <div className='blackjack-score'>SCORE : {playerScore}</div>
                        </>
                    ) : (
                        <div className='blackjack-bet-container'>
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
                                        setUserVroomVolts(userVroomVolts - bet);
                                    }
                                }}
                            >
                                Start
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
