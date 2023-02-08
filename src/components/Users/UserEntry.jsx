import React from "react";
import "./UserEntry.css";
import coin from "../../assets/coin.png";
import { useState } from "react";
import { useEffect } from "react";
import UserAreaChart from "./UserAreaChart";
import arrowUser from "../../assets/arrow_user.png";

const UserEntry = ({ user_id, userData, index }) => {
    const [userName, setUserName] = useState("");
    const [userVroomvolts, setUserVroomvolts] = useState(0);
    const [inLab, setInLab] = useState(false);
    const [charts, setCharts] = useState(false);
    // const [totalLabSeconds, setTotalLabSeconds] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}users/?user_id=${user_id}`, {
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
                setUserName(data[0].name);
            })
            .catch((error) => console.log(error));

        fetch(
            `${process.env.REACT_APP_BASE_URL}users-levels/?user_id=${user_id}`,
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
                setUserVroomvolts(data[0].vroomvolts);
            })
            .catch((error) => console.log(error));

        fetch(
            `${process.env.REACT_APP_BASE_URL}users-time/?user_id=${user_id}`,
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
                if (data.in_lab === true) {
                    setInLab(true);
                } else {
                    setInLab(false);
                }
            })
            .catch((error) => console.log(error));

        // SOME BUG HERE, REVIEW AFTER DEPLOY
        // fetch(`${process.env.REACT_APP_BASE_URL}session-duration/`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
        //     },
        // })
        //     .then((response) => {
        //         if (response.ok) {
        //             return response.json();
        //         }
        //         throw response;
        //     })
        //     .then((data) => {
        //         let tmp_total = 0;
        //         for (let entry of data) {
        //             tmp_total += +entry.session_seconds;
        //         }
        //         setTotalLabSeconds(tmp_total);
        //     })
        //     .catch((error) => console.log(error));
        // eslint-disable-next-line
    }, []);

    return (
        <div className="entry-container">
            <div
                className="entry-header"
                onClick={() => {
                    setCharts((prev) => !prev);
                    document
                        .getElementById(index)
                        .classList.toggle("user-arrow-rotated");
                }}
            >
                <img
                    src={arrowUser}
                    className="user-arrow"
                    alt="arrow"
                    id={index}
                />
                <div className="user-icon-con">
                    {userData.isLoggedIn ? (
                        <div className="user-icon">
                            <svg className={inLab ? "circle-hidden" : "circle"}>
                                <circle
                                    fill="#ff0000"
                                    stroke="none"
                                    cx="50%"
                                    cy="50%"
                                    r="12"
                                >
                                    <animate
                                        attributeName="opacity"
                                        dur="3s"
                                        values="0;1;0"
                                        repeatCount="indefinite"
                                        begin="0.1"
                                    />
                                </circle>
                            </svg>
                            <svg className={inLab ? "circle" : "circle-hidden"}>
                                <circle
                                    fill="#00ff00"
                                    stroke="none"
                                    cx="50%"
                                    cy="50%"
                                    r="12"
                                >
                                    <animate
                                        attributeName="opacity"
                                        dur="3s"
                                        values="0;1;0"
                                        repeatCount="indefinite"
                                        begin="0.1"
                                    />
                                </circle>
                            </svg>
                            <span
                                className={inLab ? "status" : "status-hidden"}
                            >
                                In Lab
                            </span>
                            <span
                                className={inLab ? "status-hidden" : "status"}
                            >
                                Out of Lab
                            </span>
                        </div>
                    ) : (
                        <div>{+index + 1}</div>
                    )}
                </div>
                <div className="user-name-con">
                    <div className="user-name">{userName}</div>
                </div>
                <div className="total-vroomvolts-con">
                    <div className="total-vroomvolts">
                        {userVroomvolts} <img src={coin} alt="vroomvolts" />
                    </div>
                </div>
            </div>
            <div className={charts ? "user-charts" : "user-charts-hidden"}>
                <UserAreaChart
                    user_id={user_id}
                    // total_lab_seconds={totalLabSeconds}
                />
            </div>
        </div>
    );
};

export default UserEntry;
