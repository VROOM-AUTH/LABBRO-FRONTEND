import React, { useEffect, useState } from "react";
import secondsToHoursMins from "../../Utils/secondsToHoursMins";
import "./Marathon.css";
import { RiMedalFill } from "react-icons/ri";
import coin from "../../Assets/coin.png";
import { useNavigate } from "react-router-dom";
export default function Marathon({ userData, mergedUsers, setSelectedUser, userVroomVolts }) {
    const Navigate = useNavigate();

    const [activeSwitch, setActiveSwitch] = useState(1);

    const sortedUsersTime = mergedUsers
        .map((item) => ({
            ...item,
            total_seconds: parseFloat(item.total_seconds),
        }))
        .sort((a, b) => b.total_seconds - a.total_seconds);
    const sortedUsersVroomvolts = mergedUsers
        .map((item) => ({
            ...item,
            vroomvolts: parseFloat(item.vroomvolts),
        }))
        .sort((a, b) => b.vroomvolts - a.vroomvolts);

    //find the user's time and position
    const loggedUserTime = secondsToHoursMins(parseFloat(Array.from(sortedUsersTime).find((user) => user.id === userData.userId)?.total_seconds)) || "";
    const loggedUserPositionTime = Array.from(sortedUsersTime).findIndex((user) => user.id === userData.userId);

    const [loggedUserVroomvolts, setLoggedUserVroomvolts] = useState(userVroomVolts);
    const loggedUserPositionVroomvolts = Array.from(sortedUsersVroomvolts).findIndex((user) => user.id === userData.userId);

    useEffect(() => {
        setLoggedUserVroomvolts(userVroomVolts);
    }, [userVroomVolts]);
    return (
        <div className='marathon-container'>
            <div className='marathon-content-container'>
                <div className='marathon-title-container'>
                    <div className='marathon-title'>Marathon</div>
                </div>
                <div className='marathon-switch-container'>
                    <div
                        className={activeSwitch === 1 ? "marathon-switch-active" : "marathon-switch"}
                        onClick={() => {
                            setActiveSwitch(1);
                        }}
                    >
                        <div className='marathon-option'>Time Leaderboard</div>
                    </div>
                    <div
                        className={activeSwitch === 2 ? "marathon-switch-active" : "marathon-switch"}
                        onClick={() => {
                            setActiveSwitch(2);
                        }}
                    >
                        <div className='marathon-option'>Vroomvolts Leaderboard</div>
                    </div>
                </div>
                {activeSwitch === 1 ? (
                    <div className='marathon-data-container'>
                        <div className='marathon-circles-container'>
                            <div
                                className='marathon-circle'
                                style={{ scale: "0.85", backgroundColor: "#404563" }}
                                onClick={() => {
                                    setSelectedUser({ name: sortedUsersTime[1]?.name, id: parseInt(sortedUsersTime[1]?.id) });
                                    Navigate("/users");
                                }}
                            >
                                <RiMedalFill className='silver-medal' />
                                <div className='circle-info'> {sortedUsersTime[1]?.name || ""}</div>
                                <div className='circle-info-data'>{secondsToHoursMins(parseFloat(sortedUsersTime[1]?.total_seconds))}</div>
                            </div>

                            <div
                                className='marathon-circle'
                                onClick={() => {
                                    setSelectedUser({ name: sortedUsersTime[0]?.name, id: parseInt(sortedUsersTime[0]?.id) });
                                    Navigate("/users");
                                }}
                            >
                                <RiMedalFill className='gold-medal' />
                                <div className='circle-info'> {sortedUsersTime[0]?.name || ""}</div>
                                <div className='circle-info-data'> {secondsToHoursMins(parseFloat(sortedUsersTime[0]?.total_seconds))}</div>
                            </div>

                            <div
                                className='marathon-circle'
                                style={{ scale: "0.75", backgroundColor: "#223652" }}
                                onClick={() => {
                                    setSelectedUser({ name: sortedUsersTime[2]?.name, id: parseInt(sortedUsersTime[2]?.id) });
                                    Navigate("/users");
                                }}
                            >
                                <RiMedalFill className='bronze-medal' />
                                <div className='circle-info'> {sortedUsersTime[2]?.name || ""} </div>
                                <div className='circle-info-data'> {secondsToHoursMins(parseFloat(sortedUsersTime[2]?.total_seconds))}</div>
                            </div>
                        </div>
                        <div className='marathon-more-info-container'>
                            <p style={{ fontSize: "1.8rem" }}>
                                You are in position <span style={{ color: "#e971e3" }}>{loggedUserPositionTime + 1}</span> with time <span style={{ color: "#e971e3" }}>{loggedUserTime}</span>
                                {/* The plus 1 is because it is an array indexs */}
                            </p>
                            <p>
                                You are leading by{" "}
                                <span style={{ color: "#3bff0f" }}>
                                    +{secondsToHoursMins(parseFloat(sortedUsersTime[loggedUserPositionTime]?.total_seconds) - parseFloat(sortedUsersTime[loggedUserPositionTime + 1]?.total_seconds))}
                                </span>
                            </p>
                            {loggedUserPositionTime === 0 ? (
                                <></>
                            ) : (
                                <>
                                    <p>
                                        You are losing by{" "}
                                        <span style={{ color: "#ff0f0f" }}>
                                            -
                                            {secondsToHoursMins(
                                                parseFloat(sortedUsersTime[loggedUserPositionTime - 1]?.total_seconds) - parseFloat(sortedUsersTime[loggedUserPositionTime]?.total_seconds)
                                            )}
                                        </span>
                                    </p>
                                    <p>
                                        You are{" "}
                                        <span style={{ color: "#ff0f0f" }}>
                                            {secondsToHoursMins(parseFloat(sortedUsersTime[0]?.total_seconds) - parseFloat(sortedUsersTime[loggedUserPositionTime]?.total_seconds))}
                                        </span>{" "}
                                        behind {sortedUsersTime[0]?.name}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className='marathon-data-container'>
                        <div className='marathon-circles-container'>
                            <div
                                className='marathon-circle'
                                style={{ scale: "0.85", backgroundColor: "#404563" }}
                                onClick={() => {
                                    setSelectedUser({ name: sortedUsersVroomvolts[1]?.name, id: parseInt(sortedUsersVroomvolts[1]?.id) });
                                    Navigate("/users");
                                }}
                            >
                                <RiMedalFill className='silver-medal' />
                                <div className='circle-info'>{sortedUsersVroomvolts[1]?.name || ""}</div>
                                <div className='circle-info-data'>
                                    {sortedUsersVroomvolts[1]?.vroomvolts || ""} <img src={coin} alt='coin'></img>
                                </div>
                            </div>

                            <div
                                className='marathon-circle'
                                onClick={() => {
                                    setSelectedUser({ name: sortedUsersVroomvolts[0]?.name, id: parseInt(sortedUsersVroomvolts[0]?.id) });
                                    Navigate("/users");
                                }}
                            >
                                <RiMedalFill className='gold-medal' />
                                <div className='circle-info'>{sortedUsersVroomvolts[0]?.name || ""}</div>
                                <div className='circle-info-data'>
                                    {" "}
                                    {sortedUsersVroomvolts[0]?.vroomvolts || ""} <img src={coin} alt='coin'></img>
                                </div>
                            </div>

                            <div
                                className='marathon-circle'
                                style={{ scale: "0.75", backgroundColor: "#223652" }}
                                onClick={() => {
                                    setSelectedUser({ name: sortedUsersVroomvolts[2]?.name, id: parseInt(sortedUsersVroomvolts[2]?.id) });
                                    Navigate("/users");
                                }}
                            >
                                <RiMedalFill className='bronze-medal' />
                                <div className='circle-info'> {sortedUsersVroomvolts[2]?.name || ""}</div>
                                <div className='circle-info-data'>
                                    {sortedUsersVroomvolts[2]?.vroomvolts || ""} <img src={coin} alt='coin'></img>
                                </div>
                            </div>
                        </div>
                        <div className='marathon-more-info-container'>
                            <p style={{ fontSize: "1.8rem" }}>
                                You are in position <span style={{ color: "#FFB901" }}>{loggedUserPositionVroomvolts + 1}</span> with <span style={{ color: "#FFB901" }}>{loggedUserVroomvolts}</span>{" "}
                                Vroomvolts
                                {/* The plus 1 is because it is an array indexs */}
                            </p>
                            <p>
                                You are leading by{" "}
                                <span style={{ color: "#3bff0f" }}>+{parseInt(loggedUserVroomvolts) - parseInt(sortedUsersVroomvolts[loggedUserPositionVroomvolts + 1]?.vroomvolts)}</span> Vroomvolts
                            </p>
                            {loggedUserPositionVroomvolts === 0 ? (
                                <></>
                            ) : (
                                <>
                                    <p>
                                        You are losing by{" "}
                                        <span style={{ color: "#ff0f0f" }}>-{parseInt(sortedUsersVroomvolts[loggedUserPositionVroomvolts - 1]?.vroomvolts) - parseInt(loggedUserVroomvolts)}</span>{" "}
                                        Vroomvolts
                                    </p>
                                    <p>
                                        You are <span style={{ color: "#ff0f0f" }}>{parseInt(sortedUsersVroomvolts[0]?.vroomvolts) - parseInt(loggedUserVroomvolts)}</span> Vroomvolts behind{" "}
                                        {sortedUsersVroomvolts[0]?.name}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
