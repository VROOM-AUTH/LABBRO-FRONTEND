import React, { useEffect, useState } from "react";
import "./Activity.css";
import dateToTime from "../../Utils/dateToTime";
import { FcOk } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
export default function Activity({ mergedUsers }) {
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}attendance/?reverse=6`, {
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
                const formattedData = data.map((item) => ({
                    user_id: item.user_id,
                    name: mergedUsers.find((user) => user.id === item.user_id).name,
                    timestamp: item.timestamp,
                    status: item.status,
                }));
                setActivity(formattedData);
            })
            .catch((error) => {
                console.log(`Error ${error}`);
            });
    }, [mergedUsers]);

    const ActivityCard = ({ entry, index }) => {
        return (
            <div className="activity-card" style={{ opacity: 1 - index / 10 }}>
                <div className="activity-block">
                    {entry.status ? <FcOk style={{ marginRight: "0.5rem", fontSize: "1.5rem" }} /> : <FcCancel style={{ marginRight: "0.5rem", fontSize: "1.5rem" }} />}
                    {entry.name}
                </div>
                <div>{dateToTime(entry.timestamp)}</div>
            </div>
        );
    };

    return (
        <div className="activity-container">
            <div className="activity-header">Recent Activity</div>
            {activity.map((entry, index) => (
                <ActivityCard key={index} entry={entry} index={index} />
            ))}
        </div>
    );
}
