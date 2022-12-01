import React, { useState } from 'react'
import StatisticsCard from './StatisticsCard'
import BarChartCom from '../BarChartCom/BarChartCom'
import "./Dashboard.css"

const Dashboard = () => {
const [labStatus, setLabStatus] = useState(`Open `)
    return (
    <div className='dashboard'>
        <div className="header">
            <h1>Dashboard</h1>
            <h2 className="lab-status">Lab is {labStatus} &#128275;</h2>
        </div>
        <div className="cards-container">
            <StatisticsCard />
            <StatisticsCard title="Vroomers at Lab" info="5"/>
            <StatisticsCard title="Vroomers at Lab" info="15"/>
            <StatisticsCard title="Total Users" info="15"/>
        </div>
        <div className="charts">
            <BarChartCom />
            <BarChartCom />

        </div>
    </div>
    )
}


export default Dashboard