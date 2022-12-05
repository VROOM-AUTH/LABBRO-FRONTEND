import React from "react";
import { useState } from "react";
import "./VroomVolts.css";

const VroomVolts = () => {
    const [userLevel, setUserLevel] = useState(1);
    return (
        <div className="vroom-volts">
            <div className="header-volts">
                <h1>VroomVolts</h1>
                <h3>Level: {userLevel}</h3>
            </div>
            <div className="current-level">
                <div className="level-box"></div>
            </div>
            <div className="next-levels"></div>
        </div>
    );
};

export default VroomVolts;
