import React, { useEffect, useState, PureComponent } from "react";
import "./BarChartCom.css";
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
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{payload[0].payload.name}</p>
                <p className="label">{`${Math.floor(
                    payload[0].value
                )} h and ${Math.floor((payload[0].value * 60) % 60)} min`}</p>
            </div>
        );
    }

    return null;
};

class CustomizedAxisTick extends PureComponent {
    render() {
        const { x, y, stroke, payload } = this.props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="end"
                    fill="#666"
                    transform="rotate(-35)"
                    fontSize={14}
                >
                    {payload.value}
                </text>
            </g>
        );
    }
}

const customLegend = () => {
    return (
        <div className="legend">
            <div className="legend-box"></div>
            <div>Total Hours</div>
        </div>
    );
};

const MyBarChart = ({ data }) => {
    data.sort((a, b) => {
        return b.hours - a.hours;
    });
    return (
        <ResponsiveContainer width="100%" height="50%">
            <BarChart width={600} data={data}>
                <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C22FF0" stopOpacity={1} />
                        <stop
                            offset="95%"
                            stopColor="#6C31E5"
                            stopOpacity={0}
                        />
                        {/* <stop offset="100%" stopColor="#000000" stopOpacity={0} /> */}
                    </linearGradient>
                </defs>
                <defs>
                    <linearGradient
                        id="color-stroke"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="5%"
                            stopColor="#E94560"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#E94560"
                            stopOpacity={0.0}
                        />
                    </linearGradient>
                </defs>
                <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    opacity={0.1}
                />
                <XAxis
                    tick={<CustomizedAxisTick />}
                    interval={0}
                    dataKey="name"
                    color="#E94560"
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend content={customLegend} />
                <Bar
                    dataKey="hours"
                    fill="url(#color)"
                    radius={10}
                    // stroke={"url(#color-stroke)"}
                    strokeWidth={2}
                    barSize={40}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default MyBarChart;
