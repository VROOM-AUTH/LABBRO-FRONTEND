import React, { useState, useEffect } from "react";
import wheel from "../../assets/wheel3.png";
import arrowDown from "../../assets/arrow.png";
import "./SpinningWheel.css";
const SpinningWheel = () => {
    // State to store the selected prize
    const [prize, setPrize] = useState("");
    // State to store the spinning status of the wheel
    const [spinning, setSpinning] = useState(false);
    // State to store the angle of the wheel
    const [angle, setAngle] = useState(0);

    // Array of possible prizes
    const prizes = ["1", "2", "3", "4", "5"];

    // Function to handle the spinning wheel
    const spin = () => {
        // Generate a random index to select a prize
        const randomIndex = Math.floor(Math.random() * prizes.length);

        // Update the prize state with the randomly selected prize
        setPrize(prizes[randomIndex]);
        // Set the spinning status to true
        // setSpinning(true);
    };

    const finalAngle =
        Math.floor(Math.floor(Math.random() * (50 - 20 + 1)) + 20) * 360 -
        (360 / prizes.length) * prizes.indexOf(prize);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <h1>Every wheel spin costs 5 VroomVolts!</h1>
            <button
                onClick={spin}
                disabled={spinning}
                className="mainButton"
                style={{ color: "white", fontSize: 20 }}
            >
                {spinning ? "Spinning..." : "Spin the wheel"}
            </button>
            {/* {prize && <p className="fadeIn">You won: {prize}</p>} */}
            <img
                src={arrowDown}
                alt="arrow"
                width="50"
                style={{ marginTop: "1rem" }}
            />
            <div
                style={{
                    transform: `rotate(${finalAngle}deg)`,
                    transition: spinning
                        ? "none"
                        : "transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    transitionTimingFunction: spinning
                        ? "linear"
                        : "cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
            >
                <img src={wheel} width="400" alt="Spinning wheel" />
            </div>
        </div>
    );
};

export default SpinningWheel;
