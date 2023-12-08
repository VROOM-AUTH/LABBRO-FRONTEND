import React, { useState } from "react";
import "./Users.css";
import UsersGraph from "./UsersGraph";
import coin from "../../Assets/coin.png";
export default function Users({ mergedUsers, labStatus }) {
    const usersInLab = mergedUsers.filter((user) => user.in_lab === true);
    const [showOnlyInLab, setShowOnlyInLab] = useState(localStorage.getItem("showOnlyInLab") === "true");
    const [selectedUser, setSelectedUser] = useState({ name: "none", id: "0" });
    const toggleShowOnlyInLab = () => {
        const updatedShowOnlyInLab = !showOnlyInLab;
        setShowOnlyInLab(updatedShowOnlyInLab);
        localStorage.setItem("showOnlyInLab", updatedShowOnlyInLab);
    };

    const User = ({ user, index }) => {
        return (
            <div className={selectedUser.name === user.name ? "user-container user-container-active" : "user-container"} onClick={() => setSelectedUser({ name: user.name, id: user.id })}>
                <div className="user-card">
                    <div className="user-card-info" style={{ justifyContent: "flex-start" }}>
                        {user.in_lab ? <div className="green-dot"></div> : <div className="gray-dot"></div>}
                        {user.name}
                    </div>
                    {user.vroomvolts > 0 ? (
                        <div className="user-card-info" style={{ justifyContent: "flex-end" }}>
                            {user.vroomvolts}
                            <img className="coin-menu" src={coin} alt="coin"></img>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        );
    };
    return (
        <div className="users-container">
            <div className="users-content-container">
                <div className="users-title-container">
                    <h1 className="dashboard-title">{showOnlyInLab ? "Users in Lab" : "All Users"}</h1>
                    <div className="users-button" onClick={toggleShowOnlyInLab}>
                        {showOnlyInLab ? "Show All Users" : "Show Users in Lab"}
                    </div>
                </div>
                <div className="users-row">
                    <div className="users-row-centering">
                        {showOnlyInLab ? (
                            <div className="user-list-container">
                                {usersInLab.map((user, index) => (
                                    <User key={user.id} user={user} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="user-list-container">
                                {mergedUsers.map((user, index) => (
                                    <User key={user.id} user={user} index={index} />
                                ))}
                            </div>
                        )}
                        <UsersGraph selectedUser={selectedUser} totalLabHours={labStatus.total_seconds} />
                    </div>
                </div>
            </div>
        </div>
    );
}
