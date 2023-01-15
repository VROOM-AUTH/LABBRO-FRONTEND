import "./LoginReg.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LBL from "../assets/LabBro_Logo.png";
import VL from "../assets/Vroom Logo.png";
var CryptoJS = require("crypto-js");

const LoginScreen = ({ userData, setUserData }) => {
    const [loginName, setLoginName] = useState("");
    const [pwd, setPwd] = useState("");
    const [hashedPwd, setHashedPwd] = useState("");
    const Navigate = useNavigate();
    const bcrypt = require("bcryptjs");
    useEffect(() => {
        setHashedPwd(
            CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(pwd))
        );
    }, [pwd]);
    const login = async (event) => {
        event.preventDefault();
        try {
            fetch(`${process.env.REACT_APP_BASE_URL}users/?name=${loginName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
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
                            console.log("Password matches.");
                            setUserData({
                                username: data[0].name,
                                userId: data[0].id,
                                isLoggedIn: true,
                            });
                            localStorage.setItem("username", data[0].name);
                            localStorage.setItem("userId", data[0].id);
                            localStorage.setItem("isLoggedIn", true);
                            Navigate("/");
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
    };
    const register = () => {
        Navigate("/register");
    };
    return (
        <div className="big-container">
            <div className="column box">
                <h1 className="h1 loginreg-title">Welcome to Lab Bro Portal</h1>
                <div className="container">
                    <form className="column">
                        <input
                            className="labels input h2"
                            type="text"
                            id="Name"
                            placeholder="  Name"
                            onChange={(event) => {
                                setLoginName(event.target.value);
                            }} //user state
                            required
                        />
                        <input
                            className="labels input h2"
                            type="password"
                            id="Password"
                            placeholder="  Password"
                            onChange={(event) => setPwd(event.target.value)}
                            value={pwd}
                            required
                        />
                        <button className="mainButton h3" onClick={login}>
                            Login
                        </button>
                        <button className="secondButton h3" onClick={register}>
                            Register
                        </button>
                    </form>
                    <div className="columnB">
                        <img
                            className="bro"
                            alt="Bro"
                            height="200px"
                            src={LBL}
                        ></img>
                        <img
                            className="vroom"
                            alt="vroom"
                            height="250px"
                            src={VL}
                        ></img>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LoginScreen;
