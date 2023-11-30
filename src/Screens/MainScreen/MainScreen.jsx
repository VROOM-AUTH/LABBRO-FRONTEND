import React from "react";
import "./MainScreen.css";

export default function MainScreen({ setUserData, userData }) {
    const handleLogout = (event) => {
        event.preventDefault();
        setTimeout(() => {
            localStorage.removeItem("isLogin");
            setUserData({
                username: "",
                userId: 0,
                isLoggedIn: false,
            });
            localStorage.removeItem("username");
            localStorage.removeItem("userId");
            localStorage.removeItem("isLoggedIn");
        }, 200);
    };

    return (
        <div>
            <h1>Welcome {userData.username}</h1>
            <div onClick={(e) => handleLogout(e)}>LOGOUT</div>
        </div>
    );
}
