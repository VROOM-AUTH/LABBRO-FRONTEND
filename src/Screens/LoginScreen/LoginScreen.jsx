import React, { useState } from "react";
import "./LoginScreen.css";
import { FaUser, FaLock } from "react-icons/fa";
import labbroLogo from "../../Assets/labbro-logo.png";
export default function LoginScreen({ setIsLogin }) {
    const [rememberMe, setRememberMe] = useState(false);

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        setTimeout(() => {
            setIsLogin(true);
            if (rememberMe) {
                localStorage.setItem("isLogin", true);
            }
        }, 200);
    };

    return (
        <div className="login-container">
            {/* <img className="login-logo" src={labbroLogo} alt="logo" /> */}
            <form className="login-form">
                <h1 className="login-form-title">LOGIN</h1>
                <div className="login-form-group">
                    <FaUser className="login-form-icon1" />
                    <input type="name" id="name" placeholder="      Username" />
                    <FaLock className="login-form-icon2" />
                    <input type="password" id="password" placeholder="      Password" />
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
