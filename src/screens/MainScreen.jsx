import React from "react";
import "../App.css";
import Menu from "../components/Menu/Menu";
import Dashboard from "../components/Dashboard/Dashboard";
import ActivityPanel from "../components/ActivityPanel/ActivityPanel";
import VroomVolts from "../components/VroomVolts/VroomVolts";
import Users from "../components/Users/Users";
import Marathon from "../components/Marathon/Marathon";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function MainScreen({ path, userData, isLoggedIn }) {
    return (
        <div className="App">
            <div className="menu-container">
                <Menu userData={userData} setUserData={setUserData} />
            </div>
            <div className="dashboard-container">
                {path === "/" ? (
                    <Dashboard userData={userData} />
                ) : path === "/volts" ? (
                    <VroomVolts userData={userData} />
                ) : path === "/users" ? (
                    <Users userData={userData} />
                ) : path === "/marathon" ? (
                    <Marathon userData={userData} />
                ) : (
                    <></>
                )}
            </div>
            <div className="activity-container">
                <ActivityPanel userData={userData} />
            </div>
        </div>
    );
}
