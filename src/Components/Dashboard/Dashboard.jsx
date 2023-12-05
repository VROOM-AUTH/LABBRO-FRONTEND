import React from "react";
import "./Dashboard.css";
import secondsToHoursMins from "../../Utils/secondsToHoursMins";
import formatDate from "../../Utils/formatDate";
import { FaLock, FaLockOpen } from "react-icons/fa";

export default function Dashboard({ labStatus, mergedUsers }) {
    console.log(mergedUsers);

    return (
        <div className="dashboard-container">
            <div className="dashboard-content-container">
                <div className="dashboard-title-container">
                    <h1 className="dashboard-title">Dashboard</h1>
                    <h1 className="dashboard-lab-status">
                        {labStatus.closed ? <FaLock style={{ marginRight: "0.5rem" }} /> : <FaLockOpen style={{ marginRight: "0.5rem" }} />} Lab is
                        {labStatus.closed ? <span style={{ color: "#fd7cbf", marginLeft: "0.5rem" }}> closed!</span> : <span style={{ color: "#fd7cbf", marginLeft: "0.5rem" }}> open!</span>}
                    </h1>
                </div>

                <p>Opened time is {formatDate(labStatus.opened_time)}</p>
                <p>{labStatus.closed_time === "Lab Still Open" ? "Lab is Open" : `Lab closed ${formatDate(labStatus.closed_time)}`}</p>
                <p>Total lab time is {secondsToHoursMins(labStatus.total_seconds)}</p>
                <p></p>
            </div>
        </div>
    );
}
