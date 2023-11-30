import { useState } from "react";

import "./App.css";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import MainScreen from "./Screens/MainScreen/MainScreen";

function App() {
    const [userData, setUserData] = useState({
        username: localStorage.getItem("username") || "",
        userId: parseInt(localStorage.getItem("userId")) || 0,
        isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    });

    return userData.isLoggedIn ? <MainScreen setUserData={setUserData} userData={userData} /> : <LoginScreen setUserData={setUserData} />;
}

export default App;
