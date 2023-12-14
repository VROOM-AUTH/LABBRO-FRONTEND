import React, { useEffect } from "react";
import "./Blackjack.css";
import coin from "../../Assets/coin.png";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PlayingCard from "../../Utils/PlayingCard";
import randomCard from "../../Utils/randomCard";
import cardValue from "../../Utils/cardValue";
export default function Blackjack({ userVroomVolts, setUserVroomVolts }) {
    const Navigate = useNavigate();
    const [playerCards, setPlayerCards] = React.useState([]);
    const [playerScore, setPlayerScore] = React.useState(0);

    const addCard = () => {
        setPlayerCards([...playerCards, randomCard()]);
    };

    useEffect(() => {
        let score = 0;
        playerCards.forEach((card) => {
            score += cardValue(card);
        });
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
                <div className='blackjack-mana-container'>
                    <PlayingCard card={"AH"} />
                </div>
                <div className='blackjack-player-container'>
                    {playerCards.map((card) => (
                        <PlayingCard card={card} />
                    ))}
                </div>
                <div onClick={addCard}>ADD MORE</div>
                <div className='blackjack-instructions'>Score : {playerScore}</div>
            </div>
        </div>
    );
}
