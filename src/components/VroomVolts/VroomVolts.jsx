import React from "react";
import { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./VroomVolts.css";
import coin from "../../assets/coin.png";
import print from "../../assets/3dprint.png";
import print2 from "../../assets/3dprint2.png";
import print3 from "../../assets/3dprint3.png";
import { useEffect } from "react";
import SpinningWheel from "../SpinningWheel/SpinningWheel";
import { useNavigate } from "react-router-dom";

const VroomVolts = ({ userData }) => {
    const [userLevel, setUserLevel] = useState(1);
    const [totalUserVolts, setTotalUserVolts] = useState(1);
    const [showHowTo, setShowHowTo] = useState(false);
    const [lucky, setLucky] = useState(false);
    const [levelMax, setLevelMax] = useState(2000);
    const [firstFetch, setFirstFetch] = useState(true);
    const Navigate = useNavigate();

    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_BASE_URL}users-levels/?user_id=${userData.userId}`,
            {
                method: "GET",
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
                },
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setTotalUserVolts(data.vroomvolts);
                setFirstFetch(false);
            });
    }, []);
    const putVroomvolts = () => {
        return new Promise((resolve, reject) => {
            fetch(
                `${process.env.REACT_APP_BASE_URL}users-levels/${userData.userId}`,
                {
                    method: "PUT",
                    headers: {
                        // "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                        Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
                    },
                    body: JSON.stringify({
                        vroomvolts: totalUserVolts,
                        should_update: 0,
                    }),
                }
            )
                .then((response) => {
                    if (response.ok) {
                        resolve();
                    } else {
                        reject(response);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const fetchVroomvolts = () => {
        fetch(
            `${process.env.REACT_APP_BASE_URL}users-levels/?user_id=${userData.userId}`,
            {
                method: "GET",
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
                },
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                console.log("Fetched vroomvolts value:", data);
                setTotalUserVolts(data[0].vroomvolts);
            });
    };
    useEffect(() => {
        if (!firstFetch) {
            putVroomvolts().then(fetchVroomvolts);
        }
    }, [totalUserVolts]);

    fetch(`${process.env.REACT_APP_BASE_URL}vroomvolts/`, {
        method: "GET",
        headers: {
            // "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        })
        .then((data) => {
            if (data[0].vroomvolts > totalUserVolts) {
                setUserLevel(data[0].id);
                setLevelMax(data[0].vroomvolts);
            } else if (data[1].vroomvolts > totalUserVolts) {
                setUserLevel(data[1].id);
                setLevelMax(data[1].vroomvolts);
            } else if (data[2].vroomvolts > totalUserVolts) {
                setUserLevel(data[2].id);
                setLevelMax(data[2].vroomvolts);
            } else if (data[3].vroomvolts > totalUserVolts) {
                setUserLevel(data[3].id);
                setLevelMax(data[3].vroomvolts);
            } else if (data[4].vroomvolts > totalUserVolts) {
                setUserLevel(data[4].id);
                setLevelMax(data[4].vroomvolts);
            }
        });

    return (
        <div className="vroom-volts">
            {userData.username === "" ? (
                <div className="nonlogin">
                    <h1>Please Login to view your Vroomvolts</h1>
                    <button
                        className="mainButton h3 menu-login"
                        onClick={() => Navigate("/login")}
                    >
                        Login
                    </button>
                </div>
            ) : (
                <>
                    <div className="header-volts">
                        <h1>VroomVolts</h1>
                        <h1 className="coins">
                            {totalUserVolts}
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
                                <ProgressBar
                                    bgcolor={"#feb800"}
                                    completed={
                                        (totalUserVolts / levelMax) * 100
                                    }
                                    totalUserVolts={totalUserVolts}
                                    levelMax={levelMax}
                                    isCurrentLevel={true}
                                />
                            </div>
                            <h2 className="print">
                                Reach level {userLevel + 1} and win this awesome
                                3d print!
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
                                <ProgressBar
                                    bgcolor={"#feb800"}
                                    completed={0}
                                    totalUserVolts={totalUserVolts}
                                    levelMax={levelMax}
                                    isCurrentLevel={false}
                                />
                            </div>
                            <h2 className="print">
                                Reach level {userLevel + 2} and win this awesome
                                3d print!
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
                                <ProgressBar
                                    bgcolor={"#feb800"}
                                    completed={0}
                                    levelMax={levelMax}
                                    totalUserVolts={totalUserVolts}
                                    isCurrentLevel={false}
                                />
                            </div>
                            <h2 className="print">
                                Reach level {userLevel + 3} and win this awesome
                                3d print!
                                <img alt="print" src={print3}></img>
                            </h2>
                        </div>
                    </div>

                    <div className="how-to">
                        <button id="myBtn" onClick={() => setLucky(true)}>
                            <p>I'm feeling lucky!?</p>
                        </button>
                        <button id="myBtn" onClick={() => setShowHowTo(true)}>
                            <p>How do I collect VroomVolts?</p>
                        </button>
                    </div>
                </>
            )}

            {showHowTo ? (
                <div id="myModal" className="modal">
                    <div className="modal-content how">
                        <div className="modal-header-how">
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
                            <p className="modal-title">
                                How to collect VroomVolts:
                            </p>
                            <div className="ways-to-win">
                                <p>
                                    1) Every time you check in at the lab you
                                    gain 5 VroomVolts!
                                </p>
                                <p>
                                    2) If you check in 3 days in a row you gain
                                    a 1.5x multiplier for every next check in!
                                </p>
                                <p>
                                    3) If you check in 6 days in a row you gain
                                    a 2x multiplier for every next check in!
                                </p>
                                <p>
                                    4) If you check in 10 days in a row you gain
                                    a 4x multiplier for every next check in!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}

            {lucky ? (
                <div id="myModal" className="modal">
                    <div className="modal-content lucky">
                        <div className="modal-header">
                            <h1 className="modal-title-lucky">
                                Take a spin! It costs 5 VroomVolts.
                            </h1>
                            <div className="row">
                                <h1 style={{ justifySelf: "flex-end" }}>
                                    {totalUserVolts}
                                </h1>
                                <img
                                    alt="coin"
                                    style={{
                                        width: "30px",
                                        marginLeft: "3px",
                                        marginRight: "3rem",
                                    }}
                                    src={coin}
                                ></img>
                                <h1
                                    className="close"
                                    onClick={() => {
                                        setLucky(false);
                                    }}
                                >
                                    &times;
                                </h1>
                            </div>
                        </div>
                        <div className="modal-body">
                            <SpinningWheel
                                totalUserVolts={totalUserVolts}
                                setTotalUserVolts={setTotalUserVolts}
                                userData={userData}
                            />
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
