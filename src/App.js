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
                <Route path="/" element={<MainScreen setUserData={setUserData} userData={userData} />} />
            </Routes>
        </Router>
    );
}

export default App;
