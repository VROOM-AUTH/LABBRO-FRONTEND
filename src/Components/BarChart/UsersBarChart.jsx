import React from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const UsersBarChart = ({ data }) => {
    const sortedData = data
        .map((item) => ({
            ...item,
            total_seconds: parseFloat(item.total_seconds),
        }))
        .sort((a, b) => b.total_seconds - a.total_seconds);
    return (
        <ResponsiveContainer width="90%" height={400}>
            <BarChart data={sortedData}>
                <CartesianGrid
                    vertical={false}
                    strokeDasharray="7 7"
                    fill="#142132"
                    fillOpacity={0.6}
                />
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
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="bottom" />
                <Bar dataKey="total_seconds" fill="#FD7CBF" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default UsersBarChart;
