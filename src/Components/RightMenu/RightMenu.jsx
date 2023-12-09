import React from "react";
import "./RightMenu.css";
import Activity from "../Activity/Activity";
import LabGraph from "./LabGraph";

export default function RightMenu({ mergedUsers }) {
    return (
        <div className="right-menu-container">
            <Activity mergedUsers={mergedUsers} />
            <LabGraph />
        </div>
    );
}
