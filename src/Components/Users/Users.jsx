import React, { useState } from "react";
import "./Users.css";
import coin from "../../Assets/coin.png";
export default function Users({ mergedUsers }) {
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
            <div className="user-container">
                <div className="user-card" onClick={() => setSelectedUser({ name: user.name, id: user.id })}>
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
                        <div className="users-graph-container">
                            Selected user is {selectedUser.name} with id {selectedUser.id}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
