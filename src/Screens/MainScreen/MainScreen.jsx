import React from "react";
import "./MainScreen.css";

export default function MainScreen({ setIsLogin }) {
    const handleLogout = (event) => {
        event.preventDefault();
        setTimeout(() => {
            localStorage.removeItem("isLogin");
            setIsLogin((prevIsLogin) => !prevIsLogin);
        }, 200);
    };

    return (
        <div>
            MainScreen
            <div onClick={(e) => handleLogout(e)}>LOGOUT</div>
        </div>
    );
}
