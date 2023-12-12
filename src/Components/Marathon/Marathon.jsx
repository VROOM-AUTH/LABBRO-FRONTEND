import React, { useState } from "react";
import secondsToHoursMins from "../../Utils/secondsToHoursMins";
import "./Marathon.css";
import { RiMedalFill } from "react-icons/ri";
import coin from "../../Assets/coin.png";
export default function Marathon({ userData, mergedUsers }) {
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

    const loggedUserVroomvolts = Array.from(sortedUsersVroomvolts).find((user) => user.id === userData.userId)?.vroomvolts || "";
    const loggedUserPositionVroomvolts = Array.from(sortedUsersVroomvolts).findIndex((user) => user.id === userData.userId);

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
                            <div className='marathon-circle' style={{ scale: "0.85", backgroundColor: "#685F83" }}>
                                <RiMedalFill className='silver-medal' />
                                <div className='circle-info'> {sortedUsersTime[1]?.name || ""}</div>
                                <div className='circle-info-data'>{secondsToHoursMins(parseFloat(sortedUsersTime[1]?.total_seconds))}</div>
                            </div>

                            <div className='marathon-circle'>
                                <RiMedalFill className='gold-medal' />
                                <div className='circle-info'> {sortedUsersTime[0]?.name || ""}</div>
                                <div className='circle-info-data'> {secondsToHoursMins(parseFloat(sortedUsersTime[0]?.total_seconds))}</div>
                            </div>

                            <div className='marathon-circle' style={{ scale: "0.75", backgroundColor: "#223652" }}>
                                <RiMedalFill className='bronze-medal' />
                                <div className='circle-info'> {sortedUsersTime[2]?.name || ""} </div>
                                <div className='circle-info-data'> {secondsToHoursMins(parseFloat(sortedUsersTime[2]?.total_seconds))}</div>
                            </div>
                        </div>

                        <p>
                            You are in position {loggedUserPositionTime + 1} with time {loggedUserTime}
                            {/* The plus 1 is because it is an array indexs */}
                        </p>
                        <p>
                            Leading by {secondsToHoursMins(parseFloat(sortedUsersTime[loggedUserPositionTime]?.total_seconds) - parseFloat(sortedUsersTime[loggedUserPositionTime + 1]?.total_seconds))}
                        </p>
                        {loggedUserPositionTime === 0 ? (
                            <></>
                        ) : (
                            <>
                                <p>
                                    Losing by{" "}
                                    {secondsToHoursMins(parseFloat(sortedUsersTime[loggedUserPositionTime - 1]?.total_seconds) - parseFloat(sortedUsersTime[loggedUserPositionTime]?.total_seconds))}
                                </p>
                                <p> Difference first {secondsToHoursMins(parseFloat(sortedUsersTime[0]?.total_seconds) - parseFloat(sortedUsersTime[loggedUserPositionTime]?.total_seconds))}</p>
                            </>
                        )}
                    </div>
                ) : (
                    <div className='marathon-data-container'>
                        <div className='marathon-circles-container'>
                            <div className='marathon-circle' style={{ scale: "0.85", backgroundColor: "#685F83" }}>
                                <RiMedalFill className='silver-medal' />
                                <div className='circle-info'>{sortedUsersVroomvolts[1]?.name || ""}</div>
                                <div className='circle-info-data'>
                                    {sortedUsersVroomvolts[1]?.vroomvolts || ""} <img src={coin} alt='coin'></img>
                                </div>
                            </div>

                            <div className='marathon-circle'>
                                <RiMedalFill className='gold-medal' />
                                <div className='circle-info'>{sortedUsersVroomvolts[0]?.name || ""}</div>
                                <div className='circle-info-data'>
                                    {" "}
                                    {sortedUsersVroomvolts[0]?.vroomvolts || ""} <img src={coin} alt='coin'></img>
                                </div>
                            </div>

                            <div className='marathon-circle' style={{ scale: "0.75", backgroundColor: "#223652" }}>
                                <RiMedalFill className='bronze-medal' />
                                <div className='circle-info'> {sortedUsersVroomvolts[2]?.name || ""}</div>
                                <div className='circle-info-data'>
                                    {sortedUsersVroomvolts[2]?.vroomvolts || ""} <img src={coin} alt='coin'></img>
                                </div>
                            </div>
                        </div>

                        <p>
                            You are in position {loggedUserPositionVroomvolts + 1} with {loggedUserVroomvolts} Vroomvolts
                            {/* The plus 1 is because it is an array indexs */}
                        </p>
                        <p>Leading by {parseInt(sortedUsersVroomvolts[loggedUserPositionVroomvolts]?.vroomvolts) - parseInt(sortedUsersVroomvolts[loggedUserPositionVroomvolts + 1]?.vroomvolts)}</p>
                        {loggedUserPositionVroomvolts === 0 ? (
                            <></>
                        ) : (
                            <>
                                <p>
                                    Losing by{" "}
                                    {parseInt(sortedUsersVroomvolts[loggedUserPositionVroomvolts - 1]?.vroomvolts) - parseInt(sortedUsersVroomvolts[loggedUserPositionVroomvolts]?.vroomvolts)}
                                </p>
                                <p>
                                    {" "}
                                    Difference first
                                    {parseInt(sortedUsersVroomvolts[0]?.vroomvolts) - parseInt(sortedUsersVroomvolts[loggedUserPositionVroomvolts]?.vroomvolts)}
                                </p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
{
    /* <h1>Top Times:</h1>
<p>{`${sortedUsersTime[0]?.name || ""} with time ${secondsToHoursMins(parseFloat(sortedUsersTime[0]?.total_seconds))} ` || ""}</p>
<p>{`${sortedUsersTime[1]?.name || ""} with time ${secondsToHoursMins(parseFloat(sortedUsersTime[1]?.total_seconds))} ` || ""}</p>
<p>{`${sortedUsersTime[2]?.name || ""} with time ${secondsToHoursMins(parseFloat(sortedUsersTime[2]?.total_seconds))} ` || ""}</p>
<h1>
    You are in position {loggedUserPositionTime} with time {loggedUserTime}
</h1>
<h1>Top Vroomvolts:</h1>
<p>{`${sortedUsersVroomvolts[0]?.name || ""} with vroomvolts ${sortedUsersVroomvolts[0]?.vroomvolts} ` || ""}</p>
<p>{`${sortedUsersVroomvolts[1]?.name || ""} with vroomvolts ${sortedUsersVroomvolts[1]?.vroomvolts} ` || ""}</p>
<p>{`${sortedUsersVroomvolts[2]?.name || ""} with vroomvolts ${sortedUsersVroomvolts[2]?.vroomvolts} ` || ""}</p>
<h1>
    You are in position {loggedUserPositionVroomvolts} with {loggedUserVroomvolts} Vroomvolts
</h1> */
}
