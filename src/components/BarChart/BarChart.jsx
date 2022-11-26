import React from "react";
import "./BarChart.css";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

const MyBarChart = () => {
  let data = [
    {
      name: "giannis",
      hours: 15,
    },
    {
      name: "seba",
      hours: 13,
    },
    {
      name: "ankel",
      hours: 19,
    },
    {
      name: "re broo",
      hours: 10,
    },
    {
      name: "re brooo",
      hours: 21,
    },
    {
      name: "re broo",
      hours: 22,
    },
    {
      name: "re broo",
      hours: 24,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height="50%">
      <BarChart width={600} data={data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#C539B4" stopOpacity={0.8} />
            <stop offset="90%" stopColor="#C539B4" stopOpacity={0.0} />
            {/* <stop offset="100%" stopColor="#000000" stopOpacity={0} /> */}
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="color-stroke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F07DEA" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#F07DEA" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} ho />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="hours"
          fill="url(#color)"
          radius={10}
          stroke={"url(#color-stroke)"}
          strokeWidth={2}
          barSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MyBarChart;
