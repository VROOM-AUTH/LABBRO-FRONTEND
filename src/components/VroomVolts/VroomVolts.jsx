import React from "react";
import { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./VroomVolts.css";
import coin from "../../assets/coin.png";
import print from "../../assets/3dprint.png";
import print2 from "../../assets/3dprint2.png";
import print3 from "../../assets/3dprint3.png";

const VroomVolts = () => {
    const [userLevel, setUserLevel] = useState(16);
    const [totalVolts, setTotalVolts] = useState(86);
    const [showHowTo, setShowHowTo] = useState(false);

    return (
        <div className="vroom-volts">
            <div className="header-volts">
                <h1>VroomVolts</h1>
                <h1 className="coins">
                    {totalVolts}
                    <img alt="coin" className="coin" src={coin}></img>
                </h1>
            </div>
            <div className="current-level">
                <div className="level-box">
                    <div className="progress-stats-container">
                        <h2>Level {userLevel}</h2>
                        <h2>Level {userLevel + 1}</h2>
                    </div>
                    <div className="progress-bar-container">
                        <ProgressBar bgcolor={"#feb800"} completed={83} />
                    </div>
                    <h2 className="print">
                        Reach level {userLevel + 1} and win this awesome 3d print!
                        <img alt="print" src={print}></img>
                    </h2>
                </div>
            </div>
            <div className="next-levels">
                <div className="level-box">
                    <div className="progress-stats-container">
                        <h2>Level {userLevel + 1}</h2>
                        <h2>Level {userLevel + 2}</h2>
                    </div>
                    <div className="progress-bar-container">
                        <ProgressBar bgcolor={"#feb800"} completed={0} />
                    </div>
                    <h2 className="print">
                        Reach level {userLevel + 2} and win this awesome 3d print!
                        <img alt="print" src={print2}></img>
                    </h2>
                </div>
            </div>
            <div className="next-levels smaller">
                <div className="level-box">
                    <div className="progress-stats-container">
                        <h2>Level {userLevel + 2}</h2>
                        <h2>Level {userLevel + 3}</h2>
                    </div>
                    <div className="progress-bar-container">
                        <ProgressBar bgcolor={"#feb800"} completed={0} />
                    </div>
                    <h2 className="print">
                        Reach level {userLevel + 3} and win this awesome 3d print!
                        <img alt="print" src={print3}></img>
                    </h2>
                </div>
            </div>

            <div className="how-to">
                <button id="myBtn" onClick={() => setShowHowTo(true)}>
                    <p>How do I collect VroomVolts?</p>
                </button>
            </div>
            {showHowTo ? (
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="close"
                                onClick={() => {
                                    setShowHowTo(false);
                                }}
                            >
                                &times;
                            </h1>
                        </div>
                        <div className="modal-body">
                            <p className="modal-title">How to collect VroomVolts:</p>
                            <div className="ways-to-win">
                                <p>1) Check in at the lab every day for 5 days and win 50 VroomVolts.</p>
                                <p>2) For every GitLab commit win 1 VroomVolt.</p>
                                <p>3) Check in at the lab every day for 5 days and win 50 VroomVolts.</p>
                                <p>4) Check in at the lab every day for 5 days and win 50 VroomVolts.</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default VroomVolts;
