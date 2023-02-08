import "./App.css";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MainScreen from "./screens/MainScreen";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

// async function loadData(id) {
//     fetch(`${process.env.REACT_APP_BASE_URL}users-levels/?user_id=${id}`, {
//         method: "GET",
//         headers: {
//             // "Access-Control-Allow-Origin": "*",
//             "Content-Type": "application/json",
//             Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
//         },
//     })
//         .then((response) => {
//             if (response.ok) return response.json();

//             throw response;
//         })
//         .then((data1) => {
//             const initial_vroomvolts = data1[0].vroomvolts;
//             fetch(
//                 `${process.env.REACT_APP_BASE_URL}calculate-vroomvolts/${id}`,
//                 {
//                     method: "GET",
//                     headers: {
//                         // "Access-Control-Allow-Origin": "*",
//                         "Content-Type": "application/json",
//                         Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
//                     },
//                 }
//             )
//                 .then((response) => {
//                     if (response.ok) return response.json();

//                     throw response;
//                 })
//                 .then((data2) => {
//                     fetch(
//                         `${process.env.REACT_APP_BASE_URL}users-levels/${id}`,
//                         {
//                             method: "PUT",
//                             headers: {
//                                 // "Access-Control-Allow-Origin": "*",
//                                 "Content-Type": "application/json",
//                                 Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
//                             },
//                             body: JSON.stringify({
//                                 vroomvolts:
//                                     initial_vroomvolts + data2.vroomvolts,
//                                 streak: data2.streak,
//                                 should_update: 1,
//                             }),
//                         }
//                     ).then((response) => {
//                         console.log(response);
//                         if (response.ok) return response.json();
//                         throw response;
//                     });
//                 });
//         });
// }

async function loadData(id) {
    try {
        const response1 = await fetch(
            `${process.env.REACT_APP_BASE_URL}users-levels/?user_id=${id}`,
            {
                method: "GET",
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
                },
            }
        );
        const data1 = await response1.json();
        const initial_vroomvolts = data1[0].vroomvolts;

        const response2 = await fetch(
            `${process.env.REACT_APP_BASE_URL}calculate-vroomvolts/${id}`,
            {
                method: "GET",
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
                },
            }
        );
        const data2 = await response2.json();

        const response3 = await fetch(
            `${process.env.REACT_APP_BASE_URL}users-levels/${id}`,
            {
                method: "PUT",
                headers: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
                },
                body: JSON.stringify({
                    vroomvolts: initial_vroomvolts + data2.vroomvolts,
                    streak: data2.streak,
                    should_update: 1,
                }),
            }
        );
    } catch (error) {
        console.error(error);
    }
}

function App() {
    const [userData, setUserData] = useState({
        username: localStorage.getItem("username") || "",
        userId: parseInt(localStorage.getItem("userId")) || 0,
        isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    });
    useEffect(() => {
        async function updateData() {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_BASE_URL}users/?fields=id`,
                    {
                        method: "GET",
                        headers: {
                            // "Access-Control-Allow-Origin": "*",
                            "Content-Type": "application/json",
                            Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
                        },
                    }
                );
                const data = await response.json();

                const promises = data
                    .filter((entry) => entry.id !== 20)
                    .map((entry) => loadData(entry.id));

                await Promise.all(promises);
            } catch (error) {
                console.error(error);
            }
        }

        updateData();
    }, []);
    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_BASE_URL}users/?fields=id`, {
    //         method: "GET",
    //         headers: {
    //             // "Access-Control-Allow-Origin": "*",
    //             "Content-Type": "application/json",
    //             Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
    //         },
    //     })
    //         .then((response) => {
    //             if (response.ok) return response.json();

    //             throw response;
    //         })
    //         .then((data) => {
    //             for (let entry of data) {
    //                 if (entry.id !== 20) {
    //                     loadData(entry.id);
    //                 }
    //             }
    //         });
    // }, []);

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
                    <Route
                        path="/users"
                        element={
                            <MainScreen
                                path={"/users"}
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
                    <Route
                        path="/marathon"
                        element={
                            <MainScreen
                                path={"/marathon"}
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
