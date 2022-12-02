import React from "react";
import "./ActivityPanel.css";
import UserCard from "./UserCard";
import AreaChartCom from "../AreaChartCom/AreaChartCom";

const ActivityPanel = () => {
    return (
        <div className="activity-panel">
            {/* <div className="header"></div> */}
            <div className="activity-panel-container">
                <h3>Recent activity</h3>
                <UserCard user="Teo opened the Lab" />
                <UserCard user="Ankel just entered the Lab" />
                <UserCard user="Horgos just fucked Eythymia" />
                <UserCard user="Eythymia wants a steet boi" />
            </div>
            <div className="classification">
                <AreaChartCom />
            </div>
        </div>
    );
};

export default ActivityPanel;
