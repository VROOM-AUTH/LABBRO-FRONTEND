import React from "react";

export default function Dashboard({ labStatus }) {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>{labStatus.opened_time}</p>
            <p>{labStatus.closed_time}</p>
            <p>{labStatus.total_seconds}</p>
        </div>
    );
}
