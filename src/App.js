import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import MainScreen from "./Screens/MainScreen/MainScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";

function App() {
    const [userData, setUserData] = useState({
        username: localStorage.getItem("username") || "",
        userId: parseInt(localStorage.getItem("userId")) || 0,
        isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    });

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginScreen setUserData={setUserData} userData={userData} />} />
                <Route path="/register" element={<RegisterScreen userData={userData} />} />
                <Route path="/" element={<MainScreen path={"/"} userData={userData} setUserData={setUserData} />} />
                <Route path="/vroomvolts" element={<MainScreen path={"/vroomvolts"} userData={userData} setUserData={setUserData} />} />
                <Route path="/users" element={<MainScreen path={"/users"} userData={userData} setUserData={setUserData} />} />
                <Route path="/marathon" element={<MainScreen path={"/marathon"} userData={userData} setUserData={setUserData} />} />
            </Routes>
        </Router>
    );
}

export default App;
