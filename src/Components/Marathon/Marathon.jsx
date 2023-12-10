import React from "react";
import secondsToHoursMins from "../../Utils/secondsToHoursMins";

export default function Marathon({ userData, mergedUsers }) {
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
    const loggedUserPositionTime = Array.from(sortedUsersTime).findIndex((user) => user.id === userData.userId) + 1;

    const loggedUserVroomvolts = Array.from(sortedUsersVroomvolts).find((user) => user.id === userData.userId)?.vroomvolts || "";
    const loggedUserPositionVroomvolts = Array.from(sortedUsersVroomvolts).findIndex((user) => user.id === userData.userId) + 1;

    return (
        <div>
            <h1>Top Times:</h1>
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
            </h1>
        </div>
    );
}
