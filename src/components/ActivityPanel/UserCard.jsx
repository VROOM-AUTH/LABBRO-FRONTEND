import React from "react";
import "./UserCard.css";
import PROFILE from "../../assets/LabBro_Logo.png";

const UserCard = ({ user = "User 404" }) => {
    return (
        <div className="user-card">
            <div className="profile-pic-container">
                <img src={PROFILE} alt="profile picture" />
            </div>
            <div className="name">{user}</div>
        </div>
    );
};

export default UserCard;
