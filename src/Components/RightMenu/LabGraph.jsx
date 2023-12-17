import React, { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import secondsToHoursMins from "../../Utils/secondsToHoursMins";
import "./LabGraph.css";
export default function LabGraph() {
    const [labData, setLabData] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}session-duration/`, {
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
                const dailyTotalsMap = {};

                data.forEach((item) => {
                    const date = item.date.split("T")[0];
                    const duration = parseInt(item.session_seconds);

                    if (dailyTotalsMap[date]) {
                        dailyTotalsMap[date] += duration;
                    } else {
                        dailyTotalsMap[date] = duration;
                    }
                });

                // Convert the map into an array of objects
                const formattedData = Object.keys(dailyTotalsMap).map((date) => ({
                    date,
                    duration: dailyTotalsMap[date],
                }));

                setLabData(formattedData);
            })
            .catch((error) => {
                console.log(`Error ${error}`);
            });
    }, []);

    const CustomYAxisTick = ({ x, y, payload }) => {
        const string = secondsToHoursMins(payload.value);
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} fill="#e3f4f2" fontSize="13px" textAnchor="end">
                    {string.substring(0, string.indexOf("h") + 1)}
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
        <div className="lab-graph-container">
            <div className="activity-header">Lab time</div>
            <ResponsiveContainer width="90%" height="80%">
                <AreaChart data={labData}>
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
        </div>
    );
}
