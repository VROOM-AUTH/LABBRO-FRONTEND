import React, { useEffect, useState } from 'react';
import './BarChartCom.css';
import {
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Bar,
    ResponsiveContainer,
} from 'recharts';

const MyBarChart = ({ data }) => {
    return (
        <ResponsiveContainer width='100%' height='40%'>
            <BarChart width={600} data={data}>
                <defs>
                    <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='#C22FF0' stopOpacity={1} />
                        <stop
                            offset='95%'
                            stopColor='#6C31E5'
                            stopOpacity={0}
                        />
                        {/* <stop offset="100%" stopColor="#000000" stopOpacity={0} /> */}
                    </linearGradient>
                </defs>
                <defs>
                    <linearGradient
                        id='color-stroke'
                        x1='0'
                        y1='0'
                        x2='0'
                        y2='1'>
                        <stop
                            offset='5%'
                            stopColor='#E94560'
                            stopOpacity={0.8}
                        />
                        <stop
                            offset='95%'
                            stopColor='#E94560'
                            stopOpacity={0.0}
                        />
                    </linearGradient>
                </defs>
                <CartesianGrid
                    strokeDasharray='3 3'
                    vertical={false}
                    opacity={0.1}
                />
                <XAxis dataKey='name' color='#E94560' />
                <YAxis />
                <Tooltip />
                <Legend color='#16213E' />
                <Bar
                    dataKey='hours'
                    fill='url(#color)'
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
