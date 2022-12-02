import React from "react";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer } from "recharts";

const AreaChartCom = () => {
    const data = [
        {
            name: "January",
            hours: 140,
            user: 125,
        },
        {
            name: "Feb",
            hours: 150,
            user: 171,
        },
        {
            name: "March",
            hours: 130,
            user: 112,
        },
        {
            name: "June",
            hours: 160,
            user: 110,
        },
        {
            name: "July",
            hours: 120,
            user: 210,
        },
        {
            name: "August",
            hours: 170,
            user: 128,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height="90%">
            <AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7133E5" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#BB56E4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="line" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#BB56E4" stopOpacity={1} />
                        <stop offset="95%" stopColor="#7133E5" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="hours"
                    stroke="url(#line)"
                    strokeWidth={5}
                    fillOpacity={1}
                    fill="url(#line)"
                />
                <Area type="monotone" dataKey="user" stroke="url(#line)" fillOpacity={1} fill="url(#line)" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default AreaChartCom;
