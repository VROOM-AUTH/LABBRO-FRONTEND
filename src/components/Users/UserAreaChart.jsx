import React, { useEffect, useState } from 'react';
import {
    AreaChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Area,
    ResponsiveContainer,
} from 'recharts';

import './UserAreaChart.css';

const UserAreaChart = ({ user_id, total_lab_seconds }) => {
    const [data, setData] = useState([]);
    const [averageTime, setAverageTime] = useState('0 min');
    const [probability, setProbability] = useState(0);

    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_BASE_URL}session-duration/?user_id=${user_id}`
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                let temp_data = [];
                let sessionSum = 0;
                for (let entry of data) {
                    temp_data.push({
                        name: new Date(entry.date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        }),
                        hours: +entry.session_seconds / 3600,
                    });
                    sessionSum += +entry.session_seconds / 3600;
                }
                setProbability(
                    Math.floor(((sessionSum * 3600) / total_lab_seconds) * 100)
                );
                if (data.length > 0) {
                    let startD = new Date(data[0].date); // start date of measurements
                    // let endD = new Date(data[data.length - 1].date);
                    let endD = new Date(); // today

                    let duration = endD - startD; // duration in ms between starting date and today
                    duration = duration / (3600 * 24 * 1000); // tranform in days

                    if (duration > 0) {
                        let minutes = (sessionSum * 60) / duration; // total minutes at Lab
                        let hours = Math.floor(minutes / 60); // total hours at lab
                        let avgTimeString = '';
                        let tmp_min = minutes % 60;
                        if (hours != 0) {
                            avgTimeString = `${hours} h and ${Math.floor(
                                tmp_min
                            )} min`;
                        } else {
                            avgTimeString = `${Math.floor(tmp_min)} min`;
                        }
                        setAverageTime(avgTimeString);
                    }
                }
                setData(temp_data);
            })
            .catch((error) => console.log(error));
    }, []);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className='custom-tooltip'>
                    <p className='label'>{payload[0].payload.name}</p>
                    <p className=''>{`${Math.floor(
                        payload[0].value
                    )} h and ${Math.floor(
                        (payload[0].value * 60) % 60
                    )} min`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <>
            <div className='statistics-container'>
                <div className='avg-time'>
                    <span>Average Time at Lab: {averageTime}</span>
                    {/* <span>Probability to find him at Lab: {probability} %</span> */}
                </div>
                <ResponsiveContainer width='100%' height='90%'>
                    <AreaChart
                        width={730}
                        height={250}
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient
                                id='area'
                                x1='0'
                                y1='0'
                                x2='0'
                                y2='1'>
                                <stop
                                    offset='5%'
                                    stopColor='#FFDD00'
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset='95%'
                                    stopColor='#FBB034'
                                    stopOpacity={0}
                                />
                            </linearGradient>
                            <linearGradient
                                id='line'
                                x1='0'
                                y1='0'
                                x2='0'
                                y2='1'>
                                <stop
                                    offset='5%'
                                    stopColor='#BB56E4'
                                    stopOpacity={1}
                                />
                                <stop
                                    offset='95%'
                                    stopColor='#7133E5'
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey='name' />
                        <YAxis />
                        <CartesianGrid strokeDasharray='3 3' opacity={0.1} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type='monotone'
                            dataKey='hours'
                            stroke='url(#area)'
                            strokeWidth={5}
                            fillOpacity={1}
                            fill='url(#area)'
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default UserAreaChart;
