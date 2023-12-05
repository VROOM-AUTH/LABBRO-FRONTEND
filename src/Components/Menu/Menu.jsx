import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Menu.css";

import { IoMdHome, IoMdClose } from "react-icons/io";
import { FaCoins } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { GoPersonFill } from "react-icons/go";
import { GiPodium } from "react-icons/gi";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { TbBulbOff } from "react-icons/tb";
import { TbBulb } from "react-icons/tb";
import { ImExit } from "react-icons/im";
import { MdOutlineMenu } from "react-icons/md";

import labbroLogo from "../../Assets/labbro-logo.png";
import coin from "../../Assets/coin.png";

import secondsToHoursMins from "../../Utils/secondsToHoursMins";

export default function Menu({
    setUserData,
    userData,
    labStatus,
    userTime,
    userVroomVolts,
}) {
    const [isClicked, setIsClicked] = useState(0);
    const [hideMenu, setHideMenu] = useState(true);

    useEffect(() => {
        const url = window.location.href;
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
        setHideMenu((prev) => !prev);
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

    const handleCheckout = (event) => {
        event.preventDefault();
        fetch(`${process.env.REACT_APP_BASE_URL}attendance/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
            },
            body: JSON.stringify({
                user_id: userData.userId,
            }),
        })
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleHideMenu = (event) => {
        event.preventDefault();
        setHideMenu((prev) => !prev);
    };
    return (
        <div className="menu-container">
            <div className="user-info-container">
                <img
                    src={labbroLogo}
                    className="labbro-logo"
                    alt="labbro-logo"
                ></img>
                <div className="user-info">
                    <div className="user-info-text">
                        Welcome{" "}
                        <span style={{ color: "#e971e3" }}>
                            {userData.username}
                        </span>{" "}
                        !
                    </div>
                    <div className="user-info-text-secondary">
                        <img className="coin-menu" src={coin} alt="coin"></img>
                        <p>{userVroomVolts}</p>
                    </div>
                    <div className="user-info-text-secondary">
                        <MdOutlineAccessTimeFilled className="menu-icon" />
                        <p>{secondsToHoursMins(userTime.total_hours)}</p>
                    </div>
                    <div className="user-info-text-secondary">
                        {labStatus.closed ? (
                            <TbBulbOff className="menu-icon" />
                        ) : (
                            <TbBulb className="menu-icon" />
                        )}
                        {labStatus.closed ? (
                            <p>Lab is closed!</p>
                        ) : (
                            <p>Lab is open!</p>
                        )}
                    </div>
                </div>
            </div>

            {/* NEED TO DELETE HIDDEN MENU WHEN NOT NECESSARY */}
            <div
                className={hideMenu ? "hidden-menu" : "menu-buttons-container"}
            >
                <Link
                    className={
                        isClicked === 1 ? "clicked menu-item" : "menu-item"
                    }
                    to="/"
                >
                    <IoMdHome className="menu-icon" />
                    Dashboard
                </Link>
                <Link
                    className={
                        isClicked === 2 ? "clicked menu-item" : "menu-item"
                    }
                    to="/vroomvolts"
                >
                    <FaCoins className="menu-icon" />
                    Vroomvolts
                </Link>
                <Link
                    className={
                        isClicked === 3 ? "clicked menu-item" : "menu-item"
                    }
                    to="/users"
                >
                    <GoPersonFill className="menu-icon" />
                    Users
                </Link>
                <Link
                    className={
                        isClicked === 4 ? "clicked menu-item" : "menu-item"
                    }
                    to="/marathon"
                >
                    <GiPodium className="menu-icon" />
                    Marathon
                </Link>
                <div className="menu-item" onClick={(e) => handleLogout(e)}>
                    <FaSignOutAlt className="menu-icon" />
                    Logout
                </div>
                {userTime.in_lab ? (
                    <div
                        className="menu-item check-out-mobile"
                        onClick={(e) => handleCheckout(e)}
                    >
                        <ImExit className="menu-icon" />
                        Check Out
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className="hide-menu" onClick={(e) => handleHideMenu(e)}>
                {hideMenu ? <MdOutlineMenu /> : <IoMdClose />}
            </div>
            <div className="logout-container">
                {userTime.in_lab ? (
                    <div className="check-out-container">
                        <div className="check-out-title">
                            You are checked in!
                        </div>
                        <div
                            className="check-out-button"
                            onClick={(e) => handleCheckout(e)}
                        >
                            Check Out
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
