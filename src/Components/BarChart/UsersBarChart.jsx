import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import secondsToHoursMins from "../../Utils/secondsToHoursMins";
import "./UsersBarChart.css";

const UsersBarChart = ({ data }) => {
    //sort the data in descending order
    const sortedData = data
        .map((item) => ({
            ...item,
            total_seconds: parseFloat(item.total_seconds),
        }))
        .sort((a, b) => b.total_seconds - a.total_seconds);

    //filter the data for users with non-zero total_seconds
    const filteredData = sortedData.filter((user) => parseFloat(user.total_seconds) !== 0);

    //custom y axis to show hours and minutes instead of seconds
    const CustomYAxisTick = ({ x, y, payload }) => {
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} fill="#e3f4f2" fontSize="13px" textAnchor="end">
                    {secondsToHoursMins(payload.value)}
                </text>
            </g>
        );
    };

    //custom tooltip to show hours and minutes instead of seconds
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <div className="label">{payload[0].payload.name}</div>
                    <div className="label">{secondsToHoursMins(payload[0].value)}</div>
                </div>
            );
        }

        return null;
    };

    //custom legend to show total hours
    const customLegend = () => {
        return (
            <div className="legend">
                <div className="legend-box"></div>
                <div className="legend-text">Total Hours</div>
            </div>
        );
    };

    return (
        <ResponsiveContainer width="90%" height="50%">
            <BarChart data={filteredData}>
                <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9480FA" stopOpacity={1} />
                        <stop offset="95%" stopColor="#E971E3" stopOpacity={0} />
                    </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.4} />
                <XAxis
                    dataKey="name"
                    interval={0}
                    tick={{
                        fill: "#e3f4f2",
                        fontSize: "13px",
                        fontWeight: "300",
                        dy: 15,
                    }}
                    angle={-45}
                />
                <YAxis tick={<CustomYAxisTick />} />
                <Tooltip content={<CustomTooltip />} />
                <Legend content={customLegend} />
                <Bar dataKey="total_seconds" fill={"url(#color)"} radius={5} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default UsersBarChart;
