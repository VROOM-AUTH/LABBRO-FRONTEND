import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs-react";

import "./RegisterScreen.css";
import { FaUser, FaLock } from "react-icons/fa";

export default function RegisterScreen({ userData }) {
    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwd2, setPwd2] = useState("");
    const [hashedPwd, setHashedPwd] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (userData.isLoggedIn) {
            navigate("/");
            return;
        }
    }, [navigate, userData.isLoggedIn]);

    useEffect(() => {
        bcrypt.hash(pwd, 10, function (err, hash) {
            // Store the hash in your DB
            setHashedPwd(hash);
        });
        // eslint-disable-next-line
    }, [pwd]);

    const handleRegister = (event) => {
        event.preventDefault();
        if (pwd !== pwd2) {
            setErrorMessage("Passwords do not match!");

            return;
        }
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
                    if (!data[0].password && data[0].name !== null) {
                        fetch(`${process.env.REACT_APP_BASE_URL}users/${data[0].id}`, {
                            method: "PUT",
                            headers: {
                                // "Access-Control-Allow-Origin": "*",
                                "Content-Type": "application/json",
                                Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
                            },
                            body: JSON.stringify({
                                password: hashedPwd,
                            }),
                        });
                        navigate("/login");
                    } else {
                        setErrorMessage("Username already exists!");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="register-container">
            {/* <img className="register-logo" src={labbroLogo} alt="logo" /> */}
            <form className="register-form">
                <div className="login-block">
                    <h1 className="register-form-title">NEW ACCOUNT</h1>
                    <div className="login-form-error-message">{errorMessage}</div>
                </div>
                <div className="register-form-group">
                    <FaUser className="register-form-icon1" />
                    <input
                        type="name"
                        id="name"
                        placeholder="Username"
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                        required
                    />
                    <FaLock className="register-form-icon2" />
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={(event) => {
                            setPwd(event.target.value);
                        }}
                        required
                    />
                    <FaLock className="register-form-icon3" />
                    <input
                        type="password"
                        id="password2"
                        placeholder="Retype password"
                        onChange={(event) => {
                            setPwd2(event.target.value);
                        }}
                        required
                    />
                </div>
                <div>
                    <button className="register-form-btn" onClick={(e) => handleRegister(e)}>
                        Register
                    </button>
                </div>
                <div className="register-form-subtext">
                    <p>
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </div>
            </form>
        </div>
    );
}
