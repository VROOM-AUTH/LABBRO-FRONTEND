import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Menu.css";

import { IoMdHome } from "react-icons/io";
import { FaCoins } from "react-icons/fa6";
import { GoPersonFill } from "react-icons/go";
import { GiPodium } from "react-icons/gi";

export default function Menu({ setUserData, userData }) {
    const [isClicked, setIsClicked] = useState(0);

    useEffect(() => {
        const url = window.location.href;
        console.log(url);
        console.log(isClicked);
        if (url.includes("vroomvolts")) {
            setIsClicked(2);
            // setActiveMenu("Vroom Volts");
        } else if (url.includes("users")) {
            setIsClicked(3);
            // setActiveMenu("Users");
        } else if (url.includes("marathon")) {
            setIsClicked(4);
            // setActiveMenu("Marathon");
        } else {
            setIsClicked(1);
            // setActiveMenu("Dashboard");
        }
        // eslint-disable-next-line
    }, [window.location.href]);

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
        <div className="menu-container">
            {userData.username}
            <div className="menu-inside-container">
                <Link className={isClicked === 1 ? "clicked menu-item" : "menu-item"} to="/">
                    <IoMdHome className="menu-icon" />
                    Dashboard
                </Link>
                <Link className={isClicked === 2 ? "clicked menu-item" : "menu-item"} to="/vroomvolts">
                    <FaCoins className="menu-icon" />
                    Vroomvolts
                </Link>
                <Link className={isClicked === 3 ? "clicked menu-item" : "menu-item"} to="/users">
                    <GoPersonFill className="menu-icon" />
                    Users
                </Link>
                <Link className={isClicked === 4 ? "clicked menu-item" : "menu-item"} to="/marathon">
                    <GiPodium className="menu-icon" />
                    Marathon
                </Link>
            </div>
            <div className="logout-container" onClick={(e) => handleLogout(e)}>
                LOGOUT
            </div>
        </div>
    );
}
