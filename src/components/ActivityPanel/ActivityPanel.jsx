import React, { useState } from "react";
import "./ActivityPanel.css";
import UserCard from "./UserCard";
import AreaChartCom from "../AreaChartCom/AreaChartCom";
import { useEffect } from "react";

const ActivityPanel = () => {
    const [recentActivity, setRecentActivity] = useState([]);
    // const [userIdentifier, setUserIdentifier] = useState({});

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}users/`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
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
                "Access-Control-Allow-Origin": "*",
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
                    if (entry.status === 0) {
                        temp_arr.push(
                            `${user_id[entry.user_id]} just left the Lab`
                        );
                    } else {
                        temp_arr.push(
                            `${user_id[entry.user_id]} just entered the Lab`
                        );
                    }
                }
                setRecentActivity(temp_arr);
            })
            .catch((error) => {
                console.log(`Error: ${error}`);
            });
    };

    return (
        <div className="activity-panel">
            {/* <div className="header"></div> */}
            <div className="activity-panel-container">
                <h3>Recent activity</h3>
                {recentActivity.map((item, index) => (
                    <UserCard user={item} index={index} key={index} />
                ))}
            </div>
            <div className="classification">
                <AreaChartCom />
            </div>
        </div>
    );
};

export default ActivityPanel;
