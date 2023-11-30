import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs-react";
import { useNavigate } from "react-router-dom";

import { FaUser, FaLock } from "react-icons/fa";
import "./LoginScreen.css";

export default function LoginScreen({ setUserData, userData }) {
    const [rememberMe, setRememberMe] = useState(false);
    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const navigate = useNavigate();

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    useEffect(() => {
        if (userData.isLoggedIn) {
            navigate("/");
            return;
        }
    }, [navigate, userData.isLoggedIn]);

    const handleLogin = (event) => {
        event.preventDefault();
        try {
            fetch(`${process.env.REACT_APP_BASE_URL}users/?name=${name}`, {
                method: "GET",
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw response;
                })
                .then((data) => {
                    bcrypt.compare(pwd, data[0].password, function (err, res) {
                        if (res) {
                            setUserData({
                                username: data[0].name,
                                userId: data[0].id,
                                isLoggedIn: true,
                            });
                            navigate("/");
                            if (rememberMe) {
                                localStorage.setItem("username", data[0].name);
                                localStorage.setItem("userId", data[0].id);
                                localStorage.setItem("isLoggedIn", true);
                            }
                        } else {
                            alert("Incorrect password!");

                            console.log("Password does not match.");
                        }
                    });
                })
                .catch((error) => {
                    console.log(error);
                    alert("Username does not exist!");
                });
        } catch (error) {
            alert(error.message);
        }

        setTimeout(() => {}, 200);
    };

    return (
        <div className="login-container">
            {/* <img className="login-logo" src={labbroLogo} alt="logo" /> */}
            <form className="login-form">
                <h1 className="login-form-title">LOGIN</h1>
                <div className="login-form-group">
                    <FaUser className="login-form-icon1" />
                    <input
                        type="name"
                        id="name"
                        placeholder="Username"
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                        required
                    />
                    <FaLock className="login-form-icon2" />
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={(event) => {
                            setPwd(event.target.value);
                        }}
                        required
                    />
                </div>
                <div>
                    <button className="login-form-btn" onClick={(e) => handleLogin(e)}>
                        Login
                    </button>
                    <div className="remember-me-container">
                        <input type="checkbox" className="remember-me" id="rememberMe" checked={rememberMe} onChange={handleRememberMeChange} />
                        <p>Remember me</p>
                    </div>
                </div>
                <div className="login-form-subtext">
                    <p>
                        Don't have an account? <a href="/register">Register</a>
                    </p>
                </div>
            </form>
        </div>
    );
}
