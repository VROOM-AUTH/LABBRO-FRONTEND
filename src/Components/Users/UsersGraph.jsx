import React, { useEffect, useState } from "react";
import "./UsersGraph.css";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import secondsToHoursMins from "../../Utils/secondsToHoursMins";
export default function UsersGraph({ selectedUser, totalLabHours }) {
    const [selectedUserGraphData, setSelectedUserGraphData] = useState([{ date: "", duration: "" }]);
    const [loading, setLoading] = useState(true);
    const [averageTime, setAverageTime] = useState("0 min");
    const [mostTime, setMostTime] = useState("0 min");
    const [percentTime, setPercentTime] = useState("0%");

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_BASE_URL}session-duration/?user_id=${selectedUser.id}`, {
            //Fetch for user session data
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
                    date: item.date.split("T")[0], // Extracting only the date part
                    duration: parseInt(item.session_seconds),
                }));

                // Create an object to store total duration for each day
                const dailyTotalsMap = {};

                let totalDuration = 0;
                let mostTime = 0;
                // Populate the object
                formattedData.forEach((item) => {
                    const key = item.date;
                    if (dailyTotalsMap[key]) {
                        dailyTotalsMap[key] += item.duration;
                    } else {
                        dailyTotalsMap[key] = item.duration;
                    }
                    totalDuration += item.duration;
                });

                setPercentTime(((totalDuration / totalLabHours) * 100).toFixed(2) + "%");
                // Convert the object back to an array of objects
                const dailyData = Object.entries(dailyTotalsMap).map(([date, duration]) => ({ date, duration }));

                dailyData.forEach((item) => {
                    if (item.duration > mostTime) {
                        mostTime = item.duration;
                    }
                });

                const average = totalDuration / dailyData.length;

                setAverageTime(secondsToHoursMins(average));
                setMostTime(secondsToHoursMins(mostTime));

                // Set the state with the merged data
                setSelectedUserGraphData(dailyData);
                setLoading(false);
            })
            .catch((error) => {
                console.log(`Error ${error}`);
            });
    }, [selectedUser, totalLabHours]);

    const CustomYAxisTick = ({ x, y, payload }) => {
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} fill="#e3f4f2" fontSize="13px" textAnchor="end">
                    {secondsToHoursMins(payload.value)}
                </text>
            </g>
        );
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <div className="label">{payload[0].payload.date}</div>
                    <div className="label">{secondsToHoursMins(payload[0].value)}</div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="users-graph-container ">
            {selectedUser.id === "0" ? (
                <div className="users-graph-title">Select a user for details</div>
            ) : selectedUserGraphData.length < 2 ? (
                <div className="users-graph-title">
                    Not enough data for <span style={{ color: "#E971E3" }}>{selectedUser.name}</span>
                </div>
            ) : (
                <>
                    <div className="users-graph-title">
                        Session Duration of <span style={{ color: "#E971E3", marginLeft: "0.5rem" }}>{selectedUser.name}</span>
                    </div>
                    <ResponsiveContainer width="90%" height="50%" className={loading ? "loading" : ""}>
                        <AreaChart data={selectedUserGraphData}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#cc84d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="date" fill="#e3f4f2" fontSize="13px" textAnchor="end" />
                            <YAxis tick={<CustomYAxisTick />} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="duration" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        </AreaChart>
                    </ResponsiveContainer>
                    <div className="users-graph-info-container">
                        <div className="users-graph-info">
                            <div>
                                <span style={{ color: "#E971E3" }}>{selectedUser.name}</span> was there
                            </div>
                            <span style={{ color: "#cc84d8", margin: "0 0.5rem" }}>{percentTime}</span>
                            <div>of the time</div>
                        </div>
                        <div className="users-graph-info">
                            <div>Average time:</div>
                            <span style={{ color: "#FD7CBF", marginLeft: "0.5rem" }}>{averageTime}</span>
                        </div>
                        <div className="users-graph-info">
                            <div>Peak time:</div>
                            <span style={{ color: "#ff3c3c", marginLeft: "0.5rem" }}>{mostTime}</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
