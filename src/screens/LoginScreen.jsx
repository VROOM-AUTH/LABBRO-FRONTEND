import "./LoginReg.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LBL from "../assets/LabBro_Logo.png";
import VL from "../assets/Vroom Logo.png";

const LoginScreen = ({}) => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const Navigate = useNavigate();
    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            // await signInWithEmailAndPassword(auth, email, pwd);
            Navigate("/home");
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
                <h1 className="h1">Welcome to Lab Bro Portal</h1>
                <div className="container">
                    <form className="column">
                        <input
                            className="labels input h2"
                            type="text"
                            id="Name"
                            placeholder="  Name"
                            onChange={(event) => setEmail(event.target.value)} //user state
                            value={email} //clear fields when you sign in
                            required
                        />
                        <input className="labels input h2" type="password" id="Password" placeholder="  Password" onChange={(event) => setPwd(event.target.value)} value={pwd} required />
                        <button className="mainButton h3" onSubmit={handleSignIn}>
                            Login
                        </button>
                        <button className="secondButton h3" onClick={register}>
                            Register
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
export default LoginScreen;
