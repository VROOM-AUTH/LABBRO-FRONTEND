import React, { useEffect, useState } from "react";
import "./MainScreen.css";
import Menu from "../../Components/Menu/Menu";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../Components/Dashboard/Dashboard";
import VroomVolts from "../../Components/Vroomvolts/Vroomvolts";
import Users from "../../Components/Users/Users";
import Marathon from "../../Components/Marathon/Marathon";
import RightMenu from "../../Components/RightMenu/RightMenu";
import SpinningWheel from "../../Components/Games/SpinningWheel";
import Blackjack from "../../Components/Games/Blackjack";
import Roulette from "../../Components/Games/Roulette";

export default function MainScreen({ setUserData, userData, path }) {
    const navigate = useNavigate();
    const [firstVroomvoltFetch, setFirstVroomvoltFetch] = useState(true);
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
    const [selectedUser, setSelectedUser] = useState({ name: "none", id: "0" });

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
                setUserVroomVolts(data[0]?.vroomvolts || 0);
                setFirstVroomvoltFetch(false);
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

    //updating vroomvolts
    // Each time the total amount of vroomvolts changes, update the database and fethc the new value
    useEffect(() => {
        if (!firstVroomvoltFetch) {
            putVroomvolts().then(fetchVroomvolts);
        }
    }, [userVroomVolts]);

    if (!userData.isLoggedIn) {
        return null;
    }

    const fetchVroomvolts = () => {
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
                setUserVroomVolts(data[0]?.vroomvolts || 0);
                // setFirstVroomvoltFetch(false);
            })
            .catch((error) => {
                console.log(`Error ${error}`);
            });
    };

    const putVroomvolts = () => {
        return fetch(`${process.env.REACT_APP_BASE_URL}users-levels/${userData.userId}`, {
            method: "PUT",
            headers: {
                // "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
            },
            body: JSON.stringify({
                vroomvolts: userVroomVolts,
                should_update: 0,
            }),
        });
    };
    return (
        <div className='mainscreen-container'>
            <Menu setUserData={setUserData} userData={userData} labStatus={labStatus} userTime={userTime} userVroomVolts={userVroomVolts} />
            <div className='screen-panel'>
                {path === "/" ? (
                    <Dashboard labStatus={labStatus} mergedUsers={mergedUsers} />
                ) : path === "/vroomvolts" ? (
                    <VroomVolts userData={userData} mergedUsers={mergedUsers} userVroomVolts={userVroomVolts} />
                ) : path === "/users" ? (
                    <Users userData={userData} mergedUsers={mergedUsers} labStatus={labStatus} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                ) : path === "/marathon" ? (
                    <Marathon userData={userData} mergedUsers={mergedUsers} setSelectedUser={setSelectedUser} />
                ) : path === "/vroomvolts/wheel" ? (
                    <SpinningWheel userData={userData} mergedUsers={mergedUsers} userVroomVolts={userVroomVolts} setUserVroomVolts={setUserVroomVolts} />
                ) : path === "/vroomvolts/blackjack" ? (
                    <Blackjack userData={userData} mergedUsers={mergedUsers} />
                ) : path === "/vroomvolts/roulette" ? (
                    <Roulette userData={userData} mergedUsers={mergedUsers} />
                ) : (
                    <></>
                )}
            </div>
            <RightMenu mergedUsers={mergedUsers} setSelectedUser={setSelectedUser} />
        </div>
    );
}
