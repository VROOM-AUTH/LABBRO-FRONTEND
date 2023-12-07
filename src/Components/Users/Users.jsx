import React from "react";

export default function Users({ mergedUsers }) {
    const User = ({ user }) => {
        return (
            <div className="user-container">
                <strong>{user.name}</strong> - Vroomvolts: {user.vroomvolts}
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
