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
        opened_time: "2000-01-01T00:00:00Z",
        closed_time: "2000-01-01T00:00:00Z",
        total_seconds: "",
    });
    const [userTime, setUserTime] = useState({
        // Total logged in user hours and activity status
        user_id: "",
        total_hours: "",
        in_lab: false,
    });
    const [userVroomVolts, setUserVroomVolts] = useState(0);
    const [users, setUsers] = useState({});
    const [usersTime, setUsersTime] = useState({});
    const [usersLevels, setUsersLevels] = useState({}); // [user_id, vroomvolts
    const [mergedUsers, setMergedUsers] = useState([]);

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

        fetch(`${process.env.REACT_APP_BASE_URL}users/?fields=name,id`, {
            //Fetch for users data
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
                setUsers(data);
            })
            .catch((error) => {
                console.log(`Error ${error}`);
            });

        fetch(`${process.env.REACT_APP_BASE_URL}users-time/`, {
            //Fetch for users time data
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
                setUsersTime(data);
            })
            .catch((error) => {
                console.log(`Error ${error}`);
            });

        fetch(`${process.env.REACT_APP_BASE_URL}users-levels/`, {
            //Fetch for users levels
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
                setUsersLevels(data);
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

    useEffect(() => {
        //Function to find user by id from users and match it with user_id in usersTime
        const findUserById = (user_id, data) => Array.from(data).find((user) => user.user_id === user_id);
        //Function to find user by id from users and match it with id in usersLevels
        const findUserByIdLevels = (user_id, data) => Array.from(data).find((user) => user.id === user_id);
        // Merge data based on user ids
        const merged = Object.keys(users).map((id) => ({
            id: users[id]?.id || "",
            name: users[id]?.name || "",
            total_seconds: findUserById(users[id].id, usersTime)?.total_seconds || "0",
            in_lab: findUserById(users[id].id, usersTime)?.in_lab || false,
            vroomvolts: findUserByIdLevels(users[id].id, usersLevels)?.vroomvolts || 0,
        }));
        // Filter out the canceler from users
        const filteredUsers = merged.filter((user) => user.name !== "Canceler");
        // Set the merged users
        setMergedUsers(filteredUsers);
    }, [users, usersTime, usersLevels]);

    if (!userData.isLoggedIn) {
        return null;
    }

    return (
        <div className="mainscreen-container">
            <Menu setUserData={setUserData} userData={userData} labStatus={labStatus} userTime={userTime} userVroomVolts={userVroomVolts} />
            <div className="screen-panel">
                {path === "/" ? (
                    <Dashboard labStatus={labStatus} mergedUsers={mergedUsers} />
                ) : path === "/vroomvolts" ? (
                    <VroomVolts userData={userData} mergedUsers={mergedUsers} />
                ) : path === "/users" ? (
                    <Users userData={userData} mergedUsers={mergedUsers} labStatus={labStatus} />
                ) : path === "/marathon" ? (
                    <Marathon userData={userData} mergedUsers={mergedUsers} />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
