import { useState } from "react";

import "./App.css";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import MainScreen from "./Screens/MainScreen/MainScreen";

function App() {
    const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin") === "true");

    return isLogin ? <MainScreen setIsLogin={setIsLogin} /> : <LoginScreen setIsLogin={setIsLogin} />;
}

export default App;
