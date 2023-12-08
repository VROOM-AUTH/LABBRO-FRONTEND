import React from "react";

export default function Users({ mergedUsers }) {
    const User = ({ user }) => {
        return (
            <div className="user-container">
                <strong>{user.name}</strong> - Vroomvolts: {user.vroomvolts} In
                Lab:{" "}
                {user.in_lab ? (
                    <span style={{ color: "green" }}>Yes</span>
                ) : (
                    <span>No</span>
                )}
            </div>
        );
    };
    return (
        <div>
            {mergedUsers.map((user) => (
                <User key={user.id} user={user} />
            ))}
        </div>
    );
}
