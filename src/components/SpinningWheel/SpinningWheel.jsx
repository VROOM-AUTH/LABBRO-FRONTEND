import React, { useState, useEffect } from "react";
import wheel from "../../assets/VroomWheel.png";
import arrowDown from "../../assets/wheelArrow.png";
import "./SpinningWheel.css";
const SpinningWheel = ({ totalUserVolts, setTotalUserVolts }) => {
    // State to store the selected prize
    const [prize, setPrize] = useState("");
    // State to store the spinning status of the wheel
    const [spinning, setSpinning] = useState(false);
    // State to store the angle of the wheel
    const [angle, setAngle] = useState(0);

    // Array of possible prizes
    let prizes = ["1", "2", "3", "4", "5"];

    // Function to handle the spinning wheel
    const spin = () => {
        // Generate a random index to select a prize
        const randomIndex = Math.floor(Math.random() * prizes.length);
        setPrize(prizes[randomIndex]);
        // Update the prize state with the randomly selected prize
        console.log(totalUserVolts);
        if (prize === "1") {
            setTotalUserVolts(totalUserVolts - 25);
            // setTotalUserVolts(totalUserVolts * 2);
            console.log("case 1" + totalUserVolts);
        } else if (prize === "2") {
            setTotalUserVolts(totalUserVolts + 25);
            prizes = ["2", "3", "4", "5", "1"];
            console.log("case 2" + totalUserVolts);
        } else if (prize === "3") {
            setTotalUserVolts(Math.floor(totalUserVolts / 2) + 1);
            prizes = ["3", "4", "5", "1", "2"];

            // setTotalUserVolts(totalUserVolts - 25);
            console.log("case 3" + totalUserVolts);
        } else if (prize === "4") {
            setTotalUserVolts(totalUserVolts * 2);
            prizes = ["4", "5", "1", "2", "3"];

            // setTotalUserVolts(totalUserVolts + 25);
            console.log("case 4" + totalUserVolts);
        } else if (prize === "5") {
            setTotalUserVolts(totalUserVolts + 10);
            prizes = ["5", "1", "2", "3", "4"];
            // setTotalUserVolts(Math.floor(totalUserVolts / 2) + 1);
            console.log("case 5" + totalUserVolts);
        }

        // Set the spinning status to true
        // setSpinning(true);
    };
    const finalAngle =
        Math.floor(Math.floor(Math.random() * (50 - 20 + 1)) + 20) * 360 +
        72 * prizes.indexOf(prize);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <h1 style={{ margin: "1rem" }}>
                Every wheel spin costs 5 VroomVolts!
            </h1>
            <button
                onClick={spin}
                disabled={spinning}
                className="mainButton"
                style={{ color: "white", fontSize: 20, marginTop: 0 }}
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
                <img src={wheel} width="700" alt="Spinning wheel" />
            </div>
        </div>
    );
};

export default SpinningWheel;
