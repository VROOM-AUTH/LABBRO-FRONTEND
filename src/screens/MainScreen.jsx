import React from "react";
import "../App.css";
import Menu from "../components/Menu/Menu";
import Dashboard from "../components/Dashboard/Dashboard";
import ActivityPanel from "../components/ActivityPanel/ActivityPanel";
import VroomVolts from "../components/VroomVolts/VroomVolts";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function MainScreen({ path, userData }) {
    return (
        <div className="App">
            <div className="menu-container">
                <Menu />
            </div>
            <div className="dashboard-container">
                {path === "/" ? (
                    <>
                        <Dashboard />
                        <h1>
                            Weclome {userData.name} id is {userData.userId} and
                            you are loggedin{userData.isLoggedIn}
                        </h1>
                    </>
                ) : path === "/volts" ? (
                    <VroomVolts />
                ) : (
                    <></>
                )}
            </div>
            <div className="activity-container">
                <ActivityPanel />
            </div>
        </div>
    );
}
