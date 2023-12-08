import React, { useState } from "react";
import "./Users.css";

export default function Users({ mergedUsers }) {
    const usersInLab = mergedUsers.filter((user) => user.in_lab === true);
    const [showOnlyInLab, setShowOnlyInLab] = useState(false);
    const User = ({ user }) => {
        return (
            <div className="user-container">
                <strong>{user.name}</strong> - Vroomvolts: {user.vroomvolts} In Lab: {user.in_lab ? <span style={{ color: "green" }}>Yes</span> : <span>No</span>}
            </div>
        );
    };
    return (
        <div>
            <button onClick={() => setShowOnlyInLab(!showOnlyInLab)}>Show only users in lab</button>

            {showOnlyInLab ? (
                <div>
                    <h1>Users in lab:</h1>
                    {usersInLab.map((user) => (
                        <User key={user.id} user={user} />
                    ))}
                </div>
            ) : (
                <div>
                    <h1>All Users:</h1>
                    {mergedUsers.map((user) => (
                        <User key={user.id} user={user} />
                    ))}
                </div>
            )}
        </div>
    );
}
