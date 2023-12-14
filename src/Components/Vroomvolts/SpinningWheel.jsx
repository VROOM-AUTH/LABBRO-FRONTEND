import React, { useState } from "react";
import wheel from "../../Assets/VroomWheel.webp";
import arrowDown from "../../Assets/wheelArrow.png";
// import "./SpinningWheel.css";
const SpinningWheel = () => {
    const [totalUserVolts, setTotalUserVolts] = useState(500);

    // State to store the selected prize
    const [prize, setPrize] = useState("");

    // State to store the spinning status of the wheel
    const [spinning, setSpinning] = useState(false);

    // Array of possible prizes
    let prizes = ["1", "2", "3", "4", "5"];

    // Function to handle the spinning wheel
    const spin = () => {
        // Generate a random index to select a prize
        setTotalUserVolts((prev) => prev - 5);
        setSpinning(true);
        const randomIndex = Math.floor(Math.random() * prizes.length);
        setPrize(prizes[randomIndex]);
        // Update the prize state with the randomly selected prize
        if (prizes[randomIndex] === "1") {
            setTimeout(() => {
                setSpinning(false);

                setTotalUserVolts((prev) => prev * 2);
            }, 5000);

            // setTotalUserVolts(totalUserVolts * 2);
            console.log("case 1" + totalUserVolts);
        } else if (prizes[randomIndex] === "2") {
            // setTotalUserVolts(totalUserVolts + 25);
            setTimeout(() => {
                setSpinning(false);

                setTotalUserVolts((prev) => Math.floor(prev / 2)); /////////
            }, 5000);

            prizes = ["2", "3", "4", "5", "1"];
            console.log("case 2" + totalUserVolts);
        } else if (prizes[randomIndex] === "3") {
            // setTotalUserVolts(Math.floor(totalUserVolts / 2) + 1); //////////
            setTimeout(() => {
                setSpinning(false);
                setTotalUserVolts((prev) => prev + 25);
            }, 5000);

            prizes = ["3", "4", "5", "1", "2"];

            // setTotalUserVolts(totalUserVolts - 25);
            console.log("case 3" + totalUserVolts);
        } else if (prizes[randomIndex] === "4") {
            setTimeout(() => {
                setSpinning(false);
                if (totalUserVolts - 25 < 0) {
                    setTotalUserVolts(0);
                } else {
                    setTotalUserVolts((prev) => prev - 25);
                }
            }, 5000);

            prizes = ["4", "5", "1", "2", "3"];

            // setTotalUserVolts(totalUserVolts + 25);
            console.log("case 4" + totalUserVolts);
        } else if (prizes[randomIndex] === "5") {
            setTimeout(() => {
                setSpinning(false);
                setTotalUserVolts((prev) => prev + 10); //////////////
            }, 5000);

            prizes = ["5", "1", "2", "3", "4"];
            // setTotalUserVolts(Math.floor(totalUserVolts / 2) + 1);
            console.log("case 5" + totalUserVolts);
        }

        // Set the spinning status to true
        // setSpinning(true);
    };
    const finalAngle = Math.floor(Math.floor(Math.random() * (50 - 20 + 1)) + 20) * 360 + 72 * prizes.indexOf(prize);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                {totalUserVolts >= 5 ? (
                    <button
                        disabled={spinning}
                        onClick={spin}
                        className='mainButton'
                        id='spin-button'
                        style={{
                            color: "white",
                            fontSize: 20,
                            marginTop: "1rem",
                            zIndex: 10,
                        }}
                    >
                        Spin!
                    </button>
                ) : (
                    <div>You don't have enough VroomVolts for a spin.</div>
                )}
            </div>

            <img src={arrowDown} alt='arrow' width='50' style={{ marginTop: "1rem" }} />
            <div
                style={{
                    transform: `rotate(${finalAngle}deg)`,
                    transition: !spinning ? "none" : "transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    // transitionTimingFunction: !spinning
                    //     ? "linear"
                    //     : "cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
            >
                <img
                    src={wheel}
                    className='spinning-wheel'
                    // width="70%"
                    alt='Spinning wheel'
                />
            </div>
        </div>
    );
};

export default SpinningWheel;
