import React from "react";
import "./RightMenu.css";
import Activity from "../Activity/Activity";

export default function RightMenu({ mergedUsers }) {
    return (
        <div className="right-menu-container">
            <Activity mergedUsers={mergedUsers} />
        </div>
    );
}
