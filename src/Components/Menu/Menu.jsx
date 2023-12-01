import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Menu.css";

import { IoMdHome } from "react-icons/io";
import { FaCoins } from "react-icons/fa6";
import { GoPersonFill } from "react-icons/go";
import { GiPodium } from "react-icons/gi";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { TbBulbOff } from "react-icons/tb";
import { TbBulb } from "react-icons/tb";

import labbroLogo from "../../Assets/labbro-logo.png";
import coin from "../../Assets/coin.png";

export default function Menu({ setUserData, userData }) {
    const [isClicked, setIsClicked] = useState(0);
    const [isLabOpen, setIsLabOpen] = useState(false);

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
            <div className="user-info-container">
                <img src={labbroLogo} className="labbro-logo"></img>
                <div className="user-info">
                    <div className="user-info-text">
                        Welcome <span style={{ color: "#e971e3" }}>{userData.username}</span> !
                    </div>
                    <div className="user-info-text-secondary">
                        <img className="coin-menu" src={coin}></img>
                        <p>300</p>
                    </div>
                    <div className="user-info-text-secondary">
                        <MdOutlineAccessTimeFilled className="menu-icon" />
                        <p>500h 37m</p>
                    </div>
                    <div className="user-info-text-secondary">
                        {isLabOpen ? <TbBulb className="menu-icon" /> : <TbBulbOff className="menu-icon" />}
                        {isLabOpen ? <p>Lab is open!</p> : <p>Lab is closed!</p>}
                    </div>
                </div>
            </div>
            <div className="menu-buttons-container">
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
            <div className="logout-container">
                <div className="logout-button" onClick={(e) => handleLogout(e)}>
                    Logout
                </div>
            </div>
        </div>
    );
}
