import React, { useEffect, useState } from "react";
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
const first12Numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const second12Numbers = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
const third12Numbers = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
const redNumbers = [1, 3, 5, 7, 9, 12, 14, 15, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 35, 36];
const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 17, 20, 22, 24, 26, 28, 29, 31, 33];
const evenNumbers = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];
const oddNumbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];
const oneto18 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const nineteento36 = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

export default function Roulette({ userVroomVolts, setUserVroomVolts }) {
    const Navigate = useNavigate();
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [betMultiplier, setBetMultiplier] = useState(1);
    const [betAmount, setBetAmount] = useState(10);
    const [winNumber, setWinNumber] = useState(0);
    const [bets, setBets] = useState([]);

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            const targetOption = newPrizeNumber.toString(); // The option you want to find
            setWinNumber(targetOption);

            const index = data.findIndex((entry) => entry.option === targetOption);
            setPrizeNumber(index);
            setMustSpin(true);
        }
    };

    function handleBetClick(b) {
        let newBets;

        if (b === 112 || b === 212 || b === 312) {
            // Handle 1st, 2nd, and 3rd 12 cases
            const numbersToCheck = b === 112 ? first12Numbers : b === 212 ? second12Numbers : third12Numbers;
            newBets = {
                type: "dozen",
                numbers: numbersToCheck,
                multiplier: calculateMultiplier(numbersToCheck),
                amount: betAmount,
            };
        } else if (b === -1 || b === -2) {
            const numbersToCheck = b === -1 ? redNumbers : blackNumbers;
            newBets = {
                type: b === -1 ? "red" : "black",
                numbers: numbersToCheck,
                multiplier: calculateMultiplier(numbersToCheck),
                amount: betAmount,
            };
        } else if (b === -3 || b === -4) {
            const numbersToCheck = b === -3 ? oddNumbers : evenNumbers;
            newBets = {
                type: b === -3 ? "odd" : "even",
                numbers: numbersToCheck,
                multiplier: calculateMultiplier(numbersToCheck),
                amount: betAmount,
            };
        } else if (b === 118 || b === 1936) {
            const numbersToCheck = b === 118 ? oneto18 : nineteento36;
            newBets = {
                type: b === 118 ? "oneto18" : "nineteento36",
                numbers: numbersToCheck,
                multiplier: calculateMultiplier(numbersToCheck),
                amount: betAmount,
            };
        } else {
            // Handle other cases
            newBets = {
                type: "single",
                numbers: [b],
                multiplier: calculateMultiplier([b]),
                amount: betAmount,
            };
        }

        const existingBetIndex = bets.findIndex((bet) => bet.type === newBets.type && JSON.stringify(bet.numbers) === JSON.stringify(newBets.numbers));

        if (existingBetIndex !== -1) {
            // If a bet exists with a different amount, replace it with the new amount
            if (bets[existingBetIndex].amount !== newBets.amount) {
                const updatedBets = [...bets];
                updatedBets[existingBetIndex] = newBets;
                setBets(updatedBets);
            } else {
                // If a bet exists with the same amount, delete the old bet
                const updatedBets = [...bets];
                updatedBets.splice(existingBetIndex, 1);
                setBets(updatedBets);
            }
        } else {
            // Add a new bet
            setBets([...bets, newBets]);
        }
    }

    function calculateMultiplier(numbers) {
        const totalNumbers = 36; // Assuming a standard roulette wheel with numbers 1 to 36

        if (numbers.length === 1) {
            // Single number bet
            return totalNumbers / 1;
        } else if (numbers.length === 12) {
            // Dozen bet (1st, 2nd, or 3rd 12)
            return 3; // Pays 2:1
        } else if (arraysEqual(numbers, redNumbers) || arraysEqual(numbers, blackNumbers)) {
            // Red or black bet
            return 2; // Pays 1:1
        } else if (arraysEqual(numbers, oddNumbers) || arraysEqual(numbers, evenNumbers)) {
            // Odd or even bet
            return 2; // Pays 1:1
        } else if (arraysEqual(numbers, oneto18) || arraysEqual(numbers, nineteento36)) {
            // 1 to 18 or 19 to 36 bet
            return 2; // Pays 1:1
        }

        // Default case (shouldn't happen if used correctly)
        return 1;
    }

    // Helper function to compare arrays
    function arraysEqual(arr1, arr2) {
        return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
    }
    console.log(bets);
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
                {/* <div className='roulette-instructions'>Each spin costs 5 Vroomvolts!</div> */}
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
                <button onClick={() => setBetAmount(20)}>BET</button>
                <div className='roulette-bet-board'>
                    <div className='roulette-bet-row'>
                        <div className={bets.some((bet) => bet.numbers[0] === 3) ? "bet-number-r bet-active" : "bet-number-r"} onClick={() => handleBetClick(3)}>
                            3{bets.some((bet) => bet.numbers[0] === 3)?.amount !== 0 && <p className='bet-amount'>{bets.find((bet) => bet.numbers[0] === 3)?.amount}</p>}
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 6) ? "bet-number bet-active" : "bet-number"} onClick={() => handleBetClick(6)}>
                            6{bets.some((bet) => bet.numbers[0] === 6)?.amount !== 0 && <p className='bet-amount'>{bets.find((bet) => bet.numbers[0] === 6)?.amount}</p>}
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 9) ? "bet-number-r bet-active" : "bet-number-r"} onClick={() => handleBetClick(9)}>
                            9
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 12) ? "bet-number-r bet-active" : "bet-number-r"} onClick={() => handleBetClick(12)}>
                            12
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 15) ? "bet-number-r bet-active" : "bet-number-r"} onClick={() => handleBetClick(15)}>
                            15
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 18) ? "bet-number-r bet-active" : "bet-number-r"} onClick={() => handleBetClick(18)}>
                            18
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 21) ? "bet-number-r bet-active" : "bet-number-r"} onClick={() => handleBetClick(21)}>
                            21
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 24) ? "bet-number bet-active" : "bet-number"} onClick={() => handleBetClick(24)}>
                            24
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 27) ? "bet-number-r bet-active" : "bet-number-r"} onClick={() => handleBetClick(27)}>
                            27
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 30) ? "bet-number-r bet-active" : "bet-number-r"} onClick={() => handleBetClick(30)}>
                            30
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 33) ? "bet-number bet-active" : "bet-number"} onClick={() => handleBetClick(33)}>
                            33
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 36) ? "bet-number-r bet-active" : "bet-number-r"} onClick={() => handleBetClick(36)}>
                            36
                        </div>
                    </div>
                    <div className='roulette-bet-row'>
                        <div className={bets.some((bet) => bet.numbers[0] === 2 && bet.numbers.length === 1) ? "bet-number bet-active" : "bet-number"} onClick={() => handleBetClick(2)}>
                            2
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 5) ? "bet-number-r bet-active" : "bet-number-r"} onClick={() => handleBetClick(5)}>
                            5
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 8) ? "bet-number bet-active" : "bet-number"} onClick={() => handleBetClick(8)}>
                            8
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 11) ? "bet-number bet-active" : "bet-number"} onClick={() => handleBetClick(11)}>
                            11
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 14) ? "bet-number-r bet-active" : "bet-number-r"} onClick={() => handleBetClick(14)}>
                            14
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 17) ? "bet-number bet-active" : "bet-number"} onClick={() => handleBetClick(17)}>
                            17
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 20) ? "bet-number bet-active" : "bet-number"} onClick={() => handleBetClick(20)}>
                            20
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 23) ? "bet-number-r bet-active" : "bet-number-r"} onClick={() => handleBetClick(23)}>
                            23
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 26) ? "bet-number bet-active" : "bet-number"} onClick={() => handleBetClick(26)}>
                            26
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 29) ? "bet-number bet-active" : "bet-number"} onClick={() => handleBetClick(29)}>
                            29
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 32) ? "bet-number-r bet-active" : "bet-number-r"} onClick={() => handleBetClick(32)}>
                            32
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 35) ? "bet-number-r bet-active" : "bet-number-r"} onClick={() => handleBetClick(35)}>
                            35
                        </div>
                    </div>
                    <div className='roulette-bet-row'>
                        <div className={bets.some((bet) => bet.numbers[0] === 1 && bet.numbers.length === 1) ? "bet-number-r bet-active" : "bet-number-r"} onClick={() => handleBetClick(1)}>
                            1
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 4) ? "bet-number bet-active" : "bet-number"} onClick={() => handleBetClick(4)}>
                            4
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 7) ? "bet-number-r bet-active" : "bet-number-r"} onClick={() => handleBetClick(7)}>
                            7
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 10) ? "bet-number bet-active" : "bet-number"} onClick={() => handleBetClick(10)}>
                            10
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 13 && bet.numbers.length === 1) ? "bet-number bet-active" : "bet-number"} onClick={() => handleBetClick(13)}>
                            13
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 16) ? "bet-number-r bet-active" : "bet-number-r"} onClick={() => handleBetClick(16)}>
                            16
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 19 && bet.numbers.length === 1) ? "bet-number-r bet-active" : "bet-number-r"} onClick={() => handleBetClick(19)}>
                            19
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 22) ? "bet-number bet-active" : "bet-number"} onClick={() => handleBetClick(22)}>
                            22
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 25 && bet.numbers.length === 1) ? "bet-number-r bet-active" : "bet-number-r"} onClick={() => handleBetClick(25)}>
                            25
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 28) ? "bet-number bet-active" : "bet-number"} onClick={() => handleBetClick(28)}>
                            28
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 31) ? "bet-number bet-active" : "bet-number"} onClick={() => handleBetClick(31)}>
                            31
                        </div>
                        <div className={bets.some((bet) => bet.numbers[0] === 34) ? "bet-number-r bet-active" : "bet-number-r"} onClick={() => handleBetClick(34)}>
                            34
                        </div>
                    </div>
                    <div className='roulette-bet-row'>
                        <div className={bets.some((bet) => bet.type === "dozen" && bet.numbers.includes(1)) ? "bet-number-categ bet-active" : "bet-number-categ"} onClick={() => handleBetClick(112)}>
                            1st 12
                        </div>
                        <div className={bets.some((bet) => bet.type === "dozen" && bet.numbers.includes(13)) ? "bet-number-categ bet-active" : "bet-number-categ"} onClick={() => handleBetClick(212)}>
                            2nd 12
                        </div>
                        <div className={bets.some((bet) => bet.type === "dozen" && bet.numbers.includes(25)) ? "bet-number-categ bet-active" : "bet-number-categ"} onClick={() => handleBetClick(312)}>
                            3d 12
                        </div>
                    </div>
                    <div className='roulette-bet-row'>
                        <div className={bets.some((bet) => bet.type === "oneto18") ? "bet-number-categ bet-active" : "bet-number-categ"} onClick={() => handleBetClick(118)}>
                            1 to 18
                        </div>
                        <div className='bet-number-g' onClick={() => handleBetClick(0)}>
                            0
                        </div>
                        <div className={bets.some((bet) => bet.type === "even") ? "bet-number-categ bet-active" : "bet-number-categ"} onClick={() => handleBetClick(-4)}>
                            Even
                        </div>
                        <div className={bets.some((bet) => bet.type === "red") ? "bet-number-r bet-active" : "bet-number-r"} onClick={() => handleBetClick(-1)}>
                            Red
                        </div>
                        <div className={bets.some((bet) => bet.type === "black") ? "bet-number bet-active" : "bet-number"} onClick={() => handleBetClick(-2)}>
                            Black
                        </div>
                        <div className={bets.some((bet) => bet.type === "odd") ? "bet-number-categ bet-active" : "bet-number-categ"} onClick={() => handleBetClick(-3)}>
                            Odd
                        </div>
                        <div className='bet-number-g' onClick={() => handleBetClick(0)}>
                            00
                        </div>
                        <div className={bets.some((bet) => bet.type === "nineteento36") ? "bet-number-categ bet-active" : "bet-number-categ"} onClick={() => handleBetClick(1936)}>
                            19 to 36
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
