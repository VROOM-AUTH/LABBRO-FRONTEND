import React from "react";
import "./Blackjack.css";
import coin from "../../Assets/coin.png";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PlayingCard from "../../Utils/PlayingCard";

export default function Blackjack({ userVroomVolts, setUserVroomVolts }) {
    const Navigate = useNavigate();

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
                <PlayingCard card={"AH"} />
                <PlayingCard card={"JD"} />
                <PlayingCard card={"3S"} />
                <div className='blackjack-instructions'>Each spin costs 5 Vroomvolts!</div>
            </div>
        </div>
    );
}
