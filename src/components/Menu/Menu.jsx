import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";
import LOGO from "../../assets/LabBro_Logo.png";

import { Link } from "react-router-dom";

const Menu = ({ userData, setUserData }) => {
    const [activeMenu, setActiveMenu] = useState(window.location.href);
    const [isClicked1, setIsClicked1] = useState(false);
    const [isClicked2, setIsClicked2] = useState(false);
    const [isClicked3, setIsClicked3] = useState(false);
    const [isClicked4, setIsClicked4] = useState(false);
    const Navigate = useNavigate();

    useEffect(() => {
        const url = window.location.href;

        if (url.includes("volts")) {
            setIsClicked2(true);
            setIsClicked1(false);
            setIsClicked3(false);
            setIsClicked4(false);
            setActiveMenu("Vroom Volts");
        } else if (url.includes("users")) {
            setIsClicked3(true);
            setIsClicked1(false);
            setIsClicked2(false);
            setIsClicked4(false);
            setActiveMenu("Users");
        } else {
            setIsClicked1(true);
            setIsClicked2(false);
            setIsClicked3(false);
            setIsClicked4(false);
            setActiveMenu("Dashboard");
        }
    }, [window.location.href]);

    const menuClicked = (menu_id) => {
        // switch (menu_id) {
        //     case 1:
        //         setIsClicked1(true);
        //         setIsClicked2(false);
        //         setIsClicked3(false);
        //         setIsClicked4(false);
        //         setActiveMenu('Dashboard');
        //         break;
        //     case 2:
        //         setIsClicked2(true);
        //         setIsClicked1(false);
        //         setIsClicked3(false);
        //         setIsClicked4(false);
        //         setActiveMenu('Lab Charts');
        //         break;
        //     case 3:
        //         setIsClicked3(true);
        //         setIsClicked1(false);
        //         setIsClicked2(false);
        //         setIsClicked4(false);
        //         setActiveMenu('Users');
        //         break;
        //     case 4:
        //         setIsClicked4(true);
        //         setIsClicked1(false);
        //         setIsClicked2(false);
        //         setIsClicked3(false);
        //         setActiveMenu('Marathon');
        // }
    };
    console.log(userData);

    return (
        <div className="menu">
            <div className="component-parts active-menu-container">
                <div className="logo-box">
                    <img src={LOGO} alt="logo" className="logo" />
                </div>
                {/* <h3 className="active-menu">{activeMenu}</h3> */}
                <h3 className="active-menu">
                    {userData.username != ""
                        ? "Welcome back " + userData.username + "!"
                        : ""}
                </h3>
            </div>
            <div className="component-parts list-menu-container">
                <div className={isClicked1 ? "clicked" : "non-clicked"}>
                    <Link to="/" onClick={() => menuClicked(1)}>
                        {/* <a href="#" onClick={() => menuClicked(1)}> */}
                        Dashboard
                        {/* </a> */}
                    </Link>
                </div>
                <div className={isClicked2 ? "clicked" : "non-clicked"}>
                    <Link to="/volts" onClick={() => menuClicked(2)}>
                        {/* <a href="#" onClick={() => menuClicked(2)}> */}
                        Vroom Volts
                        {/* </a> */}
                    </Link>
                </div>
                <div className={isClicked3 ? "clicked" : "non-clicked"}>
                    <Link to="/users" onClick={() => menuClicked(3)}>
                        Users
                    </Link>
                </div>
                <div className={isClicked4 ? "clicked" : "non-clicked"}>
                    <a href="#" onClick={() => menuClicked(4)}>
                        Marathon
                    </a>
                </div>
            </div>
            {userData.username != "" ? (
                <>
                    <div className="component-parts checkout-container">
                        <button className="checkout-button">Check-Out!</button>
                    </div>
                    <button
                        className="mainButton h3"
                        onClick={() => {
                            setUserData({
                                username: "",
                                userId: 0,
                                isLoggedIn: false,
                            });
                            Navigate("/");
                        }}
                    >
                        Log out
                    </button>
                </>
            ) : (
                <button
                    className="mainButton h3"
                    onClick={() => {
                        Navigate("/login");
                    }}
                >
                    Login
                </button>
            )}
        </div>
    );
};

export default Menu;
