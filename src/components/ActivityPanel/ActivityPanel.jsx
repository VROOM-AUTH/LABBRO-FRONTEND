import React, { useState } from "react";
import "./ActivityPanel.css";
import UserCard from "./UserCard";
import AreaChartCom from "../AreaChartCom/AreaChartCom";
import { useEffect } from "react";

const ActivityPanel = ({ userData }) => {
    const [recentActivity, setRecentActivity] = useState([]);
    // const [userIdentifier, setUserIdentifier] = useState({});

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}users/`, {
            method: "GET",
            headers: {
                // "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                let user_id = {};
                for (let user of data) {
                    user_id[user.id] = user.name;
                }
                // setUserIdentifier(temp_obj);
                getRecentActivity(user_id);
            });
    }, []);

    const getRecentActivity = (user_id) => {
        fetch(`${process.env.REACT_APP_BASE_URL}attendance/?reverse=4`, {
            method: "GET",
            headers: {
                // "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Authorization: `Token ${process.env.REACT_APP_AUTH_TOKEN}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                let temp_arr = [];
                for (let entry of data) {
                    let date = new Date(entry.timestamp);
                    date.setHours(date.getHours() - 3);
                    if (entry.status === 0) {
                        temp_arr.push({
                            text: `${user_id[entry.user_id]} just left the Lab`,
                            timestamp: date.toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: false,
                            }),
                        });
                    } else {
                        temp_arr.push({
                            text: `${
                                user_id[entry.user_id]
                            } just entered the Lab`,
                            timestamp: date.toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: false,
                            }),
                        });
                    }
                }
                setRecentActivity(temp_arr);
            })
            .catch((error) => {
                console.log(`Error: ${error}`);
            });
    };
    // console.log(recentActivity);
    return (
        <div className="activity-panel">
            {/* <div className="header"></div> */}
            <div className="activity-panel-container">
                <h3>Recent activity</h3>
                {recentActivity.map((item, index) => (
                    <UserCard
                        user={item.text}
                        timestamp={item.timestamp}
                        index={index}
                        key={index}
                        userData={userData}
                        isLoggedIn={userData.isLoggedIn}
                    />
                ))}
            </div>
            <h3 className="total-hours-title">Total Lab Hours</h3>

            <div className="classification">
                <AreaChartCom />
            </div>
        </div>
    );
};

export default ActivityPanel;
