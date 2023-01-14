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
    const [userInLab, setUserInLab] = useState(false);
    const [areYouSure, setAreYouSure] = useState(false);
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
        } else if (url.includes("marathon")) {
            setIsClicked3(false);
            setIsClicked1(false);
            setIsClicked2(false);
            setIsClicked4(true);
            setActiveMenu("Marathon");
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
    // console.log(userData);

    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_BASE_URL}users-time/?user_id=${userData.userId}`
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                // console.log(data);
                setUserInLab(data.in_lab);
            });
    }, [areYouSure]);

    const checkout = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}attendance/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: userData.userId,
            }),
        }).catch((error) => {
            console.log(error);
        });
        console.log("done");
    };

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
                    <Link to="/marathon" onClick={() => menuClicked(4)}>
                        Marathon
                    </Link>
                </div>
                {userData.username != "" ? (
                    <>
                        {userInLab ? (
                            <div className="component-parts checkout-container">
                                <button
                                    className="checkout-button"
                                    onClick={() => {
                                        setAreYouSure(true);
                                        window.scrollTo({
                                            top: 800,
                                            behavior: "smooth",
                                        });
                                    }}
                                >
                                    Check-Out!
                                </button>
                            </div>
                        ) : (
                            <></>
                        )}

                        <button
                            className="mainButton h3 no-margin menu-login"
                            onClick={() => {
                                setUserData({
                                    username: "",
                                    userId: 0,
                                    isLoggedIn: false,
                                });
                                // localStorage.setItem("isLoggedIn", false);
                                localStorage.clear();
                                Navigate("/");
                            }}
                        >
                            Log out
                        </button>
                    </>
                ) : (
                    <button
                        className="mainButton h3 menu-login"
                        onClick={() => {
                            Navigate("/login");
                        }}
                    >
                        Login
                    </button>
                )}
            </div>
            {areYouSure ? (
                <div id="myModal" className="modal">
                    <div className="modal-content how">
                        <div className="modal-header-how">
                            <h1
                                className="close"
                                onClick={() => {
                                    setAreYouSure(false);
                                }}
                            >
                                &times;
                            </h1>
                        </div>
                        <div className="modal-body">
                            <p className="modal-title">
                                Are you sure you want to check out?
                            </p>
                            <div className="ways-to-win row">
                                <button
                                    className="mainButton sure"
                                    onClick={() => {
                                        checkout();
                                        setAreYouSure(false);
                                        window.location.reload();
                                    }}
                                >
                                    Yes
                                </button>
                                <button
                                    className="secondButton sure"
                                    onClick={() => {
                                        setAreYouSure(false);
                                    }}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default Menu;
