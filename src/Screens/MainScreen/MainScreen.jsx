import React, { useEffect, useState } from "react";
import "./MainScreen.css";
import Menu from "../../Components/Menu/Menu";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../Components/Dashboard/Dashboard";
import VroomVolts from "../../Components/Vroomvolts/Vroomvolts";
import Users from "../../Components/Users/Users";
import Marathon from "../../Components/Marathon/Marathon";

export default function MainScreen({ setUserData, userData, path }) {
    const navigate = useNavigate();
    const [labStatus, setLabStatus] = useState({
        // Lab Status
        closed: true,
        opened_time: "",
        closed_time: "",
        total_seconds: "",
    });
    const [userTime, setUserTime] = useState({
        // Total logged in user hours and activity status
        user_id: "",
        total_hours: "",
        in_lab: false,
    });
    const [userVroomVolts, setUserVroomVolts] = useState(0);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}lab-status/`, {
            //Fetch for lab status
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                setLabStatus(data);
            })
            .catch((error) => {
                console.log(`Error ${error}`);
            });

        fetch(`${process.env.REACT_APP_BASE_URL}users-time/?user_id=${userData.userId}`, {
            //Fetch for logged in user data
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                setUserTime(data);
            })
            .catch((error) => {
                console.log(`Error ${error}`);
            });

        fetch(`${process.env.REACT_APP_BASE_URL}users-levels?user_id=${userData.userId}`, {
            //Fetch for logged in user vroomvolts data
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                setUserVroomVolts(data[0].vroomvolts);
            })
            .catch((error) => {
                console.log(`Error ${error}`);
            });
    }, [userData.userId]);

    useEffect(() => {
        if (userData.isLoggedIn === false) {
            navigate("/login");
            return;
        }
    }, [navigate, userData.isLoggedIn, setUserData]);

    if (!userData.isLoggedIn) {
        return null;
    }

    return (
        <div className="mainscreen-container">
            <Menu setUserData={setUserData} userData={userData} labStatus={labStatus} userTime={userTime} userVroomVolts={userVroomVolts} />
            <div className="screen-panel">
                {path === "/" ? (
                    <Dashboard userData={userData} labStatus={labStatus} />
                ) : path === "/vroomvolts" ? (
                    <VroomVolts userData={userData} />
                ) : path === "/users" ? (
                    <Users userData={userData} />
                ) : path === "/marathon" ? (
                    <Marathon userData={userData} />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
