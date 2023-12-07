import React from "react";
import secondsToHoursMins from "../../Utils/secondsToHoursMins";

export default function Marathon({ userData, mergedUsers }) {
    const sortedUsers = mergedUsers
        .map((item) => ({
            ...item,
            total_seconds: parseFloat(item.total_seconds),
        }))
        .sort((a, b) => b.total_seconds - a.total_seconds);

    //find the user's time and position
    const loggedUserTime = secondsToHoursMins(parseFloat(Array.from(sortedUsers).find((user) => user.id === userData.userId).total_seconds));
    const loggedUserPosition = Array.from(sortedUsers).findIndex((user) => user.id === userData.userId) + 1;

    return (
        <div>
            <h1>Top Times:</h1>
            <p>{`${sortedUsers[0].name || ""} with time ${secondsToHoursMins(parseFloat(sortedUsers[0].total_seconds))} ` || ""}</p>
            <p>{`${sortedUsers[1].name || ""} with time ${secondsToHoursMins(parseFloat(sortedUsers[1].total_seconds))} ` || ""}</p>
            <p>{`${sortedUsers[2].name || ""} with time ${secondsToHoursMins(parseFloat(sortedUsers[2].total_seconds))} ` || ""}</p>
            <h1>
                You are in position {loggedUserPosition} with time {loggedUserTime}{" "}
            </h1>
        </div>
    );
}
