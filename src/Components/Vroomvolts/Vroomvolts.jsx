import React from "react";
import "./Vroomvolts.css";
import coin from "../../Assets/coin.png";
import { useNavigate } from "react-router-dom";
import { LuFerrisWheel } from "react-icons/lu";
import { CgCardSpades } from "react-icons/cg";
import { GiEightBall } from "react-icons/gi";
export default function Vroomvolts({ userData, mergedUsers, userVroomVolts }) {
    const Navigate = useNavigate();
    return (
        <div className="vroomvolts-container">
            <div className="vroomvolts-content-container">
                <div className="vroomvolts-title-container">
                    <h1 className="vroomvolts-title">Vroomvolts</h1>
                    <h1 className="vroomvolts-title">
                        <div>{userVroomVolts}</div>
                        <img
                            src={coin}
                            className="vroomvolt-img"
                            alt="coin"
                        ></img>
                    </h1>
                </div>

                <div className="games-selection">
                    <div
                        className="game-card"
                        onClick={() => Navigate("/vroomvolts/wheel")}
                    >
                        <LuFerrisWheel className="game-icon" />
                        Wheel of Fortune
                    </div>
                    <div
                        className="game-card"
                        onClick={() => Navigate("/vroomvolts/blackjack")}
                    >
                        <CgCardSpades className="game-icon" />
                        Black Jack
                    </div>
                    <div
                        className="game-card"
                        onClick={() => Navigate("/vroomvolts/roulette")}
                    >
                        <GiEightBall className="game-icon" />
                        Roulette
                    </div>
                </div>
            </div>
        </div>
    );
}
