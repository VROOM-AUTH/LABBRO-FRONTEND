import React from "react";
import "./Dashboard.css";
import secondsToHoursMins from "../../Utils/secondsToHoursMins";
import formatDate from "../../Utils/formatDate";
import { FaLock, FaLockOpen, FaClock, FaRegCalendarAlt } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaDoorClosed } from "react-icons/fa6";
import UsersBarChart from "../BarChart/UsersBarChart";

export default function Dashboard({ labStatus, mergedUsers }) {
    const labCount = mergedUsers.filter((item) => item.in_lab).length;
    const totalUsers = mergedUsers.length;

    return (
        <div className="dashboard-container">
            <div className="dashboard-content-container">
                <div className="dashboard-title-container">
                    <h1 className="dashboard-title">Dashboard</h1>
                    <h1 className="dashboard-lab-status">
                        {labStatus.closed ? <FaLock style={{ marginRight: "0.5rem" }} /> : <FaLockOpen style={{ marginRight: "0.5rem" }} />} Lab is
                        {labStatus.closed ? (
                            <span
                                style={{
                                    color: "#fd7cbf",
                                    marginLeft: "0.5rem",
                                }}
                            >
                                {" "}
                                closed!
                            </span>
                        ) : (
                            <span
                                style={{
                                    color: "#fd7cbf",
                                    marginLeft: "0.5rem",
                                }}
                            >
                                {" "}
                                open!
                            </span>
                        )}
                    </h1>
                </div>

                <div className="dashboard-cards-container">
                    <div className="dashboard-card">
                        <FaClock className="card-icon" />
                        <p className="card-text">{secondsToHoursMins(labStatus.total_seconds)}</p>
                        <p className="card-text-secondary">Total open time</p>
                    </div>

                    <div className="dashboard-card">
                        <IoPerson className="card-icon" />
                        <p className="card-text">
                            {labCount} <span style={{ color: "#fff" }}>out of </span>
                            {totalUsers}
                        </p>
                        <p className="card-text-secondary">Users in lab</p>
                    </div>
                    <div className="dashboard-card">
                        <FaRegCalendarAlt className="card-icon" />
                        <p className="card-text">{formatDate(labStatus.opened_time)}</p>
                        <p className="card-text-secondary">Lab last opened</p>
                    </div>
                    <div className="dashboard-card">
                        <FaDoorClosed className="card-icon" />
                        <p className="card-text">{labStatus.closed_time === "Lab Still Open" ? "Still open!" : `${formatDate(labStatus.closed_time)}`}</p>
                        <p className="card-text-secondary">Lab last closed</p>
                    </div>
                </div>
                <UsersBarChart data={mergedUsers} />
            </div>
        </div>
    );
}
