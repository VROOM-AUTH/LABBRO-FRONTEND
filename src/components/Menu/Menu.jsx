import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";
import LOGO from "../../assets/LabBro_Logo.png";

import { Link } from "react-router-dom";

const Menu = ({ userData, setUserData }) => {
    // const [activeMenu, setActiveMenu] = useState(window.location.href);
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
            // setActiveMenu("Vroom Volts");
        } else if (url.includes("users")) {
            setIsClicked3(true);
            setIsClicked1(false);
            setIsClicked2(false);
            setIsClicked4(false);
            // setActiveMenu("Users");
        } else if (url.includes("marathon")) {
            setIsClicked3(false);
            setIsClicked1(false);
            setIsClicked2(false);
            setIsClicked4(true);
            // setActiveMenu("Marathon");
        } else {
            setIsClicked1(true);
            setIsClicked2(false);
            setIsClicked3(false);
            setIsClicked4(false);
            // setActiveMenu("Dashboard");
        }
        // eslint-disable-next-line
    }, [window.location.href]);

    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_BASE_URL}users-time/?user_id=${userData.userId}`,
            {
                method: "GET",
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
                },
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setUserInLab(data.in_lab);
            });
        // eslint-disable-next-line
    }, [areYouSure]);

    const checkout = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}attendance/`, {
            method: "POST",
            headers: {
                // "Access-Control-Allow-Origin": "*",
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

    return (
        <div className="menu">
            <div className="component-parts active-menu-container">
                <div className="logo-box">
                    <img src={LOGO} alt="logo" className="logo" />
                </div>
                <h3 className="active-menu">
                    {userData.username !== ""
                        ? "Welcome back " + userData.username + "!"
                        : ""}
                </h3>
            </div>
            <div className="component-parts list-menu-container">
                <Link to="/" className={isClicked1 ? "clicked" : "non-clicked"}>
                    <div>
                        {/* <a href="#" onClick={() => menuClicked(1)}> */}
                        Dashboard
                        {/* </a> */}
                    </div>
                </Link>
                <Link
                    to="/volts"
                    className={isClicked2 ? "clicked" : "non-clicked"}
                >
                    <div>
                        {/* <a href="#" onClick={() => menuClicked(2)}> */}
                        Vroom Volts
                        {/* </a> */}
                    </div>
                </Link>
                <Link
                    to="/users"
                    className={isClicked3 ? "clicked" : "non-clicked"}
                >
                    <div>Users</div>
                </Link>
                <Link
                    to="/marathon"
                    className={isClicked4 ? "clicked" : "non-clicked"}
                >
                    <div>Marathon</div>
                </Link>
                {userData.username !== "" ? (
                    <>
                        {userInLab ? (
                            <div className="component-parts checkout-container">
                                <button
                                    className="checkout-button"
                                    onClick={() => {
                                        setAreYouSure(true);
                                        window.scrollTo({
                                            top: 1000,
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
                            className="mainButton h3 menu-login"
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
                            <div className="ways-to-win row-menu">
                                <button
                                    className="mainButton sure"
                                    onClick={() => {
                                        checkout();
                                        setAreYouSure(false);
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
