import React from "react";
import "./RightMenu.css";
import Activity from "../Activity/Activity";
import LabGraph from "./LabGraph";

export default function RightMenu({ mergedUsers, setSelectedUser }) {
    return (
        <div className='right-menu-container'>
            <Activity mergedUsers={mergedUsers} setSelectedUser={setSelectedUser} />
            <LabGraph />
        </div>
    );
}
