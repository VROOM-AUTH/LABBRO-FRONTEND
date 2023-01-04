import React from "react";
import "../App.css";
import Menu from "../components/Menu/Menu";
import Dashboard from "../components/Dashboard/Dashboard";
import ActivityPanel from "../components/ActivityPanel/ActivityPanel";
import VroomVolts from "../components/VroomVolts/VroomVolts";
import Users from "../components/Users/Users";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function MainScreen({ path, userData, setUserData }) {
    return (
        <div className="App">
            <div className="menu-container">
                <Menu userData={userData} setUserData={setUserData} />
            </div>
            <div className="dashboard-container">
                {path === "/" ? (
                    <Dashboard />
                ) : path === "/volts" ? (
                    <VroomVolts />
                ) : path === "/users" ? (
                    <Users />
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
