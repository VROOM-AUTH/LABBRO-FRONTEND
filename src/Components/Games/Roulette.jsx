import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import "./Roulette.css";
import coin from "../../Assets/coin.png";
import { IoArrowBackCircle } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

const data = [
    { option: "0", style: { backgroundColor: "green" } },
    { option: "28", style: { backgroundColor: "black" } },
    { option: "9", style: { backgroundColor: "red" } },
    { option: "26", style: { backgroundColor: "black" } },
    { option: "30", style: { backgroundColor: "red" } },
    { option: "11", style: { backgroundColor: "black" } },
    { option: "7", style: { backgroundColor: "red" } },
    { option: "20", style: { backgroundColor: "black" } },
    { option: "32", style: { backgroundColor: "red" } },
    { option: "17", style: { backgroundColor: "black" } },
    { option: "5", style: { backgroundColor: "red" } },
    { option: "22", style: { backgroundColor: "black" } },
    { option: "34", style: { backgroundColor: "red" } },
    { option: "15", style: { backgroundColor: "black" } },
    { option: "3", style: { backgroundColor: "red" } },
    { option: "24", style: { backgroundColor: "black" } },
    { option: "36", style: { backgroundColor: "red" } },
    { option: "13", style: { backgroundColor: "black" } },
    { option: "1", style: { backgroundColor: "red" } },
    { option: "00", style: { backgroundColor: "green" } },
    { option: "27", style: { backgroundColor: "red" } },
    { option: "10", style: { backgroundColor: "black" } },
    { option: "25", style: { backgroundColor: "red" } },
    { option: "29", style: { backgroundColor: "black" } },
    { option: "12", style: { backgroundColor: "red" } },
    { option: "8", style: { backgroundColor: "black" } },
    { option: "19", style: { backgroundColor: "red" } },
    { option: "31", style: { backgroundColor: "black" } },
    { option: "18", style: { backgroundColor: "red" } },
    { option: "6", style: { backgroundColor: "black" } },
    { option: "21", style: { backgroundColor: "red" } },
    { option: "33", style: { backgroundColor: "black" } },
    { option: "16", style: { backgroundColor: "red" } },
    { option: "4", style: { backgroundColor: "black" } },
    { option: "23", style: { backgroundColor: "red" } },
    { option: "35", style: { backgroundColor: "black" } },
    { option: "14", style: { backgroundColor: "red" } },
    { option: "2", style: { backgroundColor: "black" } },
];

export default function Roulette({ userVroomVolts, setUserVroomVolts }) {
    const Navigate = useNavigate();
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            const targetOption = newPrizeNumber.toString(); // The option you want to find

            const index = data.findIndex((entry) => entry.option === targetOption);
            setPrizeNumber(index);
            setMustSpin(true);
        }
    };

    return (
        <div className='roulette-container'>
            <div className='roulette-content-container'>
                <div className='roulette-title'>
                    <IoArrowBackCircle
                        className='return-back'
                        onClick={() => {
                            Navigate("/vroomvolts");
                        }}
                    />
                    <div className='roulette-title-group'>
                        <h1>{userVroomVolts}</h1> <img src={coin} alt='coin'></img>
                    </div>
                </div>
                <div className='roulette-instructions'>Each spin costs 5 Vroomvolts!</div>
                <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={data}
                    onStopSpinning={() => {
                        setMustSpin(false);
                    }}
                    textColors={["white"]}
                    radiusLineColor='#EFB98D'
                    radiusLineWidth={3}
                    outerBorderWidth={10}
                    outerBorderColor='#000'
                    // innerBorderColor='#20344C'
                    innerBorderColor='#000'
                    innerBorderWidth={90}
                    perpendicularText={true}
                    textDistance={85}
                    fontSize={18}
                    fontWeight={700}
                />
                <button onClick={handleSpinClick}>SPIN</button>
                <div className='roulette-bet-board'>
                    <div className='roulette-bet-row'>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                    </div>
                    <div className='roulette-bet-row'>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                    </div>
                    <div className='roulette-bet-row'>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                    </div>
                    <div className='roulette-bet-row'>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                    </div>
                    <div className='roulette-bet-row'>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                        <div className='bet-number'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
