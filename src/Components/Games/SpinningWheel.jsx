import React, { useState } from "react";
import wheel from "../../Assets/VroomWheel.webp";
import arrowDown from "../../Assets/wheelArrow.png";
import "./SpinningWheel.css";
import coin from "../../Assets/coin.png";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SpinningWheel = ({ userVroomVolts, setUserVroomVolts, userData }) => {
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

    // State to store the selected prize
    const [prize, setPrize] = useState("");

    // State to store the spinning status of the wheel
    const [spinning, setSpinning] = useState(false);

    // Array of possible prizes
    let prizes = ["1", "2", "3", "4", "5"];

    // Function to handle the spinning wheel
    const spin = () => {
        // Generate a random index to select a prize
        fetchVroomvolts().then(() => {
            setUserVroomVolts((prev) => prev - 5);
            setSpinning(true);
            const randomIndex = Math.floor(Math.random() * prizes.length);
            setPrize(prizes[randomIndex]);
            // Update the prize state with the randomly selected prize
            if (prizes[randomIndex] === "1") {
                setTimeout(() => {
                    setSpinning(false);

                    setUserVroomVolts((prev) => prev + 500);
                }, 5000);
            } else if (prizes[randomIndex] === "2") {
                setTimeout(() => {
                    setSpinning(false);

                    setUserVroomVolts((prev) =>
                        prev - 500 > 0 ? prev - 500 : 0
                    );
                }, 5000);

                prizes = ["2", "3", "4", "5", "1"];
            } else if (prizes[randomIndex] === "3") {
                setTimeout(() => {
                    setSpinning(false);
                    setUserVroomVolts((prev) => prev + 25);
                }, 5000);

                prizes = ["3", "4", "5", "1", "2"];
            } else if (prizes[randomIndex] === "4") {
                setTimeout(() => {
                    setSpinning(false);
                    setUserVroomVolts((prev) =>
                        prev - 25 > 0 ? prev - 25 : 0
                    );
                }, 5000);

                prizes = ["4", "5", "1", "2", "3"];
            } else if (prizes[randomIndex] === "5") {
                setTimeout(() => {
                    setSpinning(false);
                    setUserVroomVolts((prev) => prev + 10); //////////////
                }, 5000);

                prizes = ["5", "1", "2", "3", "4"];
            }
        });
        // Set the spinning status to true
        // setSpinning(true);
    };
    const finalAngle =
        Math.floor(Math.floor(Math.random() * (50 - 20 + 1)) + 20) * 360 +
        72 * prizes.indexOf(prize);

    return (
        <div className="spinning-wheel-container">
            <div className="spinning-wheel-content-container">
                <div className="spinning-wheel-title">
                    <IoArrowBackCircle
                        className="return-back"
                        onClick={() => {
                            Navigate("/vroomvolts");
                        }}
                    />
                    <div className="wheel-title-group">
                        <h1>{userVroomVolts}</h1>{" "}
                        <img src={coin} alt="coin"></img>
                    </div>
                </div>
                <div className="wheel-instructions">
                    Each spin costs 5 Vroomvolts!
                </div>
                <div className="wheel-and-arrow">
                    <img
                        src={arrowDown}
                        alt="arrow"
                        width="50"
                        style={{ marginTop: "1rem" }}
                    />
                    <img
                        style={{
                            transform: `rotate(${finalAngle}deg)`,
                            transition: !spinning
                                ? "none"
                                : "transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)",
                            // transitionTimingFunction: !spinning
                            //     ? "linear"
                            //     : "cubic-bezier(0.25, 0.1, 0.25, 1)",
                        }}
                        src={wheel}
                        className="spinning-wheel"
                        // width="70%"
                        alt="Spinning wheel"
                    />
                </div>
                <div className="wheel-button-container">
                    {userVroomVolts >= 5 ? (
                        <button
                            disabled={spinning}
                            onClick={spin}
                            className="wheel-spin-button"
                            id="spin-button"
                        >
                            GO
                        </button>
                    ) : (
                        <div className="wheel-not-enough">
                            You don't have enough Vroomvolts for a spin.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SpinningWheel;
