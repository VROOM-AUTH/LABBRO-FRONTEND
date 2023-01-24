import React, { useEffect, useState } from "react";
import "./UserCard.css";
import PROFILE from "../../assets/LabBro_Logo.png";

const UserCard = ({ user = "User 404", index, timestamp, isLoggedIn }) => {
    const [opacity, setOpacity] = useState(0.5);

    useEffect(() => {
        switch (index) {
            case 0:
                setOpacity(1.0);
                break;
            case 1:
                setOpacity(0.9);
                break;
            case 2:
                setOpacity(0.85);
                break;
            case 3:
                setOpacity(0.8);
                break;
        }
    }, []);

    return (
        <div className="user-card" style={{ opacity: opacity }}>
            <div className="profile-pic-container">
                <img src={PROFILE} alt="profile picture" />
            </div>
            <div className="name">{user}</div>
            {isLoggedIn ? <div className="timestamp">{timestamp}</div> : <></>}
        </div>
    );
};

export default UserCard;
