import React, { useEffect, useState } from "react";
import StatisticsCard from "./StatisticsCard";
import BarChartCom from "../BarChartCom/BarChartCom";
import "./Dashboard.css";

const Dashboard = () => {
    const [labStatus, setLabStatus] = useState({ closed: "failed" });
    const [totalUsers, setTotalUsers] = useState(0);
    const [usersInLab, setUsersInLab] = useState(0);
    const [userHours, setUserHours] = useState([{}]);
    const [idToName, setIdToName] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // console.log(process.env.REACT_APP_BASE_URL);
        fetch(`${process.env.REACT_APP_BASE_URL}lab-status/`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                let openTime = new Date(data["opened_time"]);
                let today = false;
                if (new Date().toDateString() == openTime.toDateString()) {
                    today = true;
                }
                if (today) {
                    openTime =
                        "Today, " +
                        openTime
                            .toLocaleTimeString("gr", { hour12: false })
                            .slice(0, 5);
                } else {
                    openTime =
                        openTime.toDateString().slice(0, 3) +
                        " at " +
                        openTime
                            .toLocaleTimeString("gr", { hour12: false })
                            .slice(0, 5);
                }

                if (data["closed"]) {
                    setLabStatus({
                        ...labStatus,
                        closed: "Closed ",
                        opened_time: openTime,
                        closed_time: data["closed_time"],
                        total_hours: data["total_seconds"],
                    });
                } else {
                    setLabStatus({
                        ...labStatus,
                        closed: "Open ",
                        opened_time: openTime,
                        closed_time: data["closed_time"],
                        total_hours: data["total_seconds"],
                    });
                }
            })
            .catch((error) => {
                console.log(`Error ${error}`);
            });

        fetch(`${process.env.REACT_APP_BASE_URL}users/`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                setTotalUsers(data.length);
            });

        fetch(`${process.env.REACT_APP_BASE_URL}users/?fields=name,id`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                setIdToName(data);
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        if (!loading) {
            fetch(`${process.env.REACT_APP_BASE_URL}users-time/`)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then((data) => {
                    let counter = 0;
                    let temp_arr = [];

                    for (let user of data) {
                        if (user.in_lab) {
                            counter++;
                        }
                        const name =
                            idToName.find(
                                (o) => o.id === user.user_id // SEARCHES FOR the objects whos id is the id in the time array
                            ).name || "";
                        temp_arr.push({
                            // name:
                            //     idToName.find(
                            //         (o) => o.id === user.user_id // SEARCHES FOR the objects whos id is the id in the time array
                            //     ).name || "",
                            name: name,
                            // name: user.user_id,
                            hours: user.total_seconds / 3600,
                        });
                    }
                    setUsersInLab(counter);
                    setUserHours(temp_arr);
                })
                .catch((error) => {
                    console.log(`Error: ${error}`);
                });
        }
    }, [loading]);

    return (
        <div className="dashboard">
            <div className="header">
                <h1>Dashboard</h1>
                {labStatus.closed == "Open " && (
                    <h2 className="lab-status">
                        Lab is {labStatus.closed} &#128275;
                    </h2>
                )}
                {labStatus.closed == "Closed " && (
                    <h2 className="lab-status">
                        Lab is {labStatus.closed} U+1F512
                    </h2>
                )}
            </div>
            <div className="cards-container">
                <StatisticsCard
                    info={`${Math.floor(
                        labStatus.total_hours / 3600
                    )} h and ${Math.floor(
                        (labStatus.total_hours % 3600) / 60
                    )} min`}
                    icon={1}
                />
                <StatisticsCard
                    title="Vroomers at Lab"
                    info={usersInLab}
                    icon={2}
                />
                <StatisticsCard
                    title="Lab Opened"
                    info={labStatus.opened_time}
                    icon={3}
                />
                <StatisticsCard
                    title="Total Users"
                    info={totalUsers}
                    icon={4}
                />
            </div>
            <div className="charts">
                <BarChartCom data={userHours} />
                {/* <BarChartCom data={userHours} /> */}
            </div>
        </div>
    );
};

export default Dashboard;
