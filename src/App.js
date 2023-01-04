import './App.css';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainScreen from './screens/MainScreen';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
    const [userData, setUserData] = useState({
        username: "",
        userId: 0,
        isLoggedIn: false,
    });

    return (
        <Router>
            <Routes>
                <Route>
                    <Route
                        path="/"
                        element={
                            <MainScreen
                                path={"/"}
                                userData={userData}
                                setUserData={setUserData}
                            />
                        }
                    />
                    <Route
                        path="/volts"
                        element={
                            <MainScreen
                                path={"/volts"}
                                userData={userData}
                                setUserData={setUserData}
                            />
                        }
                    />
                    <Route path="/register" element={<RegisterScreen />} />
                    <Route
                        path="/login"
                        element={
                            <LoginScreen
                                userData={userData}
                                setUserData={setUserData}
                            />
                        }
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
