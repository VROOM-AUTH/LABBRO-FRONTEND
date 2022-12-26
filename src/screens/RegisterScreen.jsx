import "./LoginReg.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LBL from "../assets/LabBro_Logo.png";
import VL from "../assets/Vroom Logo.png";
var CryptoJS = require("crypto-js");

const RegisterScreen = ({}) => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [name, setName] = useState("");
    const [hashedPwd, setHashedPwd] = useState("");
    const Navigate = useNavigate();
    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            // await createUserWithEmailAndPassword(auth, email, pwd);
            // await updateProfile(auth.currentUser, { displayName: name });
            Navigate("/home");
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        // setHashedPwd(CryptoJS.AES.encrypt(pwd, "Secret"));
        setHashedPwd(
            CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(pwd))
        );
        console.log(hashedPwd.toString());
    }, [pwd]);

    const login = () => {
        Navigate("/login");
    };
    return (
        <div className="big-container">
            <div className="column box">
                <h1 className="h1">Welcome to Lab Bro Portal</h1>
                <div className="container">
                    <form onSubmit={handleSignup} className="column">
                        <input
                            className="labels input h2"
                            placeholder="  Name"
                            type="text"
                            id="name"
                            onChange={(event) => setName(event.target.value)}
                            value={name}
                        />
                        <input
                            className="labels input h2"
                            placeholder="  E-mail"
                            type="email"
                            id="E-mail"
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                            required
                        />
                        <input
                            className="labels input h2"
                            placeholder="  Password"
                            type="password"
                            id="password"
                            onChange={(event) => setPwd(event.target.value)}
                            value={pwd}
                            required
                        />
                        <button
                            className="mainButton h3"
                            onSubmit={handleSignup}
                        >
                            Register
                        </button>
                        <button className="secondButton h3" onClick={login}>
                            Login
                        </button>
                    </form>
                    <div className="columnB">
                        <img alt="Bro" height="200px" src={LBL}></img>
                        <img alt="vroom" height="250px" src={VL}></img>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default RegisterScreen;
