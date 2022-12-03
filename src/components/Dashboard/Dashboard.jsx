import React, { useEffect, useState } from 'react';
import StatisticsCard from './StatisticsCard';
import BarChartCom from '../BarChartCom/BarChartCom';
import './Dashboard.css';

const Dashboard = () => {
    const [labStatus, setLabStatus] = useState({ closed: 'failed' });
    const [totalUsers, setTotalUsers] = useState(0);
    const base_url = 'http://127.0.0.1:8000/';
    useEffect(() => {
        fetch(`${base_url}lab-status/`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                let openTime = new Date(data['opened_time']);
                let today = false;
                if (new Date().toDateString() == openTime.toDateString()) {
                    today = true;
                }
                if (today) {
                    openTime =
                        'Today, ' +
                        openTime
                            .toLocaleTimeString('gr', { hour12: false })
                            .slice(0, 5);
                } else {
                    openTime =
                        openTime.toDateString().slice(0, 3) +
                        ' at ' +
                        openTime
                            .toLocaleTimeString('gr', { hour12: false })
                            .slice(0, 5);
                }

                if (data['closed']) {
                    setLabStatus({
                        ...labStatus,
                        closed: 'Closed ',
                        opened_time: openTime,
                        closed_time: data['closed_time'],
                        total_hours: data['total_hours'],
                    });
                } else {
                    setLabStatus({
                        ...labStatus,
                        closed: 'Open ',
                        opened_time: openTime,
                        closed_time: data['closed_time'],
                        total_hours: data['total_hours'],
                    });
                }
            })
            .catch((error) => {
                console.log(`Error ${error}`);
            });

        fetch(`${base_url}users/`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                setTotalUsers(data.length);
            });
    }, []);

    return (
        <div className='dashboard'>
            <div className='header'>
                <h1>Dashboard</h1>
                {labStatus.closed == 'Open ' && (
                    <h2 className='lab-status'>
                        Lab is {labStatus.closed} &#128275;
                    </h2>
                )}
                {labStatus.closed == 'Closed ' && (
                    <h2 className='lab-status'>
                        Lab is {labStatus.closed} U+1F512
                    </h2>
                )}
            </div>
            <div className='cards-container'>
                <StatisticsCard
                    info={`${Math.floor(
                        labStatus.total_hours / 3600
                    )}:${0}${Math.floor((labStatus.total_hours % 3600) / 60)}`}
                />
                <StatisticsCard title='Vroomers at Lab' info='5' />
                <StatisticsCard
                    title='Lab Opened'
                    info={labStatus.opened_time}
                />
                <StatisticsCard title='Total Users' info={totalUsers} />
            </div>
            <div className='charts'>
                <BarChartCom />
                <BarChartCom />
            </div>
        </div>
    );
};

export default Dashboard;
