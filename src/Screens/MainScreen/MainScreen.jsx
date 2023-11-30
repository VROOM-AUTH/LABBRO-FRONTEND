import React, { useEffect } from "react";
import "./MainScreen.css";
import { useNavigate } from "react-router-dom";

export default function MainScreen({ setUserData, userData }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (userData.isLoggedIn === false) {
            navigate("/login");
            return;
        }
    }, [navigate, userData.isLoggedIn, setUserData]);

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

    if (!userData.isLoggedIn) {
        return null;
    }

    return (
        <div>
            <h1>Welcome {userData.username}</h1>
            <div onClick={(e) => handleLogout(e)}>LOGOUT</div>
        </div>
    );
}
